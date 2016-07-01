import api                                          from "../libs/api";
import Network                                      from "../constants/network";
import { Constants as JwtConstants }                from "../actions/jwt";
import { Constants as AssessmentConstants }         from "../actions/assessment";
import { Constants as AssessmentProgressConstants } from "../actions/assessment_progress";
import { Constants as AssessmentMetaConstants }     from "../actions/assessment_meta.js";
import { DONE }    from "../constants/wrapper";

export default {

  [JwtConstants.REFRESH_JWT] : {
    method : Network.GET,
    url    : (action) => { `api/sessions/${action.userId}`; }
  },

  [AssessmentConstants.LOAD_ASSESSMENT] : (store, action) => {
    const state = store.getState();

    const metaUrl = `assessment/banks/${state.settings.bank}/assessmentsoffered/${state.settings.assessment_offered_id}/assessmentstaken`;

    const body = {
      sessionId: action.settings.eid
    };

    const metaPromise = api.post(metaUrl, state.settings.api_url, state.jwt, state.settings.csrf_token, {}, body);
    if(metaPromise){
      metaPromise.then((response, error) => {
        store.dispatch({
          type:     AssessmentMetaConstants.LOAD_ASSESSMENT_META_DONE,
          payload:  response.body,
          original: action,
          response,
          error
        });

        const assessmentUrl = `assessment/banks/${state.settings.bank}/assessmentstaken/${response.body.id}/questions?qti`;

        const assessmentPromise = api.get(assessmentUrl, state.settings.api_url, state.jwt, state.settings.csrf_token, {});
        if(assessmentPromise) {
          assessmentPromise.then((assessmentResponse, error) => {
            store.dispatch({
              type:     action.type + DONE,
              payload:  assessmentResponse.body,
              original: action,
              response,
              error
            });
          });
        }
      });
    }
  },

  [AssessmentConstants.ASSESSMENT_POST_ANALYTICS] : {
    method : Network.POST,
    url    : (action) => { `api/assessment_results/${action.resultsId}/send?external_user_id=${action.userId}&external_context_id=${action.contextId}`; },
    body   : (action) => {
      return {
        results_id : action.resultsId,
        user_id    : action.userId,
        context_id : action.contextId
      };
    }
  },

  [AssessmentConstants.ASSESSMENT_POST_LTI_OUTCOME] : {
    method : Network.POST,
    url    : (action) => { `api/assessment_results/${action.resultsId}/lti_outcome`; }
  },

  [AssessmentProgressConstants.ASSESSMENT_CHECK_ANSWER]: (store, action) => {
    const state = store.getState();

    const url = `assessment/banks/${state.settings.bank}/assessmentstaken/${state.assessmentMeta.id}/questions/${action.questionId}/submit`;

    const body = {
      type: action.answer.genus,
      choiceId: action.answer.id
    };

    const promise = api.post(url, state.settings.api_url, state.jwt, state.settings.csrf_token, {}, body);
    if(promise){
      promise.then((response, error) => {
        store.dispatch({
          type:     action.type + DONE,
          payload: response.body,
          original: action,
          response,
          error
        });
      });
    }
  },

  [AssessmentProgressConstants.ASSESSMENT_GRADED] : {
    method : Network.POST,
    url    : (action) => { 'api/grades'; },
    body   : (action) => {

      // Only send data needed for server-side grading.
      const questions = action.questions.map(function(question){
        return {
          id               : question.id,
          score            : question.score,
          confidence_level : question.confidenceLevel,
          time_spent       : question.timeSpent,
          start_time       : question.startTime,
          outcome_guid     : question.outcomeGuid
        };
      });

      return {
        item_to_grade : {
          assessment_id : action.assessmentId,
          questions,
          answers       : action.answers,
          identifier    : action.identifier,
          settings      : action.settings
        }
      };

    }
  },

  [AssessmentProgressConstants.ASSESSMENT_SUBMITTED] : (store, action) => {
    const state = store.getState();

    const url = `assessment/banks/${state.settings.bank}/assessmentstaken/${state.assessmentMeta.id}/finish`;

    const promise = api.post(url, state.settings.api_url, state.jwt, state.settings.csrf_token, {}, {});
    if(promise){
      promise.then((response, error) => {
        store.dispatch({
          type:     action.type + DONE,
          payload: response.body,
          original: action,
          response,
          error
        });
      });
    }
  }
};
