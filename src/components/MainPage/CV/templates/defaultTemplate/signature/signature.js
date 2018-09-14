import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import BaseTemplate, {
  mapStateToProps,
  mapDispatchToProps
} from '../../Base/template.base';
import UploadImg from '../../../../../../assets/assets/images/HoverItem/upload.svg';

import {
  faUpload,
  faEye,
  faEyeSlash,
  faCrop
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Main of this component
 */
class Signature extends BaseTemplate {
  componentDidMount() {
    super.componentDidMount();
  }

  renderOptions() {
    const { onUploadSignature, onCropSignature } = this.props;
    const { isShowSignature } = this.props.signatureModal.toJS();
    return (
      <div className="optionOverlay">
        <ul>
          <li className="btn btnUpload" onMouseDown={onUploadSignature}>
            <FontAwesomeIcon icon={faUpload} />
          </li>
          <li
            className="btn btnShowHide"
            onClick={() => this.props.hideShowSignature()}
          >
            <FontAwesomeIcon icon={isShowSignature ? faEyeSlash : faEye} />
          </li>
          <li className="btn btnCrop" onMouseDown={onCropSignature}>
            <FontAwesomeIcon icon={faCrop} />
          </li>
        </ul>
      </div>
    );
  }

  render() {
    const display = this.props.datas.get('display');
    const { onUploadSignature } = this.props;
    const { isShowSignature } = this.props.signatureModal.toJS();
    if (!display) {
      return null;
    }

    const classes = classNames({
      part: true,
      signature: true
    });

    const grayscale = {
      filter: 'grayscale(100%)'
    };

    const signatureBoxStyle = {};
    if (!isShowSignature) {
      signatureBoxStyle.display = 'block';
    } else {
      signatureBoxStyle.display = 'none';
    }

    return (
      <div className={classes} ref={ref => (this.refPart = ref)}>
        <div className="signatureBox">
          <div className="signatureBody" style={signatureBoxStyle}>
            <div className="signatureOverlay" onMouseDown={onUploadSignature}>
              <img src={UploadImg} className="signatureUploadIcon" alt="" />
            </div>
            <canvas id="signatureCanvas" className="image" style={grayscale} />
          </div>

          {this.renderOptions.call(this)}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signature);
