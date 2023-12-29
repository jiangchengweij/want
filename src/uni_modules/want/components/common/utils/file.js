import { pickExclude, isPC } from '../utils';
import { isImageUrl, isVideoUrl } from '../utils/validator';
export function isImageFile(item) {
  if (item.isImage != null) {
    return item.isImage;
  }
  if (item.type) {
    return item.type === 'image';
  }
  if (item.url) {
    return isImageUrl(item.url);
  }
  return false;
}
export function isVideoFile(item) {
  if (item.isVideo != null) {
    return item.isVideo;
  }
  if (item.type) {
    return item.type === 'video';
  }
  if (item.url) {
    return isVideoUrl(item.url);
  }
  return false;
}
function formatImage(res) {
  return res.tempFiles.map((item) => ({
    ...pickExclude(item, ['path']),
    type: 'image',
    url: item.tempFilePath || item.path,
    thumb: item.tempFilePath || item.path
  }));
}
function formatVideo(res) {
  return [
    {
      ...pickExclude(res, ['tempFilePath', 'thumbTempFilePath', 'errMsg']),
      type: 'video',
      url: res.tempFilePath,
      thumb: res.thumbTempFilePath
    }
  ];
}
function formatMedia(res) {
  return res.tempFiles.map((item) => ({
    ...pickExclude(item, ['fileType', 'thumbTempFilePath', 'tempFilePath']),
    type: res.type,
    url: item.tempFilePath,
    thumb: res.type === 'video' ? item.thumbTempFilePath : item.tempFilePath
  }));
}
function formatFile(res) {
  return res.tempFiles.map((item) => ({
    ...pickExclude(item, ['path']),
    url: item.path
  }));
}
export function chooseFile({
  accept,
  multiple,
  capture,
  compressed,
  maxDuration,
  sizeType,
  camera,
  maxCount,
  mediaType,
  extension
}) {
  return new Promise((resolve, reject) => {
    switch (accept) {
      case 'image':
        if (isPC) {
          uni.chooseImage({
            count: multiple ? Math.min(maxCount, 9) : 1,
            sourceType: capture,
            sizeType,
            success: (res) => resolve(formatImage(res)),
            fail: reject
          });
        } else {
          uni.chooseMedia({
            count: multiple ? Math.min(maxCount, 9) : 1,
            mediaType: ['image'],
            sourceType: capture,
            maxDuration,
            sizeType,
            camera,
            success: (res) => resolve(formatImage(res)),
            fail: reject
          });
        }
        break;
      case 'media':
        uni.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1,
          mediaType,
          sourceType: capture,
          maxDuration,
          sizeType,
          camera,
          success: (res) => resolve(formatMedia(res)),
          fail: reject
        });
        break;
      case 'video':
        uni.chooseVideo({
          sourceType: capture,
          compressed,
          maxDuration,
          camera,
          success: (res) => resolve(formatVideo(res)),
          fail: reject
        });
        break;
      default:
        uni.chooseMessageFile({
          count: multiple ? maxCount : 1,
          type: accept,
          ...(extension ? { extension } : {}),
          success: (res) => resolve(formatFile(res)),
          fail: reject
        });
        break;
    }
  });
}
