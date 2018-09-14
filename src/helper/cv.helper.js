import _ from 'lodash';

const CV_STORAGE_KEY = 'CV_STORAGE_KEY_';
const COVER_LETTER_STORAGE_KEY = 'COVER_LETTER_STORAGE_KEY_';
const TMP_ROW_ID_KEY = 'TMP_ROW_ID_KEY_';
const TMP_ROW_WRAP_ID_KEY = 'TMP_ROW_WRAP_ID_KEY_';
const TMP_PART_ID_KEY = 'TMP_PART_ID_KEY_';
const TMP_HEADING_WRAP_ID_KEY = 'TMP_HEADING_WRAP_ID_KEY_';
const TMP_PART_ID_CHANGE_POSITION_KEY = 'TMP_PART_ID_CHANGE_POSITION_KEY_';
const TMP_ROW_PLACE_KEY = 'TMP_ROW_PLACE_KEY_';

class CVHelper {
  convertValue(text) {
    return {
      document: {
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                leaves: [{ text }]
              }
            ]
          }
        ]
      }
    };
  }

  scrollToTop(scrollStepInPx = 50, delayInMs = 16.66) {
    this.scrollTopIntervalId = setInterval(
      this.scrollStep.bind(this, scrollStepInPx),
      delayInMs
    );
  }

  scrollStep(scrollStepInPx) {
    if (window.pageYOffset === 0) {
      clearInterval(this.scrollTopIntervalId);
    }
    window.scroll(0, window.pageYOffset - scrollStepInPx);
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  }

  newThread(callback) {
    if (typeof callback === 'function') {
      return setTimeout(callback, 0);
    }
  }

  addToArray(array, addData, currentIndex, positionChange) {
    let newIndex = currentIndex + positionChange;
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= array.length) {
      newIndex = array.length;
    }
    const arrayClone = array.slice(0);
    arrayClone.splice(newIndex, 0, addData);
    return arrayClone;
  }

  moveInArray(array, oldIndex, positionChange) {
    let newIndex = oldIndex + positionChange;
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= array.length) {
      newIndex = array.length;
    }
    const arrayClone = array.slice(0);
    arrayClone.splice(oldIndex, 1);
    arrayClone.splice(newIndex, 0, array[oldIndex]);
    return arrayClone;
  }

  deleteInArray(array, index) {
    const arrayClone = array.slice(0);
    arrayClone.splice(index, 1);
    return arrayClone;
  }

  /**
   * CV storage handle
   */
  saveCVToStorage(data) {
    localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(data));
  }

  getCVFromStorage() {
    const jsonData = JSON.parse(localStorage.getItem(CV_STORAGE_KEY));
    return _.isObject(jsonData) ? jsonData : null;
  }

  existCVInStorage() {
    return this.getCVFromStorage() !== null;
  }

  /**
   * Cover letter storage handle
   */
  saveCoverLetterToStorage(data) {
    localStorage.setItem(COVER_LETTER_STORAGE_KEY, JSON.stringify(data));
  }

  getCoverLetterFromStorage() {
    const jsonData = JSON.parse(localStorage.getItem(COVER_LETTER_STORAGE_KEY));
    return _.isObject(jsonData) ? jsonData : null;
  }

  existCoverLetterInStorage() {
    return this.getCoverLetterFromStorage() !== null;
  }

  findSignatureInCV(cvDatas) {
    let signatureExist = false,
      pageNum,
      partNum;
    cvDatas.get('pages').some((page, _pageNum) => {
      pageNum = _pageNum;
      let _break = false;
      page.get('parts').some((part, _partNum) => {
        partNum = _partNum;
        _break = part.get('type') === 'Signature';
        if (_break) {
          signatureExist = true;
        }
        return _break;
      });
      return _break;
    });
    return {
      exists: signatureExist,
      pageNum,
      partNum
    };
  }

  /**
   * ========== set temporary active row id ==========
   */
  setTmpRowId(id) {
    return localStorage.setItem(TMP_ROW_ID_KEY, id);
  }

  getTmpRowId() {
    return localStorage.getItem(TMP_ROW_ID_KEY);
  }

  removeTmpRowId() {
    return localStorage.removeItem(TMP_ROW_ID_KEY);
  }

  /**
   * ========== set place for re active ==========
   */
  setUpdatePlace(place = 'value') {
    return localStorage.setItem(TMP_ROW_PLACE_KEY, place);
  }

  getUpdatePlace() {
    return localStorage.getItem(TMP_ROW_PLACE_KEY);
  }

  removeUpdatePlace() {
    return localStorage.removeItem(TMP_ROW_PLACE_KEY);
  }

  /**
   * ========== set temporary active row id ==========
   */
  setTmpRowWrapId(id, removeAfterSet = 0) {
    if (removeAfterSet > 0) {
      clearTimeout(this.rowWrapTimer);
      this.rowWrapTimer = setTimeout(this.removeTmpRowWrapId, removeAfterSet);
    }
    return localStorage.setItem(TMP_ROW_WRAP_ID_KEY, id);
  }

  getTmpRowWrapId() {
    return localStorage.getItem(TMP_ROW_WRAP_ID_KEY);
  }

  removeTmpRowWrapId() {
    return localStorage.removeItem(TMP_ROW_WRAP_ID_KEY);
  }

  /**
   * ========== set temporary active row id ==========
   */
  setTmpHeadingWrapId(id, removeAfterSet = 0) {
    if (removeAfterSet > 0) {
      clearTimeout(this.headingWrapTimer);
      this.headingWrapTimer = setTimeout(
        this.removeTmpHeadingWrapId,
        removeAfterSet
      );
    }
    return localStorage.setItem(TMP_HEADING_WRAP_ID_KEY, id);
  }

  getTmpHeadingWrapId() {
    return localStorage.getItem(TMP_HEADING_WRAP_ID_KEY);
  }

  removeTmpHeadingWrapId() {
    return localStorage.removeItem(TMP_HEADING_WRAP_ID_KEY);
  }

  /**
   * ========== set temporary active part id ==========
   */
  setTmpPartId(id) {
    return localStorage.setItem(TMP_PART_ID_KEY, id);
  }

  getTmpPartId() {
    return localStorage.getItem(TMP_PART_ID_KEY);
  }

  removeTmpPartId() {
    return localStorage.removeItem(TMP_PART_ID_KEY);
  }

  /**
   * ========== set temporary active part id ==========
   */
  setTmpPartPositionId(id) {
    return localStorage.setItem(TMP_PART_ID_CHANGE_POSITION_KEY, id);
  }

  getTmpPartPositionId() {
    return localStorage.getItem(TMP_PART_ID_CHANGE_POSITION_KEY);
  }

  removeTmpPartPositionId() {
    return localStorage.removeItem(TMP_PART_ID_CHANGE_POSITION_KEY);
  }
}

export default new CVHelper();
