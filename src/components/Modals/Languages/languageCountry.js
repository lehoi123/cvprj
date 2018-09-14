import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import '../../../styles/modals/languages/styles.languageCountry.css';

class LanguageCountry extends PureComponent {
  _labelClass() {
    let defaultClass = 'LanguageCountry-text';
    const { isHighlight } = this.props;

    if (isHighlight) {
      return defaultClass + ' LanguageCountry-text-highlight';
    }

    return defaultClass;
  }

  _iconClass() {
    const { iconClass, isHighlight } = this.props;

    if (isHighlight) {
      return iconClass + ' LanguageCountry-icon-highlight';
    }
    return iconClass;
  }

  onClick = () => {
    const { handleOnClick, countryId, continentId } = this.props;
    handleOnClick(countryId, continentId);
  };

  render() {
    const { label, style } = this.props;
    return (
      <div className="LanguageCountry" style={style} onClick={this.onClick}>
        <i className={this._iconClass()} />
        <span className={this._labelClass()}>{label}</span>
      </div>
    );
  }
}

export default LanguageCountry;

LanguageCountry.propTypes = {
  label: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  isHighlight: PropTypes.bool,
  countryId: PropTypes.number.isRequired,
  continentId: PropTypes.number.isRequired,
  style: PropTypes.object,
  handleOnClick: PropTypes.func.isRequired
};

LanguageCountry.defaultProps = {
  isHighlight: false,
  style: {}
};
