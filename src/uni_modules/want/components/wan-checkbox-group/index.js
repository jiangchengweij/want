import { watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useChildren } from '../common/utils/relation';
export const emits = ['change', 'update:modelValue'];
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
export function setup(props, context) {
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
