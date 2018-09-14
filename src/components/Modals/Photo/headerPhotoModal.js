import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonModal from '../../../views/Modals/Buttons/buttonModal';

class HeaderPhotoModal extends Component {
  constructor(props) {
    super(props);
  }

  /*
    Render action crop and choose-size when uploaded.
  */
  _renderActionAfterUpload() {
    const {
      isUploaded,
      isHighlightCrop,
      isHighlightChooseSize
    } = this.props.photo;

    const { showChooseSizePhotoModal, showCropPhotoModal } = this.props;

    if (isUploaded) {
      return (
        <div className="PhotoModal-after-upload">
          <ButtonModal
            style={{ float: 'left', borderRight: 'solid 1px #ddd' }}
            iconClass="cv-icon-modal icon-crop PhotoModal-icon-no-margin"
            label="Crop photo"
            isHighlight={isHighlightCrop}
            handleOnClick={showCropPhotoModal}
          />
          <ButtonModal
            style={{ float: 'left' }}
            iconClass="cv-icon-modal icon-choose-size PhotoModal-icon-no-margin"
            label="Choose size"
            isHighlight={isHighlightChooseSize}
            handleOnClick={showChooseSizePhotoModal}
          />
        </div>
      );
    }
  }

  render() {
    const { isHighlightUpload } = this.props.photo;
    const { showUploadPhotoModal } = this.props;

    return (
      <div className="PhotoModal-header">
        <div className="PhotoModal-before-upload">
          <ButtonModal
            style={{ borderRight: 'solid 1px #ddd' }}
            iconClass="ButtonModal-no-margin cv-icon-modal icon-upload"
            label="Upload"
            isHighlight={isHighlightUpload}
            handleOnClick={showUploadPhotoModal}
          />
        </div>
        {this._renderActionAfterUpload()}
      </div>
    );
  }
}

export default HeaderPhotoModal;

HeaderPhotoModal.propTypes = {
  isUploaded: PropTypes.bool,
  isHighlightCrop: PropTypes.bool,
  isHighlightChooseSize: PropTypes.bool,
  isHighlightUpload: PropTypes.bool
};

HeaderPhotoModal.defaultProps = {
  isUploaded: false,
  isHighlightCrop: false,
  isHighlightChooseSize: false
};
