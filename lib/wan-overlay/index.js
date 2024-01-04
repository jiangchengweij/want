import { bem, addUnit, style } from '../common/utils';
export const emits = ['click'];
export const props = {
  show: Boolean,
  customStyle: String,
  customClass: null,
  duration: {
    type: [String, Number],
    default: 300
  },
  zIndex: {
    type: Number,
    default: 1
  }
};
export const setup = (props, context) => {
  const { emit } = context;
  function onClick() {
    emit('click');
  }
  function noop() {}
  return {
    bem,
    style,
    addUnit,
    onClick,
    noop
  };
};
