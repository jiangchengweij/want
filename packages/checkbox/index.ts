import {
  ComponentInternalInstance,
  computed,
  ExtractPropTypes,
  reactive,
  SetupContext,
  watch
} from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useParent } from '../common/utils/relation';

export const emits = ['update:modelValue', 'change'] as const;
export const props = {
  modelValue: Boolean,
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
  name: {
    type: String,
    default: ''
  },
  index: Number,
  iconClass: [String, Array],
  labelClass: [String, Array],
  customClass: [String, Array]
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(
  this: ComponentInternalInstance,
  props: Props,
  context: Context
) {
  const { expose } = context;
  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue !== state.innerValue) {
        state.innerValue = newValue;
      }
    }
  );

  const state = reactive({
    parentDisabled: false,
    direction: 'vertical',
    innerValue: props.modelValue
  });

  const { parent } = useParent('wanCheckbox');

  const iconStyle = computed(() => {
    const { checkedColor, disabled, iconSize } = props;
    const styles = {
      'font-size': addUnit(iconSize)
    };

    if (
      checkedColor &&
      state.innerValue &&
      !disabled &&
      !state.parentDisabled
    ) {
      styles['border-color'] = checkedColor;
      styles['background-color'] = checkedColor;
    }

    return style(styles);
  });

  const emitEvent = (target, value: boolean | AnyObject[]) => {
    target.emit('update:modelValue', value);
    target.emit('change', value);
  };

  const emitChange = (value: boolean) => {
    if (parent) {
      setParentValue(parent, value);
    } else {
      emitEvent(this, value);
    }
  };

  const toggle = () => {
    const { disabled } = props;
    if (!disabled && !state.parentDisabled) {
      emitChange(!state.innerValue);
    }
  };

  const onClickLabel = () => {
    const { labelDisabled, disabled } = props;
    if (!disabled && !labelDisabled && !state.parentDisabled) {
      emitChange(!state.innerValue);
    }
  };

  const setParentValue = (parent, value: boolean) => {
    const parentValue = parent.proxy.modelValue.slice();
    const { name } = props;
    const { max } = parent.proxy;

    if (value) {
      if (max && parentValue.length >= max) {
        return;
      }

      if (parentValue.indexOf(name) === -1) {
        parentValue.push(name);
        emitEvent(parent, parentValue);
      }
    } else {
      const index = parentValue.indexOf(name);
      if (index !== -1) {
        parentValue.splice(index, 1);
        emitEvent(parent, parentValue);
      }
    }
  };

  const setState = (options) => {
    Object.keys(options).forEach((key) => {
      state[key] = options[key];
    });
    if (options.innerValue) {
      emitEvent(this, options.innerValue);
    }
  };

  expose({ setState, toggle });
  return {
    bem,
    style,
    addUnit,
    state,
    iconStyle,
    onClickLabel,
    toggle
  };
}
