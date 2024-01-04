import { computed } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export const emits = ['update:modelValue', 'change'];
export const props = {
  modelValue: null,
  loading: Boolean,
  disabled: Boolean,
  activeColor: String,
  inactiveColor: String,
  size: {
    type: String,
    default: '30'
  },
  activeValue: {
    type: null,
    default: true
  },
  inactiveValue: {
    type: null,
    default: false
  },
  customClass: null,
  nodeClass: null
};
export function setup(props, context) {
  const { emit } = context;
  const rootStyle = computed(() => {
    const { modelValue, activeValue, activeColor, inactiveColor, size } = props;
    const currentColor =
      modelValue === activeValue ? activeColor : inactiveColor;
    return style({
      'font-size': addUnit(size),
      'background-color': currentColor
    });
  });
  const BLUE = '#1989fa';
  const GRAY_DARK = '#969799';
  const loadingColor = computed(() => {
    const { modelValue, activeValue, activeColor, inactiveColor } = props;
    return modelValue === activeValue
      ? activeColor || BLUE
      : inactiveColor || GRAY_DARK;
  });
  function onClick() {
    const { activeValue, inactiveValue, disabled, loading } = props;
    if (disabled || loading) {
      return;
    }
    const checked = props.modelValue === activeValue;
    const value = checked ? inactiveValue : activeValue;
    emit('update:modelValue', value);
    emit('change', value);
  }
  return {
    bem,
    style,
    addUnit,
    rootStyle,
    loadingColor,
    onClick
  };
}
