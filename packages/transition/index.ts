import { computed } from 'vue';
import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import {
  setup as transitionSetup,
  props as transitionProps,
  emits as transitionEmits
} from '../common/mixins/transition';

export const emits = ['click', ...transitionEmits] as const;
export const props = {
  ...transitionProps,
  show: {
    type: Boolean,
    default: true
  },
  customClass: null,
  customStyle: [String, Object]
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export const setup = (props: Props, context: Context) => {
  const { emit } = context;
  const transitionSetupReturn = transitionSetup(props, context);
  const { state } = transitionSetupReturn;
  const rootStyle = computed(() => {
    return style([
      {
        '-webkit-transition-duration': state.currentDuration + 'ms',
        'transition-duration': state.currentDuration + 'ms'
      },
      state.display ? null : 'display: none',
      props.customStyle
    ]);
  });
  function onClick(event) {
    emit('click', event);
  }
  return {
    bem,
    style,
    addUnit,
    onClick,
    rootStyle,
    ...transitionSetupReturn
  };
};
