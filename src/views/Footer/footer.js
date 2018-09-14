import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../styles/footer/styles.footer.css';
import LogoImg from '../../assets/assets/images/header/logoFooter/logoFooter.svg';
import { activateRightNavMod } from '../../modules/rightNav.module';

class Footer extends Component {
  render() {
    return (
      <div className="footerContainer">
        {/* Logo */}

        <div className="theLogo">
          <img src={LogoImg} alt="fireSpot" className="logoFooter" />
        </div>

        {/* Button Group */}
        <div className="buttonGroup">
          {/* guide */}
          <div
            className="footerGuide"
            onClick={() => this.props.activateRightNavMod(true, 'Guide')}
          >
            <p className="buttonGroupItem">Guide</p>
          </div>

          {/* advice */}

          <div
            className="footerAdvice"
            onClick={() => this.props.activateRightNavMod(true, 'Advice')}
          >
            <p className="buttonGroupItem">Advice</p>
          </div>

          {/* contact */}
          <div
            className="footerContact"
            onClick={() => this.props.activateRightNavMod(true, 'Contact')}
          >
            <p className="buttonGroupItem">Contact</p>
          </div>

          {/* login */}

          <div
            className="footerLogin"
            onClick={() => this.props.activateRightNavMod(true, 'Login')}
          >
            <p className="buttonGroupItem">Login</p>
          </div>

          {/* feedback */}
          <div
            className="footerFeedback"
            onClick={() => this.props.activateRightNavMod(true, 'Feedback')}
          >
            <p className="buttonGroupItem">Feedback</p>
          </div>
        </div>

        {/* Fanpage */}
        <div
          className="footerFanPage"
          onClick={() => this.props.activateRightNavMod(true, 'FanPage')}
        >
          <p className="fanPageTxt">Fanpage facebook</p>
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
)(Footer);
