import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['click'] as const;
export const props = {
  dot: Boolean,
  info: [String, Number],
  customStyle: String,
  customClass: String
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export const setup = (props: Props, context: Context) => {
  return {
    bem,
    style,
    addUnit
  };
};
