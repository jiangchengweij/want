import {
  ComponentInternalInstance,
  computed,
  ExtractPropTypes,
  onMounted,
  reactive,
  SetupContext,
  watch
} from 'vue';
import { bem, addUnit, style, getRect } from '../common/utils';

export const emits = ['close', 'click'] as const;
export const props = {
  text: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  },
  openType: {
    type: String,
    default: 'navigate'
  },
  delay: {
    type: Number,
    default: 1
  },
  speed: {
    type: Number,
    default: 60
  },
  scrollable: null,
  leftIcon: {
    type: String,
    default: ''
  },
  color: String,
  backgroundColor: String,
  background: String,
  wrapable: Boolean,
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(
  this: ComponentInternalInstance,
  props: Props,
  context: Context
) {
  const { emit } = context;

  const state = reactive({
    show: true,
    animationData: null
  });

  let _wrapWidth, _contentWidth, _duration, _animation, _timer;

  const _resetAnimation = uni.createAnimation({
    duration: 0,
    timingFunction: 'linear'
  });

  onMounted(() => {
    init();
  });

  watch(
    () => props.text,
    () => {
      init();
    }
  );

  watch(
    () => props.speed,
    () => {
      init();
    }
  );

  const rootStyle = computed(() => {
    return style({
      color: props.color,
      'background-color': props.backgroundColor,
      background: props.background
    });
  });

  const init = () => {
    requestAnimationFrame(() => {
      Promise.all([
        getRect(this, '.wan-notice-bar__content'),
        getRect(this, '.wan-notice-bar__wrap')
      ]).then((rects) => {
        const [contentRect, wrapRect] = rects;
        const { speed, scrollable, delay } = props;
        if (
          contentRect == null ||
          wrapRect == null ||
          !contentRect.width ||
          !wrapRect.width ||
          scrollable === false
        ) {
          return;
        }

        if (scrollable || wrapRect.width < contentRect.width) {
          const duration =
            ((wrapRect.width + contentRect.width) / speed) * 1000;

          _wrapWidth = wrapRect.width;
          _contentWidth = contentRect.width;
          _duration = duration;
          _animation = uni.createAnimation({
            duration,
            timingFunction: 'linear',
            delay
          });

          scroll(true);
        }
      });
    });
  };

  const scroll = (isInit = false) => {
    _timer && clearTimeout(_timer);
    _timer = null;
    _resetAnimation.translateX(isInit ? 0 : _wrapWidth).step();
    state.animationData = _resetAnimation.export();

    requestAnimationFrame(() => {
      _animation.translateX(-_contentWidth).step();
      state.animationData = _animation.export();
    });

    _timer = setTimeout(() => {
      scroll();
    }, _duration);
  };

  const onClickIcon = (event) => {
    if (props.mode === 'closeable') {
      _timer && clearTimeout(_timer);
      _timer = null;
      state.show = false;
      emit('close', event.detail);
    }
  };

  const onClick = (event: TouchEvent) => {
    emit('click', event);
  };
  return {
    bem,
    style,
    addUnit,
    state,
    rootStyle,
    onClickIcon,
    onClick
  };
}
