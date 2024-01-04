import { computed, reactive, watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useParent } from '../common/utils/relation';
export const emits = ['update:modelValue', 'change'];
export const props = {
  name: null,
  modelValue: null,
  disabled: Boolean,
  useIconSlot: Boolean,
  checkedColor: String,
  labelPosition: {
    type: String,
    default: 'right'
  },
  labelDisabled: Boolean,
  shape: {
    type: String,
    default: 'round'
  },
  iconSize: {
    type: null,
    default: 20
  },
  customClass: null,
  iconClass: null,
  labelClass: null
};
export function setup(props, context) {
  const { expose } = context;
  const state = reactive({
    direction: '',
    parentDisabled: false,
    innerValue: props.modelValue
  });
  const { parent } = useParent('wanRadio');
  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue !== state.innerValue) {
        state.innerValue = newValue;
      }
    }
  );
  const iconStyle = computed(() => {
    const { iconSize, checkedColor, disabled, name } = props;
    const styles = {
      'font-size': addUnit(iconSize)
    };
    if (
      checkedColor &&
      !(disabled || state.parentDisabled) &&
      state.innerValue === name
    ) {
      styles['border-color'] = checkedColor;
      styles['background-color'] = checkedColor;
    }
    return style(styles);
  });
  const iconCustomStyle = computed(() => {
    return style({
      'line-height': addUnit(props.iconSize),
      'font-size': '.8em',
      display: 'block'
    });
  });
  const updateFromParent = () => {
    if (!parent) {
      return;
    }
    const { modelValue, disabled: parentDisabled, direction } = parent.proxy;
    state.innerValue = modelValue;
    state.direction = direction;
    state.parentDisabled = parentDisabled;
  };
  const emitChange = (value) => {
    const target = parent || this;
    target.emit('update:modelValue', value);
    target.emit('change', value);
  };
  const onChange = () => {
    if (!props.disabled && !state.parentDisabled) {
      emitChange(props.name);
    }
  };
  const onClickLabel = () => {
    const { disabled, labelDisabled, name } = props;
    if (!(disabled || state.parentDisabled) && !labelDisabled) {
      emitChange(name);
    }
  };
  expose({ updateFromParent });
  return {
    bem,
    style,
    addUnit,
    state,
    iconStyle,
    iconCustomStyle,
    updateFromParent,
    onChange,
    onClickLabel
  };
}
