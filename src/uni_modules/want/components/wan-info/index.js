import { bem, addUnit, style } from '../common/utils';
export const emits = ['click'];
export const props = {
  dot: Boolean,
  info: [String, Number],
  customStyle: String,
  customClass: String
};
export const setup = (props, context) => {
  return {
    bem,
    style,
    addUnit
  };
};
