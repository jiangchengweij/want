import {
  computed,
  ExtractPropTypes,
  onMounted,
  PropType,
  reactive,
  SetupContext,
  watch
} from 'vue';
import { bem, addUnit, style, isBoolean, isPromise } from '../common/utils';
import {
  imageProps,
  videoProps,
  mediaProps,
  messageFileProps
} from '../common/mixins/uploader';
import {
  isImageFile,
  chooseFile,
  isVideoFile,
  File
} from '../common/utils/file';

export const emits = [
  'error',
  'before-read',
  'oversize',
  'after-read',
  'delete',
  'click-preview'
] as const;
export const props = {
  ...imageProps,
  ...videoProps,
  ...mediaProps,
  ...messageFileProps,
  disabled: Boolean,
  multiple: Boolean,
  uploadText: String,
  useBeforeRead: Boolean,
  afterRead: null,
  beforeRead: null,
  previewSize: {
    type: null,
    default: 80
  },
  name: {
    type: null,
    default: ''
  },
  accept: {
    type: String,
    default: 'image'
  },
  fileList: {
    type: Array as PropType<File[]>,
    default: () => []
  },
  maxSize: {
    type: Number,
    default: Number.MAX_VALUE
  },
  maxCount: {
    type: Number,
    default: 100
  },
  deletable: {
    type: Boolean,
    default: true
  },
  showUpload: {
    type: Boolean,
    default: true
  },
  previewImage: {
    type: Boolean,
    default: true
  },
  previewFullImage: {
    type: Boolean,
    default: true
  },
  videoFit: {
    type: String,
    default: 'contain'
  },
  imageFit: {
    type: String,
    default: 'scaleToFill'
  },
  uploadIcon: {
    type: String,
    default: 'photograph'
  },
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { emit } = context;

  onMounted(() => {
    formatFileList();
  });

  watch(
    () => props.fileList,
    () => {
      formatFileList();
    },
    { deep: true }
  );

  const state = reactive<{
    lists: File[];
    isInCount: boolean;
  }>({
    lists: [],
    isInCount: true
  });

  const sizeStyle = computed(() => {
    return Array.isArray(props.previewSize)
      ? style({
          width: addUnit(props.previewSize[0]),
          height: addUnit(props.previewSize[1])
        })
      : style({
          width: addUnit(props.previewSize[0]),
          height: addUnit(props.previewSize[1])
        });
  });

  const formatFileList = () => {
    const { fileList = [], maxCount } = props;
    const lists = fileList.map((item) => ({
      ...item,
      isImage: isImageFile(item),
      isVideo: isVideoFile(item),
      deletable: isBoolean(item.deletable) ? item.deletable : true
    }));
    state.lists = lists;
    state.isInCount = lists.length < maxCount;
  };

  const getDetail = (index?: number) => {
    return {
      name: props.name,
      index: index == null ? props.fileList.length : index
    };
  };

  const startUpload = () => {
    const { maxCount, multiple, disabled } = props;
    if (disabled) return;

    chooseFile({
      ...props,
      maxCount: maxCount - state.lists.length
    })
      .then((res) => {
        onBeforeRead(multiple ? res : res[0]);
      })
      .catch((error) => {
        emit('error', error);
      });
  };

  const onBeforeRead = (file: File) => {
    const { beforeRead, useBeforeRead } = props;
    let res: boolean | Promise<void> = true;

    if (typeof beforeRead === 'function') {
      res = beforeRead(file, getDetail());
    }

    if (useBeforeRead) {
      res = new Promise<void>((resolve, reject) => {
        emit('before-read', {
          file,
          ...getDetail(),
          callback: (ok: boolean) => {
            ok ? resolve() : reject();
          }
        });
      });
    }

    if (!res) {
      return;
    }

    if (isPromise(res)) {
      res.then((data) => onAfterRead(data! || file));
    } else {
      onAfterRead(file);
    }
  };

  const onAfterRead = (file) => {
    const { maxSize, afterRead } = props;
    const oversize = Array.isArray(file)
      ? file.some((item) => item.size > maxSize)
      : file.size > maxSize;

    if (oversize) {
      emit('oversize', { file, ...getDetail() });
      return;
    }

    if (typeof afterRead === 'function') {
      afterRead(file, getDetail());
    }

    emit('after-read', { file, ...getDetail() });
  };

  const deleteItem = (index: number) => {
    emit('delete', {
      ...getDetail(index),
      file: props.fileList[index]
    });
  };

  const onPreviewImage = (index: number) => {
    if (!props.previewFullImage) return;

    const { showmenu } = props;
    const item = state.lists[index];

    uni.previewImage({
      urls: state.lists
        .filter((item) => isImageFile(item))
        .map((item) => item.url),
      current: item.url,
      showmenu,
      fail() {
        uni.showToast({ title: '预览图片失败', icon: 'none' });
      }
    });
  };

  const onPreviewVideo = (index: number) => {
    if (!props.previewFullImage) return;

    const sources: (AnyObject & { url: string })[] = [];

    const current = state.lists.reduce((sum, cur, curIndex) => {
      if (!isVideoFile(cur)) {
        return sum;
      }

      sources.push({ ...cur, type: 'video' });

      if (curIndex < index) {
        sum++;
      }

      return sum;
    }, 0);

    uni.previewMedia({
      sources,
      current,
      fail() {
        uni.showToast({ title: '预览视频失败', icon: 'none' });
      }
    });
  };

  const onPreviewFile = (index: number) => {
    uni.openDocument({
      filePath: state.lists[index].url,
      showMenu: true
    });
  };

  const onClickPreview = (index: number) => {
    const item: File = state.lists[index];

    emit('click-preview', {
      ...item,
      ...getDetail(index)
    });
  };
  return {
    bem,
    style,
    addUnit,
    state,
    sizeStyle,
    startUpload,
    deleteItem,
    onPreviewImage,
    onPreviewVideo,
    onPreviewFile,
    onClickPreview
  };
}
