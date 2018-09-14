import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../../styles/rightNav/login.css';
import Facebook from '../../assets/assets/images/RightNav/Login/facebook.svg';
import GooglePlus from '../../assets/assets/images/RightNav/Login/google-plus.svg';

import { activateRightNavMod } from '../../modules/rightNav.module';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
  }

  handleChangeUserName(event) {
    this.setState({
      userName: event.target.value
    });
  }

  hanldeChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <div className="LoginContainer">
        <div className="loginTitleWrapper">
          <p className="loginTitle">
            Please sign in with your login details to grant the cva4.com access
            to your data
          </p>
        </div>

        {/* Username */}
        <div className="userNameWrapper">
          <p className="userName">Username</p>
          <input
            className="userNameInput"
            onChange={this.handleChangeUserName}
          />
        </div>

        {/* Password */}
        <div className="passwordWrapper">
          <p className="password">Password</p>
          <input
            className="passwordInput"
            type="password"
            onChange={this.hanldeChangePassword}
          />
        </div>

        {/* Forgot login detail */}
        <div
          className="forgotWrapper"
          onClick={() => this.props.activateRightNavMod(true, 'FindPassword')}
        >
          <p>Forgot your login details?</p>
        </div>

        {/* Login Btn */}
        <div className="loginBtnWrapper">
          <p className="loginBtn">Login</p>
        </div>

        {/* or text */}
        <div className="orWarpper">
          <div className="separator" />
          <p className="orTxt">Or</p>
        </div>

        {/* SOCIAL LOGIN */}

        <div className="socialLogin">
          {/* Login with facebook */}
          <div className="facebookWrapper">
            {/* Logo */}
            <div className="fbLogo">
              <img src={Facebook} alt="facebook" className="facebookIcon" />
            </div>
            {/* Text */}
            <div>
              <p className="fbLogin">Login with Facebook</p>
            </div>
          </div>
          {/* Login with Google */}
          <div className="googleWrapper">
            {/* Logo */}
            <div className="ggLogo">
              <img src={GooglePlus} alt="GooglePlus" className="googleIcon" />
            </div>

            {/* Text */}
            <div>
              <p className="ggLogin">Login with Google</p>
            </div>
          </div>
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
)(Login);
