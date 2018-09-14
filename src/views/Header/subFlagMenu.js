import React, { Component } from 'react';
import '../../styles/header/subFlagMenu.css';
import VietnamFlagImg from '../../assets/assets/images/header/flag/vietnam.svg';
import EnglishFlagImg from '../../assets/assets/images/header/flag/english.svg';
import JapanFlagImg from '../../assets/assets/images/header/flag/japan.svg';
import KoreaFlagImg from '../../assets/assets/images/header/flag/korea.svg';
import GermanyFlagImg from '../../assets/assets/images/header/flag/germany.svg';

export default class SubFlagMenu extends Component {
  render() {
    return (
      <div className="flagMenuContainer">
        {/* Vietnam */}

        <div className="vietnamFlagWrapper">
          <img
            src={VietnamFlagImg}
            alt="Vietnam Flag"
            className="vietnamFlag"
          />
          <p>Vietnam</p>
        </div>

        {/* Germany */}
        <div className="germanyFlagWrapper">
          <img
            src={GermanyFlagImg}
            alt="Germany Flag"
            className="germanyFlag"
          />
          <p>German</p>
        </div>

        {/* Korea */}
        <div className="koreaFlagWrapper">
          <img src={KoreaFlagImg} alt="Korea Flag" className="koreaFlag" />
          <p>Korea</p>
        </div>

        {/* Japan */}
        <div className="japanFlagWrapper">
          <img src={JapanFlagImg} alt="Japan Flag" className="japanFlag" />
          <p>Japan</p>
        </div>

        {/* English */}
        <div className="englishFlagWrapper">
          <img
            src={EnglishFlagImg}
            alt="English Flag"
            className="englishFlag"
          />
          <p>English</p>
        </div>
      </div>
    );
  }
}
