class LocalStorageHelper {
  loadImage = url => {
    return new Promise((resolve, _reject) => {
      let img = new Image();
      img.addEventListener('load', _e => resolve(img));
      img.src = url;
    });
  };

  clean = obj => {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }

    return obj;
  };

  checkEmpty = obj => {
    return Object.getOwnPropertyNames(obj).length === 0;
  };

  isCorrectObject = obj => {
    return obj !== null && obj !== undefined && typeof obj === 'object';
  };

  isCorrectString = string => {
    return (
      string !== null &&
      string !== undefined &&
      typeof string === 'string' &&
      string != ''
    );
  };

  pushDataToStorage = async (key, value, defaultData) => {
    this.fetchDataFromStorage(key, defaultData).then(data => {
      let newData = data;

      if (this.isCorrectObject(value)) {
        Object.assign(newData, value);
      }
      const jsonValue = JSON.stringify(newData);
      localStorage.setItem(key, jsonValue);
    });
  };

  fetchDataFromStorage = async (key, defaultData, isRecord = true) => {
    let jsonData = localStorage.getItem(key);
    let data = isRecord ? defaultData.toJS() : defaultData;

    if (jsonData !== null && jsonData !== undefined) {
      let storageData = JSON.parse(jsonData);
      if (this.isCorrectObject(storageData)) {
        let newStorage = this.clean(storageData);

        if (!this.checkEmpty(newStorage)) {
          Object.assign(data, newStorage);
        }
      }
    }

    return data;
  };
}

export default new LocalStorageHelper();
