<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view
	  :class="[customClass || '', bem('slider', { disabled, vertical })]"
	  :style="state.wrapperStyle"
	  @tap="onClick"
	>
	  <view
	    :class="bem('slider__bar')"
	    :style="style([{ backgroundColor: activeColor}, state.barStyle])"
	  >
	    <view
	      v-if="range"
	      :class="[bem('slider__button-wrapper-left')]"
	      @touchstart="onTouchStart($event, 0)"
	      @touchmove.stop="onTouchMove"
	      @touchend="onTouchEnd"
	      @touchcancel="onTouchEnd"
	    >
	      <slot
	        v-if="useButtonSlot"
	        name="left-button"
	      />
	      <view
	        v-else
	        :class="[bem('slider__button')]"
	      />
	    </view>
	    <view
	      v-if="range"
	      :class="[bem('slider__button-wrapper-right')]"
	      @touchstart="onTouchStart($event, 1)"
	      @touchmove.stop="onTouchMove"
	      @touchend="onTouchEnd"
	      @touchcancel="onTouchEnd"
	    >
	      <slot
	        v-if="useButtonSlot"
	        name="right-button"
	      />
	      <view
	        v-else
	        :class="bem('slider__button')"
	      />
	    </view>
	
	    <view
	      v-if="!range"
	      :class="[bem('slider__button-wrapper')]"
	      @touchstart="onTouchStart"
	      @touchmove.stop="onTouchMove"
	      @touchend="onTouchEnd"
	      @touchcancel="onTouchEnd"
	    >
	      <slot
	        v-if="useButtonSlot"
	        name="button"
	      />
	      <view
	        v-else
	        :class="[bem('slider__button')]"
	      />
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
import { getCurrentInstance, nextTick, reactive, watch } from 'vue'
import { addNumber, addUnit, clamp, getRect } from '../utils'
import { style } from '../utils/style'
import { useTouch } from '../utils/touch'
import { bem } from '../utils/bem'

type SliderValue = number | [number, number];

const DRAG_STATUS = {
  START: 'start',
  MOVING: 'moving',
  END: 'end',
};
const emit = defineEmits(['update:modelValue','change', 'drag', 'drag-end', 'drag-start'])
const props = defineProps({
	range: Boolean,
	disabled: Boolean,
	useButtonSlot: Boolean,
	activeColor: String,
	inactiveColor: String,
	max: {
		type: Number,
		default: 100,
	},
	min: {
		type: Number,
		default: 0,
	},
	step: {
		type: Number,
		default: 1,
	},
	modelValue: {
		type: null,
		default: 0,
	},
	vertical: Boolean,
	barHeight: null,
	customClass: null
})
const state = reactive({
	innerValue: null,
	wrapperStyle: {},
	barStyle: ''
})

const { touchVar, touchMove, touchStart } = useTouch()

const instance = getCurrentInstance()

let _buttonIndex = 0, _startValue = null, _newValue = null, _dragStatus = ''

watch(() => props.modelValue, (newVal) => {
	if (newVal !== state.innerValue) {
		updateValue(newVal)
	}
}, { immediate: true })

function onTouchStart(event: TouchEvent, index?: number) {
	if (props.disabled) return;

	if (typeof index === 'number') {
		_buttonIndex = index;
	}

	touchStart(event);
	_startValue = format(state.innerValue);
	_newValue = state.innerValue;

	if (isRange(_newValue)) {
		_startValue = _newValue.map((val) => format(val)) as [
			number,
			number
		];
	} else {
		_startValue = format(_newValue);
	}

	_dragStatus = DRAG_STATUS.START;
}

function onTouchMove(event: TouchEvent) {
	if (props.disabled) return;

	if (_dragStatus === DRAG_STATUS.START) {
		emit('drag-start');
	}

	touchMove(event);
	_dragStatus = DRAG_STATUS.MOVING;

	getRect(instance, '.wan-slider').then((rect) => {
		const { vertical } = props;
		const delta = vertical ? touchVar.deltaY : touchVar.deltaX;
		const total = vertical ? rect.height : rect.width;
		const diff = (delta / total) * getRange();

		if (isRange(_startValue)) {
			(_newValue as [number, number])[_buttonIndex] =
				_startValue[_buttonIndex] + diff;
		} else {
			_newValue = _startValue + diff;
		}

		updateValue(_newValue, false, true);
	});
}

function onTouchEnd() {
	if (props.disabled) return;

	if (_dragStatus === DRAG_STATUS.MOVING) {
		_dragStatus = DRAG_STATUS.END;

		nextTick(() => {
			updateValue(_newValue, true);
			emit('drag-end');
		});
	}
}

