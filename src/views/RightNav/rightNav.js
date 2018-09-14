import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DoubleAngle from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../styles/rightNav/rightNav.css';

import HomeImg from '../../assets/assets/images/RightNav/home.svg';
import CloseImg from '../../assets/assets/images/RightNav/closeIcon.svg';
import ExpandImg from '../../assets/assets/images/RightNav/expand.svg';
import CollapseImg from '../../assets/assets/images/RightNav/collapse.svg';
import { deActiveRightNavMod } from '../../modules/rightNav.module';
import { setBodyAlignLeft } from '../../modules/body.module';

class RightNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false
    };
  }
  toggleExpand = () => {
    this.setState({
      isExpand: !this.state.isExpand,
      className: 'expand'
    });
  };
  renderExpandImg() {
    const { rightNav } = this.props;
    const { isExpand } = this.state;
    if (rightNav.moduleName === 'Advice') {
      if (!isExpand) {
        return (
          <img src={ExpandImg} alt="expandAdvice" className="expandableIcon" />
        );
      } else {
        return (
          <img
            src={CollapseImg}
            alt="expandAdvice"
            className="expandableIcon"
          />
        );
      }
    }
  }

  _deActiveRightNavMod = () => {
    this.props.deActiveRightNavMod(false);
    this.props.setBodyAlignLeft(false);
  };

  render() {
    const { moduleName, children, rightNav } = this.props;
    const expandClass =
      this.state.isExpand && rightNav.moduleName === 'Advice'
        ? 'expand'
        : 'inExpand';

    return (
      <div className={expandClass}>
        {/* header */}
        <div className="rightHeaderWrapper">
          <div className="rightHeader">
            <img
              src={HomeImg}
              alt="homeHeaderRightNav"
              className="homeRightIcon"
              onClick={() => this.props.deActiveRightNavMod(false)}
            />
            <p
              className="homeText"
              onClick={() => this.props.deActiveRightNavMod(false)}
            >
              Home
            </p>
            <FontAwesomeIcon icon={DoubleAngle} className="doubleAngle" />
            <p className="moduleName">{moduleName}</p>
          </div>

          <div className="rightNavRightWrapper">
            <div onClick={this.toggleExpand} className="expandWrapper">
              {this.renderExpandImg()}
            </div>
            <div onClick={this._deActiveRightNavMod}>
              <img
                src={CloseImg}
                alt="closeImgRightNav"
                className="homeCloseIcon"
              />
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rightNav: state.get('rightNav')
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deActiveRightNavMod,
      // align cv body
      setBodyAlignLeft
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightNav);
