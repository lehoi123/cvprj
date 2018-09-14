import { Record } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import Constant from '../../config/constant';
import LocalStorageHelper from '../../helper/local_storage.helper';
/**
|--------------------------------------------------
| GENERATE TYPE OF PHOTO MODAL's REDUCER
|--------------------------------------------------
*/

/* INITIALIZE ACTION CONSTANTS */
const INITIALIZE_MODAL = 'photo-modal/INITIALIZE_MODAL';
const INITIALIZE_CROPPER_PICTURE = 'photo-modal/INITIALIZE_CROPPER_PICTURE';
const INITIALIZE_CROPPED_PICTURE = 'photo-modal/INITIALIZE_CROPPED_PICTURE';

/* HIGHLIGHT TAB ACTION CONSTANTS */
const HIGHLIGHT_UPLOAD = 'photo-modal/HIGHLIGHT_UPLOAD';
const HIGHLIGHT_CROP = 'photo-modal/HIGHLIGHT_CROP';
const HIGHLIGHT_CHOOSE_SIZE = 'photo-modal/HIGHLIGHT_CHOOSE_SIZE';
/* SWITCH UPLOAD TO CROP ACTION CONSTANTS */
const SWITCH_TO_CROP = 'photo-modal/SWITCH_TO_CROP';

/* CHANGE IMAGE ACTION CONSTANTS */
const INPUT_URL_CHANGE = 'photo-modal/INPUT_URL_CHANGE';
const HANDLE_IMAGE_CHANGE = 'photo-modal/HANDLE_IMAGE_CHANGE';

/* HANDLE ACTION CONSTANTS */
const HANDLE_CROP_IMAGE = 'photo-modal/HANDLE_CROP_IMAGE';
const HANDLE_SAVE_CROP_CONFIG = 'photo-modal/HANDLE_SAVE_CROP_CONFIG';
const HANDLE_CHOOSE_AVATAR_SIZE = 'photo-modal/HANDLE_CHOOSE_AVATAR_SIZE';
const HANDLE_ACCEPT_AVATAR_SIZE = 'photo-modal/HANDLE_ACCEPT_AVATAR_SIZE';

const DETECT_HAVE_PHOTO = 'photo-modal/DETECT_HAVE_PHOTO';
const HIDE_AVATAR = 'photo-modal/HIDE_AVATAR';
const SHOW_AVATAR = 'photo-modal/SHOW_AVATAR';
const DETECT_AVATAR_DISPLAY = 'photo-modal/DETECT_AVATAR_DISPLAY';
const SHOW_HIDE_AVATAR = 'photo-modal/SHOW_HIDE_AVATAR';

/**
|--------------------------------------------------
| DEFINE DIMENSION OF PREVIEW AND MODAL
|--------------------------------------------------
*/
const UPLOAD_PHOTO_MODAL_WIDTH = '502px';
const DEFAULT_INPUT_HEIGHT = '50px';
const RESIZE_INPUT_HEIGHT = '25px';
const DEFAULT_PREVIEW_WIDTH = '191px';
const DEFAULT_AVATAR_SIZE = Constant.photoModal.avatar.size.normal;
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
  isHighlightUpload: true,
  isHighlightCrop: false,
  isHighlightChooseSize: false,
  imageUrl: '',
  isUploaded: false,
  imageInputUrl: '',
  imageBrowserUrl: '',
  inputHeight: '25px',
  width: '',
  height: '',
  crop: DEFAULT_CROP_CONFIGURATION,
  avatarSize: DEFAULT_AVATAR_SIZE,
  isHavePhoto: false,
  isHideAvatar: false,
  isShowAvatar: true,
  avatarDisStatus: false,
  isShowHideAvatar: false
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
const setHighlightChooseSize = createAction(HIGHLIGHT_CHOOSE_SIZE);
const setInputChange = createAction(INPUT_URL_CHANGE);
const setSwitchToCrop = createAction(SWITCH_TO_CROP);
const setHandleImageChange = createAction(HANDLE_IMAGE_CHANGE);
const setHandleCropOnImage = createAction(HANDLE_CROP_IMAGE);
const setHandleSaveCrop = createAction(HANDLE_SAVE_CROP_CONFIG);
const setInitialCropperPicture = createAction(INITIALIZE_CROPPER_PICTURE);
const setInitialCroppedImage = createAction(INITIALIZE_CROPPED_PICTURE);
const setHandleChooseAvatarSize = createAction(HANDLE_CHOOSE_AVATAR_SIZE);
const setHandleAcceptAvatarSize = createAction(HANDLE_ACCEPT_AVATAR_SIZE);

