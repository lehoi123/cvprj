import { Record, Map, List } from 'immutable';

import { handleActions, createAction } from 'redux-actions';
import api from '../utils/api';

const SEND_FEEDBACK_REQUEST = 'feedback/SEND_FEEDBACK_REQUEST';
const SEND_FEED_BACK_RESPONSE = 'feedback/SEND_FEED_BACK_RESPONSE';

const sendFeedbackRequest = createAction(SEND_FEEDBACK_REQUEST);
const sendFeedbackResponse = createAction(SEND_FEED_BACK_RESPONSE);

const feedBackRecord = new Record({
  isSendFeedback: false,
  sendFeedbackResponse: new Map()
});

const initialState = feedBackRecord();

/**
|--------------------------------------------------
| SEND FEEDBACK 
|--------------------------------------------------
*/
export const sendFeedback = (feedBack, uid) => dispatch => {
  dispatch(sendFeedbackRequest());
  api
    .sendFeedbackApi(feedBack, uid)
    .then(data => {
      dispatch(sendFeedbackResponse(data));
    })
    .catch(err => sendFeedbackResponse(err));
};

/**
|--------------------------------------------------
| HANDLE ACTIONS
|--------------------------------------------------
*/
const actions = {
  [SEND_FEEDBACK_REQUEST]: state => state.set('isSendFeedback', true)
};

export default handleActions(actions, initialState);
