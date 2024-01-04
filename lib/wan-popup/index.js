import { computed, watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import {
  setup as transitionSetup,
  props as transitionProps,
  emits as transitionEmits
} from '../common/mixins/transition';
export const emits = [...transitionEmits, 'click-overlay', 'close'];
export const props = Object.assign(Object.assign({}, transitionProps), {
  show: {
    type: Boolean,
    default: false
  },
  round: Boolean,
  closeable: Boolean,
  customStyle: [String, Object],
  overlayStyle: String,
  transition: {
    type: String
  },
  zIndex: {
    type: Number,
    default: 100
  },
  overlay: {
    type: Boolean,
    default: true
  },
  closeIcon: {
    type: String,
    default: 'cross'
  },
  closeIconPosition: {
    type: String,
    default: 'top-right'
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  position: {
    type: String,
    default: 'center'
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: false
  },
  safeAreaTabBar: {
    type: Boolean,
    default: false
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  customClass: [String, Array],
  closeIconClass: String
});
export const setup = (props, context) => {
  const { emit } = context;
  let originDuration = null;
  const transitionSetupReturn = transitionSetup(props, context);
  const { state } = transitionSetupReturn;
  changeClass();
  watch(
    () => props.transition,
    () => {
      changeClass();
    }
  );
  watch(
    () => props.position,
    () => {
      changeClass();
    }
  );
  function changeClass() {
    const { transition, position, duration } = props;
    state.name = transition || position;
    if (transition === 'none') {
      state.duration = 0;
      originDuration = duration;
    } else if (originDuration != null) {
      state.duration = originDuration;
    }
  }
  const popupStyle = computed(() => {
    return style([
      {
        'z-index': props.zIndex,
        '-webkit-transition-duration': state.currentDuration + 'ms',
        'transition-duration': state.currentDuration + 'ms'
      },
      state.display ? null : 'display: none',
      props.customStyle
    ]);
  });
  function onClickCloseIcon() {
    emit('close');
  }
  function onClickOverlay() {
    emit('click-overlay');
    if (props.closeOnClickOverlay) {
      emit('close');
    }
  }
  return Object.assign(
    Object.assign({ bem, style, addUnit }, transitionSetupReturn),
    { popupStyle, onClickCloseIcon, onClickOverlay }
  );
};
