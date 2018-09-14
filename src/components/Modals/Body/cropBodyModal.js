import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FooterModal from '../../../views/Modals/Footers/footerModal';
import CropperPicture from '../../../views/Modals/Croppers/cropperPicture';
import '../../../styles/modals/Body/styles.cropBodyModal.css';

class CropBodyModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      imageUrl,
      handleCropChange,
      localStorageKey,
      initialCropper,
      leftClick,
      isHighlightLeft,
      isHighlightRight,
      rightClick,
      crop,
      imageStyle
    } = this.props;

    return (
      <div className="CropBodyModal-body">
        <div className="CropBodyModal-body-top">
          <div className="CropBodyModal-crop-form">
            <CropperPicture
              imageUrl={imageUrl}
              handleOnChange={handleCropChange}
              localStorageKey={localStorageKey}
              initialAction={initialCropper}
              imageStyle={imageStyle}
              crop={crop}
            />
          </div>
        </div>

        <FooterModal
          leftClassIcon="ButtonModal-no-margin cv-icon-modal icon-cancel"
          rightClassIcon="ButtonModal-no-margin cv-icon-modal icon-crop"
          rightLabel="Crop"
          isHighlightLeft={isHighlightLeft}
          handleOnClickLeft={leftClick}
          isHighlightRight={isHighlightRight}
          handleOnClickRight={rightClick}
        />
      </div>
    );
  }
}

export default CropBodyModal;

CropBodyModal.propTypes = {
  isHighlightLeft: PropTypes.bool.isRequired,
  leftClick: PropTypes.func.isRequired,
  isHighlightRight: PropTypes.bool.isRequired,
  rightClick: PropTypes.func.isRequired,
  handleCropChange: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  localStorageKey: PropTypes.string.isRequired,
  crop: PropTypes.object.isRequired,
  initialCropper: PropTypes.func.isRequired,
  imageStyle: PropTypes.object
};

CropBodyModal.defaultProps = {
  imageStyle: {}
};
