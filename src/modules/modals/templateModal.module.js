import { handleActions, createAction } from 'redux-actions';
import TemplateData from '../../json/modals/templateData';
import LocalStorageHelper from '../../helper/local_storage.helper';
import { Record } from '../../../node_modules/immutable';
import Constant from '../../config/constant';

/**
|--------------------------------------------------
| GENERATE TYPE OF MODAL's REDUCER
|--------------------------------------------------
*/
const INITIALIZE_MODAL = 'template-modal/INITIALIZE_MODAL';
const HANDLE_SELECT_TEMPLATE = 'template-modal/HANDLE_SELECT_TEMPLATE';
const HANDLE_SUBMIT_TEMPLATE = 'template-modal/HANDLE_SELECT_TEMPLATE';

/**
|--------------------------------------------------
| DEFINE PHOTO MODAL RECORD AND INITIALIZE STATE
|--------------------------------------------------
*/
const initRecord = new Record({
  templateId: TemplateData.classic[0].id
});

const initializeRecord = new initRecord();
/**
|--------------------------------------------------
| GENERATE ACTIONS SET TYPE FOR REDUCER
|--------------------------------------------------
*/
const setInitializeModal = createAction(INITIALIZE_MODAL);
const setHandleSelectTemplate = createAction(HANDLE_SELECT_TEMPLATE);
const setHandleSubmitTemplate = createAction(HANDLE_SUBMIT_TEMPLATE);

/**
|--------------------------------------------------
| DE-ACTIVE PHOTO MODAL
|--------------------------------------------------
*/
export const handleSelectTemplate = templateId => dispatch => {
  dispatch(setHandleSelectTemplate(templateId));
};

export const handlerSubmitTemplate = templateId => dispatch => {
  const { storageKey } = Constant.templateModal;
  LocalStorageHelper.pushDataToStorage(
    storageKey,
    { templateId },
    initializeRecord
  ).then(dispatch(setHandleSubmitTemplate(templateId)));
};

export const initializeModal = () => dispatch => {
  const { storageKey } = Constant.templateModal;
  LocalStorageHelper.fetchDataFromStorage(storageKey, initializeRecord).then(
    country => dispatch(setInitializeModal(country.templateId))
  );
};

/**
|--------------------------------------------------
| GENERATE REDUCER
|--------------------------------------------------
*/
const actions = {
  [INITIALIZE_MODAL]: (state, action) => {
    return state.withMutations(s => s.set('templateId', action.payload));
  },
  [HANDLE_SELECT_TEMPLATE]: (state, action) => {
    return state.withMutations(s => s.set('templateId', action.payload));
  }
};

export default handleActions(actions, initializeRecord);
