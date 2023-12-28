import { useChildren } from '../common/utils/relation';
import { computed } from 'vue';
import { bem, addUnit, style, toNumber } from '../common/utils';
export const emits = ['click'];
export const props = {
  gutter: [Number, String]
};
export const setup = (props, context) => {
  const { emit } = context;
  useChildren('wanRow');
  const rootStyle = computed(() => {
    const { gutter } = props;
    return {
      marginRight: addUnit(-toNumber(gutter) / 2),
      marginLeft: addUnit(-toNumber(gutter) / 2)
    };
  });
  function onClick(event) {
    emit('click', event);
  }
  return {
    bem,
    style,
    addUnit,
    rootStyle,
    onClick
  };
};
