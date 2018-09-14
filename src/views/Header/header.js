import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FaShare from '@fortawesome/fontawesome-free-solid/faShareAlt';
import FaSearch from '@fortawesome/fontawesome-free-solid/faSearchPlus';
import ThreeDot from '@fortawesome/fontawesome-free-solid/faEllipsisH';
import PlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import MinusCircle from '@fortawesome/fontawesome-free-solid/faMinusCircle';

import 'rc-slider/assets/index.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'rc-slider';

import '../../styles/header/styles.header.css';
import '../../styles/header/styles.slider.css';
import '../../styles/modals/languages/styles.languageCountry.css';

import NewImg from '../../assets/assets/images/header/new/new.svg';
import UploadImg from '../../assets/assets/images/header/upload/upload.svg';
import FormImg from '../../assets/assets/images/header/form/form.svg';
import LanguageImg from '../../assets/assets/images/header/language/language.svg';
import LogoImg from '../../assets/assets/images/header/logo/logo.svg';

//RIGHT SEGMENT ICON

import PhotoImg from '../../assets/assets/images/header/photo/photo.svg';
import SignatureImg from '../../assets/assets/images/header/signature/signature.svg';
import AdditionalImg from '../../assets/assets/images/header/additional/additional.svg';
import DownloadImg from '../../assets/assets/images/header/download/download.svg';
import AccountImg from '../../assets/assets/images/header/account/account.svg';

import Checked from '../../assets/assets/images/header/checked.svg';

// Import Sub Menu Component
import HeaderMenuHover from './headerMenuHover';
import SignatureMenuHover from './signatureMenuHover';
import AdditionalMenuHover from './additionalMenuHover';
import SubMenuMobile from './submenuMobile';
import CenterSegment from './centerSegment';

import {
  increaseBodyScale,
  decreaseBodyScale,
  setBodyScale
} from '../../modules/body.module';
import { setBodyAlignLeft } from '../../modules/body.module';
import { activateRightNavMod } from '../../modules/rightNav.module';
import { activateHoverItem } from '../../modules/header.module';
import {
  setPrimaryColor,
  fetchDefaultCV
} from '../../modules/mainPage/cv.module';
import {
  showUploadPhotoModal,
  showCropPhotoModal,
  showChooseSizePhotoModal
} from '../../modules/modals/photoModal.module';

import {
  showUploadSignature,
  showCropSignature
} from '../../modules/modals/signatureModal.module';

import Constant from '../../config/constant';
import RightNav from '../RightNav/rightNav';
import Download from '../RightNav/download';
import Advice from '../RightNav/advice';
import Guide from '../RightNav/guide';
import Contact from '../Footer/contact';
import Login from '../Authentication/login';
import FeedBack from '../Footer/feedBack';
import FindPassword from '../Authentication/findPassword';
import Register from '../Authentication/register';
import ShareBox from '../RightNav/shareBox';
import Modal from '../../views/Modals/modal';
import LanguageModal from '../../components/Modals/Languages/languageModal';
import PhotoModal from '../../components/Modals/Photo/photoModal';
import SignatureModal from '../../components/Modals/Signature/signatureModal';
import NewModal from '../../components/Modals/Refresh/newModal';
import TemplateModal from '../../components/Modals/Templates/templateModal';
import RefreshLanguageModal from '../../components/Modals/Refresh/languageModal';
import languageData from '../../json/modals/languageData';

import { initializeModal } from '../../modules/modals/languageModal.module';
import LeftBanner from '../../components/Banner/LeftBanner';
import RightBanner from '../../components/Banner/RightBanner';

const myColor = [
  '#BD0001',
  '#E10002',
  '#FF9904',
  '#F5EB05',
  '#3FD91E',
  '#02A645',
  '#367FE1',
  '#0058AE',
  '#08174A',
  '#630E88',
  '#0BAFC0'
];

