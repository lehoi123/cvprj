import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../../styles/modals/photos/styles.photoModal.css';
import HeaderPhotoModal from './headerPhotoModal';
import UploadBodyModal from '../Body/uploadBodyModal';
import {
  startPhotoModal,
  initialCropperPicture,
  showUploadPhotoModal,
  showCropPhotoModal,
  showChooseSizePhotoModal,
  inputUrlOnChange,
  switchToCrop,
  handleImageChange,
  handleCropOnImage,
  handleCropChange,
  handleChooseAvatarSize,
  handleAcceptAvatarSize
} from '../../../modules/modals/photoModal.module';
import CropBodyModal from '../Body/cropBodyModal';
import ChooseSizeBody from './chooseSizeBody';
import Constant from '../../../config/constant';
import { changeAvatarSize } from '../../../modules/mainPage/cv.module';
const ALL_AVATAR_SIZES = {
  'photo-modal/SMALL_AVATAR': 'small',
  'photo-modal/NORMAL_AVATAR': 'normal',
  'photo-modal/LARGE_AVATAR': 'large'
};

class PhotoModal extends Component {
  componentDidMount() {
    const { startPhotoModal } = this.props;
    startPhotoModal(Constant.photoModal.storageKey);
  }

  handleOnAcceptedAvatar = () => {
    const {
      handleAcceptAvatarSize,
      changeAvatarSize,
      onCloseModal
    } = this.props;
    const { avatarSize, imageUrl, crop } = this.props.photo;
    const { storageKey, allAvatarSizes } = Constant.photoModal;

    const avatar = {
      avatarSize,
      imageUrl,
      crop
    };

    handleAcceptAvatarSize(storageKey, avatar);
    changeAvatarSize(allAvatarSizes[avatarSize].value);
    onCloseModal();
  };

  handleSwitchToCrop = () => {
    const { switchToCrop } = this.props;
    const isUploaded = true;

    const { imageUrl, imageInputUrl, imageBrowserUrl } = this.props.photo;
    const imageObject = {
      imageUrl,
      imageInputUrl,
      imageBrowserUrl,
      isUploaded
    };

    if (imageObject.imageUrl) {
      switchToCrop(Constant.photoModal.storageKey, imageObject);
    }
  };

  handleCropImage = () => {
    const { imageUrl, crop } = this.props.photo;
    const { handleCropOnImage, onCloseModal } = this.props;

    handleCropOnImage(Constant.photoModal.storageKey, imageUrl, crop);
    onCloseModal();
  };

  /**
  |--------------------------------------------------
  | RENDER BODY ON MODAL
  |--------------------------------------------------
  */
  _renderBody() {
    const {
      isHighlightUpload,
      isHighlightCrop,
      isHighlightChooseSize,
      imageUrl,
      crop,
      inputHeight,
      imageInputUrl,
      imageBrowserUrl,
      avatarSize
    } = this.props.photo;
    const {
      inputUrlOnChange,
      handleImageChange,
      initialCropperPicture,
      handleCropChange,
      handleChooseAvatarSize,
      onCloseModal
    } = this.props;

    if (isHighlightUpload) {
      return (
        <UploadBodyModal
          isHighlightLeft={isHighlightUpload}
          leftClick={onCloseModal}
          isHighlightRight={isHighlightCrop}
          rightClick={this.handleSwitchToCrop}
          inputChange={inputUrlOnChange}
          inputUrl={imageInputUrl}
          inputHeight={inputHeight}
          handleImageChange={handleImageChange}
          browserUrl={imageBrowserUrl}
        />
      );
    } else if (isHighlightCrop) {
      return (
        <CropBodyModal
          isHighlightLeft={isHighlightUpload}
          leftClick={onCloseModal}
          isHighlightRight={isHighlightCrop}
          rightClick={this.handleCropImage}
          handleCropChange={handleCropChange}
          imageUrl={imageUrl}
          localStorageKey={Constant.photoModal.storageKey}
          crop={crop}
          initialCropper={initialCropperPicture}
        />
      );
    } else if (isHighlightChooseSize) {
      return (
        <ChooseSizeBody
          leftClick={onCloseModal}
          rightClick={this.handleOnAcceptedAvatar}
          avatarSize={avatarSize}
          chooseSizeOnHandle={handleChooseAvatarSize}
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
      <div className="PhotoModal">
        <HeaderPhotoModal {...this.props} />

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
      startPhotoModal,
      showUploadPhotoModal,
      showCropPhotoModal,
      showChooseSizePhotoModal,
      inputUrlOnChange,
      switchToCrop,
      handleImageChange,
      handleCropOnImage,
      initialCropperPicture,
      handleCropChange,
      handleChooseAvatarSize,
      handleAcceptAvatarSize,
      changeAvatarSize
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  photo: state.get('photo')
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoModal);
