import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import '../../../styles/modals/croppers/styles.cropperPicture.css';
import '../../../../node_modules/react-image-crop/dist/ReactCrop.css';
class CropperPicture extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { localStorageKey, initialAction } = this.props;
    initialAction(localStorageKey);
  }

  completeOnHandle = (crop, pixelCrop) => {};

  changeOnHandle = crop => {
    const { handleOnChange, localStorageKey } = this.props;
    handleOnChange(localStorageKey, crop);
  };

  render() {
    const { imageUrl, crop, imageStyle } = this.props;
    const style = Object.assign({}, defaultImageStyle, imageStyle);

    return (
      <ReactCrop
        style={cropStyle}
        imageStyle={style}
        src={imageUrl}
        crop={crop}
        keepSelection={true}
        onComplete={this.completeOnHandle}
        onChange={this.changeOnHandle}
      />
    );
  }
}

export default CropperPicture;

const cropStyle = {
  margin: 0,
  overflow: 'scroll'
};

const defaultImageStyle = {
  margin: 0,
  maxHeight: '66vh',
  background: 'url(loading.gif) 50% no - repeat'
};
CropperPicture.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  localStorageKey: PropTypes.string.isRequired,
  cropper: PropTypes.object,
  handleOnChange: PropTypes.func,
  handleOnComplete: PropTypes.func,
  initialAction: PropTypes.func,
  crop: PropTypes.object,
  imageStyle: PropTypes.object.isRequired
};
