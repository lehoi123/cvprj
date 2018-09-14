import { handleActions, createAction } from 'redux-actions';
import LanguageData from '../../json/modals/languageData';
import LocalStorageHelper from '../../helper/local_storage.helper';
import { Record } from '../../../node_modules/immutable';
import Constant from '../../config/constant';

/**
|--------------------------------------------------
| GENERATE TYPE OF MODAL's REDUCER
|--------------------------------------------------
*/
const INITIALIZE_MODAL = 'language-modal/INITIALIZE_MODAL';
const HANDLE_SELECT_LANGUAGE = 'language-modal/HANDLE_SELECT_LANGUAGE';

/**
|--------------------------------------------------
| DEFINE PHOTO MODAL RECORD AND INITIALIZE STATE
|--------------------------------------------------
*/
const initRecord = new Record({
  countryId: LanguageData[0].countries[0].id,
  continentId: LanguageData[0].id
});

const initializeRecord = new initRecord();
/**
|--------------------------------------------------
| GENERATE ACTIONS SET TYPE FOR REDUCER
|--------------------------------------------------
*/
const setInitializeModal = createAction(INITIALIZE_MODAL);
const setHandleSelectLanguage = createAction(HANDLE_SELECT_LANGUAGE);

/**
|--------------------------------------------------
| DE-ACTIVE PHOTO MODAL
|--------------------------------------------------
*/
export const handleSelectLanguage = (countryId, continentId) => dispatch => {
  const { storageKey } = Constant.languageModal;
  LocalStorageHelper.pushDataToStorage(
    storageKey,
    { countryId, continentId },
    initializeRecord
  ).then(dispatch(setHandleSelectLanguage({ countryId, continentId })));
};

export const initializeModal = () => dispatch => {
  const { storageKey } = Constant.languageModal;
  LocalStorageHelper.fetchDataFromStorage(storageKey, initializeRecord).then(
    country =>
      dispatch(
        setInitializeModal({
          countryId: country.countryId,
          continentId: country.continentId
        })
      )
  );
};

/**
|--------------------------------------------------
| GENERATE REDUCER
|--------------------------------------------------
*/
const actions = {
  [INITIALIZE_MODAL]: (state, action) => {
    const { countryId, continentId } = action.payload;
    return state.withMutations(s =>
      s.set('countryId', countryId).set('continentId', continentId)
    );
  },
  [HANDLE_SELECT_LANGUAGE]: (state, action) => {
    const { countryId, continentId } = action.payload;
    return state.withMutations(s =>
      s.set('countryId', countryId).set('continentId', continentId)
    );
  }
};

export default handleActions(actions, initializeRecord);
