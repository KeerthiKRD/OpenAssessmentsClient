import React    from 'react';
import types from '../../../../../constants/question_types';

export default function questionSettings(props) {
  const extraOptionTypes = [types.multipleChoice, types.reflection, types.multipleReflection, types.multipleAnswer];
  function checkboxOptions() {
    return (
      <div className="author--o-right">
        <div className="author--c-checkbox author--u-ml-md">
          <input
            type="checkbox"
            id={`check02_${props.id}`}
            name="check"
            tabIndex="0"
            onChange={e => props.updateItem({ question: { maintainOrder: e.target.checked } })}
            checked={props.maintainOrder}
          />
          <label htmlFor={`check02_${props.id}`}>Maintain choice order</label>
        </div>
        <div className="author--c-checkbox u-ml-md">
          <input
            type="checkbox"
            id={`check03_${props.id}`}
            name="check"
            tabIndex="0"
            onChange={() => props.makeMultipleAnswer()}
            checked={props.multipleAnswer ? 'checked' : null}
          />
          <label htmlFor={`check03_${props.id}`}>Multiple answer</label>
        </div>
        <div className="author--c-checkbox author--u-ml-md">
          <input
            type="checkbox"
            id={`check04_${props.id}`}
            name="check"
            tabIndex="0"
            onChange={e => props.makeReflection(e.target.checked)}
            checked={props.reflection ? 'checked' : null}
          />
          <label htmlFor={`check04_${props.id}`}>Reflection</label>
        </div>
      </div> : null
    );
  }

  return (
    <div className="author--c-question-settings">
      <div className="author--o-left">
        <div className="author--c-input author--c-input-label--left">
          <label htmlFor={`question_name_${props.id}`}>Name</label>
          <div className="author--c-input__contain">
            <input
              className="author--c-text-input author--c-text-input--smaller"
              id={`question_name_${props.id}`}
              type="text"
              tabIndex="0"
              defaultValue={props.defaultName}
              onBlur={e => props.updateItem({ name: e.target.value })}
            />
            <div className="author--c-input__bottom" />
          </div>
        </div>

        <div className="author--c-dropdown author--c-dropdown--small author--u-ml-md">
          <select
            name=""
            id=""
            tabIndex="0"
            value={props.language}
            onChange={e => props.updateItem({ language: e.target.value })}
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="telugu">Telugu</option>
          </select>
        </div>
      </div>
      {_.includes(extraOptionTypes, props.type) ? checkboxOptions() : null}
    </div>
  );
}

questionSettings.propTypes = {
  id: React.PropTypes.string.isRequired,
  defaultName: React.PropTypes.string,
  type: React.PropTypes.string,
  language: React.PropTypes.string.isRequired,
  updateItem: React.PropTypes.func.isRequired,
  makeReflection: React.PropTypes.func.isRequired,
  maintainOrder: React.PropTypes.bool,
  multipleAnswer: React.PropTypes.bool,
  reflection: React.PropTypes.bool,
};