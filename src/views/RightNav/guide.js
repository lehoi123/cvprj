import React, { Component } from 'react';
import '../../styles/rightNav/guide.css';
import PreviousImg from '../../assets/assets/images/RightNav/Guide/previous.svg';
import NextImg from '../../assets/assets/images/RightNav/Guide/next.svg';
import UploadImg from '../../assets/assets/images/header/upload/upload.svg';
import TemplateImg from '../../assets/assets/images/header/form/form.svg';
import LanguageImg from '../../assets/assets/images/header/language/language.svg';

export default class Guide extends Component {
  render() {
    return (
      <div className="guideContainer">
        <div className="stepWrapper">
          <div className="stepLeft">
            <img src={PreviousImg} alt="previousImg" className="previousImg" />
            <p className="step">
              <span className="stepNumber">Step 1: </span>
              Choose CV
            </p>
          </div>

          <div />

          <img src={NextImg} alt="nextImg" className="nextImg" />
        </div>

        <div className="chooseCVWrapper">
          {/* Upload */}
          <div className="guideImgWrapper">
            <img src={UploadImg} alt="uploadImg" className="uploadImg" />
            <p className="uploadGuideText">Upload</p>
          </div>
          {/* Template */}
          <div className="guideTemplateImgWrapper">
            <div className="theTemplateWrapper">
              <img
                src={TemplateImg}
                alt="templateImg"
                className="templateImg"
              />
              <p className="guideText">Template</p>
            </div>
          </div>

          {/* Language */}
          <div className="guideImgWrapper">
            <img src={LanguageImg} alt="languageImg" className="languageImg" />
            <p className="guideText">Language</p>
          </div>
        </div>

        <p className="chooseCVDescription">
          Choose the template and select the template <br /> you like
        </p>
      </div>
    );
  }
}
