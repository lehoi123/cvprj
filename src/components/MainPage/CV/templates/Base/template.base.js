import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import {
  updateByIndexs,
  // rows
  addRowToPart,
  changePositionRowOfPart,
  deleteRowOfPart,

  // parts
  addPartToCV,
  changePositionPartOfCV,
  deletePartOfCV,
  // dimension
  updatePartCVDimension,
  separatePageHandle,
  showHideAvatar
} from '../../../../../modules/mainPage/cv.module';
import {
  showCropPhotoModal,
  showChooseSizePhotoModal,
  hideShowAvatar,
  initializeAvatarStatus
} from '../../../../../modules/modals/photoModal.module';

import { showToast } from '../../../../../modules/body.module';

import CVHelper from '../../../../../helper/cv.helper';
import { hideShowSignature } from '../../../../../modules/modals/signatureModal.module';

const HEADING = 'heading';
const LABEL = 'label';
const VALUE = 'value';

const newThread = callback => {
  if (typeof callback === 'function') {
    setTimeout(callback, 0);
  }
};

class BaseTemplate extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rowActive: false,
      rowPartActive: false,
      headingPartActive: false,
      ready: false
    };
  }

  setState(stateObject, callback) {
    if (this.disable) return;
    super.setState(stateObject, callback);
  }

  componentDidMount() {
    this.setState(
      {
        ready: true
      },
      () => {
        this.updatePartCVDimension();
        this.pageHandleAfterPartAdded();
      }
    );
  }

  componentDidUpdate() {
    if (this.updateDimensionAfterChanged) {
      this.updateDimensionAfterChanged = false;
      this.updatePartCVDimension();
      this.props.separatePageHandle();
    }
  }

  // page separate handle after part added
  pageHandleAfterPartAdded() {
    const partIdJustAdded = CVHelper.getTmpPartId();
    if (partIdJustAdded === this.props.part.get('id')) {
      CVHelper.removeTmpPartId();
      this.props.separatePageHandle();
    }
  }

  setRowUnActive = () => {
    this.setState({
      rowActive: false,
      headingPartActive: false,
      rowPartActive: false
    });
  };

  /**
   *************** ON FOCUS **************
   */
  headingOnFocus = () => {
    this.setState({
      headingPartActive: true
    });
  };

  labelOnFocus = ({ rowNum }) => {
    this.setState({
      rowPartActive: true
    });
  };

  valueOnFocus = ({ rowNum }) => {
    this.setState({
      rowPartActive: true
    });
  };

  /**
   *************** ON BLUR **************
   */
  headingOnBlur = () => {
    this.setRowUnActive();
  };

  labelOnBlur = () => {
    this.setRowUnActive();
  };

  valueOnBlur = () => {
    this.setRowUnActive();
  };

  getPartHeight = () => {
    return this.refPart ? this.refPart.clientHeight : 0;
  };

  /**
   *************** ON CHANGE **************
   */
  headingOnChange = ({ value, handlePage }) => {
    newThread(() => {
      const { ready } = this.state;
      const { pageNum, partNum } = this.props;
      if (ready) {
        this.props.updateByIndexs({
          pageNum,
          partNum,
          rowType: HEADING,
          value,
          handlePage
        });
      }
    });
  };

  labelOnChange = ({ value, rowNum, handlePage }) => {
    newThread(() => {
      const { ready } = this.state;
      const { pageNum, partNum } = this.props;
      if (ready) {
        this.props.updateByIndexs({
          pageNum,
          partNum,
          rowNum,
          rowType: LABEL,
          value,
          handlePage
        });
      }
    });
  };

  valueOnChange = ({ value, rowNum, handlePage }) => {
    newThread(() => {
      const { ready } = this.state;
      const { pageNum, partNum } = this.props;
      if (ready) {
        this.props.updateByIndexs({
          pageNum,
          partNum,
          rowNum,
          rowType: VALUE,
          value,
          handlePage
        });
      }
    });
  };

  onShowHideAvatar = () => {
    const { pageNum, partNum } = this.props;
    this.props.showHideAvatar({
      pageNum,
      partNum
    });
  };

  /**
   *************** EDITOR CONTROLS FOR ROWS **************
   */
  onPlusTopRow = ({ rowNum }) => {
    const { pageNum, partNum } = this.props;
    this.props.addRowToPart({
      pageNum,
      partNum,
      rowNum,
      position: 'above'
    });

    // enable update dimension after changed
    this.updateDimensionAfterChanged = true;
  };

  onPlusBottomRow = ({ rowNum }) => {
    const { pageNum, partNum } = this.props;
    this.props.addRowToPart({
      pageNum,
      partNum,
      rowNum,
      position: 'below'
    });

    // enable update dimension after changed
    this.updateDimensionAfterChanged = true;
  };

  onUpRow = ({ rowNum }) => {
    const { pageNum, partNum } = this.props;
    this.props.changePositionRowOfPart({
      pageNum,
      partNum,
      rowNum,
      position: 'above'
    });
  };

  onDownRow = ({ rowNum }) => {
    const { pageNum, partNum } = this.props;
    this.props.changePositionRowOfPart({
      pageNum,
      partNum,
      rowNum,
      position: 'below'
    });
  };

  onDeleteRow = ({ rowNum }) => {
    const { pageNum, partNum } = this.props;
    this.props.deleteRowOfPart({
      pageNum,
      partNum,
      rowNum
    });

    // enable update dimension after changed
    this.updateDimensionAfterChanged = true;
  };

  /**
   *************** EDITOR CONTROLS FOR PARTS **************
   */
  onPlusTopPart = () => {
    const { pageNum, partNum, openAddPartModal } = this.props;
    if (typeof openAddPartModal === 'function') {
      openAddPartModal({ pageNum, partNum, position: 'above' });
    }
  };

  onPlusBottomPart = () => {
    const { pageNum, partNum, openAddPartModal } = this.props;
    if (typeof openAddPartModal === 'function') {
      openAddPartModal({ pageNum, partNum, position: 'below' });
    }
  };

  onUpPart = () => {
    const { pageNum, partNum, partsLength } = this.props;
    this.props.changePositionPartOfCV({
      pageNum,
      partNum,
      position: 'above',
      partsLength
    });
  };

  onDownPart = () => {
    const { pageNum, partNum, partsLength } = this.props;
    this.props.changePositionPartOfCV({
      pageNum,
      partNum,
      position: 'below',
      partsLength
    });
  };

  onDeletePart = () => {
    const { pageNum, partNum } = this.props;
    this.props.deletePartOfCV({
      pageNum,
      partNum
    });
  };

  /**
   * Update dimension for part
   */
  updatePartCVDimension = () => {
    const { pageNum, partNum } = this.props;
    this.props.updatePartCVDimension({
      pageNum,
      partNum,
      partHeight: this.refPart ? this.refPart.clientHeight : 0
    });
  };

  render() {
    return <h1>TEST BASE TEMPLATE</h1>;
  }

  componentWillUnmount() {
    this.disable = true;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateByIndexs,

      // rows
      addRowToPart,
      changePositionRowOfPart,
      deleteRowOfPart,

      // parts
      addPartToCV,
      changePositionPartOfCV,
      deletePartOfCV,
      // dimension
      updatePartCVDimension,
      separatePageHandle,
      showHideAvatar,
      showCropPhotoModal,
      showChooseSizePhotoModal,

      showToast,
      hideShowAvatar,
      hideShowSignature,
      initializeAvatarStatus
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  cv: state.getIn(['cv', 'cvDatas']),
  modal: state.get('photo'),
  signatureModal: state.get('signature')
});

export { mapDispatchToProps, mapStateToProps, HEADING, LABEL, VALUE };

export default BaseTemplate;
