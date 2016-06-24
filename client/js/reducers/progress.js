"use strict";

import Immutable  from 'immutable';
import { Constants as AssessmentConstants }   from '../actions/assessment_progress';

const initialState = Immutable.fromJS({
  isSubmitted: false,
  isStarted: false,
  currentItemIndex: 0,
  selectedAnswerId: '',
  answerMessageIndex: [], // TODO Find more appropriate name
  responses: [],
  startedAt: 0,
  finishedAt: 0,
  assessmentResult:null
});

export default (state = initialState, action) => {

  switch(action.type){
    case AssessmentConstants.ASSESSMENT_NEXT_QUESTION:
      var currentItemIndex = state.get("currentItemIndex");
      state = state.set("currentItemIndex", currentItemIndex + 1);
      break;

    case AssessmentConstants.ASSESSMENT_PREVIOUS_QUESTION:
      var currentItemIndex = state.get("currentItemIndex");
      state = state.set("currentItemIndex", currentItemIndex - 1);
      break;

    case AssessmentConstants.ASSESSMENT_VIEWED:
      state = state.set("startedAt", Date.now());
      break;

    case AssessmentConstants.ANSWER_SELECTED:
      var responses = state.getIn(['responses', `${action.questionIndex}`]);
      if(responses === undefined){responses = Immutable.List();} 
      responses = responses.push(action.answerId);
      state = state.setIn(["responses", `${action.questionIndex}`], responses);
      break;


    default:

  }
  return state;
};
