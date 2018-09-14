import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Templates from '../../../components/MainPage/CV/templates';
import '../../../styles/mainPage/cv/styles.cv.css';
import '../../../styles/mainPage/cv/defaultTemplate/styles.defaultTemplate.css';
// import _ from 'lodash';

// import { fetchCVFromStorage } from '../../../modules/mainPage/cv.module';
// import Constant from '../../../config/constant';
// import CVHelper from '../../../helper/cv.helper';

class CoverLetter extends PureComponent {
  componentDidMount() {}

  /**
   * Render page of CV
   */
  renderPageCoverLetter = () => {
    // const {
    //   template,
    //   pages
    // } = this.props.coverLetter.toJSON().coverLetterDatas;
    return (
      <div className="cvContent">
        <div className="pageIndex">
          <p>Page 1/1</p>
        </div>
      </div>
    );
  };

  /**
   * Render part of page
   */
  renderPartCoverLetter = (template, parts, pageNum) => {
    return null;
  };

  render() {
    return <div className="cvContainer">{this.renderPageCoverLetter()}</div>;
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const mapStateToProps = state => ({
  coverLetter: state.get('coverLetter')
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoverLetter);
