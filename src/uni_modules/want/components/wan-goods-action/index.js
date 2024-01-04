import { bem, addUnit, style } from '../common/utils';
import { useChildren } from '../common/utils/relation';
export const emits = ['click'];
export const props = {
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  customClass: null
};
export function setup(props, context) {
  useChildren('wanAction');
  return {
    bem,
    style,
    addUnit
  };
}
