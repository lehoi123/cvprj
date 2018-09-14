import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Templates from '../../../components/MainPage/CV/templates';
import '../../../styles/mainPage/cv/styles.cv.css';
// defaultTemplate
import '../../../styles/mainPage/cv/defaultTemplate/styles.defaultTemplate.css';
import '../../../styles/mainPage/cv/Template02/styles.Template02.css';

import { fetchCVFromStorage } from '../../../modules/mainPage/cv.module';
import {
  initialCroppedImage,
  showChooseSizePhotoModal,
  showCropPhotoModal
} from '../../../modules/modals/photoModal.module';
import {
  initialCroppedSignature,
  showUploadSignature,
  showCropSignature
} from '../../../modules/modals/signatureModal.module';
import Constant from '../../../config/constant';

class CV extends PureComponent {
  constructor(props) {
    super(props);

    // linking methods from this component to parts of template
    this.linkMethods = {
      PersonalDetail: {
        onUpload: () => this.props.openAvatarModal(),
        onCrop: () => {
          this.props.openAvatarModal();
          this.props.showCropPhotoModal();
        },
        onChoosize: () => {
          this.props.openAvatarModal();
          this.props.showChooseSizePhotoModal();
        }
      }
    };
    this.signatureMethod = {
      onUploadSignature: () => {
        this.props.openSignatureModal();
        this.props.showUploadSignature();
      },
      onCropSignature: () => {
        this.props.openSignatureModal();
        this.props.showCropSignature();
      }
    };
  }

  componentDidMount() {
    const { initialCroppedImage, initialCroppedSignature } = this.props;
    const { imageUrl, crop, avatarSize } = this.props.photo;
    const { imageSignatureUrl, cropSignature } = this.props.signature;
    const { storageKey } = Constant.photoModal;

    initialCroppedImage(storageKey, { imageUrl, crop, avatarSize });
    initialCroppedSignature(Constant.signatureModal.storageKey, {
      imageSignatureUrl,
      cropSignature
    });
  }

  /**
   * Render page of CV
   */
  renderPageCV = () => {
    const cvDatas = this.props.cv;
    // template, pages, passDatas
    const template = cvDatas.get('template');
    const pages = cvDatas.get('pages');
    const passDatas = cvDatas.get('passDatas');

    if (!Templates[template]) {
      return <div>Template is not exist!</div>;
    }

    const pageIndexStyles = {
      backgroundColor: passDatas.get('primaryColor')
    };

    if (this.isIterable(pages)) {
      const sumPages = pages.count();
      return pages.map((page, pageNum) => {
        if (this.isIterable(page)) {
          const parts = page.get('parts');
          return (
            <div key={pageNum} className={`${template} cvContent`}>
              {this.renderPartCV({
                template,
                parts,
                pageNum,
                passDatas,
                pagesLength: sumPages
              })}

              <div className="pageIndex" style={pageIndexStyles}>
                <p>{`Page ${pageNum + 1}/${sumPages}`}</p>
              </div>
            </div>
          );
        }
        return null;
      });
    }
    console.warn('Page data is not valid!');
    return null;
  };

  isIterable(object) {
    return Immutable.Iterable.isIterable(object);
  }

  /**
   * Render part of page
   */
  renderPartCV = ({ template, parts, pageNum, passDatas, pagesLength }) => {
    if (this.isIterable(parts)) {
      const openAddPartModal = this.props.openAddPartModal;
      const partsLength = parts.count();
      return parts.map((part, index) => {
        if (this.isIterable(part)) {
          const type = part.get('type');
          const datas = part.get('datas');

          const PartView = Templates[template][type];
          return (
            <PartView
              key={part.get('id')}
              template={template}
              pagesLength={pagesLength}
              partsLength={partsLength}
              part={part}
              pageNum={pageNum}
              partNum={index}
              partType={type}
              openAddPartModal={openAddPartModal}
              datas={datas}
              passDatas={passDatas}
              {...this.linkMethods[type]}
              {...this.signatureMethod}
            />
          );
        }
        return null;
      });
    }
    console.warn('Part data is not valid!');
    return null;
  };

  render() {
    return <div className="cvContainer">{this.renderPageCV()}</div>;
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      initialCroppedImage,
      // cv datas
      fetchCVFromStorage,
      showChooseSizePhotoModal,
      showCropPhotoModal,
      initialCroppedSignature,
      showUploadSignature,
      showCropSignature
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  photo: state.get('photo'),
  cv: state.getIn(['cv', 'cvDatas']),
  signature: state.get('signature')
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CV);
