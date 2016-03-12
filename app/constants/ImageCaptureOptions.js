export default {
  title: null,
  cancelButtonTitle: 'Peruuta',
  takePhotoButtonTitle: 'Ota kuva...',
  chooseFromLibraryButtonTitle: 'Valitse kuvista...',
  customButtons: {},
  cameraType: 'back',
  mediaType: 'photo',
  videoQuality: 'high',
  durationLimit: 10,
  maxWidth: 500,
  maxHeight: 500,
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.3, // 0 to 1, photos only
  angle: 0,
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
};
