import { ExtractPropTypes, SetupContext, watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useChildren } from '../common/utils/relation';

export const emits = ['change', 'update:modelValue'] as const;
export const props = {
  max: Number,
  modelValue: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean
  },
  direction: {
    type: String,
    default: 'vertical'
  }
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { expose } = context;
  const { children } = useChildren('wanCheckbox', {
    onLink(target) {
      updateChild(target);
    }
  });

  watch(
    () => props.modelValue,
    () => {
      updateChildren();
    }
  );

  watch(
    () => props.disabled,
    () => {
      updateChildren();
    }
  );

  const updateChildren = () => {
    children.forEach((child) => updateChild(child));
  };

  const updateChild = (child) => {
    const { modelValue, disabled, direction } = props;
    child.exposed.setState({
      innerValue: modelValue.indexOf(child.proxy.name) !== -1,
      parentDisabled: disabled,
      direction
    });
  };

  expose({ updateChildren });

  return {
    bem,
    style,
    addUnit
  };
}
