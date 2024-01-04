import { bem, addUnit, style } from '../common/utils';
export const emits = [];
export const props = {
  title: String,
  border: {
    type: Boolean,
    default: true
  },
  inset: Boolean,
  customClass: String
};
export const setup = () => {
  return {
    bem,
    style,
    addUnit
  };
};
