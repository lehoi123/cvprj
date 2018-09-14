import React, { Component } from 'react';
import '../../styles/rightNav/findPass.css';
export default class FindPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPassword: false
    };
  }

  renderEnterPassword() {
    const { isShowPassword } = this.state;
    if (isShowPassword) {
      return (
        <div>
          <div className="findPassWrapper">
            <p className="findPassTitle">Please enter new password</p>
          </div>

          {/* Enter password field */}
          <div className="findPassFieldWrapper">
            <p className="findPassAsk">Password</p>
            <input className="findPassInput" />
          </div>
          <div className="findPassFieldWrapper">
            <p className="findPassAsk">Confirm Password</p>
            <input className="findPassInput" />
          </div>
          <div className="nextBtnWrapper">
            <p className="nextBtn">Done</p>
          </div>
        </div>
      );
    }
  }
  renderEnterEmail() {
    const { isShowPassword } = this.state;
    if (!isShowPassword) {
      return (
        <div>
          {/* title */}
          <div className="findPassWrapper">
            <p className="findPassTitle">Please enter email</p>
          </div>

          {/* Enter email field */}
          <div className="findPassFieldWrapper">
            <p className="findPassAsk">Please enter email</p>
            <input className="findPassInput" />
          </div>

          {/* Next */}
          <div
            className="nextBtnWrapper"
            onClick={() => this.setState({ isShowPassword: true })}
          >
            <p className="nextBtn">Next</p>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="findPassContainer">
        {this.renderEnterPassword()}
        {this.renderEnterEmail()}
      </div>
    );
  }
}
