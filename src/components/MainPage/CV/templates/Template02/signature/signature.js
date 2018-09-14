import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import BaseTemplate, {
  mapStateToProps,
  mapDispatchToProps
} from '../../Base/template.base';
import UploadImg from '../../../../../../assets/assets/images/HoverItem/upload.svg';

/**
 * Main of this compoent
 */
class Signature extends BaseTemplate {
  componentDidMount() {
    super.componentDidMount();
  }

  render() {
    const { datas, onUpload } = this.props;

    const display = datas.get('display');

    if (!display) {
      return null;
    }

    const classes = classNames({
      part: true,
      signature: true
    });

    return (
      <div className={classes} ref={ref => (this.refPart = ref)}>
        <div className="signatureBox" onMouseDown={onUpload}>
          <i
            className="cv-icon cv-close btnDeleteSignature"
            onClick={this.onDeletePart}
          />
          <img src={UploadImg} className="signatureUploadIcon" alt="" />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signature);
