import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FooterModal from '../../../views/Modals/Footers/footerModal';
import classNames from 'classnames';
import '../../../styles/modals/photos/styles.chooseSize.css';

import smallSize from '../../../assets/assets/images/avatar-size/small_size_avatar.png';
import normalSize from '../../../assets/assets/images/avatar-size/normal_size_avatar.png';
import largeSize from '../../../assets/assets/images/avatar-size/large_size_avatar.png';
import Constant from '../../../config/constant';

class ChooseSizeBody extends Component {
  constructor(props) {
    super(props);
  }

  _fetchImageBySize = () => {
    const { avatarSize } = this.props;
    const { size } = Constant.photoModal.avatar;

    switch (avatarSize) {
      case size.normal:
        return normalSize;
      case size.large:
        return largeSize;
      default:
        return smallSize;
    }
  };

  handleChooseSize = e => {
    const { chooseSizeOnHandle } = this.props;
    const { innerText } = e.target;

    chooseSizeOnHandle(innerText);
  };

  _classes = () => {
    return {
      'photo-modal/SMALL_AVATAR': false,
      'photo-modal/NORMAL_AVATAR': false,
      'photo-modal/LARGE_AVATAR': false
    };
  };

  render() {
    const {
      isHighlightLeft,
      leftClick,
      isHighlightRight,
      rightClick,
      avatarSize
    } = this.props;

    const { small, normal, large } = Constant.photoModal.avatar.size;

    let highLightClass = this._classes();
    highLightClass[avatarSize] = true;

    return (
      <div className="PhotoModal-body">
        <div className="PhotoModal-body-top">
          <div className="PhotoModal-choose-size-form">
            <div className="PhotoModal-choose-size-img">
              <img src={this._fetchImageBySize()} />
            </div>

            <div className="PhotoModal-choose-size-slide">
              <button
                className={classNames({
                  'PhotoModal-choose-size-button': true,
                  'PhotoModal-choose-size-button-highlight':
                    highLightClass[small]
                })}
                onClick={this.handleChooseSize}
              >
                Small
              </button>
              <button
                className={classNames({
                  'PhotoModal-choose-size-button': true,
                  'PhotoModal-choose-size-button-highlight':
                    highLightClass[normal]
                })}
                onClick={this.handleChooseSize}
              >
                Normal
              </button>
              <button
                className={classNames({
                  'PhotoModal-choose-size-button': true,
                  'PhotoModal-choose-size-button-highlight':
                    highLightClass[large]
                })}
                onClick={this.handleChooseSize}
              >
                Large
              </button>
            </div>
          </div>
        </div>

        <FooterModal
          leftClassIcon="ButtonModal-no-margin cv-icon-modal icon-cancel"
          rightClassIcon="ButtonModal-no-margin cv-icon-modal icon-accept"
          rightLabel="Accept"
          isHighlightLeft={isHighlightLeft}
          handleOnClickLeft={leftClick}
          isHighlightRight={isHighlightRight}
          handleOnClickRight={rightClick}
        />
      </div>
    );
  }
}

export default ChooseSizeBody;

ChooseSizeBody.propTypes = {
  avatarSize: PropTypes.string,
  isHighlightLeft: PropTypes.bool,
  isHighlightRight: PropTypes.bool,
  leftClick: PropTypes.func.isRequired,
  rightClick: PropTypes.func.isRequired,
  chooseSizeOnHandle: PropTypes.func.isRequired
};

ChooseSizeBody.defaultProps = {
  avatarSize: Constant.photoModal.avatar.size.normal,
  isHighlightLeft: false,
  isHighlightRight: false
};
