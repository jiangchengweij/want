import { watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useChildren } from '../common/utils/relation';
export const emits = ['update:modelValue', 'change'];
export const props = {
  modelValue: {
    type: null
  },
  direction: String,
  disabled: {
    type: Boolean
  }
};
export function setup(props) {
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
  const { children } = useChildren('wanRadio', {
    onLink() {
      updateChildren();
    }
  });
  const updateChildren = () => {
    children.forEach((child) => child.exposed.updateFromParent());
  };
  return {
    bem,
    style,
    addUnit
  };
}
