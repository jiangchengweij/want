import {
  props as buttonProps,
  emits as buttonEmits,
  setup as buttonSetup
} from '../common/mixins/button';
import { linkProps, linkSetup } from '../common/mixins/link';
import { bem, addUnit, style } from '../common/utils';
export const emits = ['click', ...buttonEmits];
export const props = {
  ...buttonProps,
  ...linkProps,
  text: String,
  dot: Boolean,
  info: String,
  icon: String,
  size: {
    type: String
  },
  color: String,
  classPrefix: {
    type: String,
    default: 'wan-icon'
  },
  disabled: Boolean,
  loading: Boolean,
  customClass: null,
  iconClass: null,
  infoClass: null,
  textClass: null,
  wrapClass: null
};
export function setup(props, context) {
  const { emit } = context;
  const buttonSetupReturn = buttonSetup(props, context);
  const { jumpLink } = linkSetup({ props });
  const onClick = (event) => {
    emit('click', event);
    jumpLink();
  };
  return {
    bem,
    style,
    addUnit,
    ...buttonSetupReturn,
    onClick
  };
}
