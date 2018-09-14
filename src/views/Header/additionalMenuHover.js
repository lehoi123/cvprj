import React, { Component } from 'react';
import '../../styles/header/headerMenuHover.css';

import AddCVImg from '../../assets/assets/images/HoverItem/addCV.svg';
import AddCoverImg from '../../assets/assets/images/HoverItem/addCover.svg';
import HideImg from '../../assets/assets/images/HoverItem/hide.svg';

export default class AdditionalMenuHover extends Component {
  render() {
    return (
      <div className="hoverContainer">
        {/* UPLOAD PHOTO */}
        <div className="uploadPhotoHover">
          <img src={AddCVImg} alt="fireSpot" className="hoverIcon" />
          <p>Add cover letter</p>
        </div>

        {/* CROP PHOTO */}
        <div className="cropPhotoHover">
          <img src={HideImg} alt="fireSpot" className="hideHoverIcon" />
          <p>Hide cover letter</p>
        </div>

        {/* HIDE PHOTO */}
        <div className="hidePhotoHover">
          <img src={AddCoverImg} alt="fireSpot" className="hoverIcon" />
          <p>Add attachment</p>
        </div>

        {/* SHOW PHOTO */}
        <div className="showPhotoHover">
          <img src={HideImg} alt="fireSpot" className="hideHoverIcon" />
          <p>Hide attachment</p>
        </div>
      </div>
    );
  }
}
