import { computed, onMounted, onUnmounted, reactive, toRefs } from 'vue';
import { bem, addUnit, style, getRect } from '../common/utils';
export const emits = ['scroll'];
export const props = {
  zIndex: {
    type: Number,
    default: 99
  },
  offsetTop: {
    type: Number,
    default: 0
  },
  webOffsetTop: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  target: {
    type: String,
    default: '.wan-sticky'
  },
  customClass: null,
  container: {
    type: Function
  }
};
export function setup(props, context) {
  const { emit } = context;
  let _contentObserver = null;
  let _containerObserver = null;
  let _containerHeight = 0;
  let _relativeTop = 0;
  const state = reactive({
    height: 0,
    fixed: false,
    width: 0
  });
  onMounted(() => {
    if (!props.disabled) initObserver();
  });
  onUnmounted(() => {
    disconnectObserver();
  });
  const getOffsetTop = computed(() => {
    let offsetTop = props.offsetTop;
    // #ifdef WEB
    offsetTop = offsetTop + props.webOffsetTop;
    // #endif
    return offsetTop;
  });
  const wrapStyle = computed(() => {
    const style = {};
    if (state.fixed) {
      style.top = getOffsetTop.value + 'px';
      style.height = state.height + 'px';
      style.width = state.width + 'px';
    }
    return style;
  });
  const containerStyle = computed(() => {
    const style = {};
    if (state.fixed) {
      style.height = state.height + 'px';
      style.width = state.width + 'px';
      style.zIndex = props.zIndex;
    }
    return style;
  });
  const getContainerRect = () => {
    const nodesRef = props.container();
    return new Promise((resolve) =>
      nodesRef.boundingClientRect(resolve).exec()
    );
  };
  const initObserver = () => {
    disconnectObserver();
    getRect(this, props.target).then((rect) => {
      state.height = rect.height;
      state.width = rect.width;
      observerContent();
      observerContainer();
    });
  };
  const observerContent = () => {
    const { target } = props;
    _contentObserver && _contentObserver.disconnect();
    _contentObserver = uni.createIntersectionObserver(this, {
      thresholds: [1],
      initialRatio: 1
    });
    _contentObserver.relativeToViewport({
      top: -getOffsetTop.value
    });
    _contentObserver.observe(target, (res) => {
      if (props.disabled) return;
      setFixed(res.boundingClientRect.top);
    });
  };
  const observerContainer = () => {
    const { container, target, disabled } = props;
    if (typeof container !== 'function') return;
    _containerObserver && _containerObserver.disconnect();
    getContainerRect().then((rect) => {
      getRect(this, target).then((contentRect) => {
        const tmpContentTop = contentRect.top;
        const tmpContainerTop = rect.top;
        const tmpContainerHeight = rect.height;
        const tmpRelativeTop = tmpContentTop - tmpContainerTop;
        const tmpContainerObserver = uni.createIntersectionObserver(this, {
          thresholds: [1],
          initialRatio: 1
        });
        tmpContainerObserver.relativeToViewport({
          top:
            tmpContainerHeight -
            state.height -
            getOffsetTop.value -
            tmpRelativeTop
        });
        tmpContainerObserver.observe(target, (res) => {
          if (disabled) return;
          setFixed(res.boundingClientRect.top);
        });
        _relativeTop = tmpRelativeTop;
        _containerHeight = tmpContainerHeight;
        _containerObserver = tmpContainerObserver;
      });
    });
  };
  const disconnectObserver = () => {
    _contentObserver && _contentObserver.disconnect();
    _containerObserver && _containerObserver.disconnect();
  };
  const setFixed = (top) => {
    const fixed =
      _containerHeight && state.height
        ? top >=
            state.height +
              getOffsetTop.value +
              _relativeTop -
              _containerHeight && top < getOffsetTop.value
        : top < getOffsetTop.value;
    emit('scroll', {
      scrollTop: top,
      isFixed: fixed
    });
    state.fixed = fixed;
  };
  return {
    bem,
    style,
    addUnit,
    ...toRefs(state),
    wrapStyle,
    containerStyle
  };
}