function onClick(event: TouchEvent) {
	if (props.disabled) return;

	const { min } = props;

	getRect(instance, '.wan-slider').then((rect) => {
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
}

function isRange(val: unknown): val is [number, number] {
	const { range } = props
	return range && Array.isArray(val)
}

function handleOverlap(value: [number, number]) {
	if (value[0] > value[1]) {
		return value.slice(0).reverse();
	}
	return value;
}

function updateValue(value: SliderValue, end?: boolean, drag?: boolean) {
	if (isRange(value)) {
		value = handleOverlap(value).map((val) => format(val)) as [
			number,
			number
		];
	} else {
		value = format(value);
	}
	
	state.innerValue = value;
	
	const { vertical, inactiveColor, barHeight } = props;
	const mainAxis = vertical ? 'height' : 'width';
	
	state.wrapperStyle = style({
		background: inactiveColor || '',
		[vertical ? 'width' : 'height']: addUnit(barHeight)
	})
	
	state.barStyle = `
		${mainAxis}: ${calcMainAxis()};
		left: ${vertical ? 0 : calcOffset()};
		top: ${vertical ? calcOffset() : 0};
		${drag ? 'transition: none;' : ''}
	`;

	if (drag) {
		emit('drag', { value })
	}
	
	if (end) {
		emit('change', value)
	}
	
	if (drag || end) {
		emit('update:modelValue', value)
	}
}

function getScope() {
	return Number(props.max) - Number(props.min);
}

function getRange() {
	const { max, min } = props;
	return max - min;
}

function getOffsetWidth(current: number, min: number) {
	const scope = getScope();

	// 避免最小值小于最小step时出现负数情况
	return `${Math.max(((current - min) * 100) / scope, 0)}%`;
}

// 计算选中条的长度百分比
function calcMainAxis() {
	const { min } = props
	
	if (isRange(state.innerValue)) {
		return getOffsetWidth(state.innerValue[1], state.innerValue[0])
	}
	
	return getOffsetWidth(state.innerValue, Number(min))
}

// 计算选中条的开始位置的偏移量
function calcOffset() {
	const { min } = props;
	const scope = getScope();
	if (isRange(state.innerValue)) {
		return `${((state.innerValue[0] - Number(min)) * 100) / scope}%`;
	}
	return '0%';
}

function format(value: number) {
	const min = +props.min;
	const max = +props.max;
	const step = +props.step;

	value = clamp(value, min, max);
	const diff = Math.round((value - min) / step) * step;
	return addNumber(min, diff);
}
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-slider {
  position: relative;
  height: var(--slider-bar-height, $slider-bar-height);
  border-radius: $border-radius-max;
  background-color: var(
    --slider-inactive-background-color,
    $slider-inactive-background-color
  );

  // use pseudo element to expand click area
  &::before {
    position: absolute;
    right: 0;
    left: 0;
    content: '';
    top: calc(-1 * var(--padding-xs, $padding-xs));
    bottom: calc(-1 * var(--padding-xs, $padding-xs));
  }

  &__bar {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: var(
      --slider-active-background-color,
      $slider-active-background-color
    );
    border-radius: inherit;
    transition: all $animation-duration-fast;
  }

  &__button {
    width: var(--slider-button-width, $slider-button-width);
    height: var(--slider-button-height, $slider-button-height);
    border-radius: var(
      --slider-button-border-radius,
      $slider-button-border-radius
    );
    box-shadow: var(--slider-button-box-shadow, $slider-button-box-shadow);
    background-color: var(
      --slider-button-background-color,
      $slider-button-background-color
    );

    &-wrapper,
    &-wrapper-right {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate3d(50%, -50%, 0);
    }

    &-wrapper-left {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate3d(-50%, -50%, 0);
    }
  }

  &--disabled {
    opacity: var(--slider-disabled-opacity, $slider-disabled-opacity);
  }

  &--vertical {
    display: inline-block;
    width: var(--slider-bar-height, $slider-bar-height);
    height: 100%;

    .wan-slider__button-wrapper,
    .wan-slider__button-wrapper-right {
      top: auto;
      right: 50%;
      bottom: 0;
      transform: translate3d(50%, 50%, 0);
    }

    .wan-slider__button-wrapper-left {
      top: 0;
      right: 50%;
      left: auto;
      transform: translate3d(50%, -50%, 0);
    }

    // use pseudo element to expand click area
    &::before {
      top: 0;
      right: -$padding-xs;
      bottom: 0;
      left: -$padding-xs;
    }
  }
}
</style>
