import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['click-step'] as const;
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

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { emit } = context;

  const onClick = (index: number) => {
    emit('click-step', index);
  };

  const get = (index: number, active: number) => {
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
