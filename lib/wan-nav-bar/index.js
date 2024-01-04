import { computed, nextTick, onMounted, reactive, watch } from 'vue';
import {
  bem,
  addUnit,
  style,
  getRect,
  getSystemInfoSync
} from '../common/utils';
export const emits = ['click'];
export const props = {
  title: String,
  fixed: {
    type: Boolean
  },
  placeholder: {
    type: Boolean
  },
  leftText: String,
  rightText: String,
  leftArrow: Boolean,
  border: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
    default: 1
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: true
  },
  customStyle: null,
  customClass: null,
  titleClass: null
};
export function setup(props) {
  watch(
    () => props.fixed,
    () => {
      setHeight();
    }
  );
  watch(
    () => props.placeholder,
    () => {
      setHeight();
    }
  );
  const { statusBarHeight } = getSystemInfoSync();
  const state = reactive({
    height: 46 + statusBarHeight
  });
  onMounted(() => {
    setHeight();
  });
  const barStyle = computed(() => {
    const { zIndex, safeAreaInsetTop, customStyle } = props;
    return Object.assign(
      {
        zIndex: zIndex,
        paddingTop: safeAreaInsetTop ? statusBarHeight + 'px' : 0
      },
      customStyle
    );
  });
  const setHeight = () => {
    const { fixed, placeholder } = props;
    if (!fixed || !placeholder) {
      return;
    }
    nextTick(() => {
      getRect(this, '.wan-nav-bar').then((res) => {
        if (res && 'height' in res) {
          state.height = res.height;
        }
      });
    });
  };
  return {
    bem,
    style,
    addUnit,
    state,
    barStyle
  };
}
