import { Record, Map, List } from 'immutable';

import { handleActions, createAction } from 'redux-actions';

const FETCH_GUIDE_REQUEST = 'advice/FETCH_GUIDE_REQUEST';
const FETCH_GUIDE_RESPONSE = 'advice/FETCH_GUIDE_RESPONSE';

const fetchGuideRequest = createAction(FETCH_GUIDE_REQUEST);
const fetchGuideResponse = createAction(FETCH_GUIDE_RESPONSE);

const guideRecord = new Record({
  isFetchGuide: false,
  adviceResponse: new List()
});

const initialState = new guideRecord();

/**
|--------------------------------------------------
| FETCH GUIDE
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| HANDLE ACTIONS
|--------------------------------------------------
*/
const actions = {
  [FETCH_GUIDE_REQUEST]: state => state.set('isFetchGuide', true)
};

export default handleActions(actions, initialState);
