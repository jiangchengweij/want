import { watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useChildren } from '../common/utils/relation';
export const emits = ['update:modelValue', 'open', 'close', 'change'];
export const props = {
  modelValue: {
    type: null,
    required: true
  },
  accordion: {
    type: Boolean
  },
  border: {
    type: Boolean,
    default: true
  },
  customClass: null
};
export function setup(props, context) {
  const { emit, expose } = context;
  const { children } = useChildren('wanCollapse');
  function updateExpanded() {
    children.forEach((child) => {
      child.exposed.updateExpanded();
    });
  }
  function toggle(name, expanded) {
    const { accordion, modelValue } = props;
    const changeItem = name;
    if (!accordion) {
      name = expanded
        ? (modelValue || []).concat(name)
        : (modelValue || []).filter((activeName) => activeName !== name);
    } else {
      name = expanded ? name : '';
    }
    if (expanded) {
      emit('open', changeItem);
    } else {
      emit('close', changeItem);
    }
    emit('change', name);
    emit('update:modelValue', name);
  }
  watch(
    () => props.modelValue,
    () => {
      updateExpanded();
    }
  );
  watch(
    () => props.accordion,
    () => {
      updateExpanded();
    }
  );
  expose({
    toggle
  });
  return {
    bem,
    style,
    addUnit
  };
}
