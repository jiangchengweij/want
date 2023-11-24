<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view
		class="wan-picker-column"
		:class="[customClass || '']"
		:style="rootStyle"
		@touchstart="onTouchStart"
		@touchmove.native.stop="onTouchMove"
		@touchend="onTouchEnd"
		@touchcancel="onTouchEnd"
	>
		<view :style="wrapperStyle">
			<view
				v-for="(option, index) in state.options"
				:key="index"
				:data-index="index"
				:style="`height: ${ props.itemHeight }px`"
				class="wan-ellipsis"
				:class="[
					bem('picker-column__item', { disabled: option && option.disabled, selected: index === state.currentIndex }),
					index === state.currentIndex ? (activeClass || '') : '' ]"
				@tap="onClickItem(index)"
			>{{ optionText(option) }}</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, nextTick, PropType, reactive, toRaw, unref, watch } from 'vue'
import { addUnit, range } from '../utils'
import { style } from '../utils/style'
import { isObj } from '../utils/validator'
import { bem } from '../utils/bem'

const DEFAULT_DURATION = 200;
const emit = defineEmits(['change'])
const props = defineProps({
	valueKey: String,
	className: String,
	itemHeight: Number,
	visibleItemCount: Number,
	initialOptions: {
		type: Array as PropType<any>,
		default: () => [],
	},
	defaultIndex: {
		type: Number,
		default: 0,
	},
	customClass: null,
	activeClass: null
})

const state = reactive({
	startY: 0,
	offset: 0,
	duration: 0,
	startOffset: 0,
	options: props.initialOptions,
	currentIndex: props.defaultIndex,
})

watch(() => props.defaultIndex, () => {
	state.currentIndex = props.defaultIndex
	setIndex(props.defaultIndex)
}, { immediate: true })

const optionText = computed(() => {
	const { valueKey } = props
	return (option: any) => {
		return isObj(option) && option[valueKey] ? option[valueKey] : option;
	}
})

const rootStyle = computed(() => {
	const { itemHeight, visibleItemCount } = props
	return style({
		height: addUnit(itemHeight * visibleItemCount)
	})
})

const wrapperStyle = computed(() => {
	const { itemHeight, visibleItemCount } = props
	const offset = addUnit(   
		state.offset + (itemHeight * (visibleItemCount - 1)) / 2
	);
	return style({
		transition: 'transform ' + state.duration + 'ms',
		'line-height': addUnit(props.itemHeight),
		transform: 'translate3d(0, ' + offset + ', 0)',
	});
})

function getCount() {
	return state.options.length;
}

function onTouchStart(event: TouchEvent) {
	state.startY = event.touches[0].clientY
	state.startOffset = state.offset
	state.duration = 0
}

function onTouchMove(event: TouchEvent) {
	event.preventDefault() // 阻止外层scroll-view滚动行为
	const deltaY = event.touches[0].clientY - state.startY;
	state.offset = range(
		state.startOffset + deltaY,
		-(getCount() * props.itemHeight),
		props.itemHeight
	)
}

function onTouchEnd() {
	if (state.offset !== state.startOffset) {
		state.duration = DEFAULT_DURATION
		const index = range(
			Math.round(-state.offset / props.itemHeight),
			0,
			getCount() - 1
		);
		setIndex(index, true);
	}
}

function onClickItem(index: number) {
	setIndex(index, true);
}

function adjustIndex(index: number) {
	const count = getCount();

	index = range(index, 0, count);
	for (let i = index; i < count; i++) {
		if (!isDisabled(state.options[i])) return i;
	}
	for (let i = index - 1; i >= 0; i--) {
		if (!isDisabled(state.options[i])) return i;
	}
}

function isDisabled(option: any) {
	return isObj(option) && option.disabled;
}

function getOptionText(option: any) {
	return isObj(option) && props.valueKey in option
		? option[props.valueKey]
		: option;
}

function setIndex(index: number, userAction?: boolean) {
	index = adjustIndex(index) || 0;
	const offset = -index * props.itemHeight;
	if (index !== state.currentIndex) {
		state.offset = offset;
		state.currentIndex = index;
		return nextTick(() => {
			userAction && emit('change', index);
		})
	}
	state.offset = offset;
	return Promise.resolve();
}

function setValue(value: string) {
	const { options } = toRaw(state);
	for (let i = 0; i < options.length; i++) {
		if (getOptionText(options[i]) === value) {
			return setIndex(i);
		}
	}
	return Promise.resolve();
}

function getValue() {
	return state.options[state.currentIndex];
}

function getCurrentIndex() {
	return unref(state.currentIndex)
}

function getOptions() {
	return unref(state.options)
}

function setOptions(options) {
	state.options = options
}

defineExpose({
	setIndex,
	setValue,
	getValue,
	getCurrentIndex,
	getOptions,
	setOptions
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-picker-column {
  overflow: hidden;
  text-align: center;
  color: var(--picker-option-text-color, $picker-option-text-color);
  font-size: var(--picker-option-font-size, $picker-option-font-size);
  &__item {
    padding: 0 5px;

    &--selected {
      font-weight: var(--font-weight-bold, $font-weight-bold);
      color: var(
        --picker-option-selected-text-color,
        $picker-option-selected-text-color
      );
    }

    &--disabled {
      opacity: var(
        --picker-option-disabled-opacity,
        $picker-option-disabled-opacity
      );
    }
  }
}
</style>
