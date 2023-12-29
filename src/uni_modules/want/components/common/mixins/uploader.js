// props for image
export const imageProps = {
  sizeType: {
    type: Array,
    default: ['original', 'compressed']
  },
  capture: {
    type: Array,
    default: ['album', 'camera']
  },
  showmenu: {
    type: Boolean,
    default: true
  }
};
// props for video
export const videoProps = {
  capture: {
    type: Array,
    default: ['album', 'camera']
  },
  compressed: {
    type: Boolean,
    default: true
  },
  maxDuration: {
    type: Number,
    default: 60
  },
  camera: {
    type: String,
    default: 'back'
  }
};
// props for media
export const mediaProps = {
  capture: {
    type: Array,
    default: ['album', 'camera']
  },
  mediaType: {
    type: Array,
    default: ['image', 'video']
  },
  maxDuration: {
    type: Number,
    default: 60
  },
  camera: {
    type: String,
    default: 'back'
  }
};
// props for file
export const messageFileProps = {
  extension: {
    type: null,
    default: ''
  }
};
