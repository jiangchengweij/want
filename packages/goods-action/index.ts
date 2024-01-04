import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useChildren } from '../common/utils/relation';

export const emits = ['click'] as const;
export const props = {
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  useChildren('wanAction');
  return {
    bem,
    style,
    addUnit
  };
}
