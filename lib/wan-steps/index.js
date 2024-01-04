import { bem, addUnit, style } from '../common/utils';
export const emits = ['click-step'];
export const props = {
  icon: String,
  steps: {
    type: Array,
    default: () => []
  },
  active: {
    type: Number,
    default: 0
  },
  direction: {
    type: String,
    default: 'horizontal'
  },
  activeColor: {
    type: String,
    default: '#07c160'
  },
  inactiveColor: {
    type: String,
    default: '#969799'
  },
  activeIcon: {
    type: String,
    default: 'checked'
  },
  inactiveIcon: String,
  descClass: null,
  customClass: null
};
export function setup(props, context) {
  const { emit } = context;
  const onClick = (index) => {
    emit('click-step', index);
  };
  const get = (index, active) => {
    if (index < active) {
      return 'finish';
    } else if (index === active) {
      return 'process';
    }
    return 'inactive';
  };
  return {
    bem,
    style,
    addUnit,
    onClick,
    get
  };
}
