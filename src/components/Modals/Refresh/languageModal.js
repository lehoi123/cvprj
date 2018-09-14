import React, { Component } from 'react';
import '../../../styles/header/styles.newModal.css';

export default class RefreshLanguageModal extends Component {
  render() {
    const { onCloseModal, onRefreshModal } = this.props;

    return (
      <div className="newModal">
        <p className="refreshQuestion">
          Do you want to refresh your document with this Language?
        </p>
        <div className="refreshAction">
          <div className="freshAction-cancel" onClick={onCloseModal}>
            Cancel
          </div>
          <div className="refreshAction-startOver" onClick={onRefreshModal}>
            Start Over
          </div>
        </div>
      </div>
    );
  }
}
