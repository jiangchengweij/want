import type { ExtractPropTypes, SetupContext } from 'vue';
import {
  props as buttonProps,
  emits as buttonEmits,
  setup as buttonSetup
} from '../common/mixins/button';
export const emits = ['click', ...buttonEmits] as const;

export const props = {
  ...buttonProps,
  formType: String,
  icon: String,
  classPrefix: {
    type: String,
    default: 'wan-icon'
  },
  plain: Boolean,
  block: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  loadingText: String
};

type Props = ExtractPropTypes<typeof props>;

type Context = SetupContext<CanWrite<typeof emits>>;

export const setup = (props: Props, context: Context) => {
  const { events: buttonEvents } = buttonSetup<Props, Context>(props, context);
  return {
    ...buttonEvents
  };
};
