import { Record } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import LocalStorageHelper from '../../helper/local_storage.helper';
import { addSignatureToCV } from '../mainPage/cv.module';
/**
|--------------------------------------------------
| GENERATE TYPE OF PHOTO MODAL's REDUCER
|--------------------------------------------------
*/

/* INITIALIZE ACTION CONSTANTS */
const INITIALIZE_MODAL = 'signature-modal/INITIALIZE_MODAL';
const INITIALIZE_CROPPER_PICTURE = 'signature-modal/INITIALIZE_CROPPER_PICTURE';
const INITIALIZE_CROPPED_PICTURE = 'signature-modal/INITIALIZE_CROPPED_PICTURE';

/* HIGHLIGHT TAB ACTION CONSTANTS */
const HIGHLIGHT_UPLOAD = 'signature-modal/HIGHLIGHT_UPLOAD';
const HIGHLIGHT_CROP = 'signature-modal/HIGHLIGHT_CROP';
/* SWITCH UPLOAD TO CROP ACTION CONSTANTS */
const SWITCH_TO_CROP = 'signature-modal/SWITCH_TO_CROP';

/* CHANGE IMAGE ACTION CONSTANTS */
const INPUT_URL_CHANGE = 'signature-modal/INPUT_URL_CHANGE';
const HANDLE_IMAGE_CHANGE = 'signature-modal/HANDLE_IMAGE_CHANGE';

/* HANDLE ACTION CONSTANTS */
const HANDLE_CROP_IMAGE = 'signature-modal/HANDLE_CROP_IMAGE';
const HANDLE_SAVE_CROP_CONFIG = 'signature-modal/HANDLE_SAVE_CROP_CONFIG';

const HIDE_SIGNATURE = 'signature/HIDE_SIGNATURE';
/**
|--------------------------------------------------
| DEFINE DIMENSION OF PREVIEW AND MODAL
|--------------------------------------------------
*/
const UPLOAD_MODAL_WIDTH = '502px';
const DEFAULT_INPUT_HEIGHT = '50px';
const RESIZE_INPUT_HEIGHT = '25px';
const DEFAULT_PREVIEW_WIDTH = '191px';
const DEFAULT_SIGNATURE_SIZE = '120px';
const DEFAULT_CROP_CONFIGURATION = {
  height: 100,
  width: 100,
  x: 0,
  y: 0
};
/**
|--------------------------------------------------
| DEFINE PHOTO MODAL RECORD AND INITIALIZE STATE
|--------------------------------------------------
*/

const modalRecord = new Record({
  isHighlightUploadSignature: true,
  imageSignatureUrl: '',
  isHaveSignature: false,
  imageInputSignatureUrl: '',
  imageBrowserSignatureUrl: '',
  inputSignatureHeight: '25px',
  cropSignature: DEFAULT_CROP_CONFIGURATION,
  signatureSize: DEFAULT_SIGNATURE_SIZE,
  isShowSignature: false
});

const initRecord = modalRecord();

/**
|--------------------------------------------------
| GENERATE ACTIONS SET TYPE FOR REDUCER
|--------------------------------------------------
*/
const setInitialModal = createAction(INITIALIZE_MODAL);
const setHighlightUpload = createAction(HIGHLIGHT_UPLOAD);
const setHighlightCrop = createAction(HIGHLIGHT_CROP);
const setInputChange = createAction(INPUT_URL_CHANGE);
const setSwitchToCrop = createAction(SWITCH_TO_CROP);
const setHandleImageChange = createAction(HANDLE_IMAGE_CHANGE);
const setHandleCropOnImage = createAction(HANDLE_CROP_IMAGE);
const setHandleSaveCrop = createAction(HANDLE_SAVE_CROP_CONFIG);
const setInitialCropperSignature = createAction(INITIALIZE_CROPPER_PICTURE);
const setInitialCroppedSignature = createAction(INITIALIZE_CROPPED_PICTURE);
const hideSignature = createAction(HIDE_SIGNATURE);

