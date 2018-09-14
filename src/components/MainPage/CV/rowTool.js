import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faChevronUp,
  faChevronDown,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

class RowTool extends PureComponent {
  render() {
    const {
      onPlusTop,
      plusTopTitle,
      plusTopDisable,
      onPlusBottom,
      plusBottomTitle,
      plusBottomDisable,
      onUp,
      upTitle,
      upDisable,
      onDown,
      downTitle,
      downDisable,
      onDelete,
      deleteTitle,
      deleteDisable
    } = this.props;

    const plusTopClassNames = classNames({
      btn: true,
      btnTop: true,
      parentTooltip: true,
      disable: plusTopDisable
    });

    const plusBottomClassNames = classNames({
      btn: true,
      btnBottom: true,
      parentTooltip: true,
      disable: plusBottomDisable
    });

    const upClassNames = classNames({
      btn: true,
      btnMidle: true,
      parentTooltip: true,
      disable: upDisable
    });

    const downClassNames = classNames({
      btn: true,
      btnMidle: true,
      parentTooltip: true,
      disable: downDisable
    });

    const deleteClassNames = classNames({
      btnTrash: true,
      parentTooltip: true,
      disable: deleteDisable
    });

    return (
      <div>
        <div className="rowTool left">
          <div className="topTool">
            <a
              className={plusTopClassNames}
              onMouseDown={event => {
                event.preventDefault();
                if (plusTopDisable) {
                  return;
                }
                if (typeof onPlusTop === 'function') {
                  onPlusTop(event);
                }
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              <div className="tooltip right">
                <p>{plusTopTitle}</p>
              </div>
            </a>
          </div>
          <div className="middleTool">
            <a
              className={upClassNames}
              onMouseDown={event => {
                event.preventDefault();
                if (upDisable) {
                  return;
                }
                if (typeof onUp === 'function') {
                  onUp(event);
                }
              }}
            >
              <FontAwesomeIcon icon={faChevronUp} />
              <div className="tooltip right">
                <p>{upTitle}</p>
              </div>
            </a>
            <a
              className={downClassNames}
              onMouseDown={event => {
                event.preventDefault();
                if (downDisable) {
                  return;
                }
                if (typeof onDown === 'function') {
                  onDown(event);
                }
              }}
            >
              <FontAwesomeIcon icon={faChevronDown} />
              <div className="tooltip right">
                <p>{downTitle}</p>
              </div>
            </a>
          </div>
          <div className="bottomTool">
            <a
              className={plusBottomClassNames}
              onMouseDown={event => {
                event.preventDefault();
                if (plusBottomDisable) {
                  return;
                }
                if (typeof onPlusBottom === 'function') {
                  onPlusBottom(event);
                }
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              <div className="tooltip right">
                <p>{plusBottomTitle}</p>
              </div>
            </a>
          </div>
        </div>

        <div className="rowTool right">
          <div className="topTool" />
          <div className="middleTool">
            <a
              className={deleteClassNames}
              onMouseDown={event => {
                event.preventDefault();
                if (deleteDisable) {
                  return;
                }
                if (typeof onDelete === 'function') {
                  onDelete(event);
                }
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
              <div className="tooltip left">
                <p>{deleteTitle}</p>
              </div>
            </a>
          </div>
          <div className="bottomTool" />
        </div>
      </div>
    );
  }
}

RowTool.propTypes = {
  onPlusTop: PropTypes.func,
  plusTopTitle: PropTypes.string,
  onPlusBottom: PropTypes.func,
  plusBottomTitle: PropTypes.string,
  onUp: PropTypes.func,
  upTitle: PropTypes.string,
  onDown: PropTypes.func,
  downTitle: PropTypes.string,
  onDelete: PropTypes.func,
  deleteTitle: PropTypes.string,
  plusTopDisable: PropTypes.bool,
  plusBottomDisable: PropTypes.bool,
  upDisable: PropTypes.bool,
  downDisable: PropTypes.bool,
  deleteDisable: PropTypes.bool
};

RowTool.defaultProps = {
  plusTopTitle: 'Default plus top title',
  plusBottomTitle: 'Default plus bottom title',
  upTitle: 'Default up title',
  downTitle: 'Default down title',
  deleteTitle: 'Default delete title',
  plusTopDisable: false,
  plusBottomDisable: false,
  upDisable: false,
  downDisable: false,
  deleteDisable: false
};

export default RowTool;