const colorDiv = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      windowWidth: undefined,
      isShowMenu: false,
      isShowSignature: false,
      isShowAdditional: false,
      isShowSubMenu: false,

      isShowSlider: false,
      isShowRightNav: false,
      isShowShareBox: false,
      moduleRightName: '',
      styleHoverMenu: {
        top: null,
        left: null,
        position: 'absolute',
        zIndex: 9999999
      },
      shareHoverMenu: {
        top: null,
        left: null,
        position: 'absolute',
        zIndex: 99999999
      },
      sliderMenu: {
        top: null,
        left: null,
        position: 'absolute',
        zIndex: 999999
      },
      backgroundPicture: {
        backgroundColor: Constant.color.white
      },
      backgroundSignature: {
        backgroundColor: Constant.color.white
      },
      backgroundAdditional: {
        backgroundColor: Constant.color.white
      },
      backgroundFlag: {
        backgroundColor: Constant.color.white
      },
      rightNavStyle: {
        top: null,
        right: null,
        position: 'fixed',
        width: null
      }
    };
  }
  componentDidMount() {
    this.handleResize();
    this.props.initializeModal();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
    this.forceUpdate();
  };

  /* ACTION TO SHOW PHOTO MODAL*/

  showCropOnPhotoModal = () => {
    this.props.showCropPhotoModal();
    this.refPhotoModal.open();
  };

  showChooseSizeOnPhotoModal = () => {
    this.props.showChooseSizePhotoModal();
    this.refPhotoModal.open();
  };

  showUploadOnPhotoModal = () => {
    this.props.showUploadPhotoModal();
    this.refPhotoModal.open();
  };

  /* ACTION TO SHOW SIGNATURE MODAL*/

  showCropOnSignatureModal = () => {
    this.props.showCropSignature();
    this.refSignatureModal.open();
  };

  showUploadOnSignatureModal = () => {
    this.props.showUploadSignature();
    this.refSignatureModal.open();
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isActivateNav, moduleName } = nextProps.rightNav.toJS();
    const { windowWidth } = this.state;

    if (isActivateNav) {
      this.setState({
        isShowRightNav: isActivateNav,
        moduleRightName: moduleName,
        rightNavStyle: {
          top: 35,
          right: windowWidth < 767 ? null : 0,
          position: 'absolute',
          width: windowWidth < 767 ? '100%' : null
        }
      });
    } else {
      this.setState({ isShowRightNav: false });
    }
  }

  /**
  |--------------------------------------------------
  | Render Left Segment
  |--------------------------------------------------
  */

  renderLeftSegment() {
    const { countryId, continentId } = this.props.language.toJS();
    let languageFilter = null;

    if (countryId === 1 && continentId === 1) {
      languageFilter = languageData[0].countries.filter(
        languageObj => languageObj.id === countryId
      );
    } else {
      languageFilter = languageData[continentId].countries.filter(
        languageObj => languageObj.id === countryId
      );
    }
    return (
      <div className="leftSegment">
        {/* logo */}
        <div className="logo">
          <img src={LogoImg} alt="fireSpot" className="logoItem" />
        </div>

        {/* newCV */}

        <div
          className="newCV"
          onMouseEnter={() => {
            this.resetPosition();
            this.resetBackgroundColor();
          }}
          onClick={() => this.props.fetchDefaultCV()}
          onMouseDown={() => {
            this.refNewModal.open();
            this.resetBackgroundColor();
          }}
        >
          <div className="menuItemText">
            <img src={NewImg} alt="fireSpot" className="iconImg" />
            <p className="iconText">New</p>
          </div>
        </div>

        {/* upload CV */}
        <div
          className="uploadCV"
          onMouseEnter={() => {
            this.resetPosition();
            this.resetBackgroundColor();
          }}
        >
          <div className="menuItemText">
            <img src={UploadImg} alt="fireSpot" className="iconImg" />
            <p className="iconText">Upload</p>
          </div>
        </div>

        {/* form CV */}

        <div
          className="formCV"
          onMouseDown={() => {
            this.refTemplateModal.open();
            this.resetBackgroundColor();
          }}
          onMouseEnter={() => {
            this.resetPosition();
            this.resetBackgroundColor();
          }}
        >
          <div className="menuItemText">
            <img src={FormImg} alt="fireSpot" className="iconImg" />
            <p className="iconText">Template</p>
          </div>
        </div>

        {/* language */}
        <div
          className="language"
          ref={el => (this.languageRef = el)}
          style={this.state.backgroundFlag}
          onMouseEnter={() =>
            this.setState({
              backgroundFlag: {
                backgroundColor: Constant.color.hoverBackground
              }
            })
          }
        >
          <div
            className="menuItemText"
            onMouseDown={() => {
              this.refLanguageModal.open();
              this.resetBackgroundColor();
            }}
          >
            <div className="languageWrapper">
              <img src={LanguageImg} alt="fireSpot" className="languageIcon" />
              {/* <img  src={FlagImg}  alt="fireSpot" className='flagIcon'/> */}

              {languageFilter.map((lang, index) => {
                return <i className={lang.icon} key={index} />;
              })}
            </div>
            <p className="headerLang iconText">Language</p>
          </div>
        </div>
      </div>
    );
  }

  /**
  |--------------------------------------------------
  | RENDER CENTER SEGMENT
  |--------------------------------------------------
  */
  renderCenterSegment() {
    return (
      <div
        onMouseEnter={() => {
          this.resetPosition();
          this.resetBackgroundColor();
        }}
      >
        <CenterSegment />
      </div>
    );
  }

  /**
  |--------------------------------------------------
  | Render Right Segment
  |--------------------------------------------------
  */
  renderRightSegment() {
    return (
      <div className="rightSegment">
        {/* Photo */}
        <div
          className="photo"
          ref={el => (this.photoRef = el)}
          style={this.state.backgroundPicture}
          onMouseEnter={() => this.showMenuHoverItem()}
        >
          <div className="menuItemText">
            <img src={PhotoImg} alt="fireSpot" className="iconImg" />
            <p className="iconText">Picture</p>
          </div>
        </div>

        {/*  Signature */}

        <div
          className="signature"
          ref={el => (this.signatureRef = el)}
          onMouseEnter={() => this.showSignatureHoverItem()}
          style={this.state.backgroundSignature}
        >
          <div className="menuItemText">
            <img src={SignatureImg} alt="fireSpot" className="iconImg" />
            <p className="iconText">Signature</p>
          </div>
        </div>

        {/* Additional */}
        <div
          className="additional"
          ref={el => (this.additionalRef = el)}
          onMouseEnter={() => this.showAdditionalHoverItem()}
          style={this.state.backgroundAdditional}
        >
          <div className="menuItemText">
            <img src={AdditionalImg} alt="fireSpot" className="iconImg" />
            <p className="iconText">Additional</p>
          </div>
        </div>

        {/* Download */}
        <div
          className="download"
          onMouseEnter={() => {
            this.resetPosition();
            this.resetBackgroundColor();
          }}
          onClick={() => this.props.activateRightNavMod(true, 'Download')}
        >
          <div className="menuItemText">
            <img src={DownloadImg} alt="fireSpot" className="downloadIcon" />
            <p className="iconText">Download</p>
          </div>
        </div>

        {/* Account */}
        <div
          className="account"
          onMouseEnter={() => {
            this.resetPosition();
            this.resetBackgroundColor();
          }}
        >
          <div
            className="menuItemText"
            onClick={() => this.props.activateRightNavMod(true, 'Register')}
          >
            <img src={AccountImg} alt="fireSpot" className="AccountIcon" />
            <p className="accountText">Acccount</p>
          </div>
        </div>
      </div>
    );
  }

  /**
  |--------------------------------------------------
  | SHOW MENU HOVER ITEM
  |--------------------------------------------------
  */
  showMenuHoverItem() {
    this.setState({
      isShowMenu: true,
      isShowSignature: false,
      isShowAdditional: false,
      styleHoverMenu: {
        top:
          this.photoRef.getBoundingClientRect().top +
          this.photoRef.getBoundingClientRect().height +
          0.5,

        left: this.photoRef.getBoundingClientRect().left,
        position: 'fixed',
        zIndex: 9999999999
      },
      backgroundPicture: {
        backgroundColor: Constant.color.hoverBackground
      },
      backgroundSignature: {
        backgroundColor: Constant.color.white
      },
      backgroundAdditional: {
        backgroundColor: Constant.color.white
      },
      backgroundFlag: {
        backgroundColor: Constant.color.white
      }
    });
  }

  /**
  |--------------------------------------------------
  | SHOW SIGNATURE HOVER ITEM
  |--------------------------------------------------
  */

  showSignatureHoverItem() {
    // const tablet =
    //   this.state.windowWidth > 768 && this.state.windowWidth < 1200;
    this.setState({
      isShowSignature: true,
      isShowMenu: false,
      isShowAdditional: false,
      styleHoverMenu: {
        top:
          this.signatureRef.getBoundingClientRect().top +
          this.signatureRef.getBoundingClientRect().height +
          0.5,
        left: this.signatureRef.getBoundingClientRect().left,
        position: 'fixed',
        zIndex: 9999999999
      },
      backgroundSignature: {
        backgroundColor: Constant.color.hoverBackground
      },
      backgroundPicture: {
        backgroundColor: Constant.color.white
      },
      backgroundAdditional: {
        backgroundColor: Constant.color.white
      },
      backgroundFlag: {
        backgroundColor: Constant.color.white
      }
    });
  }

  /**
  |--------------------------------------------------
  | SHOW ADDITIONAL HOVER ITEM
  |--------------------------------------------------
  */

  showAdditionalHoverItem() {
    const tablet =
      this.state.windowWidth > 768 && this.state.windowWidth < 1200;
    this.setState({
      isShowAdditional: true,
      isShowMenu: false,
      isShowSignature: false,
      styleHoverMenu: {
        top:
          this.additionalRef.getBoundingClientRect().top +
          this.additionalRef.getBoundingClientRect().height +
          0.5,
        left: this.additionalRef.getBoundingClientRect().left,
        position: 'fixed',
        zIndex: 9999999999
      },
      backgroundAdditional: {
        backgroundColor: Constant.color.hoverBackground
      },
      backgroundPicture: {
        backgroundColor: Constant.color.white
      },
      backgroundSignature: {
        backgroundColor: Constant.color.white
      },
      backgroundFlag: {
        backgroundColor: Constant.color.white
      }
    });
  }

  /**
  |--------------------------------------------------
  | SHOW SUB MENU
  |--------------------------------------------------
  */
  showSubMenu() {
    const iPad = this.state.windowWidth === 768;
    this.setState({
      isShowSubMenu: !this.state.isShowSubMenu,
      styleHoverMenu: {
        top:
          // this.colorRef.getBoundingClientRect().top,
          this.colorRef.getBoundingClientRect().height + 25,
        left: iPad ? '80%' : '65%',
        position: 'absolute',
        zIndex: 9
      }
    });
  }

  resetPosition() {
    this.setState({
      isShowMenu: false,
      isShowSignature: false,
      isShowAdditional: false
    });
  }
  /**
  |--------------------------------------------------
  | RENDER MENU HOVER ITEM
  |--------------------------------------------------
  */

  resetBackgroundColor() {
    this.setState({
      backgroundPicture: {
        backgroundColor: Constant.color.white
      },
      backgroundSignature: {
        backgroundColor: Constant.color.white
      },
      backgroundAdditional: {
        backgroundColor: Constant.color.white
      },
      backgroundFlag: {
        backgroundColor: Constant.color.white
      }
    });
  }

  renderMenuHoverItem() {
    if (this.state.isShowMenu) {
      return (
        <div
          className="menuHover"
          style={this.state.styleHoverMenu}
          onMouseEnter={() => this.setState({ isShowMenu: true })}
          onMouseLeave={() => {
            this.setState({ isShowMenu: false });
            this.resetBackgroundColor();
          }}
        >
          <HeaderMenuHover
            showChooseSizeModal={this.showChooseSizeOnPhotoModal}
            showUploadModal={this.showUploadOnPhotoModal}
            showCropModal={this.showCropOnPhotoModal}
          />
        </div>
      );
    } else if (this.state.isShowSignature) {
      return (
        <div
          className="menuHover"
          style={this.state.styleHoverMenu}
          onMouseEnter={() => this.setState({ isShowSignature: true })}
          onMouseLeave={() => {
            this.setState({ isShowSignature: false });
            this.resetBackgroundColor();
          }}
        >
          <SignatureMenuHover
            showUploadModal={this.showUploadOnSignatureModal}
            showCropModal={this.showCropOnSignatureModal}
          />
        </div>
      );
    } else if (this.state.isShowAdditional) {
      return (
        <div
          className="menuHover"
          style={this.state.styleHoverMenu}
          onMouseEnter={() => this.setState({ isShowAdditional: true })}
          onMouseLeave={() => {
            this.setState({ isShowAdditional: false });
            this.resetBackgroundColor();
          }}
        >
          <AdditionalMenuHover />
        </div>
      );
    }
  }

  renderSubMenuMobile() {
    const { isActivateHover } = this.props.header.toJS();
    if (this.state.windowWidth <= 768) {
      if (this.state.isShowSubMenu && isActivateHover) {
        return (
          <div
            className="menuHover"
            style={this.state.styleHoverMenu}
            ref={el => (this.subMenuMobileRef = el)}
          >
            <SubMenuMobile />
          </div>
        );
      }
    } else {
      return null;
    }
  }

  /**
  |--------------------------------------------------
  | RENDER SLIDER
  |--------------------------------------------------
  */

  handleZoomKeyCode = event => {
    const { bodyScale } = this.props.body.toJS();
    if (event.keyCode === 37) {
      if (bodyScale > 0.55) {
        this.props.decreaseBodyScale();
      } else {
        return null;
      }
    } else if (event.keyCode === 39) {
      if (bodyScale < 1.75) {
        this.props.increaseBodyScale();
      } else if (bodyScale === 1.75 || bodyScale > 1.75) {
        return null;
      }
    } else {
      return null;
    }
  };
  componentDidUpdate() {
    if (this.state.isShowSlider) this.focusDiv();
  }
  focusDiv() {
    ReactDOM.findDOMNode(this.refDiv).focus();
  }
  renderSlider() {
    const { bodyScale } = this.props.body.toJS();
    if (this.state.windowWidth > 768 && this.state.isShowSlider) {
      return (
        <div
          className="sliderWrapper"
          style={this.state.sliderMenu}
          tabIndex="1"
          onKeyDown={this.handleZoomKeyCode}
          ref={el => (this.refDiv = el)}
        >
          <div
            onClick={() => {
              this.props.decreaseBodyScale();
            }}
          >
            <FontAwesomeIcon icon={MinusCircle} className="minusCircle" />
          </div>

          <Slider
            min={0.5}
            max={1.75}
            defaultValue={1}
            step={0.15}
            activeDotStyle={{
              backgroundColor: Constant.color.theme,
              borderColor: Constant.color.theme
            }}
            railStyle={{
              backgroundColor: Constant.color.gray
            }}
            handleStyle={{
              backgroundColor: Constant.color.white,
              borderColor: Constant.color.theme
            }}
            trackStyle={{
              backgroundColor: Constant.color.theme
            }}
            value={bodyScale}
            onChange={e => {
              this.props.setBodyScale(e);
            }}
          />
          <div
            onClick={() => {
              this.props.increaseBodyScale();
            }}
          >
            <FontAwesomeIcon icon={PlusCircle} className="plusCircle" />
          </div>
        </div>
      );
    }
  }

  showSlider() {
    this.setState({
      isShowSlider: true,
      sliderMenu: {
        top:
          this.guideRef.getBoundingClientRect().top +
          this.guideRef.getBoundingClientRect().height +
          1,
        left: this.guideRef.getBoundingClientRect().left,
        position: 'fixed',
        zIndex: 9999999999
      }
    });
    this.forceUpdate();
  }

  cancelLanguageConfirm() {
    this.refRefreshLanguageModal.close();
    this.refLanguageModal.open();
  }

  selectedLanguage() {
    this.refLanguageModal.close();
    this.refRefreshLanguageModal.open();
  }

  // SHARE BOX
  showShareBox() {
    this.setState({
      isShowShareBox: !this.state.isShowShareBox,
      shareHoverMenu: {
        top:
          this.shareRef.getBoundingClientRect().top +
          this.shareRef.getBoundingClientRect().height,
        left: this.signatureRef.getBoundingClientRect().right + 12,
        position: 'fixed',
        zIndex: 9999999999
      }
    });
  }
  renderShareBox() {
    const { isShowShareBox, shareHoverMenu } = this.state;
    if (isShowShareBox) {
      return (
        <div style={shareHoverMenu}>
          <ShareBox />
        </div>
      );
    }
  }
  renderChecker(color) {
    const passDatas = this.props.cv.getIn(['cvDatas', 'passDatas']);
    if (Immutable.Iterable.isIterable(passDatas)) {
      if (passDatas.get('primaryColor') === color) {
        return <img src={Checked} className="checkedColor" />;
      }
      return null;
    }
  }

  // RENDER SUB HEADER
  renderSubHeader() {
    const { windowWidth } = this.state;
    const colorClass = windowWidth <= 768 ? 'colorMobile' : 'colorDesktop';
    return (
      <div className="subHeader">
        {/* GUIDE SIDE */}
        <div className="guideSide" ref={el => (this.guideRef = el)}>
          <div className="zoom" onMouseEnter={() => this.showSlider()}>
            <FontAwesomeIcon icon={FaSearch} className="faSearchPlus" />
          </div>
          <div
            className="guide"
            onClick={() => this.props.activateRightNavMod(true, 'Guide')}
          >
            <p>Guide</p>
          </div>
        </div>

        {/* COLOR PALLETE SIDE */}
        <div className="colorPalette">
          {myColor.map((color, index) => {
            return (
              <div
                style={colorDiv}
                key={index}
                onClick={() => this.props.setPrimaryColor(color)}
                className="colorItemWrapper"
                ref={el => (this.colorRef = el)}
              >
                <div
                  style={{
                    backgroundColor: color
                  }}
                  className={colorClass}
                />
                {this.renderChecker(color)}
              </div>
            );
          })}
        </div>

        {/* ADVICE SIDE */}

        <div className="adviceSide" ref={el => (this.adviceRef = el)}>
          <div
            className="faEllipsisH"
            onClick={() => {
              this.showSubMenu();
              this.props.activateHoverItem(true);
            }}
            ref={el => (this.threeDotRef = el)}
          >
            <FontAwesomeIcon icon={ThreeDot} className="threeDotIcon" />
          </div>

          {this.renderSubMenuMobile()}
          <div className="advice">
            {this.renderMenuHoverItem()}
            {this.renderSlider()}
            {this.renderShareBox()}
            <div onClick={() => this.props.activateRightNavMod(true, 'Advice')}>
              <p>Advice</p>
            </div>
          </div>

          <div
            className="share"
            ref={el => (this.shareRef = el)}
            onClick={() => this.showShareBox()}
          >
            <FontAwesomeIcon icon={FaShare} style={{ fontSize: 15 }} />
          </div>
        </div>
        {this.renderRightNav()}
        {this.renderLeftBanner()}
      </div>
    );
  }

  /**
  |--------------------------------------------------
  | RENDER MOBILE SEGMENT
  |--------------------------------------------------
  */
  renderMobileSegment() {
    if (this.state.windowWidth <= 768) {
      return (
        <div className="mobileSegment">
          {/* LOGO */}
          <div className="logoMobile">
            <img src={LogoImg} alt="fireSpot" className="logoMobileImg" />
          </div>
          {/* TEMPLATE */}
          <div
            className="templateMobile"
            onMouseDown={() => {
              this.refTemplateModal.open();
            }}
          >
            <img src={FormImg} alt="fireSpot" className="templateMobileImg" />
            <p className="iconText">Template</p>
          </div>
          {/* ADDITIONAL */}
          <div className="additionalMobile">
            <img
              src={AdditionalImg}
              alt="fireSpot"
              className="additionalMobileImg"
            />
            <p className="iconText">Additional</p>
          </div>
          {/* DOWNLOAD */}
          <div
            className="downloadMobile"
            onClick={() => this.props.activateRightNavMod(true, 'Download')}
          >
            <img
              src={DownloadImg}
              alt="fireSpot"
              className="downloadMobileImg"
            />
            <p className="iconText">Download</p>
          </div>
          {/* ACCOUNT */}
          <div
            className="accountMobile"
            onClick={() => this.props.activateRightNavMod(true, 'Register')}
          >
            <img src={AccountImg} alt="fireSpot" className="accountMobileImg" />
            <p className="iconText">Account</p>
          </div>
        </div>
      );
    }
  }

  /**
  |--------------------------------------------------
  | RENDER RIGHT NAV
  |--------------------------------------------------
  */
  renderModuleName() {
    const { moduleRightName } = this.state;

    // CV body align to left of screen
    this.props.setBodyAlignLeft();

    switch (moduleRightName) {
      case 'Contact':
        return <Contact />;
        break;
      case 'Advice':
        return <Advice />;
        break;
      case 'Login':
        return <Login />;
        break;
      case 'Feedback':
        return <FeedBack />;
        break;
      case 'Download':
        return <Download />;
        break;
      case 'Guide':
        return <Guide />;
      case 'FindPassword':
        return <FindPassword />;
      case 'Register':
        return <Register />;
      default:
        break;
    }
  }
  renderRightNav() {
    const {
      isShowRightNav,
      rightNavStyle,
      moduleRightName,
      windowWidth
    } = this.state;
    if (isShowRightNav) {
      return (
        <div style={rightNavStyle}>
          <RightNav moduleName={moduleRightName}>
            {this.renderModuleName()}
          </RightNav>
        </div>
      );
    } else {
      if (windowWidth > 768) {
        return (
          <div
            style={{
              top: 70,
              right: 0,
              position: 'absolute'
            }}
          >
            <RightBanner />
          </div>
        );
      }
    }
  }

  /**
  |--------------------------------------------------
  | BANNER SECTION
  |--------------------------------------------------
  */

  renderLeftBanner() {
    const { alignLeft } = this.props.body.toJS();
    const { windowWidth } = this.state;
    if (!alignLeft && windowWidth > 768) {
      return (
        <div
          style={{
            top: 70,
            left: 0,
            position: 'absolute'
          }}
        >
          <LeftBanner />
        </div>
      );
    } else {
      return null;
    }
  }

  /**
  |--------------------------------------------------
  | MAIN RENDER
  |--------------------------------------------------
  */
  render() {
    return (
      <div
        className="container"
        onMouseLeave={() => {
          this.setState({ isShowSlider: false });
          this.resetPosition();
          this.resetBackgroundColor();
        }}
      >
        <div className="header">
          {/* Left Segment */}
          {this.renderLeftSegment()}

          {/* Center Segment */}
          {this.renderCenterSegment()}

          {/* Right Segment */}
          {this.renderRightSegment()}

          {/* Mobile Segment */}
          {this.renderMobileSegment()}
        </div>

        {/* Sub Header */}
        {this.renderSubHeader()}

        <Modal
          showCloseBtn={false}
          autoWidth
          ref={ref => (this.refPhotoModal = ref)}
        >
          <PhotoModal onCloseModal={() => this.refPhotoModal.close()} />
        </Modal>

        <Modal
          showCloseBtn={false}
          autoWidth
          ref={ref => (this.refSignatureModal = ref)}
        >
          <SignatureModal onCloseModal={() => this.refSignatureModal.close()} />
        </Modal>

        <Modal ref={ref => (this.refLanguageModal = ref)}>
          <LanguageModal onCloseModal={() => this.selectedLanguage()} />
        </Modal>

        <Modal ref={ref => (this.refNewModal = ref)} showCloseBtn={false}>
          <NewModal onCloseModal={() => this.refNewModal.close()} />
        </Modal>

        <Modal showCloseBtn={false} ref={ref => (this.refTemplateModal = ref)}>
          <TemplateModal onCloseModal={() => this.refTemplateModal.close()} />
        </Modal>

        <Modal
          ref={ref => (this.refRefreshLanguageModal = ref)}
          showCloseBtn={false}
        >
          <RefreshLanguageModal
            onCloseModal={() => this.cancelLanguageConfirm()}
            onRefreshModal={() => this.refRefreshLanguageModal.close()}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    body: state.get('body'),
    rightNav: state.get('rightNav'),
    header: state.get('header'),
    cv: state.get('cv'),
    language: state.get('language')
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      increaseBodyScale,
      decreaseBodyScale,
      setBodyScale,
      activateRightNavMod,
      activateHoverItem,
      setPrimaryColor,
      fetchDefaultCV,
      showUploadPhotoModal,
      showCropPhotoModal,
      showChooseSizePhotoModal,
      showUploadSignature,
      showCropSignature,
      initializeModal,

      // align cv body
      setBodyAlignLeft
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