export const hideShowSignature = () => dispatch => {
  dispatch(hideSignature());
};
/**
|--------------------------------------------------
| GENERATE PRIVATE ASYNC FUNCTION
|--------------------------------------------------
*/

const cropImage = async (img, cropSignature) => {
  if (cropSignature) {
    img.crossOrigin = 'anonymous';
    const canvas = document.getElementById('signatureCanvas');
    if (canvas) {
      const context = canvas.getContext('2d');
      const targetX = (img.width * cropSignature.x) / 100;
      const targetY = (img.height * cropSignature.y) / 100;
      const targetWidth = (img.width * cropSignature.width) / 100;
      const targetHeight = (img.height * cropSignature.height) / 100;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      context.drawImage(
        img,
        targetX,
        targetY,
        targetWidth,
        targetHeight,
        0,
        0,
        138,
        80
      );
    }
  }
};

/**
|--------------------------------------------------
| GENERATE ACTIONS OF PHOTO MODAL
|--------------------------------------------------
*/

/* INITIALIZE ACTIONS */
export const startSignatureModal = key => dispatch => {
  LocalStorageHelper.fetchDataFromStorage(key, initRecord).then(payload => {
    dispatch(setInitialModal(payload));
  });
};

export const initialCropperSignature = key => dispatch => {
  LocalStorageHelper.fetchDataFromStorage(key, initRecord).then(response => {
    dispatch(setInitialCropperSignature(response.cropSignature));
  });
};

export const initialCroppedSignature = (key, signature) => dispatch => {
  const { url, cropSignature } = signature;

  if (url === undefined || url === null || url === '') {
    LocalStorageHelper.fetchDataFromStorage(key, initRecord).then(response => {
      LocalStorageHelper.loadImage(response.imageSignatureUrl).then(image =>
        cropImage(image, response.cropSignature).then(() => {
          dispatch(
            setInitialCroppedSignature({ cropSignature, isHaveSignature: true })
          );
          dispatch(addSignatureToCV());
        })
      );
    });
  } else {
    LocalStorageHelper.loadImage(url).then(image =>
      cropImage(image, cropSignature).then(() => {
        dispatch(
          setInitialCroppedSignature({ cropSignature, isHaveSignature: true })
        );
        dispatch(addSignatureToCV());
      })
    );
  }
};

/* HIGHLIGHT ACTIONS */
export const showUploadSignature = () => dispatch => {
  dispatch(setHighlightUpload(UPLOAD_MODAL_WIDTH));
};

export const showCropSignature = () => dispatch => {
  dispatch(setHighlightCrop());
};

export const handleCropOnImage = (
  key,
  imageSignatureUrl,
  cropSignature
) => dispatch => {
  LocalStorageHelper.loadImage(imageSignatureUrl).then(image =>
    LocalStorageHelper.pushDataToStorage(
      key,
      { cropSignature },
      initRecord
    ).then(() => {
      dispatch(addSignatureToCV());
      cropImage(image, cropSignature).then(() => {
        dispatch(setHandleCropOnImage(cropSignature));
      });
    })
  );
};

/* SWITCH UPLOAD TO CROP ACTION */
export const switchToCrop = (key, imageObject) => dispatch => {
  LocalStorageHelper.pushDataToStorage(key, imageObject, initRecord).then(
    dispatch(setSwitchToCrop())
  );
};

/* IMAGE CHANGE ACTIONS */
export const inputUrlOnChange = e => dispatch => {
  const { value } = e.target;
  let inputSignatureHeight = DEFAULT_INPUT_HEIGHT;
  let width = UPLOAD_MODAL_WIDTH;
  let previewWidth = DEFAULT_PREVIEW_WIDTH;
  if (value === undefined || value.length <= 0) {
    inputSignatureHeight = RESIZE_INPUT_HEIGHT;
  }

  dispatch(
    setInputChange({
      value,
      inputSignatureHeight,
      width,
      previewWidth
    })
  );
};

