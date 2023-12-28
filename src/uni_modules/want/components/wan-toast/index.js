import { reactive } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export const emits = ['click'];
export const props = {
  show: Boolean,
  mask: Boolean,
  message: String,
  forbidClick: Boolean,
  zIndex: {
    type: Number,
    default: 1000
  },
  type: {
    type: String,
    default: 'text'
  },
  loadingType: {
    type: String,
    default: 'circular'
  },
  position: {
    type: String,
    default: 'middle'
  },
  top: null
};
const defaultOptions = {
  type: 'text',
  mask: false,
  message: '',
  show: true,
  zIndex: 1000,
  duration: 2000,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular'
};
let queue = [];
const currentOptions = { ...defaultOptions };
export function setup(props, context) {
  const { expose } = context;
  const options = reactive({
    show: props.show,
    mask: props.mask,
    message: props.message,
    forbidClick: props.forbidClick,
    zIndex: props.zIndex,
    type: props.type,
    loadingType: props.loadingType,
    position: props.position
  });
  function setOptions(opts) {
    if (!opts) {
      return;
    }
    Object.keys(opts).forEach((key) => {
      options[key] = opts[key];
    });
  }
  function clear() {
    queue.forEach((toast) => {
      toast.clear();
    });
    queue = [];
  }
  const toast = {
    clear: () => {
      setOptions({ show: false });
      if (options.onClose) {
        options.onClose();
      }
    }
  };
  const show = (opts) => {
    const curOpt = {
      ...currentOptions,
      ...opts
    };
    queue.push(toast);
    setOptions(curOpt);
    clearTimeout(toast.timer);
    if (curOpt.duration != null && curOpt.duration > 0) {
      toast.timer = setTimeout(() => {
        toast.clear();
        queue = queue.filter((item) => item !== toast);
      }, curOpt.duration);
    }
  };
  function noop() {}
  expose({
    show,
    clear,
    setOptions
  });
  return {
    bem,
    style,
    addUnit,
    noop,
    options
  };
}
