import { computed } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import {
  setup as transitionSetup,
  props as transitionProps,
  emits as transitionEmits
} from '../common/mixins/transition';
export const emits = ['click', ...transitionEmits];
export const props = Object.assign(Object.assign({}, transitionProps), {
  show: {
    type: Boolean,
    default: true
  },
  customClass: null,
  customStyle: [String, Object]
});
export const setup = (props, context) => {
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
  return Object.assign(
    { bem, style, addUnit, onClick, rootStyle },
    transitionSetupReturn
  );
};
