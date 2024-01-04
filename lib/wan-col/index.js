import { useParent } from '../common/utils/relation';
import { computed, inject } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export const emits = ['click'];
export const props = {
  span: [Number, String],
  offset: [Number, String],
  customClass: String
};
export const setup = (props, context) => {
  const { emit } = context;
  const { parent } = useParent('wanRow');
  const rootStyle = computed(() => {
    if (!parent) {
      return '';
    }
    const { gutter } = parent.proxy;
    return {
      paddingRight: addUnit(gutter / 2),
      paddingLeft: addUnit(gutter / 2)
    };
  });
  function onClick(event) {
    emit('click', event);
  }
  return {
    bem,
    style,
    addUnit,
    onClick,
    rootStyle
  };
};
