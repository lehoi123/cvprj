import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { activateHoverItem } from '../../modules/header.module';
import FaShare from '@fortawesome/fontawesome-free-solid/faShareAlt';
import '../../styles/header/subMenuMobile.css';

import NewImg from '../../assets/assets/images/header/new/new.svg';
import UploadImg from '../../assets/assets/images/header/upload/upload.svg';
import LanguageImg from '../../assets/assets/images/header/language/language.svg';
import PictureImg from '../../assets/assets/images/header/photo/photo.svg';
import SignatureImg from '../../assets/assets/images/header/signature/signature.svg';
import Modal from '../Modals/modal';
import NewModal from '../../components/Modals/Refresh/newModal';
import LanguageModal from '../../components/Modals/Languages/languageModal';
import SignatureModal from '../../components/Modals/Signature/signatureModal';
import PhotoModal from '../../components/Modals/Photo/photoModal';
import ShareBox from '../RightNav/shareBox';
import languageData from '../../json/modals/languageData';

class SubMenuMobile extends Component {
  render() {
    const { countryId, continentId } = this.props.language.toJS();
    const languageFilter = languageData[continentId].countries.filter(
      languageObj => languageObj.id === countryId
    );

    return (
      <div className="subMenuMobContainer">
        {/* NEW IMAGE */}
        <div
          className="subNew"
          onMouseDown={() => {
            this.refNewModal.open();
          }}
        >
          <img src={NewImg} alt="Sub New Image" className="subIcon" />
          <p>New</p>
        </div>

        {/* UPLOAD IMAGE */}
        <div
          className="subUpload"
          onMouseDown={() => {
            this.refPhotoModal.open();
          }}
        >
          <img src={UploadImg} alt="Sub Upload Image" className="subIcon" />
          <p>Upload</p>
        </div>

        {/* LANGUAGE IMAGE */}
        <div
          className="subLanguage"
          onMouseDown={() => {
            this.refLanguageModal.open();
          }}
        >
          <img
            src={LanguageImg}
            alt="Sub Language Image"
            className="subLanguageIcon"
          />
          {languageFilter.map((lang, index) => {
            return <i className={lang.icon} key={index} />;
          })}
          <p className="languageText">Language</p>
        </div>

        {/* PICTURE IMAGE */}
        <div
          className="subPicture"
          onMouseDown={() => {
            this.refPhotoModal.open();
          }}
        >
          <img src={PictureImg} alt="Sub Picture Image" className="subIcon" />
          <p>Picture</p>
        </div>

        {/* SIGNATURE IMAGE */}
        <div
          className="subSignature"
          onMouseDown={() => {
            this.refSignatureModal.open();
          }}
        >
          <img
            src={SignatureImg}
            alt="Sub Signature Image"
            className="subIcon"
          />
          <p>Signature</p>
        </div>

        {/* SHARE IMAGE */}
        <div
          className="subShare"
          onMouseDown={() => this.refShareMobile.open()}
        >
          <FontAwesomeIcon icon={FaShare} className="faSearchPlus" />
          <p>Share</p>
        </div>
        <Modal showCloseBtn={false} ref={ref => (this.refPhotoModal = ref)}>
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
          <LanguageModal onCloseModal={() => this.refLanguageModal.close()} />
        </Modal>

        <Modal ref={ref => (this.refNewModal = ref)} showCloseBtn={false}>
          <NewModal onCloseModal={() => this.refNewModal.close()} />
        </Modal>

        <Modal ref={ref => (this.refShareMobile = ref)} shareMobile>
          <div className="shareBoxMobile">
            <ShareBox />
          </div>
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
      activateHoverItem
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubMenuMobile);
