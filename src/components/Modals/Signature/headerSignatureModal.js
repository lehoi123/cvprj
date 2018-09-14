import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonModal from '../../../views/Modals/Buttons/buttonModal';

class HeaderSignatureModal extends Component {
  constructor(props) {
    super(props);
  }

  /*
    Render action crop and choose-size when uploaded.
  */
  _renderActionAfterUpload() {
    const {
      isUploadedSignature,
      isHighlightUploadSignature
    } = this.props.signature;
    const { showCropSignature } = this.props;

    if (isUploadedSignature) {
      return (
        <div className="SignatureModal-after-upload">
          <ButtonModal
            style={{ borderLeft: 'solid 1px #ddd' }}
            iconClass="cv-icon-modal icon-crop SignatureModal-icon-no-margin"
            label="Crop photo"
            isHighlight={!isHighlightUploadSignature}
            handleOnClick={showCropSignature}
          />
        </div>
      );
    }
  }

  render() {
    const { isHighlightUploadSignature } = this.props.signature;
    const { showUploadSignature } = this.props;

    return (
      <div className="SignatureModal-header">
        <div className="SignatureModal-before-upload">
          <ButtonModal
            iconClass="ButtonModal-no-margin cv-icon-modal icon-upload"
            label="Upload"
            isHighlight={isHighlightUploadSignature}
            handleOnClick={showUploadSignature}
          />
        </div>
        {this._renderActionAfterUpload()}
      </div>
    );
  }
}

export default HeaderSignatureModal;

HeaderSignatureModal.propTypes = {
  isUploadedSignature: PropTypes.bool,
  isHighlightUploadSignature: PropTypes.bool,
  showUploadSignature: PropTypes.func.isRequired,
  showCropSignature: PropTypes.func.isRequired
};

HeaderSignatureModal.defaultProps = {
  isUploadedSignature: false
};
