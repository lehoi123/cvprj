import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PreviewPicture from '../Preview/previewPicture';
import FooterModal from '../../../views/Modals/Footers/footerModal';
import '../../../styles/modals/Body/styles.uploadBodyModal.css';

class UploadBodyModal extends Component {
  constructor(props) {
    super(props);
  }

  _renderInputPreview = () => {
    const { inputUrl } = this.props;

    if (inputUrl) {
      return <PreviewPicture imageUrl={inputUrl} />;
    }
  };

  _renderBrowserPreview = () => {
    const { browserUrl } = this.props;

    if (browserUrl) {
      return <PreviewPicture imageUrl={browserUrl} />;
    }
  };

  render() {
    const {
      inputChange,
      inputUrl,
      inputHeight,
      isHighlightLeft,
      handleImageChange,
      leftClick,
      isHighlightRight,
      rightClick
    } = this.props;

    return (
      <div className="UploadBodyModal-body">
        <div className="UploadBodyModal-body-top">
          <div className="UploadBodyModal-upload-form">
            <div className="UploadBodyModal-upload-form-url">
              <label className="UploadBodyModal-upload-form-label">
                Enter Url
              </label>
              <input
                className="UploadBodyModal-upload-form-url-input"
                onChange={inputChange}
                value={inputUrl}
                style={{ height: inputHeight }}
              />

              {this._renderInputPreview()}
            </div>

            <div
              className="UploadBodyModal-upload-form-choose-picture"
              onClick={e => this.choosePicture.click()}
            >
              <label className="UploadBodyModal-upload-form-label">
                Choose picture
              </label>
              <i className="cv-icon cv-photo-plus" />
              <input
                className="UploadBodyModal-upload-form-choose-picture-input"
                type="file"
                accept="image/*"
                ref={ref => (this.choosePicture = ref)}
                onChange={handleImageChange}
              />

              {this._renderBrowserPreview()}
            </div>
          </div>
        </div>

        <FooterModal
          isHighlightLeft={isHighlightLeft}
          handleOnClickLeft={leftClick}
          isHighlightRight={isHighlightRight}
          handleOnClickRight={rightClick}
        />
      </div>
    );
  }
}

export default UploadBodyModal;

UploadBodyModal.propTypes = {
  isHighlightLeft: PropTypes.bool.isRequired,
  leftClick: PropTypes.func.isRequired,
  isHighlightRight: PropTypes.bool.isRequired,
  rightClick: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  inputUrl: PropTypes.string,
  inputHeight: PropTypes.string.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  browserUrl: PropTypes.string
};
