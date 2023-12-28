import { computed } from 'vue';
import {
  props as buttonProps,
  emits as buttonEmits,
  setup as buttonSetup
} from '../common/mixins/button';
import { bem, style, addUnit } from '../common/utils';
export const emits = ['click', ...buttonEmits];
export const props = {
  ...buttonProps,
  formType: String,
  icon: String,
  classPrefix: {
    type: String,
    default: 'wan-icon'
  },
  plain: Boolean,
  block: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  loadingText: String,
  loadingType: {
    type: String,
    default: 'circular'
  },
  type: {
    type: String,
    default: 'default'
  },
  dataset: null,
  size: {
    type: String,
    default: 'normal'
  },
  loadingSize: {
    type: String,
    default: '20px'
  },
  color: String,
  customStyle: [String, Object],
  loadingClass: String,
  customClass: String,
  hoverClass: String
};
export const setup = (props, context) => {
  const { emit } = context;
  const buttonSetupReturn = buttonSetup(props, context);
  const rootStyle = computed(() => {
    const { customStyle, color } = props;
    if (!color) {
      return style(customStyle);
    }
    const styleObj = {
      color: props.plain ? color : '#fff',
      background: props.plain ? null : props.color
    };
    if (color?.indexOf('gradient') !== -1) {
      styleObj.border = '0px';
    } else {
      styleObj['border-color'] = color;
    }
    return style([styleObj, customStyle]);
  });
  const loadingColor = computed(() => {
    const { plain, color, type } = props;
    if (plain) {
      return color ? color : '#c9c9c9';
    }
    if (type) {
      return '#c9c9c9';
    }
    return '#fff';
  });
  function onClick(event) {
    if (props.disabled || props.loading) return;
    emit('click', event);
  }
  return {
    bem,
    style,
    addUnit,
    ...buttonSetupReturn,
    rootStyle,
    loadingColor,
    onClick
  };
};
