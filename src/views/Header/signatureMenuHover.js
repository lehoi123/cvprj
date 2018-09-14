import React, { Component } from 'react';
import '../../styles/header/headerMenuHover.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UploadImg from '../../assets/assets/images/HoverItem/upload.svg';
import CropImg from '../../assets/assets/images/HoverItem/crop.svg';
import CropGrayImg from '../../assets/assets/images/HoverItem/HoverDisable/cropGray.svg';
import HideImg from '../../assets/assets/images/HoverItem/hide.svg';
import HideGrayImg from '../../assets/assets/images/HoverItem/HoverDisable/hideGrayImg.svg';
import ShowImg from '../../assets/assets/images/HoverItem/show.svg';
import ShowPhotoGrayImg from '../../assets/assets/images/HoverItem/HoverDisable/showPhotoGray.svg';

import Constant from '../../config/constant';
import { hideShowSignature } from '../../modules/modals/signatureModal.module';

class SignatureMenuHover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundDeleteColor: Constant.color.white,
      backgroundHideColor: Constant.color.white,
      backgroundShowColor: Constant.color.white
    };
  }

  hoverDeleteBackground() {
    const { isHaveSignature } = this.props.modal.toJS();
    if (isHaveSignature) {
      this.setState({
        backgroundDeleteColor: Constant.color.theme
      });
    } else {
      this.setState({
        backgroundDeleteColor: Constant.color.white
      });
    }
  }
  hoverHideBackground() {
    const { isHaveSignature } = this.props.modal.toJS();
    if (isHaveSignature) {
      this.setState({
        backgroundHideColor: Constant.color.theme
      });
    } else {
      this.setState({
        backgroundHideColor: Constant.color.white
      });
    }
  }
  hoverShowBackground() {
    const { isHaveSignature } = this.props.modal.toJS();
    if (isHaveSignature) {
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
    const { isHaveSignature } = this.props.modal.toJS();
    return (
      <div className="hoverContainer">
        {/* UPLOAD PHOTO */}
        <div
          className="uploadPhotoHover"
          onClick={() => this.props.showUploadModal()}
        >
          <img src={UploadImg} alt="fireSpot" className="hoverIcon" />
          <p>Upload Signature</p>
        </div>

        {/* CROP PHOTO */}
        <div
          className="cropPhotoHover"
          onMouseEnter={() => this.hoverDeleteBackground()}
          style={{ backgroundColor: this.state.backgroundColor }}
          onClick={() => this.props.showCropModal()}
        >
          {isHaveSignature ? (
            <img src={CropImg} alt="fireSpot" className="hoverIcon" />
          ) : (
            <img src={CropGrayImg} alt="fireSpot" className="hoverIcon" />
          )}

          <p
            style={{
              color: isHaveSignature
                ? Constant.color.shadow
                : Constant.color.gray
            }}
          >
            Crop Signature
          </p>
        </div>

        {/* HIDE PHOTO */}
        <div
          className="hidePhotoHover"
          onMouseEnter={() => this.hoverHideBackground()}
          style={{ backgroundColor: this.state.backgroundColor }}
          onClick={() => this.props.hideShowSignature()}
        >
          {isHaveSignature ? (
            <img src={HideImg} alt="fireSpot" className="hideHoverIcon" />
          ) : (
            <img src={HideGrayImg} alt="fireSpot" className="hideHoverIcon" />
          )}
          <p
            style={{
              color: isHaveSignature
                ? Constant.color.shadow
                : Constant.color.gray
            }}
          >
            Hide Signature
          </p>
        </div>

        {/* SHOW PHOTO */}
        <div
          className="showPhotoHover"
          onMouseEnter={() => this.hoverShowBackground()}
          style={{ backgroundColor: this.state.backgroundColor }}
        >
          {isHaveSignature ? (
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
              color: isHaveSignature
                ? Constant.color.shadow
                : Constant.color.gray
            }}
          >
            {' '}
            Show Signature
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.get('signature')
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      hideShowSignature
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatureMenuHover);
