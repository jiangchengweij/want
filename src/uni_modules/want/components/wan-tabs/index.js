import { computed, nextTick, onMounted, reactive, watch } from 'vue';
import {
  bem,
  addUnit,
  style,
  getAllRect,
  getRect,
  requestAnimationFrame
} from '../common/utils';
import { useTouch } from '../common/utils/touch';
import { isDef } from '../common/utils/validator';
import { useChildren } from '../common/utils/relation';
export const emits = ['change', 'disabled', 'before-change', 'click', 'scroll'];
export const props = {
  sticky: Boolean,
  border: Boolean,
  swipeable: Boolean,
  titleActiveColor: String,
  titleInactiveColor: String,
  color: String,
  animated: {
    type: Boolean
  },
  lineWidth: {
    type: Number,
    default: 40,
    observer: 'resize'
  },
  lineHeight: {
    type: Number,
    default: -1
  },
  active: {
    type: [String, Number],
    default: 0
  },
  type: {
    type: String,
    default: 'line'
  },
  ellipsis: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 0.3
  },
  zIndex: {
    type: Number,
    default: 1
  },
  swipeThreshold: {
    type: Number,
    default: 5
  },
  offsetTop: {
    type: Number,
    default: 0
  },
  webOffsetTop: {
    type: Number,
    default: 0
  },
  lazyRender: {
    type: Boolean,
    default: true
  },
  useBeforeChange: {
    type: Boolean,
    default: false
  },
  navClass: String,
  tabClass: String,
  tabActiveClass: String,
  lineClass: String,
  wrapClass: String,
  customClass: String
};
export function setup(props, context) {
  const { emit, expose } = context;
  const { touchVar, touchMove, touchStart } = useTouch();
  const container = () =>
    uni.createSelectorQuery().in(this).select('.wan-tabs');
  let _swiping = false;
  const state = reactive({
    tabs: [],
    scrollLeft: 0,
    scrollable: false,
    currentIndex: 0,
    skipTransition: true,
    scrollWithAnimation: false,
    lineOffsetLeft: 0,
    inited: false
  });
  const { children } = useChildren('wanTabs', {
    onUnLink() {
      state.currentIndex = 0;
      state.inited = false;
      updateTabs();
    }
  });
  onMounted(() => {
    requestAnimationFrame(() => {
      _swiping = true;
      resize();
      scrollIntoView();
    });
  });
  const tabClass = computed(() => {
    const { tabClass, tabActiveClass, ellipsis } = props;
    const classes = [tabClass || ''];
    if (ellipsis) {
      classes.push('wan-ellipsis');
    }
    return ({ active }) => {
      const tmpClass = [...classes];
      if (active) {
        tmpClass.push(tabActiveClass || '');
      }
      return tmpClass.join(' ');
    };
  });
  const tabStyle = computed(() => {
    const {
      type,
      color,
      titleActiveColor,
      titleInactiveColor,
      swipeThreshold
    } = props;
    const ellipsis = state.scrollable && props.ellipsis;
    return ({ disabled, active }) => {
      const titleColor = active ? titleActiveColor : titleInactiveColor;
      // card theme color
      if (type === 'card') {
        return style({
          'border-color': color,
          'background-color': !disabled && active ? color : null,
          color: titleColor || (!disabled && !active ? color : null),
          'flex-basis': ellipsis ? 88 / swipeThreshold + '%' : null
        });
      }
      return style({
        color: titleColor,
        'flex-basis': ellipsis ? 88 / swipeThreshold + '%' : null
      });
    };
  });
  const navStyle = computed(() => {
    const { type, color } = props;
    return style({
      'border-color': type === 'card' && color ? color : null
    });
  });
  const trackStyle = computed(() => {
    if (!props.animated) {
      return '';
    }
    return style({
      left: -100 * state.currentIndex + '%',
      'transition-duration': props.duration + 's',
      '-webkit-transition-duration': props.duration + 's'
    });
  });
  const lineStyle = computed(() => {
    const { lineWidth, color, lineHeight, duration } = props;
    return style({
      width: addUnit(lineWidth),
      opacity: state.inited ? 1 : 0,
      transform: 'translateX(' + state.lineOffsetLeft + 'px)',
      '-webkit-transform': 'translateX(' + state.lineOffsetLeft + 'px)',
      'background-color': color,
      height: lineHeight !== -1 ? addUnit(lineHeight) : null,
      'border-radius': lineHeight !== -1 ? addUnit(lineHeight) : null,
      'transition-duration': !state.skipTransition ? duration + 's' : null,
      '-webkit-transition-duration': !state.skipTransition
        ? duration + 's'
        : null
    });
  });
  watch(
    () => props.active,
    (name) => {
      if (name !== getCurrentName()) {
        setCurrentIndexByName(name);
      }
    }
  );
  watch(
    () => props.swipeThreshold,
    (value) => {
      state.scrollable = children.length > value || !props.ellipsis;
    }
  );
  watch(
    () => props.animated,
    () => {
      children.forEach((child, index) => {
        child.updateRender(index === state.currentIndex);
      });
    }
  );
  const updateTabs = () => {
    const tempTabs = new Array(children.length);
    children.forEach((item) => {
      tempTabs[item.exposed.getIndex()] = item.proxy;
    });
    state.tabs = tempTabs;
    state.scrollable =
      children.length > props.swipeThreshold || !props.ellipsis;
    setCurrentIndexByName(props.active || getCurrentName());
  };
  const trigger = (eventName, child) => {
    const data = getChildData(state.currentIndex, child);
    if (!isDef(data)) {
      return;
    }
    emit(eventName, data);
  };
  const setCurrentIndexByName = (name) => {
    const matched = children.filter(
      (child) => child.exposed.getComputedName() === name
    );
    if (matched.length) {
      setCurrentIndex(matched[0].exposed.getIndex());
    }
  };
  const setCurrentIndex = (currentIndex) => {
    if (
      !isDef(currentIndex) ||
      currentIndex >= children.length ||
      currentIndex < 0
    ) {
      return;
    }
    children.forEach((item, index) => {
      const active = index === currentIndex;
      if (active !== item.exposed.active || !item.exposed.inited) {
        item.exposed.updateRender(active);
      }
    });
    if (currentIndex === state.currentIndex) {
      if (!state.inited) {
        resize();
      }
      return;
    }
    const shouldEmitChange = state.currentIndex !== null;
    state.currentIndex = currentIndex;
    requestAnimationFrame(() => {
      resize();
      scrollIntoView();
    });
    nextTick(() => {
      if (shouldEmitChange) {
        trigger('change');
      }
    });
  };
  const getCurrentName = () => {
    const activeTab = children[state.currentIndex];
    if (activeTab) {
      return activeTab.exposed.getComputedName();
    }
  };
  const resize = () => {
    if (props.type !== 'line') {
      return;
    }
    Promise.all([
      getAllRect(this, '.wan-tab'),
      getRect(this, '.wan-tabs__line')
    ]).then(([rects = [], lineRect]) => {
      const rect = rects[state.currentIndex];
      if (rect == null) {
        return;
      }
      let lineOffsetLeft = rects
        .slice(0, state.currentIndex)
        .reduce((prev, curr) => prev + curr.width, 0);
      lineOffsetLeft +=
        (rect.width - lineRect.width) / 2 + (props.ellipsis ? 0 : 8);
      state.lineOffsetLeft = lineOffsetLeft;
      state.inited = true;
      _swiping = true;
      if (state.skipTransition) {
        // waiting transition end
        setTimeout(() => {
          state.skipTransition = false;
        }, props.duration);
      }
    });
  };
  const scrollIntoView = () => {
    if (!state.scrollable) {
      return;
    }
    Promise.all([
      getAllRect(this, '.wan-tab'),
      getRect(this, '.wan-tabs__nav')
    ]).then(([tabRects, navRect]) => {
      const tabRect = tabRects[state.currentIndex];
      const offsetLeft = tabRects
        .slice(0, state.currentIndex)
        .reduce((prev, curr) => prev + curr.width, 0);
      state.scrollLeft = offsetLeft - (navRect.width - tabRect.width) / 2;
      if (!state.scrollWithAnimation) {
        state.scrollWithAnimation = true;
      }
    });
  };
  const getChildData = (index, child) => {
    const currentChild = child || children[index];
    if (!isDef(currentChild)) {
      return;
    }
    return {
      index: currentChild.exposed.getIndex(),
      name: currentChild.exposed.getComputedName(),
      title: currentChild.proxy.title
    };
  };
  const onTap = (index) => {
    const child = children.find((child) => child.exposed.getIndex() === index);
    if (child.disabled) {
      trigger('disabled', child);
      return;
    }
    onBeforeChange(index).then(() => {
      setCurrentIndex(index);
      nextTick(() => {
        trigger('click');
      });
    });
  };
  const onBeforeChange = (index) => {
    const { useBeforeChange } = props;
    if (!useBeforeChange) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      emit('before-change', {
        ...getChildData(index),
        callback: (status) => (status ? resolve() : reject())
      });
    });
  };
  const onTouchScroll = (event) => {
    emit('scroll', event);
  };
  const onTouchStart = (event) => {
    if (!props.swipeable) return;
    _swiping = true;
    touchStart(event);
  };
  const onTouchMove = (event) => {
    if (!props.swipeable || !_swiping) return;
    touchMove(event);
  };
  const onTouchEnd = () => {
    if (!props.swipeable || !_swiping) return;
    const minSwipeDistance = 50;
    if (
      touchVar.direction === 'horizontal' &&
      touchVar.offsetX >= minSwipeDistance
    ) {
      const index = getAvaiableTab(touchVar.deltaX);
      if (index !== -1) {
        onBeforeChange(index).then(() => setCurrentIndex(index));
      }
    }
    _swiping = false;
  };
  const getAvaiableTab = (direction) => {
    const step = direction > 0 ? -1 : 1;
    for (
      let i = step;
      state.currentIndex + i < state.tabs.length && state.currentIndex + i >= 0;
      i += step
    ) {
      const index = state.currentIndex + i;
      if (
        index >= 0 &&
        index < state.tabs.length &&
        state.tabs[index] &&
        !state.tabs[index].disabled
      ) {
        return index;
      }
    }
    return -1;
  };
  expose({
    updateTabs
  });
  return {
    bem,
    style,
    addUnit,
    container,
    state,
    onTap,
    onTouchScroll,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    tabClass,
    tabStyle,
    navStyle,
    trackStyle,
    lineStyle
  };
}
