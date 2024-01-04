import { useTouch } from '../common/utils/touch';
import { nextTick, reactive, watch } from 'vue';
import {
  bem,
  addUnit,
  style,
  clamp,
  addNumber,
  getRect
} from '../common/utils';
const DRAG_STATUS = {
  START: 'start',
  MOVING: 'moving',
  END: 'end'
};
export const emits = [
  'update:modelValue',
  'change',
  'drag',
  'drag-end',
  'drag-start'
];
export const props = {
  range: Boolean,
  disabled: Boolean,
  useButtonSlot: Boolean,
  activeColor: String,
  inactiveColor: String,
  max: {
    type: Number,
    default: 100
  },
  min: {
    type: Number,
    default: 0
  },
  step: {
    type: Number,
    default: 1
  },
  modelValue: {
    type: null,
    default: 0
  },
  vertical: Boolean,
  barHeight: null,
  customClass: null
};
export function setup(props, context) {
  const { emit } = context;
  const { touchVar, touchMove, touchStart } = useTouch();
  const state = reactive({
    innerValue: 0,
    wrapperStyle: {},
    barStyle: ''
  });
  let _buttonIndex = 0,
    _startValue = 0,
    _newValue = 0,
    _dragStatus = '';
  const onTouchStart = (event, index) => {
    if (props.disabled) return;
    if (typeof index === 'number') {
      _buttonIndex = index;
    }
    touchStart(event);
    _newValue = state.innerValue;
    if (isRange(_newValue)) {
      _startValue = _newValue.map((val) => format(val));
    } else {
      _startValue = format(_newValue);
    }
    _dragStatus = DRAG_STATUS.START;
  };
  const onTouchMove = (event) => {
    if (props.disabled) return;
    if (_dragStatus === DRAG_STATUS.START) {
      emit('drag-start');
    }
    touchMove(event);
    _dragStatus = DRAG_STATUS.MOVING;
    getRect(this, '.wan-slider').then((rect) => {
      const { vertical } = props;
      const delta = vertical ? touchVar.deltaY : touchVar.deltaX;
      const total = vertical ? rect.height : rect.width;
      const diff = (delta / total) * getRange();
      if (isRange(_startValue)) {
        _newValue[_buttonIndex] = _startValue[_buttonIndex] + diff;
      } else {
        _newValue = _startValue + diff;
      }
      updateValue(_newValue, false, true);
    });
  };
  const onTouchEnd = () => {
    if (props.disabled) return;
    if (_dragStatus === DRAG_STATUS.MOVING) {
      _dragStatus = DRAG_STATUS.END;
      nextTick(() => {
        updateValue(_newValue, true);
        emit('drag-end');
      });
    }
  };
  const onClick = (event) => {
    if (props.disabled) return;
    const { min } = props;
    getRect(this, '.wan-slider').then((rect) => {
      const { vertical } = props;
      const touch = event.touches[0];
      const delta = vertical
        ? touch.clientY - rect.top
        : touch.clientX - rect.left;
      const total = vertical ? rect.height : rect.width;
      const value = Number(min) + (delta / total) * getRange();
      if (isRange(state.innerValue)) {
        const [left, right] = state.innerValue;
        const middle = (left + right) / 2;
        if (value <= middle) {
          updateValue([value, right], true);
        } else {
          updateValue([left, value], true);
        }
      } else {
        updateValue(value, true);
      }
    });
  };
  const isRange = (val) => {
    const { range } = props;
    return range && Array.isArray(val);
  };
  const handleOverlap = (value) => {
    if (value[0] > value[1]) {
      return value.slice(0).reverse();
    }
    return value;
  };
  const updateValue = (value, end, drag) => {
    if (isRange(value)) {
      value = handleOverlap(value).map((val) => format(val));
    } else {
      value = format(value);
    }
    state.innerValue = value;
    const { vertical, inactiveColor, barHeight } = props;
    const mainAxis = vertical ? 'height' : 'width';
    state.wrapperStyle = style({
      background: inactiveColor || '',
      [vertical ? 'width' : 'height']: addUnit(barHeight)
    });
    state.barStyle = `
      ${mainAxis}: ${calcMainAxis()};
      left: ${vertical ? 0 : calcOffset()};
      top: ${vertical ? calcOffset() : 0};
      ${drag ? 'transition: none;' : ''}
    `;
    if (drag) {
      emit('drag', { value });
    }
    if (end) {
      emit('change', value);
    }
    if (drag || end) {
      emit('update:modelValue', value);
    }
  };
  const getScope = () => {
    return Number(props.max) - Number(props.min);
  };
  const getRange = () => {
    const { max, min } = props;
    return max - min;
  };
  const getOffsetWidth = (current, min) => {
    const scope = getScope();
    // 避免最小值小于最小step时出现负数情况
    return `${Math.max(((current - min) * 100) / scope, 0)}%`;
  };
  // 计算选中条的长度百分比
  const calcMainAxis = () => {
    const { min } = props;
    if (isRange(state.innerValue)) {
      return getOffsetWidth(state.innerValue[1], state.innerValue[0]);
    }
    return getOffsetWidth(state.innerValue, Number(min));
  };
  // 计算选中条的开始位置的偏移量
  const calcOffset = () => {
    const { min } = props;
    const scope = getScope();
    if (isRange(state.innerValue)) {
      return `${((state.innerValue[0] - Number(min)) * 100) / scope}%`;
    }
    return '0%';
  };
  const format = (value) => {
    const min = +props.min;
    const max = +props.max;
    const step = +props.step;
    value = clamp(value, min, max);
    const diff = Math.round((value - min) / step) * step;
    return addNumber(min, diff);
  };
  watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal !== state.innerValue) {
        updateValue(newVal);
      }
    },
    { immediate: true }
  );
  return {
    bem,
    style,
    addUnit,
    state,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onClick
  };
}
