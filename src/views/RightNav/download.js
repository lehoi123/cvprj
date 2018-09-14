import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../../styles/rightNav/download.css';
import DownloadImg from '../../assets/assets/images/RightNav/Download/download.svg';
import { activateRightNavMod } from '../../modules/rightNav.module';

class Download extends Component {
  render() {
    return (
      <div className="downloadContainer">
        <p className="done">Done!</p>
        <p className="allowDownload">
          You can download your application document now
        </p>

        <div
          className="downloadWrapper"
          onClick={() => this.props.activateRightNavMod(true, 'Login')}
        >
          <img src={DownloadImg} alt="downloadImg" className="downloadImg" />
          <p className="fileName">Filename.pdf</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      activateRightNavMod
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Download);
