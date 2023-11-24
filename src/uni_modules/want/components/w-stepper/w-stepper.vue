<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		},
		// #ifndef MP-ALIPAY
		behaviors: ['uni://form-field'],
		// #endif
	}
</script>
<template>
	<view :class="[bem('stepper', [theme]), customClass || '']">
	  <view
	    v-if="showMinus"
			data-type="minus"
	    :style="buttonStyle"
	    :class="[minusClass || '', bem('stepper__minus', { disabled: disabled || disableMinus || state.innterValue <= min })]"
	    hover-class="wan-stepper__minus--hover"
	    hover-stay-time="70"
	    @tap="onTap('minus')"
	    @touchstart="onTouchStart('minus')"
	    @touchend="onTouchEnd"
	  >
	    <slot name="minus" />
	  </view>
	  <input
	    :type="integer ? 'number' : 'digit'"
	    :class="[inputClass || '', bem('stepper__input', { disabled: disabled || disableInput })]"
	    :style="inputStyle"
	    :value="state.innterValue"
	    :focus="focus"
	    :disabled="disabled || disableInput"
	    :always-embed="alwaysEmbed"
	    @input="onInput"
	    @focus="onFocus"
	    @blur="onBlur"
	  />
	  <view
	    v-if="showPlus"
	    :style="buttonStyle"
	    :class="[plusClass || '', bem('stepper__plus', { disabled: disabled || disablePlus || state.innterValue >= max })]"
	    hover-class="wan-stepper__plus--hover"
	    hover-stay-time="70"
	    @tap="onTap('plus')"
	    @touchstart="onTouchStart('plus')"
	    @touchend="onTouchEnd"
	  >
	    <slot name="plus" />
	  </view>
	</view>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { isDef } from '../utils/validator'
import { bem } from '../utils/bem'
import { style } from '../utils/style'
import { addUnit } from '../utils'

const emit = defineEmits(['change', 'blur', 'focus', 'overlimit', 'update:modelValue', 'plus', 'minus'])
const props = defineProps({
	modelValue: {
		type: null,
	},
	integer: {
		type: Boolean,
	},
	disabled: Boolean,
	inputWidth: String,
	buttonSize: String,
	asyncChange: Boolean,
	disableInput: Boolean,
	decimalLength: {
		type: Number,
		default: null as unknown as number,
	},
	min: {
		type: null,
		default: 1,
	},
	max: {
		type: null,
		default: Number.MAX_SAFE_INTEGER,
	},
	step: {
		type: null,
		default: 1,
	},
	showPlus: {
		type: Boolean,
		default: true,
	},
	showMinus: {
		type: Boolean,
		default: true,
	},
	disablePlus: Boolean,
	disableMinus: Boolean,
	longPress: {
		type: Boolean,
		default: true,
	},
	focus: Boolean,
	theme: String,
	alwaysEmbed: Boolean,
	inputClass: null,
	plusClass: null,
	minusClass: null,
	customClass: null
})

const LONG_PRESS_START_TIME = 600;
const LONG_PRESS_INTERVAL = 200;

const state = reactive({
	innterValue: null
})

let _type = null, _longPressTimer = null, _isLongPress = false

watch(() => props.modelValue, (newVal) => {
	if (newVal !== state.innterValue) {
		state.innterValue = format(newVal)
	}
}, { immediate: true })

watch(() => [props.integer, props.decimalLength, props.min, props.max], () => {
	check()
}, { immediate: true, deep: true })

const buttonStyle = computed(() => {
	return style({
		width: addUnit(props.buttonSize),
		height: addUnit(props.buttonSize),
	})
})

const inputStyle = computed(() => {
	return style({
		width: addUnit(props.inputWidth),
		height: addUnit(props.buttonSize),
	})
})

// add num and avoid float number
function add(num1: number, num2: number) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

function equal(value1: number | string, value2: number | string) {
  return String(value1) === String(value2);
}

function check() {
	const val = format(state.innterValue);
	if (!equal(val, state.innterValue)) {
		state.innterValue = val
	}
}

function isDisabled(type: string) {
	const { disabled, disablePlus, disableMinus, max, min } =
		props;

	if (type === 'plus') {
		return disabled || disablePlus || +state.innterValue >= +max;
	}

	return disabled || disableMinus || +state.innterValue <= +min;
}

function onFocus(event: any) {
	emit('focus', event.detail);
}

function onBlur(event: any) {
	const value = format(event.detail.value);
	
	state.innterValue = value

	emitChange(value);

	emit('blur', {
		...event.detail,
		value,
	});
}

// filter illegal characters
function filter(value) {
	value = String(value).replace(/[^0-9.-]/g, '');

	if (props.integer && value.indexOf('.') !== -1) {
		value = value.split('.')[0];
	}

	return value;
}

// limit value range
function format(value) {
	value = filter(value);

	// format range
	value = value === '' ? 0 : +value;
	value = Math.max(Math.min(props.max, value), props.min);

	// format decimal
	if (isDef(props.decimalLength)) {
		value = value.toFixed(props.decimalLength);
	}

	return value;
}

function onInput(event: any) {
	const { value = '' } = event.detail || {};

	// allow input to be empty
	if (value === '') {
		return;
	}

	let formatted = filter(value);

	// limit max decimal length
	if (isDef(props.decimalLength) && formatted.indexOf('.') !== -1) {
		const pair = formatted.split('.');
		formatted = `${pair[0]}.${pair[1].slice(0, props.decimalLength)}`;
	}

	emitChange(formatted);
}

function emitChange(value: string) {
	if (!props.asyncChange) {
		state.innterValue = value
	}
	emit('update:modelValue', value)
	emit('change', value);
}

function onChange() {

	if (isDisabled(_type)) {
		emit('overlimit', _type);
		return;
	}

	const diff = _type === 'minus' ? -props.step : +props.step;

	const value = format(add(+state.innterValue, diff));

	emitChange(value);
	emit(_type);
}

function longPressStep() {
	_longPressTimer = setTimeout(() => {
		onChange();
		longPressStep();
	}, LONG_PRESS_INTERVAL);
}

function onTap(type: string) {
	_type = type;
	onChange();
}

function onTouchStart(type: string) {
	if (!props.longPress) {
		return;
	}
	clearTimeout(_longPressTimer);

	_type = type;
	_isLongPress = false;

	_longPressTimer = setTimeout(() => {
		_isLongPress = true;
		onChange();
		longPressStep();
	}, LONG_PRESS_START_TIME);
}

function onTouchEnd() {
	if (!props.longPress) {
		return;
	}

	clearTimeout(_longPressTimer);
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
