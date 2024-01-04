import {
  ComponentInternalInstance,
  computed,
  ExtractPropTypes,
  onMounted,
  reactive,
  SetupContext,
  watch
} from 'vue';
import { bem, addUnit, style, getRect } from '../common/utils';

export const emits = ['click'] as const;
export const props = {
  inactive: Boolean,
  percentage: {
    type: Number,
    default: 0
  },
  pivotText: String,
  pivotColor: String,
  trackColor: String,
  showPivot: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: '#1989fa'
  },
  textColor: {
    type: String,
    default: '#fff'
  },
  strokeWidth: {
    type: null,
    default: 4
  },
  customClass: [String, Array]
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(this: ComponentInternalInstance, props: Props) {
  const state = reactive({
    right: 0
  });

  watch(
    () => props.percentage,
    () => {
      setLeft();
    }
  );

  onMounted(() => {
    setLeft();
  });

  const getPivotText = computed(() => {
    return props.pivotText || props.percentage + '%';
  });

  const rootStyle = computed(() => {
    return style({
      height: props.strokeWidth ? addUnit(props.strokeWidth) : '',
      background: props.trackColor
    });
  });

  const portionStyle = computed(() => {
    return style({
      background: props.inactive ? '#cacaca' : props.color,
      width: props.percentage ? props.percentage + '%' : ''
    });
  });

  const pivotStyle = computed(() => {
    return style({
      color: props.textColor,
      right: state.right + 'px',
      background: props.pivotColor
        ? props.pivotColor
        : props.inactive
          ? '#cacaca'
          : props.color
    });
  });

  const setLeft = () => {
    Promise.all([
      getRect(this, '.wan-progress'),
      getRect(this, '.wan-progress__pivot')
    ]).then(([portion, pivot]) => {
      if (portion && pivot) {
        state.right = (pivot.width! * (props.percentage - 100)) / 100;
      }
    });
  };
  return {
    bem,
    style,
    addUnit,
    state,
    getPivotText,
    rootStyle,
    portionStyle,
    pivotStyle
  };
}
