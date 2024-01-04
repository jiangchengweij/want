import { computed } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useChildren } from '../common/utils/relation';
export const emits = ['click'];
export const props = {
  square: {
    type: Boolean
  },
  gutter: {
    type: [Number, String],
    default: 0
  },
  clickable: {
    type: Boolean
  },
  columnNum: {
    type: [Number, String],
    default: 4
  },
  center: {
    type: Boolean,
    default: true
  },
  border: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String
  },
  iconSize: {
    type: String
  },
  reverse: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String
  }
};
export function setup(props, context) {
  useChildren('wanGrid');
  const rootStyle = computed(() => {
    return style({
      'padding-left': addUnit(props.gutter)
    });
  });
  return {
    bem,
    style,
    addUnit,
    rootStyle
  };
}
