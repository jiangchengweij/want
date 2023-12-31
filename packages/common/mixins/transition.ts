import { reactive, watch } from 'vue';
import type { ExtractPropTypes, SetupContext } from 'vue';
import { toNumber, isObj, requestAnimationFrame } from '../utils/index';

export const emits = [
  'enter',
  'leave',
  'before-enter',
  'before-leave',
  'after-leave',
  'after-enter'
];

export const props = {
  show: {
    type: Boolean,
    default: false
  },
  duration: {
    type: [String, Number, Object],
    default: 300
  },
  name: {
    type: String,
    default: 'fade'
  },
  enterClass: String,
  enterActiveClass: String,
  enterToClass: String,
  leaveClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};

type Props = ExtractPropTypes<typeof props>;

type Context = SetupContext<CanWrite<typeof emits>>;

const getClassNames = (name: string, props: Props) => ({
  enter: `wan-${name}-enter wan-${name}-enter-active ${
    props.enterClass || ''
  } ${props.enterActiveClass || ''}`,
  'enter-to': `wan-${name}-enter-to wan-${name}-enter-active ${
    props.enterToClass || ''
  } ${props.enterActiveClass || ''}`,
  leave: `wan-${name}-leave wan-${name}-leave-active ${
    props.leaveClass || ''
  } ${props.leaveActiveClass || ''}`,
  'leave-to': `wan-${name}-leave-to wan-${name}-leave-active ${
    props.leaveToClass || ''
  } ${props.leaveActiveClass || ''}`
});

export function setup<P, C>(props: P & Props, context: C & Context) {
  const { emit } = context;
  const state = reactive({
    type: '',
    inited: false,
    display: false,
    status: '',
    classes: '',
    currentDuration: 0,
    transitionEnded: true,
    name: props.name,
    duration: props.duration
  });

  watch(
    () => props.name,
    () => {
      state.name = props.name;
    }
  );

  watch(
    () => props.duration,
    () => {
      state.duration = props.duration;
    }
  );

  watch(
    () => props.show,
    (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      }
      newValue ? enter() : leave();
    },
    {
      immediate: true
    }
  );

  function enter() {
    const classNames = getClassNames(state.name, props);
    const currentDuration = isObj(state.duration)
      ? state.duration.enter
      : state.duration;
    if (state.status === 'enter') {
      return;
    }
    state.status = 'enter';
    emit('before-enter');
    requestAnimationFrame(() => {
      if (state.status !== 'enter') {
        return;
      }
      emit('enter');
      state.inited = true;
      state.display = true;
      state.classes = classNames.enter;
      state.currentDuration = currentDuration as number;
      requestAnimationFrame(() => {
        if (state.status !== 'enter') {
          return;
        }
        state.transitionEnded = false;
        state.classes = classNames['enter-to'];
      });
    });
  }

  function leave() {
    if (!state.display) {
      return;
    }
    const classNames = getClassNames(state.name, props);
    const currentDuration = toNumber(
      isObj(state.duration) ? state.duration.leave : state.duration
    );
    state.status = 'leave';
    emit('before-leave');
    requestAnimationFrame(() => {
      if (state.status !== 'leave') {
        return;
      }
      emit('leave');
      state.classes = classNames.leave;
      state.currentDuration = currentDuration;
      requestAnimationFrame(() => {
        if (state.status !== 'leave') {
          return;
        }
        state.transitionEnded = false;
        setTimeout(() => onTransitionEnd(), currentDuration);
        state.classes = classNames['leave-to'];
      });
    });
  }

  function onTransitionEnd() {
    if (state.transitionEnded) {
      return;
    }
    state.transitionEnded = true;
    emit('after-' + state.status);
    const { show } = props;
    if (!show && state.display) {
      state.display = false;
    }
  }

  return { state, onTransitionEnd };
}
