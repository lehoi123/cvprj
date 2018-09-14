import React, { Component } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  GooglePlusShareButton,
  RedditShareButton,
  PinterestShareButton
} from 'react-share';

import '../../styles/rightNav/shareBox.css';
import FacebookShare from '../../assets/assets/images/RightNav/Share/fbShare.svg';
import GoogleShare from '../../assets/assets/images/RightNav/Share/ggShare.svg';
import TwitterShare from '../../assets/assets/images/RightNav/Share/twitterShare.svg';
import PinterestShare from '../../assets/assets/images/RightNav/Share/pinterestShare.svg';
import RedditShare from '../../assets/assets/images/RightNav/Share/redditShare.svg';
import Reddit from '../../assets/assets/images/RightNav/Share/reddit.svg';
import Pinterest from '../../assets/assets/images/RightNav/Share/pinterest.svg';
import CVA4 from '../../assets/assets/images/header/logo/logo.svg';

export default class ShareBox extends Component {
  render() {
    const shareUrl = window.location.href;
    return (
      <div className="shareBoxContainer">
        <div className="shareStack">
          {/* FACEBOOK */}
          <FacebookShareButton url={shareUrl}>
            <img
              src={FacebookShare}
              alt="facebookShare"
              className="facebookShare"
            />
          </FacebookShareButton>

          {/* GOOGLE */}
          <GooglePlusShareButton url={shareUrl}>
            <img src={GoogleShare} alt="googleShare" className="googleShare" />
          </GooglePlusShareButton>

          {/* TWITTER */}
          <TwitterShareButton url={shareUrl}>
            <img
              src={TwitterShare}
              alt="twitterShare"
              className="twitterShare"
            />
          </TwitterShareButton>

          <PinterestShareButton
            url={String(window.location)}
            media={`${String(window.location)}/${CVA4}`}
            windowWidth={600}
            windowHeight={400}
          >
            <div className="pinterestWrapper">
              <img src={Pinterest} alt="pinterest" className="pinterest" />
              <img
                src={PinterestShare}
                alt="pinterestShare"
                className="pinterestShare"
              />
            </div>
          </PinterestShareButton>

          <RedditShareButton url={shareUrl}>
            <div className="redditWrapper">
              <img src={Reddit} alt="reddit" className="reddit" />
              <img
                src={RedditShare}
                alt="redditShare"
                className="redditShare"
              />
            </div>
          </RedditShareButton>
        </div>
      </div>
    );
  }
}
