import { computed, nextTick, onMounted, reactive } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useParent } from '../common/utils/relation';
export const emits = [
  'update:modelValue',
  'open',
  'opened',
  'close',
  'closed',
  'change',
  'before-toggle'
];
export const props = {
  modelValue: {
    type: null
  },
  title: {
    type: String
  },
  disabled: Boolean,
  titleClass: {
    type: String
  },
  options: {
    type: Array,
    default: () => []
  },
  popupStyle: String,
  useBeforeToggle: {
    type: Boolean,
    default: false
  },
  index: Number,
  customClass: null,
  itemTitleClass: null
};
export function setup(props, context) {
  const { emit, expose } = context;
  const state = reactive({
    transition: true,
    showPopup: false,
    showWrapper: false,
    displayTitle: '',
    direction: null,
    duration: 200,
    overlay: null,
    activeColor: null,
    closeOnClickOverlay: null,
    safeAreaTabBar: false,
    wrapperStyle: {}
  });
  const { parent, index } = useParent('wanDropdownItem');
  onMounted(() => {
    updateDataFromParent();
  });
  const curIndex = computed(() => {
    return props.index != null ? props.index : index;
  });
  const rerender = () => {
    nextTick(() => {
      parent?.exposed.updateItemListData();
    });
  };
  const updateDataFromParent = () => {
    if (parent) {
      const {
        overlay,
        duration,
        activeColor,
        closeOnClickOverlay,
        direction,
        safeAreaTabBar
      } = parent.proxy;
      state.overlay = overlay;
      state.duration = duration;
      state.activeColor = activeColor;
      state.closeOnClickOverlay = closeOnClickOverlay;
      state.direction = direction;
      state.safeAreaTabBar = safeAreaTabBar;
    }
  };
  const onOpen = () => {
    emit('open');
  };
  const onOpened = () => {
    emit('opened');
  };
  const onClose = () => {
    emit('close');
  };
  const onClosed = () => {
    emit('closed');
    state.showWrapper = false;
  };
  const onOptionTap = (option) => {
    const { value } = option;
    const shouldEmitChange = props.modelValue !== value;
    state.showPopup = false;
    emit('update:modelValue', value);
    emit('close');
    rerender();
    if (shouldEmitChange) {
      emit('change', value);
    }
  };
  const toggle = (show, options = {}) => {
    if (typeof show !== 'boolean') {
      show = !state.showPopup;
    }
    if (show === state.showPopup) {
      return;
    }
    onBeforeToggle(show).then((status) => {
      if (!status) {
        return;
      }
      state.transition = !options.immediate;
      state.showPopup = !!show;
      if (show) {
        parent?.exposed.getChildWrapperStyle().then((wrapperStyle) => {
          state.wrapperStyle = wrapperStyle;
          state.showWrapper = true;
          rerender();
        });
      } else {
        rerender();
      }
    });
  };
  const onBeforeToggle = (status) => {
    const { useBeforeToggle } = props;
    if (!useBeforeToggle) {
      return Promise.resolve(true);
    }
    return new Promise((resolve) => {
      emit('before-toggle', {
        status,
        callback: (value) => resolve(value)
      });
    });
  };
  const getData = () => {
    return { showPopup: state.showPopup, ...props };
  };
  expose({
    toggle,
    getData,
    updateDataFromParent
  });
  return {
    bem,
    style,
    addUnit,
    curIndex,
    state,
    toggle,
    onOpen,
    onOpened,
    onClose,
    onClosed,
    onOptionTap
  };
}
