import Immutable, { Record } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import CVHelper from '../../helper/cv.helper';
/**
|--------------------------------------------------
| GENERATE TYPE OF BODY's REDUCER
|--------------------------------------------------
*/
const UPDATE_COVER_LETTER = 'cv/UPDATE_COVER_LETTER';

/**
|--------------------------------------------------
| DEFINE DIMENSION OF BODY SCALE
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| DEFINE BODY RECORD AND INITIALIZE STATE
|--------------------------------------------------
*/
const coverLetterRecord = new Record({
  coverLetterDatas: null
});

const initialState = coverLetterRecord();

/**
|--------------------------------------------------
| GENERATE ACTIONS SET TYPE FOR REDUCER
|--------------------------------------------------
*/
const updateCoverLetter = createAction(UPDATE_COVER_LETTER);
/**
|--------------------------------------------------
| DEACTIVE BODY
|--------------------------------------------------
*/
export const fetchCoverLetterDefault = () => dispatch => {
  dispatch(updateCoverLetter({}));
};

/**
|--------------------------------------------------
| GENERATE REDUCER
|--------------------------------------------------
*/
const actions = {
  [UPDATE_COVER_LETTER]: (state, action) => {
    CVHelper.newThread(() => {
      CVHelper.saveCoverLetterToStorage(action.payload);
    });
    return state.withMutations(s =>
      s.update('coverLetterDatas', () => Immutable.fromJS(action.payload))
    );
  }
};

export default handleActions(actions, initialState);
