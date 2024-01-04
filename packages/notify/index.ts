import {
  computed,
  ExtractPropTypes,
  nextTick,
  reactive,
  SetupContext,
  watch
} from 'vue';
import { bem, addUnit, style, getSystemInfoSync } from '../common/utils';

export const emits = ['click'] as const;
export const props = {
  message: String,
  background: String,
  type: {
    type: String,
    default: 'danger'
  },
  color: {
    type: String,
    default: '#fff'
  },
  duration: {
    type: Number,
    default: 3000
  },
  zIndex: {
    type: Number,
    default: 110
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: false
  },
  top: [String, Number],
  webOffsetTop: {
    type: null,
    default: 0
  }
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

interface NotifyOptions {
  type?: 'primary' | 'success' | 'danger' | 'warning';
  color?: string;
  zIndex?: number;
  top?: number;
  message: string;
  duration?: number;
  selector?: string;
  background?: string;
  safeAreaInsetTop?: boolean;
  onClick?: () => void;
  onOpened?: () => void;
  onClose?: () => void;
}

export function setup(props: Props, context: Context) {
  const { expose } = context;
  const { statusBarHeight } = getSystemInfoSync();

  const options = reactive({
    show: false,
    type: props.type,
    message: props.message,
    background: props.background,
    color: props.color,
    duration: props.duration,
    zIndex: props.zIndex,
    safeAreaInsetTop: props.safeAreaInsetTop,
    top: props.top,
    onOpened: null as unknown as () => void,
    onClose: null as unknown as () => void,
    onClick: null as unknown as (detail: Record<string, null>) => void
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

  const rootStyle = computed(() => {
    const styleObj: AnyObject = {
      'z-index': options.zIndex
    };

    // #ifdef WEB
    styleObj.top = `calc(${addUnit(options.top)} + ${addUnit(
      props.webOffsetTop
    )})`;
    // #endif
    // #ifndef WEB
    styleObj.top = addUnit(options.top);
    // #endif
    return style(styleObj);
  });

  const notifyStyle = computed(() => {
    return style({
      background: options.background,
      color: options.color
    });
  });

  let _timer: number = 0;

  const show = (opt?: NotifyOptions) => {
    clearTimeout(_timer);
    setOptions({ ...props, ...opt });
    options.show = true;
    nextTick(options.onOpened);

    if (options.duration > 0 && options.duration !== Infinity) {
      _timer = setTimeout(() => {
        hide();
      }, options.duration);
    }
  };

  const hide = (opt?: NotifyOptions) => {
    clearTimeout(_timer);
    setOptions({ ...props, ...opt });
    options.show = false;

    nextTick(options.onClose);
  };

  const onTap = (event) => {
    if (options.onClick) {
      options.onClick(event);
    }
  };

  const setOptions = (opts) => {
    if (!opts) {
      return;
    }
    Object.keys(opts).forEach((key) => {
      options[key] = opts[key];
    });
  };

  expose({
    setOptions,
    show,
    hide
  });
  return {
    bem,
    style,
    addUnit,
    options,
    rootStyle,
    notifyStyle,
    onTap,
    statusBarHeight
  };
}
