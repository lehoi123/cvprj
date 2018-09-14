import React, { Component } from 'react';
import '../../../styles/header/styles.newModal.css';

export default class NewModal extends Component {
  render() {
    const { onCloseModal } = this.props;

    return (
      <div className="newModal">
        <p className="refreshQuestion">Do you want to refresh your document?</p>
        <div className="refreshAction">
          <div className="freshAction-cancel" onClick={onCloseModal}>
            Cancel
          </div>
          <div className="refreshAction-startOver">Start Over</div>
        </div>
      </div>
    );
  }
}
