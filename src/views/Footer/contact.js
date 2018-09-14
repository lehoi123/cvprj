import React, { Component } from 'react';
import '../../styles/rightNav/contact.css';

export default class Contact extends Component {
  render() {
    return (
      <div className="adviceContainer">
        {/* First Name */}
        <div className="firstNameWrapper">
          <p className="firstName">First Name</p>
          <input className="firstNameInput" />
        </div>
        {/* Last Name */}
        <div className="lastNameWrapper">
          <p className="lastName">Last Name</p>
          <input className="lastNameInput" />
        </div>
        {/* Email */}
        <div className="emailWrapper">
          <p className="email">Email</p>
          <input className="emailInput" />
        </div>
        {/* Content */}
        <div className="contentWrapper">
          <p className="content">Content</p>
          <textarea className="contentArea" />
        </div>
        <div className="submitContact">
          <p className="submit">Submit</p>
        </div>
      </div>
    );
  }
}
