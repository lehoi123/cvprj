import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import '../../styles/body/styles.body.css';
import CVHelper from '../../helper/cv.helper';
import MainPage from '../MainPage';
import Modal from '../../views/Modals/modal';
import AddPartModal from '../MainPage/CV/addPartModal';
import { setBodyScale } from '../../modules/body.module';
import PhotoModal from '../../components/Modals/Photo/photoModal';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HistoryBody from '../../views/MainPage/Histories/Histories';
import {
  fetchDefaultCV,
  fetchCVFromStorage,
  addPartToCV
} from '../../modules/mainPage/cv.module';
import { showToast } from '../../modules/body.module';
import SignatureModal from '../../components/Modals/Signature/signatureModal';

const MAX_SCALE = 1;
const MIN_SCALE = 0.1;
const CONTENT_WIDTH = 890;

class Body extends PureComponent {
  constructor() {
    super();

    this.state = {
      bodyHeight: null
    };
  }

  componentDidMount() {
    const { fetchDefaultCV, fetchCVFromStorage, showToast } = this.props;

    this.bodyAutoScale();
    window.addEventListener('resize', this.bodyAutoScale);

    // get from local storage if exist
    if (CVHelper.existCVInStorage()) {
      fetchCVFromStorage();
    } else {
      fetchDefaultCV();

      setTimeout(() => {
        showToast('CV saved!', 3000);
      }, 3000);
    }
    // this.setState({
    //   bodyHeight: this.bodyElement.clientHeight
    // });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.bodyAutoScale);
  }

  bodyAutoScale = () => {
    const alignLeft = this.props.body.get('alignLeft');
    const calWidth = alignLeft ? 380 : 0;
    let scale = ((window.innerWidth - calWidth) / CONTENT_WIDTH).toFixed(1);
    if (scale >= MAX_SCALE) {
      scale = MAX_SCALE;
    } else if (scale <= MIN_SCALE) {
      scale = MIN_SCALE;
    }
    if (this.props.body.bodyScale !== scale) {
      this.props.setBodyScale(scale);
    }
  };

  openAddPartModal({ pageNum, partNum, position }) {
    this.partInfo = { pageNum, partNum, position };
    this.refAddPartModal.open();
  }

  addPartOnChange(addData) {
    this.refAddPartModal.close();
    this.partInfo['addData'] = addData;
    CVHelper.newThread(() => {
      this.props.addPartToCV(this.partInfo);
    });
  }

  renderMainBody = () => {
    const { cv, coverLetter } = this.props;

    return (
      <div>
        {/* Cover Letter */}
        {coverLetter.coverLetterDatas !== null ? (
          <MainPage.CoverLetter />
        ) : (
          <MainPage.AddCoverLetter />
        )}

        {/* CV */}
        {cv.cvDatas !== null ? (
          <MainPage.CV
            openAddPartModal={this.openAddPartModal.bind(this)}
            openAvatarModal={() => this.refAvatarModal.open()}
            openSignatureModal={() => this.signatureModalRef.open()}
          />
        ) : (
          <MainPage.AddCV />
        )}

        {/* AddAttachment */}
        <MainPage.AddAttachment />
      </div>
    );
  };

  render() {
    const { body } = this.props;
    const { bodyHeight } = this.state;
    const bodyScale = body.get('bodyScale');
    const alignLeft = body.get('alignLeft');

    const classes = classNames({
      'App-body': true,
      alignLeft: alignLeft === true
    });

    const bodyStyles = {};
    if (bodyHeight !== null) {
      bodyStyles.height = bodyHeight * bodyScale;
    }

    return (
      <div
        style={bodyStyles}
        ref={bodyElement => (this.bodyElement = bodyElement)}
        className={classes}
      >
        <Router>
          <div className="parentBody">
            <div
              style={{
                transform: `scale(${bodyScale})`,
                WebkitTransform: `scale(${bodyScale})`,
                MozTransform: `scale(${bodyScale})`
              }}
              className="bodyScale"
            >
              <Route exact={true} path="/" render={this.renderMainBody} />
              <Route path="/histories" render={() => <HistoryBody />} />
            </div>
          </div>
        </Router>

        {/* Add part modal */}
        <Modal
          ref={ref => (this.refAddPartModal = ref)}
          style={{ maxWidth: 700 }}
        >
          <AddPartModal onChange={this.addPartOnChange.bind(this)} />
        </Modal>

        <Modal
          autoWidth
          ref={ref => (this.refAvatarModal = ref)}
          showCloseBtn={false}
        >
          <PhotoModal onCloseModal={() => this.refAvatarModal.close()} />
        </Modal>

        <Modal
          showCloseBtn={false}
          autoWidth
          ref={ref => (this.signatureModalRef = ref)}
        >
          <SignatureModal onCloseModal={() => this.signatureModalRef.close()} />
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setBodyScale,
      // cv datas
      fetchDefaultCV,
      fetchCVFromStorage,
      addPartToCV,

      showToast
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  body: state.get('body'),
  cv: state.get('cv'),
  coverLetter: state.get('coverLetter')
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
