import { Record } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import Constant from '../config/constant';
import LocalStorageHelper from '../helper/local_storage.helper';
import tempCenterData from '../views/Header/CenterSegment/tempCenterData';

const ACTIVATE_HOVER = 'header/ACTIVATE_HOVER_MOBILE_MODAL';
const activateHover = createAction(ACTIVATE_HOVER);

const INITIALIZE_CENTER_TEMPLATE = 'header/INITIALIZE_CENTER_TEMPLATE';
const setInitializeCenterTemplate = createAction(INITIALIZE_CENTER_TEMPLATE);
const SELECT_CENTER_TEMPLATE = 'header/SELECT_CENTER_TEMPLATE';
const handleSelectCenterTemplate = createAction(SELECT_CENTER_TEMPLATE);

const headerRecord = new Record({
  isActivateHover: false,
  isActivateShareBoxMob: false,

  templateId: tempCenterData.templates[0].id
});

const initialState = headerRecord();
/**
|--------------------------------------------------
| ACTIVATE PHOTO MODAL
|--------------------------------------------------
*/
export const activateHoverItem = isActivate => dispatch => {
  dispatch(activateHover(isActivate));
};

/**
|--------------------------------------------------
| SELECT CENTER TEMPLATE
|--------------------------------------------------
*/

export const selectCenterTemplate = templateId => dispatch => {
  const { storageKey } = Constant.centerTemplate;
  LocalStorageHelper.pushDataToStorage(
    storageKey,
    { templateId },
    initialState
  ).then(dispatch(handleSelectCenterTemplate({ templateId })));
};

/**
|--------------------------------------------------
| INITIALIZE TEMPLATE
|--------------------------------------------------
*/
export const initializeTemplate = () => dispatch => {
  const { storageKey } = Constant.centerTemplate;
  LocalStorageHelper.fetchDataFromStorage(storageKey, initialState).then(
    template =>
      dispatch(
        setInitializeCenterTemplate({
          templateId: template.templateId
        })
      )
  );
};

/**
|--------------------------------------------------
| HANDLE ACTIONS
|--------------------------------------------------
*/
const actions = {
  [ACTIVATE_HOVER]: (state, action) => {
    return state.withMutations(s => s.set('isActivateHover', action.payload));
  },
  [INITIALIZE_CENTER_TEMPLATE]: (state, action) => {
    return state.withMutations(s => s.set('templateId', action.payload));
  },
  [SELECT_CENTER_TEMPLATE]: (state, action) => {
    console.log('HEY ACTION', action.payload);
    return state.withMutations(s => s.set('templateId', action.payload));
  }
};

export default handleActions(actions, initialState);
