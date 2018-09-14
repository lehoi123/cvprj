import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faEye,
  faEyeSlash,
  faCrop
} from '@fortawesome/free-solid-svg-icons';
import ChooseSizeImg from '../../../../../../assets/assets/images/CV/chooSize.svg';
import ChooseSizeImgHover from '../../../../../../assets/assets/images/CV/choosiseHover.svg';

import RowTool from '../../../rowTool';
import BaseTemplate, {
  mapStateToProps,
  mapDispatchToProps
} from '../../Base/template.base';

import UploadImg from '../../../../../../assets/assets/images/HoverItem/upload.svg';

import Heading from './heading';
import Content from './content';

/**
 * Main of this compoent
 */
class PersonalDetail extends BaseTemplate {
  constructor(props) {
    super(props);
    this.state = {
      isHoverChoosize: false
    };
  }
  componentDidMount() {
    super.componentDidMount();
    this.props.initializeAvatarStatus();
  }

  componentDidUpdate() {
    super.componentDidUpdate();
  }

  renderAdditionalMenu() {
    const { isHavePhoto, isUploaded } = this.props.modal.toJS();
    const { onCrop, onChoosize } = this.props;
    const { isHoverChoosize } = this.state;
    if (isHavePhoto || isUploaded) {
      return (
        <div>
          <a className="avatarBtn btnShowCrop" onMouseDown={onCrop}>
            <FontAwesomeIcon icon={faCrop} />
          </a>

          <a
            className="avatarBtn btnShowChooseSize"
            onMouseDown={onChoosize}
            onMouseEnter={() => this.setState({ isHoverChoosize: true })}
            onMouseLeave={() => this.setState({ isHoverChoosize: false })}
          >
            <img
              src={!isHoverChoosize ? ChooseSizeImg : ChooseSizeImgHover}
              alt="fireSpot"
              style={{
                width: 30,
                height: 18,
                marginLeft: 2
              }}
            />
          </a>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { headingPartActive, rowPartActive } = this.state;
    const { showBaseLine, onUpload, passDatas, datas } = this.props;

    const {
      isHavePhoto,
      isHighlightCrop,
      isHideAvatar,
      avatarDisStatus,
      isShowAvatar
    } = this.props.modal.toJS();

    const avatar = datas.get('avatar');
    const display = avatar.get('display') === true;

    const classes = classNames({
      part: true,
      personalDetail: true,
      baseLine: showBaseLine,
      headingPartActive,
      rowPartActive
    });

    const size = avatar.get('size');
    const avatarClasses =
      isHavePhoto || isHighlightCrop
        ? classNames({
            noAvatar: true,
            small: size === 'small',
            normal: size === 'normal',
            large: size === 'large'
          })
        : classNames({
            avatar: true,
            small: size === 'small',
            normal: size === 'normal',
            large: size === 'large'
          });

    const bottomLineStyles = {
      borderColor: passDatas.get('primaryColor')
    };

    const avatarOverlayStyle = {};
    switch (size) {
      case 'small':
        avatarOverlayStyle.bottom = 104;
        avatarOverlayStyle.left = 100;
        break;
      case 'large':
        avatarOverlayStyle.bottom = 17;
        avatarOverlayStyle.left = 12;
        break;
      default:
    }
    const avatarBoxStyle = {};
    if (
      (avatarDisStatus === undefined && isHavePhoto) ||
      avatarDisStatus ||
      isShowAvatar
    ) {
      avatarBoxStyle.display = 'block';
    } else {
      avatarBoxStyle.display = 'none';
    }

    return (
      <div className={classes} ref={ref => (this.refPart = ref)}>
        <div className="partContent contents">
          <div className="heading">
            <Heading datas={datas} thisBase={this} />
            <RowTool
              onPlusTop={this.onPlusTopPart}
              onPlusBottom={this.onPlusBottomPart}
              onDelete={this.onDeletePart}
              onUp={this.onUpPart}
              onDown={this.onDownPart}
              plusTopDisable
              upDisable
              downDisable
              deleteDisable
            />
          </div>

          <Content datas={datas} thisBase={this} />
        </div>

        <div className="avatarBox">
          <div
            className={avatarClasses}
            style={avatarBoxStyle}
            onMouseDown={onUpload}
          >
            <div className="avatarOverlay">
              <img src={UploadImg} className="avatarUploadIcon" alt="" />
            </div>
            <canvas id="avatarCanvas" className="image" />
          </div>

          <div className="overlay" style={avatarOverlayStyle}>
            <a className="avatarBtn btnUpload" onMouseDown={onUpload}>
              <FontAwesomeIcon icon={faUpload} />
            </a>
            <a
              className="avatarBtn btnShowHide"
              onMouseDown={() => this.props.hideShowAvatar()}
            >
              <FontAwesomeIcon
                icon={avatarDisStatus || isShowAvatar ? faEyeSlash : faEye}
              />
            </a>

            {this.renderAdditionalMenu()}
          </div>
        </div>

        <div className="bottomLine" style={bottomLineStyles} />
      </div>
    );
  }
}

PersonalDetail.defaultProps = {
  showBaseLine: true,
  rowsData: []
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalDetail);
