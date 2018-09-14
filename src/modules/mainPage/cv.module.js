import Immutable, { Record, fromJS, List, Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import DefaultData from '../../json/cv/defaultData';
import Parts from '../../json/cv/parts';
import CVHelper from '../../helper/cv.helper';
/**
|--------------------------------------------------
| GENERATE TYPE OF BODY's REDUCER
|--------------------------------------------------
*/
const UPDATE_CV = 'cv/UPDATE_CV';
const UPDATE_CV_BY_INDEX = 'cv/UPDATE_CV_BY_INDEX';
const UPDATE_CV_PART_DIMENSION = 'cv/UPDATE_CV_PART_DIMENSION';
const SET_PRIMARY_COLOR = 'cv/SET_PRIMARY_COLOR';
const ADD_PART_TO_CV = 'cv/ADD_PART_TO_CV';
const DELETE_PART_OF_CV = 'cv/DELETE_PART_OF_CV';
const SEPARATE_PAGE_HANDLE = 'cv/SEPARATE_PAGE_HANDLE';
const CHANGE_POSITION_PART_OF_CV = 'cv/CHANGE_POSITION_PART_OF_CV';
const INSERT_ROW_TO_PART = 'cv/INSERT_ROW_TO_PART';
const MOVE_ROW_IN_PART = 'cv/MOVE_ROW_IN_PART';
const DELETE_ROW_IN_PART = 'cv/DELETE_ROW_IN_PART';
const ADD_SIGNATURE = 'cv/ADD_SIGNATURE';
const SHOW_SIGNATURE = 'cv/SHOW_SIGNATURE';
const SHOW_AVATAR = 'cv/SHOW_AVATAR';

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
const cvRecord = new Record({
  cvDatas: null
});

const initialState = cvRecord();

/**
|--------------------------------------------------
| GENERATE ACTIONS SET TYPE FOR REDUCER
|--------------------------------------------------
*/
const updateCV = createAction(UPDATE_CV);
const updateCVByIndex = createAction(UPDATE_CV_BY_INDEX);
const updateCVPartDimension = createAction(UPDATE_CV_PART_DIMENSION);
const updatePrimaryColor = createAction(SET_PRIMARY_COLOR);
const createPartToCV = createAction(ADD_PART_TO_CV);
const removePartOfCV = createAction(DELETE_PART_OF_CV);
const separatePage = createAction(SEPARATE_PAGE_HANDLE);
const setPositionPartOfCV = createAction(CHANGE_POSITION_PART_OF_CV);
const insertRowToPart = createAction(INSERT_ROW_TO_PART);
const moveRowInPart = createAction(MOVE_ROW_IN_PART);
const deleteRowInPart = createAction(DELETE_ROW_IN_PART);
const addSignature = createAction(ADD_SIGNATURE);
const showSignature = createAction(SHOW_SIGNATURE);
const showAvatar = createAction(SHOW_AVATAR);
/**
|--------------------------------------------------
| DEACTIVE BODY
|--------------------------------------------------
*/
export const fetchDefaultCV = () => dispatch => {
  dispatch(updateCV(DefaultData));
};

/**
 ********** Fetch data of CV from localStorage **********
 */
export const fetchCVFromStorage = () => dispatch => {
  const data = CVHelper.getCVFromStorage();
  dispatch(updateCV(data));
};

/**
 ********** Set primary color for CV **********
 */
export const setPrimaryColor = color => dispatch => {
  dispatch(updatePrimaryColor(color));
};

/**
 ********** Update all data of CV **********
 */
export const updateByIndexs = payload => dispatch => {
  dispatch(updateCVByIndex(payload));
};

/**
 ********** Separate page of CV **********
 */
export const separatePageHandle = payload => dispatch => {
  dispatch(separatePage(payload));
};

/**
 ********** Add some row to part with position (above or below) **********
 */
export const addRowToPart = payload => dispatch => {
  dispatch(insertRowToPart(payload));
};

/**
 ********** Add Signature part to CV **********
 */
export const addSignatureToCV = () => dispatch => {
  dispatch(addSignature());
};

/**
 ********** Show Signature part to CV **********
 */
export const showSignatureCV = (payload = true) => dispatch => {
  dispatch(showSignature(payload));
};

/**
 ********** Hide Signature part to CV **********
 */
export const hideSignatureCV = () => (dispatch, getState) => {
  const cv = getState()
    .get('cv')
    .toJSON().cvDatas;
  const { exists, pageNum, partNum } = CVHelper.findSignatureInCV(cv);
  // add signature if not exists
  if (exists) {
    cv.pages[pageNum].parts[partNum].datas.display = false;
    dispatch(updateCV(cv));
  }
};

/**
 ********** Delete Signature part to CV **********
 */
export const deleteSignatureCV = () => (dispatch, getState) => {
  const cv = getState()
    .get('cv')
    .toJSON().cvDatas;
  const { exists, pageNum, partNum } = CVHelper.findSignatureInCV(cv);
  // add signature if not exists
  if (exists) {
    cv.pages[pageNum].parts.splice(partNum, 1);
    dispatch(updateCV(cv));
  }
};

/**
 ********** Add some part to CV with position (above or below) **********
 */
export const addPartToCV = datas => dispatch => {
  dispatch(createPartToCV(datas));
};

/**
 ********** Row change position (above or below) **********
 */
export const changePositionRowOfPart = payload => dispatch => {
  dispatch(moveRowInPart(payload));
};

/**
 ********** Part change position (above or below) **********
 */
export const changePositionPartOfCV = payload => dispatch => {
  dispatch(setPositionPartOfCV(payload));
};

/**
 ********** Delete row of part **********
 */
export const deleteRowOfPart = payload => dispatch => {
  dispatch(deleteRowInPart(payload));
};

/**
 ********** Delete part of CV **********
 */
export const deletePartOfCV = index => dispatch => {
  dispatch(removePartOfCV(index));
};

/**
 ********** Change avatar size of Personal detail part **********
 */
export const changeAvatarSize = size => (dispatch, getState) => {
  const cv = getState()
    .get('cv')
    .toJSON().cvDatas;
  if (['small', 'normal', 'large'].indexOf(size) === -1) {
    size = 'normal';
  }
  cv.pages[0].parts[0].datas.avatar.size = size;
  dispatch(updateCV(cv));
};

export const updatePartCVDimension = payload => dispatch => {
  dispatch(updateCVPartDimension(payload));
};

/**
 * On show or hide for avatar
 */
export const showHideAvatar = payload => dispatch => {
  dispatch(showAvatar(payload));
};

const dimensionCVHandle = cvDatas => {
  let startPage = 0;
  let sumHeight = 0;
  let newPages = List([]);
  const pageMaxHeight = 990;

  cvDatas.get('pages').forEach(page => {
    page.get('parts').forEach(part => {
      const partHeight = part.get('height');
      if (typeof partHeight === 'number') {
        sumHeight += partHeight;
        if (sumHeight > pageMaxHeight) {
          startPage++;
          sumHeight = partHeight;
        }

        if (Immutable.Iterable.isIterable(newPages.get(startPage))) {
          newPages = newPages.updateIn([startPage, 'parts'], parts =>
            parts.push(part)
          );
        } else {
          const pageId = cvDatas.getIn(['pages', startPage, 'id']);
          newPages = newPages.set(
            startPage,
            Map({
              id: pageId ? pageId : CVHelper.guid(),
              parts: List([part])
            })
          );
        }
      }
    });
  });

  return cvDatas.set('pages', fromJS(newPages));
};

const isUp = position => position === 'above';
const isDown = position => position === 'below';

/**
|--------------------------------------------------
| GENERATE REDUCER
|--------------------------------------------------
*/
const actions = {
  [UPDATE_CV]: (state, action) => {
    // cache to local storage
    CVHelper.newThread(() => {
      CVHelper.saveCVToStorage(action.payload);
    });
    return state.set('cvDatas', fromJS(action.payload));
  },
  [ADD_PART_TO_CV]: (state, action) => {
    const { pageNum, partNum, position, addData } = action.payload;

    // get parts data
    let partsData = state.getIn(['cvDatas', 'pages', pageNum, 'parts']).toJS();
    addData.id = CVHelper.guid();

    // set tmp part id
    CVHelper.setTmpPartId(addData.id);

    // handle position
    switch (position) {
      case 'above':
        partsData = CVHelper.addToArray(partsData, addData, partNum, 0);
        break;
      case 'below':
        partsData = CVHelper.addToArray(partsData, addData, partNum, 1);
        break;
      default:
    }
    const newState = state.setIn(
      ['cvDatas', 'pages', pageNum, 'parts'],
      fromJS(partsData)
    );

    // cache to local storage
    CVHelper.newThread(() => {
      CVHelper.saveCVToStorage(newState.get('cvDatas').toJS());
    });

    return newState;
  },
  [INSERT_ROW_TO_PART]: (state, action) => {
    const { pageNum, partNum, rowNum, position } = action.payload;
    let newState = state;

    const setStatePath = (rowNum = null) => {
      const statePath = [
        'cvDatas',
        'pages',
        pageNum,
        'parts',
        partNum,
        'datas',
        'rowsData'
      ];
      const rowIndex = 7;

      if (rowNum !== null) statePath[rowIndex] = rowNum;
      return statePath;
    };

    const rowsData = state.getIn(setStatePath());
    const rowData = rowsData.get(rowNum).withMutations(rowData => {
      const rowId = CVHelper.guid();
      rowData.set('id', rowId);
      // set temporary active row id
      CVHelper.setTmpRowId(rowId);
    });

    switch (position) {
      case 'above':
        newState = newState.updateIn(setStatePath(), data =>
          data.splice(rowNum, 0, rowData)
        );
        break;
      case 'below':
        newState = newState.updateIn(setStatePath(), data =>
          data.splice(rowNum + 1, 0, rowData)
        );
        break;
      default:
    }

    newState = newState.set(
      'cvDatas',
      dimensionCVHandle(newState.get('cvDatas'))
    );

    // cache to local storage
    CVHelper.newThread(() => {
      CVHelper.saveCVToStorage(newState.get('cvDatas').toJS());
    });

    return newState;
  },
  [MOVE_ROW_IN_PART]: (state, action) => {
    const { pageNum, partNum, rowNum, position } = action.payload;

    const setStatePath = (rowNum = null) => {
      const statePath = [
        'cvDatas',
        'pages',
        pageNum,
        'parts',
        partNum,
        'datas',
        'rowsData'
      ];
      const rowIndex = 7;

      if (rowNum !== null) statePath[rowIndex] = rowNum;
      return statePath;
    };

    // get current path
    const currentRowPath = setStatePath(rowNum);
    const currentRowData = state.getIn(currentRowPath);

    // set temporary active row id
    CVHelper.setTmpRowId(currentRowData.get('id'));

    let newState;

    switch (position) {
      case 'above':
        // get above path
        const aboveRowPath = setStatePath(rowNum - 1);
        const aboveRowData = state.getIn(aboveRowPath);

        // current data move up
        newState = state.setIn(currentRowPath, aboveRowData);
        newState = newState.setIn(aboveRowPath, currentRowData);
        break;
      case 'below':
        // get below path
        const belowRowPath = setStatePath(rowNum + 1);
        const belowRowData = state.getIn(belowRowPath);

        // current data move down
        newState = state.setIn(currentRowPath, belowRowData);
        newState = newState.setIn(belowRowPath, currentRowData);
        break;
      default:
    }

    // cache to local storage
    CVHelper.newThread(() => {
      CVHelper.saveCVToStorage(newState.get('cvDatas').toJS());
    });

    return newState;
  },
  [UPDATE_CV_BY_INDEX]: (state, action) => {
    const {
      pageNum,
      partNum,
      rowNum,
      rowType,
      value,
      handlePage
    } = action.payload;

    let newState;

    switch (rowType) {
      case 'heading':
        newState = state.setIn(
          ['cvDatas', 'pages', pageNum, 'parts', partNum, 'datas', rowType],
          fromJS(value)
        );
        break;
      case 'label':
      case 'value':
        newState = state.setIn(
          [
            'cvDatas',
            'pages',
            pageNum,
            'parts',
            partNum,
            'datas',
            'rowsData',
            rowNum,
            rowType
          ],
          fromJS(value)
        );
        break;
      default:
        newState = state;
    }

    // page separate handle
    if (handlePage) {
      newState = newState.set(
        'cvDatas',
        dimensionCVHandle(newState.get('cvDatas'))
      );
    }

    // cache to local storage
    CVHelper.newThread(() => {
      CVHelper.saveCVToStorage(newState.get('cvDatas').toJS());
    });

    return newState;
  },
  [UPDATE_CV_PART_DIMENSION]: (state, action) => {
    const { pageNum, partNum, partHeight } = action.payload;
    const newState = state.setIn(
      ['cvDatas', 'pages', pageNum, 'parts', partNum, 'height'],
      partHeight
    );

    // cache to local storage
    CVHelper.newThread(() => {
      CVHelper.saveCVToStorage(newState.get('cvDatas').toJS());
    });

    return newState;
  },
  [SET_PRIMARY_COLOR]: (state, action) => {
    const newState = state.setIn(
      ['cvDatas', 'passDatas', 'primaryColor'],
      action.payload
    );

    // cache to local storage
    CVHelper.newThread(() => {
      CVHelper.saveCVToStorage(newState.get('cvDatas').toJS());
    });

    return newState;
  },
  [SEPARATE_PAGE_HANDLE]: state => {
    // page separate handle
    const newState = state.set(
      'cvDatas',
      dimensionCVHandle(state.get('cvDatas'))
    );

    // cache to local storage
    CVHelper.newThread(() => {
      CVHelper.saveCVToStorage(newState.get('cvDatas').toJS());
    });

    return newState;
  },
  [DELETE_PART_OF_CV]: (state, action) => {
    const { pageNum, partNum } = action.payload;
    const statePath = ['cvDatas', 'pages', pageNum, 'parts'];

    // delete part in cv array
    let newState = state.updateIn(statePath, parts => parts.splice(partNum, 1));

    // page separate handle
    newState = newState.set(
      'cvDatas',
      dimensionCVHandle(newState.get('cvDatas'))
    );

    // cache to local storage
    CVHelper.newThread(() => {
      CVHelper.saveCVToStorage(newState.get('cvDatas').toJS());
    });

    return newState;
  },
  [CHANGE_POSITION_PART_OF_CV]: (state, action) => {
    const { pageNum, partNum, position, partsLength } = action.payload;
    let newState;

    // set path to access to cv data
    const setStatePath = (pageNum = null, partNum = null) => {
      const statePath = ['cvDatas', 'pages', pageNum, 'parts'];
      const pageIndex = 2;
      const partIndex = 4;

      if (pageNum !== null) statePath[pageIndex] = pageNum;
      if (partNum !== null) statePath[partIndex] = partNum;
      return statePath;
    };

    // when jump to other page
    const isFirstPart = partNum === 0;
    const isLastPart = partNum === partsLength - 1;

    // current path and current part data
    const currentPath = setStatePath(pageNum, partNum);
    const currentPartData = state.getIn(currentPath);

    // cache part id will reactive after changed position
    CVHelper.setTmpPartPositionId(currentPartData.get('id'));

    if ((isFirstPart && isUp(position)) || (isLastPart && isDown(position))) {
      switch (position) {
        case 'above':
          // above path and above part data
          const abovePagePart = setStatePath(pageNum - 1);
          const abovePartCount = state.getIn(abovePagePart).count();

          const abovePath = setStatePath(pageNum - 1, abovePartCount - 1);
          const abovePartData = state.getIn(abovePath);

          newState = state.setIn(currentPath, abovePartData);
          newState = newState.setIn(abovePath, currentPartData);
          break;
        case 'below':
          // below path and below part data
          const belowPath = setStatePath(pageNum + 1, 0);
          const belowPartData = state.getIn(belowPath);

          newState = state.setIn(currentPath, belowPartData);
          newState = newState.setIn(belowPath, currentPartData);
          break;
        default:
      }
    }
    // when change position in one page
    else {
      switch (position) {
        case 'above':
          // above path and above part data
          const abovePath = setStatePath(pageNum, partNum - 1);
          const abovePartData = state.getIn(abovePath);

          newState = state.setIn(currentPath, abovePartData);
          newState = newState.setIn(abovePath, currentPartData);
          break;
        case 'below':
          // below path and below part data
          const belowPath = setStatePath(pageNum, partNum + 1);
          const belowPartData = state.getIn(belowPath);

          newState = state.setIn(currentPath, belowPartData);
          newState = newState.setIn(belowPath, currentPartData);
          break;
        default:
      }
    }

    // page separate handle
    newState = newState.set(
      'cvDatas',
      dimensionCVHandle(newState.get('cvDatas'))
    );

    // cache to local storage
    CVHelper.newThread(() => {
      CVHelper.saveCVToStorage(newState.get('cvDatas').toJS());
    });

    return newState;
  },
  [DELETE_ROW_IN_PART]: (state, action) => {
    const { pageNum, partNum, rowNum } = action.payload;

    const statePath = [
      'cvDatas',
      'pages',
      pageNum,
      'parts',
      partNum,
      'datas',
      'rowsData'
    ];

    let newState = state.updateIn(statePath, rowsData =>
      rowsData.splice(rowNum, 1)
    );

    // page separate handle
    newState = newState.set(
      'cvDatas',
      dimensionCVHandle(newState.get('cvDatas'))
    );

    // cache to local storage
    CVHelper.newThread(() => {
      CVHelper.saveCVToStorage(newState.get('cvDatas').toJS());
    });

    return newState;
  },
  [ADD_SIGNATURE]: state => {
    let newState = state;
    const cvDatas = newState.get('cvDatas');
    const { exists } = CVHelper.findSignatureInCV(cvDatas);
    // add signature if not exists
    if (!exists) {
      const lastPageKey = cvDatas.get('pages').count() - 1;
      newState = newState.updateIn(
        ['cvDatas', 'pages', lastPageKey, 'parts'],
        parts => parts.push(fromJS(Parts.Signature))
      );
    }

    // page separate handle
    newState = newState.set(
      'cvDatas',
      dimensionCVHandle(newState.get('cvDatas'))
    );

    // cache to local storage
    CVHelper.newThread(() => {
      CVHelper.saveCVToStorage(newState.get('cvDatas').toJS());
    });

    return newState;
  },
  [SHOW_SIGNATURE]: (state, action) => {
    let newState = state;
    const show = action.payload === true;
    const { exists, pageNum, partNum } = CVHelper.findSignatureInCV(
      newState.get('cvDatas')
    );

    // add signature if not exists
    if (exists) {
      newState = newState.updateIn(
        ['cvDatas', 'pages', pageNum, 'parts', partNum, 'datas', 'display'],
        () => show
      );
      // cache to local storage
      CVHelper.newThread(() => {
        CVHelper.saveCVToStorage(newState.get('cvDatas').toJS());
      });
    }

    return newState;
  },
  [SHOW_AVATAR]: (state, action) => {
    let newState = state;
    const { pageNum, partNum } = action.payload;

    newState = newState.updateIn(
      [
        'cvDatas',
        'pages',
        pageNum,
        'parts',
        partNum,
        'datas',
        'avatar',
        'display'
      ],
      display => !display
    );

    // cache to local storage
    CVHelper.newThread(() => {
      CVHelper.saveCVToStorage(newState.get('cvDatas').toJS());
    });

    return newState;
  }
};

export default handleActions(actions, initialState);
