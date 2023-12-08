import type { ExtractPropTypes, SetupContext } from 'vue';
import {
  props as buttonProps,
  emits as buttonEmits,
  setup as buttonSetup
} from '../common/mixins/button';
import { bem } from '../common/utils';

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
  loadingText: String,
  loadingType: {
    type: String,
    default: 'circular'
  },
  type: {
    type: String,
    default: 'default'
  },
  dataset: null,
  size: {
    type: String,
    default: 'normal'
  },
  loadingSize: {
    type: String,
    default: '20px'
  },
  color: String,
  customStyle: [String, Object],
  loadingClass: String,
  customClass: String,
  hoverClass: String
};

type Props = ExtractPropTypes<typeof props>;

type Context = SetupContext<CanWrite<typeof emits>>;

export const setup = (props: Props, context: Context) => {
  const buttonSetupReturn = buttonSetup<Props, Context>(props, context);
  return {
    bem,
    ...buttonSetupReturn
  };
};
