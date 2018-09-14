import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../styles/modals/buttons/styles.buttonModal.css';

class ButtonModal extends Component {
  constructor(props) {
    super(props);
  }

  _labelClass() {
    let defaultClass = 'ButtonModal-text';
    const { isHighlight } = this.props;

    if (isHighlight) {
      return defaultClass + ' ButtonModal-text-highlight';
    }

    return defaultClass;
  }

  render() {
    const { label, iconClass, handleOnClick, style } = this.props;
    return (
      <div className="ButtonModal" style={style} onClick={handleOnClick}>
        <i className={iconClass} />
        <span className={this._labelClass()}>{label}</span>
      </div>
    );
  }
}

export default ButtonModal;

ButtonModal.propTypes = {
  label: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  isHighlight: PropTypes.bool,
  style: PropTypes.object
  //handleOnClick: PropTypes.func.isRequred
};

ButtonModal.defaultProps = {
  isHighlight: false,
  style: {}
};
