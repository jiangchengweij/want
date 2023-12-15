import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = [] as const;
export const props = {
  title: String,
  border: {
    type: Boolean,
    default: true
  },
  inset: Boolean,
  customClass: String
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export const setup = () => {
  return {
    bem,
    style,
    addUnit
  };
};
