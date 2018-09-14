import React, { Component } from 'react';

import { connect } from 'react-redux';
import '../../styles/header/headerMenuHover.css';

import UploadImg from '../../assets/assets/images/HoverItem/upload.svg';
import CropImg from '../../assets/assets/images/HoverItem/crop.svg';
import CropGrayImg from '../../assets/assets/images/HoverItem/HoverDisable/cropGray.svg';
import ChooseSizeImg from '../../assets/assets/images/HoverItem/chooSize.svg';
import HideImg from '../../assets/assets/images/HoverItem/hide.svg';
import ShowImg from '../../assets/assets/images/HoverItem/show.svg';
import ShowPhotoGrayImg from '../../assets/assets/images/HoverItem/HoverDisable/showPhotoGray.svg';
import Constant from '../../config/constant';

import {
  hideShowAvatar,
  hideTheAvatar,
  showTheAvatar
} from '../../modules/modals/photoModal.module';
import { bindActionCreators } from 'redux';

class HeaderMenuHover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundCropColor: Constant.color.white,
      backgroundShowColor: Constant.color.white
    };
  }

  hoverCropBackground() {
    const { isUploaded, isHavePhoto } = this.props.modal.toJS();
    if (isUploaded || isHavePhoto) {
      this.setState({
        backgroundCropColor: Constant.color.theme
      });
    } else {
      this.setState({
        backgroundCropColor: Constant.color.white
      });
    }
  }
  hoverShowBackground() {
    const { isUploaded, isHavePhoto } = this.props.modal.toJS();
    if (isUploaded || isHavePhoto) {
      this.setState({
        backgroundShowColor: Constant.color.theme
      });
    } else {
      this.setState({
        backgroundShowColor: Constant.color.white
      });
    }
  }

  render() {
    const {
      isUploaded,
      isHavePhoto,
      isHideAvatar,
      isShowAvatar,
      avatarDisStatus
    } = this.props.modal.toJS();
    return (
      <div className="photoHoverContainer">
        {/* UPLOAD PHOTO */}
        <div
          className="uploadPhotoHover"
          onMouseDown={() => this.props.showUploadModal()}
        >
          <img src={UploadImg} alt="fireSpot" className="hoverIcon" />
          <p>Upload</p>
        </div>

        {/* CROP PHOTO */}
        <div
          className="cropPhotoHover"
          onMouseEnter={() => this.hoverCropBackground()}
          style={{ backgroundColor: this.state.backgroundColor }}
          onClick={() => this.props.showCropModal()}
        >
          {isUploaded || isHavePhoto ? (
            <img src={CropImg} alt="fireSpot" className="hoverIcon" />
          ) : (
            <img src={CropGrayImg} alt="fireSpot" className="hoverIcon" />
          )}

          <p
            style={{
              color:
                isUploaded || isHavePhoto
                  ? Constant.color.shadow
                  : Constant.color.gray
            }}
          >
            Crop Photo
          </p>
        </div>

        {/* CHOOSE SIZE */}
        <div
          className="choosePhotoSizeHover"
          onClick={() => this.props.showChooseSizeModal()}
        >
          <img src={ChooseSizeImg} alt="fireSpot" className="hoverIcon" />

          <p>Choose size</p>
        </div>

        {/* HIDE PHOTO */}
        <div
          className="hidePhotoHover"
          onClick={() => this.props.hideTheAvatar()}
        >
          <img src={HideImg} alt="fireSpot" className="hideHoverIcon" />
          <p
            style={{
              color:
                avatarDisStatus || isShowAvatar
                  ? Constant.color.shadow
                  : Constant.color.gray
            }}
          >
            Hide Photo
          </p>
        </div>

        {/* SHOW PHOTO */}
        <div
          className="showPhotoHover"
          style={{ backgroundColor: this.state.backgroundColor }}
          onMouseEnter={() => this.hoverShowBackground()}
          onClick={() => this.props.showTheAvatar()}
        >
          {isUploaded || isHavePhoto ? (
            <img src={ShowImg} alt="fireSpot" className="showHoverIcon" />
          ) : (
            <img
              src={ShowPhotoGrayImg}
              alt="fireSpot"
              className="showHoverIcon"
            />
          )}
          <p
            style={{
              color:
                !avatarDisStatus && avatarDisStatus !== undefined
                  ? Constant.color.shadow
                  : Constant.color.gray
            }}
          >
            {' '}
            Show Photo{' '}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.get('photo')
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      hideShowAvatar,
      hideTheAvatar,
      showTheAvatar
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderMenuHover);
