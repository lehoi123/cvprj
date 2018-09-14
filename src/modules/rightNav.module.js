import { Record } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const ACTIVATE_RIGHT_NAV = 'rightNav/ACTIVATE_RIGHT_NAV';
const DE_ACTIVATE_RIGHT_NAV = 'rightNav/DEACTIVATE_RIGHT_NAV';
const activateRightNav = createAction(ACTIVATE_RIGHT_NAV);
const deActivateRightNav = createAction(DE_ACTIVATE_RIGHT_NAV);

const rightNavRecord = new Record({
  isActivateNav: false,
  moduleName: ''
});

const initialState = rightNavRecord();

/**
|--------------------------------------------------
| ACTIVATE RIGHT NAV
|--------------------------------------------------
*/
export const activateRightNavMod = (isActive, moduleName) => dispatch => {
  dispatch(activateRightNav({ isActive, moduleName }));
};

/**
|--------------------------------------------------
| DEACTIVE RIGHT NAV
|--------------------------------------------------
*/
export const deActiveRightNavMod = isActive => dispatch => {
  dispatch(deActivateRightNav(isActive));
};

/**
|--------------------------------------------------
| HANDLE EACTION
|--------------------------------------------------
*/

const actions = {
  [ACTIVATE_RIGHT_NAV]: (state, action) => {
    return state.withMutations(s =>
      s
        .set('isActivateNav', action.payload.isActive)
        .set('moduleName', action.payload.moduleName)
    );
  },
  [DE_ACTIVATE_RIGHT_NAV]: (state, action) => {
    return state.withMutations(s => s.set('isActivateNav', action.payload));
  }
};

export default handleActions(actions, initialState);
