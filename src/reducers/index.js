import { combineReducers } from 'redux-immutable';

import AppReducer from '../actions/app.action';
import PhotoModalReducer from '../modules/modals/photoModal.module';
import HeaderReducer from '../modules/header.module';
import CropperReducer from '../modules/cropperPicture.module';
import BodyReducer from '../modules/body.module';
import CVReducer from '../modules/mainPage/cv.module';
import CoverLetterReducer from '../modules/mainPage/coverLetter.module';
import RightNavReducer from '../modules/rightNav.module';
import LanguageModalReducer from '../modules/modals/languageModal.module';
import SignatureModalReducer from '../modules/modals/signatureModal.module';
import TemplateModalReducer from '../modules/modals/templateModal.module';

import AuthReducer from '../modules/authentication/auth.module';
import AdviceReducer from '../modules/advice.module';
import GuideReducer from '../modules/guide.module';

const rootReducer = combineReducers({
  AppReducer,
  photo: PhotoModalReducer,
  header: HeaderReducer,
  cropper: CropperReducer,
  body: BodyReducer,
  cv: CVReducer,
  rightNav: RightNavReducer,
  language: LanguageModalReducer,
  coverLetter: CoverLetterReducer,
  signature: SignatureModalReducer,
  template: TemplateModalReducer,
  auth: AuthReducer,
  advice: AdviceReducer,
  guide: GuideReducer
});

export default rootReducer;
