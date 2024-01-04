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
let queue = [];
export function setup(props, context) {
  const { expose } = context;
  let _time = 0;
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
    setOptions({ show: false });
    if (options.onClose) {
      options.onClose();
    }
  }
  function allClear() {
    queue.forEach((toast) => {
      toast.exposed.clear();
    });
    queue = [];
  }
  const show = (opts) => {
    const curOpt = {
      ...props,
      ...opts
    };
    queue.push(this);
    setOptions(curOpt);
    clearTimeout(_time);
    if (curOpt.duration != null && curOpt.duration > 0) {
      _time = setTimeout(() => {
        clear();
        queue = queue.filter((item) => item !== this);
      }, curOpt.duration);
    }
  };
  function noop() {}
  expose({
    show,
    clear,
    setOptions,
    allClear
  });
  return {
    bem,
    style,
    addUnit,
    noop,
    options
  };
}
