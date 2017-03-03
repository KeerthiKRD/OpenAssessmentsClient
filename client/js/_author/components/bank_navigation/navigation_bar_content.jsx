import React                    from 'react';
import _                        from 'lodash';
import appHistory               from '../../history';
import Breadcrumb               from './breadcrumb';

export default function navigationBarContent(props) {
  return (
    <div className="author--c-header-bottom">
      <div className="author--c-header-bottom__left">
        <button
          onClick={() => props.updatePath(null)}
          className={props.currentBankId ? 'author--c-btn author--c-btn--breadcrumb' : 'author--c-btn author--c-btn--breadcrumb is-active'}
        >
          <i className="material-icons">home</i>
          Assessments
        </button>
        {
          _.map(props.path, folder => (
            <Breadcrumb
              key={`folder_${folder.id}`}
              {...folder}
              current={props.currentBankId === folder.id}
              updatePath={props.updatePath}
            />
            )
          )
        }
      </div>

      <div className="author--c-header-bottom__right">
        <button
          className="author--c-btn c-btn--sm author--c-btn--maroon author--c-btn--new u-ml-md"
          onClick={() => appHistory.push(`banks/${props.currentBankId}/new_assessment`)}
        >
          New
        </button>
      </div>
    </div>
  );
}

navigationBarContent.propTypes = {
  path              : React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
  currentBankId     : React.PropTypes.string,
  updatePath        : React.PropTypes.func.isRequired,
};