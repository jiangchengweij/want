import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['click'] as const;
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

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export const setup = (props: Props, context: Context) => {
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
