import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonModal from '../../../views/Modals/Buttons/buttonModal';
import '../../../styles/modals/photos/styles.footerPhotoModal.css';

class FooterModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isHighlightLeft,
      isHighlightRight,
      handleOnClickLeft,
      handleOnClickRight,
      leftClassIcon,
      rightClassIcon,
      leftLabel,
      rightLabel
    } = this.props;

    return (
      <div className="PhotoModal-footer">
        <ButtonModal
          iconClass={leftClassIcon}
          label={leftLabel}
          isHighlight={isHighlightLeft}
          handleOnClick={handleOnClickLeft}
        />
        <div className="ButtonModal-straight-stroke">
          <div style={{ width: '1px', height: '10px', alignSelf: 'center' }} />
        </div>
        <ButtonModal
          iconClass={rightClassIcon}
          label={rightLabel}
          isHighlight={isHighlightRight}
          handleOnClick={handleOnClickRight}
        />
      </div>
    );
  }
}

export default FooterModal;

FooterModal.propTypes = {
  isHighlightLeft: PropTypes.bool,
  isHighlightRight: PropTypes.bool,
  handleOnClickLeft: PropTypes.func.isRequired,
  handleOnClickRight: PropTypes.func.isRequired,
  leftClassIcon: PropTypes.string,
  rightClassIcon: PropTypes.string,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string
};

FooterModal.defaultProps = {
  isHighlight: false,
  isHighlightRight: false,
  leftClassIcon: 'ButtonModal-no-margin cv-icon-modal icon-cancel',
  rightClassIcon: 'ButtonModal-no-margin cv-icon-modal icon-upload',
  leftLabel: 'Cancel',
  rightLabel: 'Upload'
};
