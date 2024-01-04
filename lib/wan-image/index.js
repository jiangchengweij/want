import { computed, reactive, watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export const emits = ['load', 'error', 'click'];
export const props = {
  src: {
    type: String
  },
  round: Boolean,
  width: [String, Number],
  height: [String, Number],
  radius: [String, Number],
  lazyLoad: Boolean,
  useErrorSlot: Boolean,
  useLoadingSlot: Boolean,
  showMenuByLongpress: Boolean,
  fit: {
    type: String,
    default: 'fill'
  },
  webp: {
    type: Boolean,
    default: false
  },
  showError: {
    type: Boolean,
    default: true
  },
  showLoading: {
    type: Boolean,
    default: true
  },
  customClass: String,
  loadingClass: String,
  errorClass: String,
  imageClass: String
};
export function setup(props, context) {
  const { emit } = context;
  const state = reactive({
    error: false,
    loading: true,
    viewStyle: ''
  });
  watch(
    () => props.src,
    () => {
      state.error = false;
      state.loading = true;
    }
  );
  const onLoad = () => {
    state.loading = false;
    emit('load');
  };
  const onError = (event) => {
    state.loading = false;
    state.error = true;
    emit('error', event);
  };
  const onClick = (event) => {
    emit('click', event);
  };
  const rootStyle = computed(() => {
    const { width, height, radius } = props;
    return style([
      {
        width: addUnit(width),
        height: addUnit(height),
        borderRaduis: addUnit(radius)
      },
      radius ? 'overflow: hidden' : null
    ]);
  });
  const FIT_MODE_MAP = {
    none: 'center',
    fill: 'scaleToFill',
    cover: 'aspectFill',
    contain: 'aspectFit',
    widthFix: 'widthFix',
    heightFix: 'heightFix'
  };
  const mode = computed(() => {
    const { fit } = props;
    return FIT_MODE_MAP[fit];
  });
  return {
    bem,
    style,
    addUnit,
    state,
    onLoad,
    onError,
    onClick,
    rootStyle,
    mode
  };
}
