import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../../../styles/mainPage/cv/textEditor/styles.textEditor.css';

/**
 * Button of tool bar
 */
export const Button = props => {
  const { children, onMouseDown } = props;
  return (
    <div onMouseDown={onMouseDown} className="buttonEditor">
      {children}
    </div>
  );
};

/**
 * Icon of tool bar
 */
export const Icon = props => {
  return <FontAwesomeIcon icon={props.icon} />;
};

Icon.propTypes = {
  icon: PropTypes.object,
  onMouseDown: PropTypes.func
};

/**
 * ToolBar for text editor
 */
export const ToolBar = props => {
  const { children, show } = props;

  const classes = classNames({
    toolbarEditor: true,
    show: show
  });

  return <div className={classes}>{children}</div>;
};

ToolBar.defaultProps = {
  show: false
};

ToolBar.propTypes = {
  show: PropTypes.bool
};
