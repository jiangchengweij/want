import {
  ComponentInternalInstance,
  ExtractPropTypes,
  nextTick,
  reactive,
  SetupContext,
  watch
} from 'vue';
import { bem, addUnit, style, getAllRect } from '../common/utils';

export const emits = ['update:modelValue', 'change'] as const;
export const props = {
  modelValue: {
    type: Number
  },
  readonly: Boolean,
  disabled: Boolean,
  allowHalf: Boolean,
  size: null,
  icon: {
    type: String,
    default: 'star'
  },
  voidIcon: {
    type: String,
    default: 'star-o'
  },
  color: String,
  voidColor: String,
  disabledColor: String,
  count: {
    type: Number,
    default: 5
  },
  gutter: null,
  touchable: {
    type: Boolean,
    default: true
  },
  iconClass: null,
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(
  this: ComponentInternalInstance,
  props: Props,
  context: Context
) {
  const { emit } = context;
  const state = reactive({
    innerValue: 0,
    innerCountArray: Array.from({ length: 5 })
  });

  watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal !== state.innerValue) {
        state.innerValue = newVal ?? 0;
      }
    },
    { immediate: true }
  );

  watch(
    () => props.count,
    (newVal) => {
      state.innerCountArray = Array.from({ length: newVal });
    },
    { immediate: true }
  );

  const onSelect = (event) => {
    const { disabled, readonly } = props;
    const { score } = event;
    if (!disabled && !readonly) {
      state.innerValue = score + 1;
      nextTick(() => {
        emit('update:modelValue', score + 1);
        emit('change', score + 1);
      });
    }
  };

  const onTouchMove = (event: TouchEvent) => {
    const { touchable } = props;
    if (!touchable) return;
    const { clientX } = event.touches[0];

    getAllRect(this, '.wan-rate__icon').then((list) => {
      const target = list
        .sort((cur, next) => cur.dataset.score - next.dataset.score)
        .find((item) => clientX >= item.left! && clientX <= item.right!);
      if (target != null) {
        onSelect(target.dataset);
      }
    });
  };
  return {
    bem,
    style,
    addUnit,
    state,
    onSelect,
    onTouchMove
  };
}