const detectHavePhoto = createAction(DETECT_HAVE_PHOTO);
const hideAvatar = createAction(HIDE_AVATAR);
const showAvatar = createAction(SHOW_AVATAR);
const detectAvatarDisplay = createAction(DETECT_AVATAR_DISPLAY);
const showHideTheAvartar = createAction(SHOW_HIDE_AVATAR);

export const hideShowAvatar = () => (dispatch, getState) => {
  const { storageKey } = Constant.isShowAvatar;
  const avatarStatus = getState().get('photo').avatarDisStatus;
  if (!avatarStatus) {
    LocalStorageHelper.pushDataToStorage(
      storageKey,
      { avatarDisplayStatus: false },
      initRecord
    );
  } else {
    LocalStorageHelper.pushDataToStorage(
      storageKey,
      { avatarDisplayStatus: true },
      initRecord
    );
  }
  dispatch(showHideTheAvartar());
};

export const initializeAvatarStatus = () => dispatch => {
  const { storageKey } = Constant.isShowAvatar;
  LocalStorageHelper.fetchDataFromStorage(storageKey, initRecord).then(
    avatarDisStatus =>
      dispatch(
        detectAvatarDisplay({
          avatarDisStatus: avatarDisStatus.avatarDisplayStatus
        })
      )
  );
};

export const hideTheAvatar = () => dispatch => {
  const { storageKey } = Constant.isShowAvatar;
  LocalStorageHelper.pushDataToStorage(
    storageKey,
    { avatarDisplayStatus: false },
    initRecord
  );
  dispatch(hideAvatar());
  dispatch(detectAvatarDisplay({ avatarDisStatus: false }));
};

export const showTheAvatar = () => dispatch => {
  const { storageKey } = Constant.isShowAvatar;
  LocalStorageHelper.pushDataToStorage(
    storageKey,
    { avatarDisplayStatus: true },
    initRecord
  );
  dispatch(showAvatar());
  dispatch(detectAvatarDisplay({ avatarDisStatus: true }));
};

