const Constant = {
  layout: {},
  color: {
    theme: '#237fcd',
    white: '#fff',
    shadow: '#000',
    gray: '#CECECE',
    hoverBackground: 'rgb(231, 231, 231)'
  },
  photoModal: {
    type: {
      upload: 'photo-modal/UPLOAD',
      crop: 'photo-modal/CROP',
      chooseSize: 'photo-modal/CHOOSE_SIZE'
    },
    storageKey: 'photo-modal/LOCAL-STORAGE-KEY',
    avatar: {
      size: {
        small: 'photo-modal/SMALL_AVATAR',
        normal: 'photo-modal/NORMAL_AVATAR',
        large: 'photo-modal/LARGE_AVATAR'
      }
    },
    allAvatarSizes: {
      'photo-modal/SMALL_AVATAR': { value: 'small', pixCel: 100 },
      'photo-modal/NORMAL_AVATAR': { value: 'normal', pixCel: 150 },
      'photo-modal/LARGE_AVATAR': { value: 'large', pixCel: 188 }
    }
  },
  languageModal: {
    storageKey: 'language-modal/LOCAL-STORAGE-KEY'
  },
  cv: {
    primaryColor: '#BD0001'
  },
  signatureModal: {
    storageKey: 'signature-modal/LOCAL-STORAGE-KEY'
  },
  templateModal: {
    storageKey: 'template-modal/LOCAL-STORAGE-KEY'
  },
  centerTemplate: {
    storageKey: 'center-template/LOCAL-STORAGE-KEY'
  },
  isShowAvatar: {
    storageKey: 'photo-modal/IS-SHOW-AVATAR'
  },
  host: {
    url: ''
  }
};

export default Constant;
