import React, { Component } from 'react';
import '../../styles/footer/feedback.css';

export default class FeedBack extends Component {
  render() {
    return (
      <div className="feedBackContainer">
        {/* Title */}
        <div className="feedbackWrapper">
          <p className="feedbackTitle">Please enter here for suggesstions</p>
        </div>

        {/* Feedback */}
        <div className="feedBackField">
          <p className="feedback">Feedback</p>
          <textarea type="text" className="feedbackArea" multiple />
        </div>

        {/* Submit */}
        <div className="submitFeedBack">
          <p className="submit">Submit</p>
        </div>
      </div>
    );
  }
}