const cropImage = async (img, crop, avatarSize = DEFAULT_AVATAR_SIZE) => {
  if (crop) {
    img.crossOrigin = 'anonymous';
    const canvas = document.getElementById('avatarCanvas');

    if (canvas) {
      const context = canvas.getContext('2d');
      const targetX = (img.width * crop.x) / 100;
      const targetY = (img.height * crop.y) / 100;
      const targetWidth = (img.width * crop.width) / 100;
      const targetHeight = (img.height * crop.height) / 100;

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const { allAvatarSizes } = Constant.photoModal;

      context.drawImage(
        img,
        targetX,
        targetY,
        targetWidth,
        targetHeight,
        0,
        0,
        allAvatarSizes[avatarSize].pixCel,
        allAvatarSizes[avatarSize].pixCel
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
export const startPhotoModal = key => dispatch => {
  LocalStorageHelper.fetchDataFromStorage(key, initRecord).then(payload => {
    dispatch(setInitialModal(payload));
  });
};

export const initialCropperPicture = key => dispatch => {
  LocalStorageHelper.fetchDataFromStorage(key, initRecord).then(response => {
    dispatch(setInitialCropperPicture(response.crop));
  });
};

export const initialCroppedImage = (key, avatar) => dispatch => {
  const { url, crop, avatarSize } = avatar;

  if (url === undefined || url === null || url === '') {
    LocalStorageHelper.fetchDataFromStorage(key, initRecord).then(response => {
      if (response.imageUrl.length > 0) {
        dispatch(detectHavePhoto(true));
      } else if (response.imageUrl.length === 0) {
        dispatch(detectHavePhoto(false));
      }
      LocalStorageHelper.loadImage(response.imageUrl).then(image =>
        cropImage(image, response.crop, response.avatarSize).then(
          dispatch(
            setInitialCroppedImage({
              crop,
              avatarSize: response.avatarSize
            })
          )
        )
      );
    });
  } else {
    LocalStorageHelper.loadImage(url).then(image =>
      cropImage(image, crop, avatarSize).then(
        dispatch(setInitialCroppedImage({ crop, avatarSize }))
      )
    );
  }
};

/* HIGHLIGHT ACTIONS */
export const showUploadPhotoModal = () => dispatch => {
  dispatch(setHighlightUpload(UPLOAD_PHOTO_MODAL_WIDTH));
};

export const showCropPhotoModal = () => dispatch => {
  dispatch(setHighlightCrop());
};

export const showChooseSizePhotoModal = () => dispatch => {
  dispatch(setHighlightChooseSize());
};

export const handleCropOnImage = (key, imageUrl, crop) => dispatch => {
  LocalStorageHelper.loadImage(imageUrl).then(image =>
    LocalStorageHelper.pushDataToStorage(key, { crop }, initRecord).then(
      cropImage(image, crop).then(dispatch(setHandleCropOnImage(crop)))
    )
  );
};

export const handleChooseAvatarSize = innerText => dispatch => {
  const { size } = Constant.photoModal.avatar;
  let avatarSize = size.normal;

  if (LocalStorageHelper.isCorrectString(innerText)) {
    avatarSize = size[innerText.toLowerCase()];
  }

  dispatch(setHandleChooseAvatarSize(avatarSize));
};

export const handleAcceptAvatarSize = (key, avatar) => dispatch => {
  const { imageUrl, avatarSize, crop } = avatar;
  LocalStorageHelper.loadImage(imageUrl).then(image =>
    LocalStorageHelper.pushDataToStorage(key, { avatarSize }, initRecord).then(
      cropImage(image, crop, avatarSize).then(
        dispatch(setHandleAcceptAvatarSize())
      )
    )
  );
};

/* CANCEL UPLOAD ACTION */

/* SWITCH UPLOAD TO CROP ACTION */
export const switchToCrop = (key, imageObject) => dispatch => {
  LocalStorageHelper.pushDataToStorage(key, imageObject, initRecord).then(
    dispatch(setSwitchToCrop())
  );
};

/* IMAGE CHANGE ACTIONS */
export const inputUrlOnChange = e => dispatch => {
  const { value } = e.target;
  let inputHeight = DEFAULT_INPUT_HEIGHT;
  let width = UPLOAD_PHOTO_MODAL_WIDTH;
  let previewWidth = DEFAULT_PREVIEW_WIDTH;
  if (value === undefined || value.length <= 0) {
    inputHeight = RESIZE_INPUT_HEIGHT;
  }

  dispatch(
    setInputChange({
      value,
      inputHeight,
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
  let imageInputUrl = '';
  let inputHeight = RESIZE_INPUT_HEIGHT;
  let width = UPLOAD_PHOTO_MODAL_WIDTH;

  if (file) {
    reader.readAsDataURL(file);
  }

  reader.onloadend = () => {
    let result = reader.result;
    dispatch(
      setHandleImageChange({
        result,
        imageInputUrl,
        inputHeight,
        width
      })
    );
  };
};

/* LOCAL STORAGE ACTION */
export const handleCropChange = (key, crop) => dispatch => {
  LocalStorageHelper.pushDataToStorage(key, { crop }, initRecord).then(
    dispatch(setHandleSaveCrop(crop))
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
      imageUrl,
      imageInputUrl,
      imageBrowserUrl,
      isUploaded
    } = action.payload;

    return state.withMutations(s =>
      s
        .set('isUploaded', isUploaded)
        .set('imageUrl', imageUrl)
        .set('imageInputUrl', imageInputUrl)
        .set('imageBrowserUrl', imageBrowserUrl)
    );
  },
  [HIGHLIGHT_UPLOAD]: (state, _action) => {
    return state.withMutations(s =>
      s
        .set('isHighlightUpload', true)
        .set('isHighlightCrop', false)
        .set('isHighlightChooseSize', false)
    );
  },
  [HIGHLIGHT_CROP]: (state, _action) => {
    return state.withMutations(s =>
      s
        .set('isHighlightUpload', false)
        .set('isHighlightCrop', true)
        .set('isHighlightChooseSize', false)
    );
  },
  [HIGHLIGHT_CHOOSE_SIZE]: (state, _action) => {
    return state.withMutations(s =>
      s
        .set('isHighlightUpload', false)
        .set('isHighlightCrop', false)
        .set('isHighlightChooseSize', true)
    );
  },
  [INPUT_URL_CHANGE]: (state, action) => {
    const { payload } = action;
    const { value, inputHeight, width } = payload;

    return state.withMutations(s =>
      s
        .set('imageUrl', value)
        .set('imageBrowserUrl', null)
        .set('imageInputUrl', value)
        .set('inputHeight', inputHeight)
        .set('width', width)
    );
  },
  [SWITCH_TO_CROP]: (state, action) => {
    return state.withMutations(s =>
      s
        .set('isUploaded', true)
        .set('isHighlightUpload', false)
        .set('isHighlightCrop', true)
        .set('isHighlightChooseSize', false)
        .set('width', action.payload)
        .set('isShowAvatar', true)
    );
  },
  [HANDLE_IMAGE_CHANGE]: (state, action) => {
    const { payload } = action;
    const { result, imageInputUrl, inputHeight, width } = payload;

    return state.withMutations(s =>
      s
        .set('imageUrl', result)
        .set('imageBrowserUrl', result)
        .set('imageInputUrl', imageInputUrl)
        .set('inputHeight', inputHeight)
        .set('width', width)
    );
  },
  [HANDLE_CROP_IMAGE]: (state, action) => {
    return state.withMutations(s => s.set('crop', action.payload));
  },
  [HANDLE_SAVE_CROP_CONFIG]: (state, action) => {
    return state.withMutations(s => s.set('crop', action.payload));
  },
  [INITIALIZE_CROPPER_PICTURE]: (state, action) => {
    return state.withMutations(s => s.set('crop', action.payload));
  },
  [INITIALIZE_CROPPED_PICTURE]: (state, action) => {
    const { crop, avatarSize } = action.payload;
    return state.withMutations(s =>
      s.set('crop', crop).set('avatarSize', avatarSize)
    );
  },
  [HANDLE_CHOOSE_AVATAR_SIZE]: (state, action) => {
    return state.withMutations(s => s.set('avatarSize', action.payload));
  },
  [HANDLE_ACCEPT_AVATAR_SIZE]: (state, action) => {
    return state;
  },
  [DETECT_HAVE_PHOTO]: (state, action) => {
    return state.withMutations(s => s.set('isHavePhoto', action.payload));
  },
  [HIDE_AVATAR]: state => {
    return state.withMutations(s =>
      s.set('isHideAvatar', true).set('isShowAvatar', false)
    );
  },
  [SHOW_AVATAR]: state => {
    return state.withMutations(s =>
      s.set('isShowAvatar', true).set('isHideAvatar', false)
    );
  },
  [DETECT_AVATAR_DISPLAY]: (state, action) => {
    return state.withMutations(s =>
      s.set('avatarDisStatus', action.payload.avatarDisStatus)
    );
  },
  [SHOW_HIDE_AVATAR]: state => {
    if (state.avatarDisStatus || state.isShowAvatar) {
      return state.withMutations(s =>
        s.set('isShowAvatar', false).set('avatarDisStatus', false)
      );
    } else {
      return state.withMutations(s =>
        s.set('isShowAvatar', true).set('avatarDisStatus', true)
      );
    }
  }
};

export default handleActions(actions, initRecord);
