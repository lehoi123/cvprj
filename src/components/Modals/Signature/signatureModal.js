// chu ky ko co choose size
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../../styles/modals/signatures/styles.signatureModal.css';
import HeaderSignatureModal from './headerSignatureModal';
import UploadBodyModal from '../Body/uploadBodyModal';
import {
  startSignatureModal,
  initialCropperSignature,
  showUploadSignature,
  showCropSignature,
  inputUrlOnChange,
  switchToCrop,
  handleImageChange,
  handleCropOnImage,
  handleCropChange
} from '../../../modules/modals/signatureModal.module';
import CropBodyModal from '../Body/cropBodyModal';
import Constant from '../../../config/constant';

class SignatureModal extends Component {
  componentDidMount() {
    const { startSignatureModal } = this.props;
    startSignatureModal(Constant.signatureModal.storageKey);
  }

  handleSwitchToCrop = () => {
    const { switchToCrop } = this.props;
    const isUploadedSignature = true;

    const {
      imageSignatureUrl,
      imageInputSignatureUrl,
      imageBrowserSignatureUrl
    } = this.props.signature;
    const imageObject = {
      imageSignatureUrl,
      imageInputSignatureUrl,
      imageBrowserSignatureUrl,
      isUploadedSignature
    };

    if (imageObject.imageSignatureUrl) {
      switchToCrop(Constant.signatureModal.storageKey, imageObject);
    }
  };

  handleCropImage = () => {
    const { imageSignatureUrl, cropSignature } = this.props.signature;
    const { handleCropOnImage, onCloseModal } = this.props;

    handleCropOnImage(
      Constant.signatureModal.storageKey,
      imageSignatureUrl,
      cropSignature
    );
    onCloseModal();
  };

  /**
  |--------------------------------------------------
  | RENDER BODY ON MODAL
  |--------------------------------------------------
  */
  _renderBody() {
    const {
      isHighlightUploadSignature,
      imageSignatureUrl,
      cropSignature,
      inputSignatureHeight,
      imageInputSignatureUrl,
      imageBrowserSignatureUrl
    } = this.props.signature;

    const {
      inputUrlOnChange,
      handleImageChange,
      initialCropperSignature,
      handleCropChange,
      onCloseModal
    } = this.props;

    if (isHighlightUploadSignature) {
      return (
        <UploadBodyModal
          isHighlightLeft={true}
          leftClick={onCloseModal}
          isHighlightRight={false}
          rightClick={this.handleSwitchToCrop}
          inputChange={inputUrlOnChange}
          inputUrl={imageInputSignatureUrl}
          inputHeight={inputSignatureHeight}
          handleImageChange={handleImageChange}
          browserUrl={imageBrowserSignatureUrl}
        />
      );
    } else {
      return (
        <CropBodyModal
          isHighlightLeft={false}
          leftClick={onCloseModal}
          isHighlightRight={true}
          rightClick={this.handleCropImage}
          handleCropChange={handleCropChange}
          imageUrl={imageSignatureUrl}
          localStorageKey={Constant.signatureModal.storageKey}
          crop={cropSignature}
          initialCropper={initialCropperSignature}
          imageStyle={{ filter: 'grayscale(100%)' }}
        />
      );
    }
  }

  /**
  |--------------------------------------------------
  | RENDER MAIN BODY ON MODAL
  |--------------------------------------------------
  */
  render() {
    return (
      <div className="SignatureModal">
        <HeaderSignatureModal {...this.props} />

        {this._renderBody()}
      </div>
    );
  }
}

/**
|--------------------------------------------------
| CONFIGURE TO CONNECT TO REDUX STORE
|--------------------------------------------------
*/
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      startSignatureModal,
      showUploadSignature,
      showCropSignature,
      inputUrlOnChange,
      switchToCrop,
      handleImageChange,
      handleCropOnImage,
      initialCropperSignature,
      handleCropChange
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  signature: state.get('signature')
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatureModal);
