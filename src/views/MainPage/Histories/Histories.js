import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../styles/Histories/style.histories.css';
import CVData from '../../../json/history/defaultData';
import PdfHelper from '../../../helper/pdf.helper';

class Histories extends Component {
  renderPage = pages => {
    const pageRenders = pages.map((page, index) => (
      <img className="History-Page-image" key={index} src={page} />
    ));

    return pageRenders;
  };

  renderCVHistoryList = () => {
    const { cvList } = this.props;

    const cvView = cvList.map(cvObject => (
      <div className="Histories-container" key={cvObject.id}>
        <div className="Histories-block">{this.renderPage(cvObject.pages)}</div>
        <div className="Histories-button-block">
          <div
            className="ButtonHistory"
            onClick={() => PdfHelper.previewPdfOnHistory(cvObject.link)}
          >
            <i className="cv-icon-history-see" />
            <span className="ButtonHistory-text">SEE</span>
          </div>
          <div className="ButtonHistory">
            <i className="cv-icon-history-edit" />
            <span className="ButtonHistory-text">EDIT</span>
          </div>
          <iframe
            ref={ref => (this.pdfIframe = ref)}
            src={cvObject.link}
            style={{ display: 'none' }}
          />

          <div
            className="ButtonHistory"
            onClick={() => PdfHelper.printPdfOnHistory(this.pdfIframe)}
          >
            <i className="cv-icon-history-print" />
            <span className="ButtonHistory-text">PRINT</span>
          </div>
          <a className="ButtonHistory" href={cvObject.link} download>
            <i className="cv-icon-history-download" />
            <span className="ButtonHistory-text">DOWNLOAD</span>
          </a>
        </div>
      </div>
    ));
    return cvView;
  };

  render() {
    return <div className="cvHistories">{this.renderCVHistoryList()}</div>;
  }
}

export default Histories;

Histories.propTypes = {
  cvList: PropTypes.array
};

Histories.defaultProps = {
  cvList: CVData
};
