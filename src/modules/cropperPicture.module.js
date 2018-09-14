import { Record } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

/**
|--------------------------------------------------
| GENERATE TYPE OF PHOTO MODAL's REDUCER
|--------------------------------------------------
*/
const SAVE_CROP_TO_LOCAL_STORAGE = 'cropper-picture/RESIZE_HEIGHT_PHOTO_MODAL';
const HANDLE_CROP_IMAGE_CROPPER_PICTURE =
  'cropper-picture/HANDLE_CROP_IMAGE_CROPPER_PICTURE';

/**
|--------------------------------------------------
| DEFINE PHOTO MODAL RECORD AND INITIALIZE STATE
|--------------------------------------------------
*/
const cropperRecord = new Record({
  crop: {
    height: 100,
    width: 100,
    x: 0,
    y: 0
  }
});
const initialState = cropperRecord();

/**
|--------------------------------------------------
| GENERATE ACTIONS SET TYPE FOR REDUCER
|--------------------------------------------------
*/
const setSaveCropToLocalStorage = createAction(SAVE_CROP_TO_LOCAL_STORAGE);
const setHandleCropOnImage = createAction(HANDLE_CROP_IMAGE_CROPPER_PICTURE);

/**
|--------------------------------------------------
| GENERATE PRIVATE ASYNC ACTIONS OF CROPPER PICTURE
|--------------------------------------------------
*/

const cropImage = async (imageUrl, crop) => {
  let img = new Image();
  img.src = imageUrl;

  const targetX = (img.width * crop.x) / 100;
  const targetY = (img.height * crop.y) / 100;
  const targetWidth = (img.width * crop.width) / 100;
  const targetHeight = (img.height * crop.height) / 100;

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const context = canvas.getContext('2d');

  context.drawImage(
    img,
    targetX,
    targetY,
    targetWidth,
    targetHeight,
    0,
    0,
    targetWidth,
    targetHeight
  );

  const image = canvas.toDataURL('image/jpeg');
  return image;
};

const pushDataToLocalStorage = async (key, value) => {
  localStorage.setItem(key, value);
};

/**
|--------------------------------------------------
| GENERATE ACTIONS OF CROPPER PICTURE
|--------------------------------------------------
*/
export const saveCropToLocalStorage = (crop, key) => dispatch => {
  pushDataToLocalStorage(key, crop).then(
    dispatch(setSaveCropToLocalStorage(crop))
  );
};

export const handleCropOnImage = (imageUrl, crop, key) => dispatch => {
  cropImage(imageUrl, crop).then(image => () => {
    pushDataToLocalStorage(key, image).then(dispatch(setHandleCropOnImage()));
  });
};

/**
|--------------------------------------------------
| HANDLE ACTIONS
|--------------------------------------------------
*/
const actions = {
  [SAVE_CROP_TO_LOCAL_STORAGE]: (state, action) => {
    return state.withMutations(s => s.set('crop', action.payload));
  },
  [HANDLE_CROP_IMAGE_CROPPER_PICTURE]: (state, _action) => {
    return state;
  }
};

export default handleActions(actions, initialState);
