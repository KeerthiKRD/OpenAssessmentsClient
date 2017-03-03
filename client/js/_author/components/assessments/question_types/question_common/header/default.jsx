import React    from 'react';

export default function DefaultHeader(props) {
  return (
    <div className="author--o-right author--c-question-icons">
      <button
        className="author--c-btn author--c-btn--square"
        tabIndex="0"
      >
        <i className="material-icons">remove_red_eye</i>
      </button>
      <button
        className="author--c-btn author--c-btn--square"
        tabIndex="0"
        onClick={props.toggleReorder}
      >
        <i className="material-icons">swap_vert</i>
      </button>
      <button
        className="author--c-btn author--c-btn--square"
        tabIndex="0"
        onClick={() => props.deleteAssessmentItem(props.id)}
      >
        <i className="material-icons">delete</i>
      </button>
    </div>
  );
}

DefaultHeader.propTypes = {
  id: React.PropTypes.string,
  deleteAssessmentItem: React.PropTypes.func,
  toggleReorder: React.PropTypes.func,
};