/* On Receive File after choose file */
export const handleImageChange = e => dispatch => {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];
  let imageInputSignatureUrl = '';
  let inputSignatureHeight = RESIZE_INPUT_HEIGHT;

  if (file) {
    reader.readAsDataURL(file);
  }

  reader.onloadend = () => {
    let result = reader.result;
    dispatch(
      setHandleImageChange({
        result,
        imageInputSignatureUrl,
        inputSignatureHeight
      })
    );
  };
};

/* LOCAL STORAGE ACTION */
export const handleCropChange = (key, cropSignature) => dispatch => {
  LocalStorageHelper.pushDataToStorage(key, { cropSignature }, initRecord).then(
    dispatch(setHandleSaveCrop(cropSignature))
  );
};

/**
|--------------------------------------------------
| GENERATE REDUCER
|--------------------------------------------------
*/

const actions = {
  [INITIALIZE_MODAL]: (state, action) => {
    const {
      imageSignatureUrl,
      imageInputSignatureUrl,
      imageBrowserSignatureUrl,
      isHaveSignature
    } = action.payload;

    return state.withMutations(s =>
      s
        .set('isHaveSignature', isHaveSignature)
        .set('imageSignatureUrl', imageSignatureUrl)
        .set('imageInputSignatureUrl', imageInputSignatureUrl)
        .set('imageBrowserSignatureUrl', imageBrowserSignatureUrl)
    );
  },
  [HIGHLIGHT_UPLOAD]: (state, _action) => {
    return state.withMutations(s => s.set('isHighlightUploadSignature', true));
  },
  [HIGHLIGHT_CROP]: (state, _action) => {
    return state.withMutations(s => s.set('isHighlightUploadSignature', false));
  },
  [INPUT_URL_CHANGE]: (state, action) => {
    const { payload } = action;
    const { value, inputSignatureHeight } = payload;

    return state.withMutations(s =>
      s
        .set('imageSignatureUrl', value)
        .set('imageBrowserSignatureUrl', null)
        .set('imageInputSignatureUrl', value)
        .set('inputSignatureHeight', inputSignatureHeight)
    );
  },
  [SWITCH_TO_CROP]: (state, _action) => {
    return state.withMutations(s =>
      s.set('isHaveSignature', true).set('isHighlightUploadSignature', false)
    );
  },
  [HANDLE_IMAGE_CHANGE]: (state, action) => {
    const { payload } = action;
    const { result, imageInputSignatureUrl, inputSignatureHeight } = payload;

    return state.withMutations(s =>
      s
        .set('imageSignatureUrl', result)
        .set('imageBrowserSignatureUrl', result)
        .set('imageInputSignatureUrl', imageInputSignatureUrl)
        .set('inputSignatureHeight', inputSignatureHeight)
    );
  },
  [HANDLE_CROP_IMAGE]: (state, action) => {
    return state.withMutations(s => s.set('cropSignature', action.payload));
  },
  [HANDLE_SAVE_CROP_CONFIG]: (state, action) => {
    return state.withMutations(s => s.set('cropSignature', action.payload));
  },
  [INITIALIZE_CROPPER_PICTURE]: (state, action) => {
    return state.withMutations(s => s.set('cropSignature', action.payload));
  },
  [INITIALIZE_CROPPED_PICTURE]: (state, action) => {
    const { cropSignature, isHaveSignature } = action.payload;
    return state.withMutations(s =>
      s
        .set('cropSignature', cropSignature)
        .set('isHaveSignature', isHaveSignature)
    );
  },
  [HIDE_SIGNATURE]: state => {
    return state.withMutations(s =>
      s.set('isShowSignature', !state.isShowSignature)
    );
  }
};

export default handleActions(actions, initRecord);
