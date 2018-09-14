import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../../styles/rightNav/register.css';
import { activateRightNavMod } from '../../modules/rightNav.module';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegisterSuccess: false
    };
  }
  renderRegisterSuccess() {
    const { isRegisterSuccess } = this.state;
    if (isRegisterSuccess) {
      return (
        <div>
          <div className="registerNotification">
            <p>You have mail!</p>
            <p>
              We have sent you an email to xxxxxxxxxx@gmail.com, <br />
              where you can download your application documents
            </p>
          </div>

          <div className="registerFailNavi">
            <p>E-mail not received? Then let her send you again</p>
            <p>
              E-mail address entered correctly?{' '}
              <span className="toChange">To change</span>
            </p>
            <p>Other questions? Then write to admin@cva4</p>
          </div>
        </div>
      );
    }
  }
  renderRegister() {
    const { isRegisterSuccess } = this.state;
    if (!isRegisterSuccess) {
      return (
        <div>
          <p className="registerTitle">Please register to download cv free!</p>
          {/* First name */}
          <div className="firstNameRegisterWrapper">
            <p className="firstNameRegister">First name</p>
            <input className="firstNameRegisterInput" />
          </div>
          {/* Last name */}
          <div className="lastNameRegisterWrapper">
            <p className="lastNameRegister">Last name</p>
            <input className="lastNameRegisterInput" />
          </div>
          {/* Email */}
          <div className="emailRegisterWrapper">
            <p className="emailRegister">Email</p>
            <input className="emailRegisterInput" />
          </div>
          {/* Password */}
          <div className="passwordRegisterWrapper">
            <p className="passwordRegister">Password</p>
            <input className="passwordRegisterInput" />
          </div>

          <div
            className="acceptWrapper"
            onClick={() => this.setState({ isRegisterSuccess: true })}
          >
            <p className="accept">Accept</p>
          </div>

          <div className="haveAccWrapper">
            <p className="haveAcc">I have account.</p>
            <div
              className="accWrapper"
              onClick={() => this.props.activateRightNavMod(true, 'Login')}
            >
              <p>Log in</p>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="registerContainer">
        {this.renderRegisterSuccess()}
        {this.renderRegister()}
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
)(Register);
