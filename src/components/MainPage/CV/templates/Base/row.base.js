import { PureComponent } from 'react';

import CVHelper from '../../../../../helper/cv.helper';

class BaseRow extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rowActive: false,
      height: 0
    };
  }

  setState(stateObject, callback) {
    if (this.disable) return;
    super.setState(stateObject, callback);
  }

  /**
   * handle the first time when called this component
   */
  componentDidMount() {
    // this.reActiveRowHandle();
    this.reActiveRowWrapHandle();
    this.updateRowHeight();
  }

  /**
   * handle for each update
   */
  componentDidUpdate() {
    this.reActiveRowHandle();
  }

  /**
   * update height for row
   */
  updateRowHeight = () => {
    const { clientHeight } = this.refRow;
    this.setState({
      height: clientHeight
    });
  };

  /**
   * handle active for rows
   */
  reActiveRowHandle = () => {
    clearTimeout(this.activeTimer);
    this.activeTimer = setTimeout(() => {
      const rowIdActive = CVHelper.getTmpRowId();
      if (rowIdActive === this.props.data.get('id')) {
        CVHelper.removeTmpRowId();
        this.focus();
      }
    }, 30);
  };

  /**
   * handle active for rows just wrap
   */
  reActiveRowWrapHandle = () => {
    clearTimeout(this.activeWrapTimer);
    this.activeWrapTimer = setTimeout(() => {
      const rowIdActive = CVHelper.getTmpRowWrapId();
      if (rowIdActive === this.props.data.get('id')) {
        CVHelper.removeTmpRowWrapId();
        const rowPlace = CVHelper.getUpdatePlace();
        CVHelper.removeUpdatePlace();

        this.focus(rowPlace);
      }
    }, 30);
  };

  labelOnChange = value => {
    const { thisBase, rowNum, data } = this.props;
    const { height } = this.state;
    const { clientHeight } = this.refRow;

    // update height for row
    if (height !== clientHeight) {
      this.updateRowHeight();
      thisBase.updatePartCVDimension();

      // cached in 500ms - reActive handle
      CVHelper.setTmpRowWrapId(data.get('id'), 500);
      CVHelper.setUpdatePlace('label');

      // will edit later..., handle break page
      thisBase.labelOnChange({ value, rowNum, handlePage: true });
    } else {
      thisBase.labelOnChange({ value, rowNum });
    }
  };

  valueOnChange = value => {
    const { thisBase, rowNum, data } = this.props;
    const { height } = this.state;
    const { clientHeight } = this.refRow;

    // update height for row
    if (height !== clientHeight) {
      this.updateRowHeight();
      thisBase.updatePartCVDimension();

      // cached in 500ms - reActive handle
      CVHelper.setTmpRowWrapId(data.get('id'), 500);
      CVHelper.setUpdatePlace('value');

      // will edit later..., handle break page
      thisBase.valueOnChange({ value, rowNum, handlePage: true });
    } else {
      thisBase.valueOnChange({ value, rowNum });
    }
  };

  /**
   * set row active
   */
  setRowActive = () => {
    const { rowNum } = this.props;
    this.setState({
      rowActive: rowNum
    });
  };

  /**
   * un active for row
   */
  setRowUnActive = () => {
    this.setState({
      rowActive: false
    });
  };

  /**
   * call when input on label
   */
  onLabelFocus = () => {
    const { rowNum, thisBase } = this.props;
    this.setRowActive();
    thisBase.labelOnFocus({ rowNum });
  };

  /**
   * call when input on blur
   */
  onLabelBlur = () => {
    const { rowNum, thisBase } = this.props;
    this.setRowUnActive();
    thisBase.labelOnBlur({ rowNum });
  };

  /**
   * call when input on focus
   */
  onValueFocus = () => {
    const { rowNum, thisBase } = this.props;
    this.setRowActive();
    thisBase.valueOnFocus({ rowNum });
  };

  /**
   * call when input on blur
   */
  onValueBlur = () => {
    const { rowNum, thisBase } = this.props;
    this.setRowUnActive();
    thisBase.valueOnBlur({ rowNum });
  };

  /**
   * set input is focus
   */
  focus = type => {
    type = type || 'value';

    switch (type) {
      case 'label':
        this.refLabel.focus();
        this.onLabelFocus();
        break;
      default:
        this.refValue.focus();
        this.onValueFocus();
    }
  };

  /**
   * set input is blur
   */
  blur = () => {
    this.refLabel.blur();
    this.refValue.blur();
    this.onValueBlur();
    this.onLabelBlur();
  };

  componentWillUnmount() {
    this.disable = true;
  }
}

export default BaseRow;
