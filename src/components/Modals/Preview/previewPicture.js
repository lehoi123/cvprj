import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../styles/modals/preview/styles.previewPicture.css';
class PreviewPicture extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { imageUrl } = this.props;

    return (
      <div className="ModalPreview">
        <img className="ModalPreview-image" src={imageUrl} alt="" />
      </div>
    );
  }
}

export default PreviewPicture;

PreviewPicture.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  style: PropTypes.object
};
