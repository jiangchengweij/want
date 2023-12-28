import {
  ComponentInternalInstance,
  ExtractPropTypes,
  reactive,
  SetupContext
} from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['click'] as const;
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

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

interface ToastOptions {
  show?: boolean;
  type?: string;
  mask?: boolean;
  zIndex?: number;
  position?: string;
  duration?: number;
  selector?: string;
  forbidClick?: boolean;
  loadingType?: string;
  message?: string | number;
  onClose?: () => void;
}

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

type ToastType = {
  clear: () => void;
  timer?: number;
};

let queue: AnyObject[] = [];
const currentOptions: ToastOptions = { ...defaultOptions };

export function setup(
  this: ComponentInternalInstance,
  props: Props,
  context: Context
) {
  const { expose } = context;

  const options = reactive<ToastOptions>({
    show: props.show,
    mask: props.mask,
    message: props.message,
    forbidClick: props.forbidClick,
    zIndex: props.zIndex,
    type: props.type,
    loadingType: props.loadingType,
    position: props.position
  });

  function setOptions(opts: ToastOptions) {
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

  const toast: ToastType = {
    clear: () => {
      setOptions({ show: false });
      if (options.onClose) {
        options.onClose();
      }
    }
  };

  const show = (opts: ToastOptions) => {
    const curOpt = {
      ...currentOptions,
      ...opts
    } as ToastOptions;

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
