import { PureComponent } from 'react';
import CVHelper from '../../../../../helper/cv.helper';

class BaseHeading extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
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
    this.updateRowHeight();
    this.reActiveHeadingWrap();
  }

  componentDidUpdate() {
    this.reActivePartHandle();
  }

  reActivePartHandle() {
    const { thisBase } = this.props;
    const partIdJustChanged = CVHelper.getTmpPartPositionId();
    if (partIdJustChanged === thisBase.props.part.get('id')) {
      CVHelper.removeTmpPartPositionId();
      this.focus();
    }
  }

  reActiveHeadingWrap() {
    const { thisBase } = this.props;
    const partIdJustChanged = CVHelper.getTmpHeadingWrapId();
    if (partIdJustChanged === thisBase.props.part.get('id')) {
      CVHelper.removeTmpHeadingWrapId();
      this.focus();
    }
  }

  /**
   * update height for row
   */
  updateRowHeight() {
    const { clientHeight } = this.refHeading;
    this.setState({
      height: clientHeight
    });
  }

  headingOnChange = value => {
    const { thisBase } = this.props;
    const { height } = this.state;
    const { clientHeight } = this.refHeading;

    // update height for row
    if (height !== clientHeight) {
      this.updateRowHeight();
      thisBase.updatePartCVDimension();

      // cached in 500ms - reActive handle
      CVHelper.setTmpHeadingWrapId(thisBase.props.part.get('id'), 500);

      // will edit later..., handle break page
      thisBase.headingOnChange({ value, handlePage: true });
    } else {
      thisBase.headingOnChange({ value });
    }
  };

  onHeadingFocus = () => {
    const { thisBase } = this.props;
    thisBase.headingOnFocus();
  };

  onHeadingBlur = () => {
    const { thisBase } = this.props;
    thisBase.headingOnBlur();
  };

  /**
   * set input is focus
   */
  focus() {
    this.refInput.focus();
    this.onHeadingFocus();
  }

  /**
   * set input is blur
   */
  blur() {
    this.refInput.blur();
    this.onHeadingBlur();
  }

  componentWillUnmount() {
    this.disable = true;
  }
}

export default BaseHeading;
