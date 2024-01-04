import {
  ComponentInternalInstance,
  ExtractPropTypes,
  nextTick,
  reactive,
  SetupContext,
  watch
} from 'vue';
import { bem, addUnit, style, toPromise } from '../common/utils';
import {
  props as buttonProps,
  emits as buttonEmits,
  setup as buttonSetup
} from '../common/mixins/button';

export const emits = [
  ...buttonEmits,
  'click',
  'close',
  'confirm',
  'cancel'
] as const;
export const props = {
  ...buttonProps,
  show: {
    type: Boolean
  },
  title: String,
  message: String,
  theme: {
    type: String,
    default: 'default'
  },
  className: String,
  customStyle: [String, Object],
  asyncClose: Boolean,
  messageAlign: String,
  beforeClose: null,
  overlayStyle: String,
  useSlot: Boolean,
  useTitleSlot: Boolean,
  useConfirmButtonSlot: Boolean,
  useCancelButtonSlot: Boolean,
  showCancelButton: Boolean,
  closeOnClickOverlay: Boolean,
  confirmButtonOpenType: String,
  width: null,
  zIndex: {
    type: Number,
    default: 2000
  },
  confirmButtonText: {
    type: String,
    default: '确认'
  },
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  confirmButtonColor: {
    type: String,
    default: '#ee0a24'
  },
  cancelButtonColor: {
    type: String,
    default: '#323233'
  },
  showConfirmButton: {
    type: Boolean,
    default: true
  },
  overlay: {
    type: Boolean,
    default: true
  },
  transition: {
    type: String,
    default: 'scale'
  },
  customClass: null,
  cancelButtonClass: null,
  confirmButtonClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

let queue: AnyObject[] = [];
export type Action = 'confirm' | 'cancel' | 'overlay';

interface DialogOptions {
  lang?: string;
  show?: boolean;
  title?: string;
  width?: string | number | null;
  zIndex?: number;
  theme?: string;
  message?: string;
  overlay?: boolean;
  selector?: string;
  ariaLabel?: string;
  /**
   * @deprecated use custom-class instead
   */
  className?: string;
  customStyle?: string;
  transition?: string;
  /**
   * @deprecated use beforeClose instead
   */
  asyncClose?: boolean;
  beforeClose?: null | ((action: Action) => Promise<void | boolean> | void);
  businessId?: number;
  sessionFrom?: string;
  overlayStyle?: string;
  appParameter?: string;
  messageAlign?: string;
  sendMessageImg?: string;
  showMessageCard?: boolean;
  sendMessagePath?: string;
  sendMessageTitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  closeOnClickOverlay?: boolean;
  confirmButtonOpenType?: string;
}

const defaultOptions = {
  loading: {
    confirm: false,
    cancel: false
  },
  callback: (() => {}) as unknown as (action: string, ref) => void
};

export function setup(
  this: ComponentInternalInstance,
  props: Props,
  context: Context
) {
  const { emit, expose } = context;
  const buttonSetupReturn = buttonSetup<Props, Context>(props, context);

  const options = reactive({
    show: props.show,
    title: props.title,
    width: props.width,
    theme: props.theme,
    message: props.message,
    zIndex: props.zIndex,
    overlay: props.overlay,
    className: props.className,
    asyncClose: props.asyncClose,
    beforeClose: props.beforeClose,
    transition: props.transition,
    customStyle: props.customStyle,
    messageAlign: props.messageAlign,
    overlayStyle: props.overlayStyle,
    confirmButtonText: props.confirmButtonText,
    cancelButtonText: props.cancelButtonText,
    showConfirmButton: props.showConfirmButton,
    showCancelButton: props.showCancelButton,
    closeOnClickOverlay: props.closeOnClickOverlay,
    confirmButtonOpenType: props.confirmButtonOpenType,
    loading: {
      confirm: false,
      cancel: false
    },
    callback: (() => {}) as unknown as (action: string, ref) => void
  });

  watch(
    () => props,
    (newOptions) => {
      setOptions(newOptions);
    },
    {
      deep: true
    }
  );

  watch(
    () => options.show,
    () => {
      if (!options.show) {
        stopLoading();
      }
    }
  );

  const onConfirm = () => {
    handleAction('confirm');
  };

  const onCancel = () => {
    handleAction('cancel');
  };

  const onClickOverlay = () => {
    close('overlay');
  };

  const close = (action) => {
    options.show = false;
    nextTick(() => {
      emit('close', action);
      if (options.callback) {
        options.callback(action, this);
      }
    });
  };

  const allClose = () => {
    queue.forEach((dialog) => {
      dialog.exposed.close();
    });
    queue = [];
  };

  const stopLoading = () => {
    options.loading.confirm = false;
    options.loading.cancel = false;
  };

  const allStopLoading = () => {
    queue.forEach((dialog) => {
      dialog.exposed.allStopLoading();
    });
  };

  const handleAction = (action) => {
    emit(action, { dialog: this });

    const { asyncClose, beforeClose } = options;

    if (!asyncClose && !beforeClose) {
      close(action);
      return;
    }

    options.loading[action] = true;

    if (beforeClose) {
      toPromise(beforeClose(action)).then((value) => {
        if (value) {
          close(action);
        } else {
          stopLoading();
        }
      });
    }
  };

  const show = (opts?: DialogOptions) => {
    const options = { ...defaultOptions, ...props, ...opts };

    return new Promise((resolve, reject) => {
      setOptions({
        ...options,
        callback: (action, target) => {
          action === 'confirm' ? resolve(target) : reject(target);
        }
      });
      nextTick(() => {
        setOptions({ show: true });
      });
      queue.push(this);
    });
  };

  const setOptions = (opts: AnyObject) => {
    if (!opts) {
      return;
    }
    Object.keys(opts).forEach((key) => {
      options[key] = opts[key];
    });
  };

  expose({
    show,
    setOptions,
    close,
    stopLoading,
    allClose,
    allStopLoading
  });

  return {
    bem,
    style,
    addUnit,
    ...buttonSetupReturn,
    options,
    onConfirm,
    onCancel,
    onClickOverlay
  };
}
