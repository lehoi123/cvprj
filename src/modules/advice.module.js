import { Record, Map, List } from 'immutable';

import { handleActions, createAction } from 'redux-actions';

const FETCH_ADVICE_REQUEST = 'advice/FETCH_ADVICE_REQUEST';
const FETCH_ADVICE_RESPONSE = 'advice/FETCH_ADVICE_RESPONSE';

const fetchAdviceRequest = createAction(FETCH_ADVICE_REQUEST);
const fetchAdviceResponse = createAction(FETCH_ADVICE_RESPONSE);

const adviceRecord = new Record({
  isFetchAdvice: false,
  adviceResponse: new List()
});

const initialState = new adviceRecord();

/**
|--------------------------------------------------
| FETCH ADVICE
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| HANDLE ACTIONS
|--------------------------------------------------
*/
const actions = {
  [FETCH_ADVICE_REQUEST]: state => state.set('isFetchAdvice', true)
};

export default handleActions(actions, initialState);
