import { Record } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

/**
|--------------------------------------------------
| GENERATE TYPE OF BODY's REDUCER
|--------------------------------------------------
*/
const INCREASE_BODY_SCALE = 'body/INCREASE_BODY_SCALE';
const DECREASE_BODY_SCALE = 'body/DECREASE_BODY_SCALE';
const SET_BODY_SCALE = 'body/SET_BODY_SCALE';
const SET_ALIGN_LEFT = 'body/SET_ALIGN_LEFT';
const SHOW_TOAST = 'body/SHOW_TOAST';

/**
|--------------------------------------------------
| DEFINE DIMENSION OF BODY SCALE
|--------------------------------------------------
*/
const STEP_OF_SCALE = 0.15;
const INDEX_OF_SCALE = 1;
const MIN_SCALE = 0.1;
const MAX_SCALE = 1.75;

/**
|--------------------------------------------------
| DEFINE BODY RECORD AND INITIALIZE STATE
|--------------------------------------------------
*/
const bodyRecord = new Record({
  bodyScale: INDEX_OF_SCALE,
  alignLeft: false,
  showToast: false,
  toastMessage: null
});

const initialState = bodyRecord();

/**
|--------------------------------------------------
| GENERATE ACTIONS SET TYPE FOR REDUCER
|--------------------------------------------------
*/
const setIncreaseBodyScale = createAction(INCREASE_BODY_SCALE);
const setDecreaseBodyScale = createAction(DECREASE_BODY_SCALE);
const setBodyScaleValue = createAction(SET_BODY_SCALE);
const setAlignLeft = createAction(SET_ALIGN_LEFT);
const toastHandle = createAction(SHOW_TOAST);

/**
|--------------------------------------------------
| DEACTIVE BODY
|--------------------------------------------------
*/
export const increaseBodyScale = () => (dispatch, getState) => {
  let bodyScale = getState().get('body').bodyScale + STEP_OF_SCALE;
  if (bodyScale > MAX_SCALE) {
    bodyScale = MAX_SCALE;
  }
  dispatch(setIncreaseBodyScale(bodyScale));
};

export const showToast = (message, time = 3000) => dispatch => {
  dispatch(toastHandle({ message, show: true }));
  setTimeout(() => {
    dispatch(toastHandle({ message, show: false }));
  }, time);
};

export const decreaseBodyScale = () => (dispatch, getState) => {
  let bodyScale = getState().get('body').bodyScale - STEP_OF_SCALE;
  if (bodyScale < MIN_SCALE) {
    bodyScale = MIN_SCALE;
  }
  dispatch(setDecreaseBodyScale(bodyScale));
};

export const setBodyScale = payload => dispatch => {
  dispatch(setBodyScaleValue(payload));
};

export const setBodyAlignLeft = (payload = true) => dispatch => {
  dispatch(setAlignLeft(payload));
};

/**
|--------------------------------------------------
| GENERATE REDUCER
|--------------------------------------------------
*/
const actions = {
  [INCREASE_BODY_SCALE]: (state, action) => {
    return state.withMutations(s => s.set('bodyScale', action.payload));
  },
  [DECREASE_BODY_SCALE]: (state, action) => {
    return state.withMutations(s => s.set('bodyScale', action.payload));
  },
  [SET_BODY_SCALE]: (state, action) => {
    return state.withMutations(s => s.set('bodyScale', action.payload));
  },
  [SET_ALIGN_LEFT]: (state, action) => {
    return state.update('alignLeft', () => action.payload === true);
  },
  [SHOW_TOAST]: (state, action) => {
    const { message, show } = action.payload;
    return state.withMutations(s => {
      s.set('showToast', show);
      s.set('toastMessage', message);
    });
  }
};

export default handleActions(actions, initialState);
