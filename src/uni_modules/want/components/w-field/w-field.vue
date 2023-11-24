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
	<w-cell
		:size="size"
		:icon="leftIcon"
		:center="center"
		:border="border"
		:is-link="isLink"
		:required="required"
		:clickable="clickable"
		:title-width="titleWidth"
		title-style="margin-right: 12px;"
		:custom-style="customStyle"
		:arrow-direction="arrowDirection"
		:custom-class="(customClass || '') + ' wan-field'"
		@click="onClick"
	>
		<template #icon>
			<slot name="left-icon" />
		</template>
		<template v-if="label || $slots.label" #title>
			<label v-if="label" :for="name" :class="[labelClass || '', bem('field__label', { disabled })]">
				{{ label }}
			</label>
			<slot v-else name="label"></slot>
		</template>
		<view :class="[bem('field__body', [type])]">

			<view :class="[bem('field__control', [inputAlign, 'custom'])]" @tap="onClickInput">
				<slot name="input" />
			</view>
			
			<textarea
				v-if="type === 'textarea'"
			  :id="name"
			  :class="[bem('field__control', [inputAlign, type, { disabled, readonly, error }]), inputClass || '']"
			  :fixed="fixed"
			  :focus="focus"
			  :cursor="cursor"
			  :value="state.innerValue"
			  :auto-focus="autoFocus"
			  :disabled="disabled || readonly"
			  :maxlength="maxlength"
			  :placeholder="placeholder"
			  :placeholder-style="placeholderStyle"
			  :placeholder-class="bem('field__placeholder', { error, disabled })"
			  :auto-height="!!autosize"
			  :style="inputStyle"
			  :cursor-spacing="cursorSpacing"
			  :adjust-position="adjustPosition"
			  :show-confirm-bar="showConfirmBar"
			  :hold-keyboard="holdKeyboard"
			  :selection-end="selectionEnd"
			  :selection-start="selectionStart"
			  :disable-default-padding="disableDefaultPadding"
			  @input="onInput"
			  @tap="onClickInput"
			  @blur="onBlur"
			  @focus="onFocus"
			  @confirm="onConfirm"
			  @linechange="onLineChange"
			  @keyboardheightchange="onKeyboardHeightChange"
			/>
			<input
				v-else
				:id="name"
				:class="[bem('field__control', [inputAlign, { disabled, readonly, error }]), inputClass || '']"
				:type="type"
				:focus="focus"
				:cursor="cursor"
				:value="state.innerValue"
				:auto-focus="autoFocus"
				:disabled="disabled || readonly"
				:maxlength="maxlength"
				:placeholder="placeholder"
				:placeholder-style="placeholderStyle"
				:placeholder-class="bem('field__placeholder', { error })"
				:confirm-type="confirmType"
				:confirm-hold="confirmHold"
				:hold-keyboard="holdKeyboard"
				:cursor-spacing="cursorSpacing"
				:adjust-position="adjustPosition"
				:selection-end="selectionEnd"
				:selection-start="selectionStart"
				:always-embed="alwaysEmbed"
				:password="password || type === 'password'"
				@input="onInput"
				@tap="onClickInput"
				@blur="onBlur"
				@focus="onFocus"
				@confirm="onConfirm"
				@keyboardheightchange="onKeyboardHeightChange"
			/>
			<view
				v-if="state.showClear"
				class="wan-field__clear-root wan-field__icon-root"
			>
				<view @touchstart.stop="onClear">
					<w-icon
						:name="clearIcon"
					/>
				</view>
			</view>
			<view class="wan-field__icon-container" @tap="onClickIcon">
				<view
					v-if="rightIcon || icon"
					class="wan-field__icon-root"
					:class="[iconClass]"
				>
					<w-icon
						:name="rightIcon || icon"
						:custom-class="rightIconClass"
					/>
				</view>
				<slot name="right-icon" />
				<slot name="icon" />
			</view>
			<view class="wan-field__button">
				<slot name="button" />
			</view>
		</view>
		<label :for="name" v-if="showWordLimit && maxlength" class="wan-field__word-limit">
			<view :class="[bem('field__word-num', { full: state.innerValue.length >= maxlength })]">{{ state.innerValue.length >= maxlength ? maxlength : state.innerValue.length }}</view>/{{ maxlength }}
		</label>
		<label :for="name"  v-if="errorMessage" :class="[bem('field__error-message', [errorMessageAlign, { disabled, error }])]">
			{{ errorMessage }}
		</label>
	</w-cell>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, watch } from 'vue';
import { addUnit } from '../utils';
import { style } from '../utils/style';
import { bem } from '../utils/bem'
import { commonProps, inputProps, textareaProps } from './props';
import { InputDetails } from './types';

const emit = defineEmits([
	'update:modelValue', 'input', 'change', 'linechange', 'keyboardheightchange',
	'focus', 'blur', 'click-icon', 'click-input', 'clear', 'confirm', 'click'
]);

const props = defineProps({
	...commonProps,
	...inputProps,
	...textareaProps,
	size: String,
	icon: String,
	label: String,
	error: Boolean,
	center: Boolean,
	isLink: Boolean,
	leftIcon: String,
	rightIcon: String,
	autosize: null,
	required: Boolean,
	iconClass: String,
	clickable: Boolean,
	inputAlign: String,
	customStyle: String,
	errorMessage: String,
	arrowDirection: String,
	showWordLimit: Boolean,
	errorMessageAlign: String,
	readonly: {
		type: Boolean,
	},
	clearable: {
		type: Boolean,
	},
	clearTrigger: {
		type: String,
		default: 'focus',
	},
	border: {
		type: Boolean,
		default: true,
	},
	titleWidth: {
		type: String,
		default: '6.2em',
	},
	clearIcon: {
		type: String,
		default: 'clear',
	},
	extraEventParams: {
		type: Boolean,
		default: false,
	},
	customClass: String,
	inputClass: String,
	rightIconClass: String,
	labelClass: String,
})

const state = reactive({
	focused: false,
	innerValue: props.modelValue,
	showClear: false,
})

let _value = null, _focused = false;

const inputStyle = computed(() => {
	const { autosize } = props;
	if (autosize && typeof autosize === 'object') {
		return style({
			'min-height': addUnit(autosize.minHeight),
			'max-height': addUnit(autosize.maxHeight),
		});
	}

	return '';
})

watch(() => [props.readonly, props.clearable], () => {
	setShowClear()
})

watch(() => props.modelValue, (newVal) => {
	if (newVal !== state.innerValue) {
		state.innerValue = newVal;
	}
}, { immediate: true })

function getFormatValue(value: string) {
	const { maxlength } = props;

	if (maxlength !== -1 && value.length > maxlength) {
		return value.slice(0, maxlength);
	}

	return value;
}

function onInput(event: anyObj) {
	const { value = '' } = event.detail || {};

	const formatValue = getFormatValue(value);
	
	_value = formatValue;
	
	setShowClear();
	
	emitChange({
		...event.detail,
		value: formatValue
	})
}

function onFocus(event: anyObj) {
	_focused = true;
	setShowClear();
	emit('focus', event.detail);
}

function onBlur(event: anyObj) {
	_focused = false;
	setShowClear();
	emit('blur', event.detail);
}

function onClickIcon() {
	emit('click-icon');
}

function onClickInput(event: anyObj) {
	emit('click-input', event);
}

function onClick(event) {
	emit('click', event);
}

function onClear() {
	state.innerValue = '';
	_value = '';
	setShowClear();

	nextTick(() => {
		emitChange({ value: '' });
		emit('clear', '');
	});
}

function onConfirm(event: anyObj) {
	const { value = '' } = event.detail;
	_value = value;
	setShowClear();
	emit('confirm', value);
}

function onLineChange(event: anyObj) {
	emit('linechange', event.detail)
}

function onKeyboardHeightChange(event: anyObj) {
	emit('keyboardheightchange', event.detail);
}

function setShowClear() {
	const { clearable, readonly, clearTrigger } = props;
	
	let showClear = false;
	
	if (clearable && !readonly) {
		const hasValue = !!_value;
		const tigger = clearTrigger === 'always' || (clearTrigger === 'focus' && _focused);
		
		showClear = hasValue && tigger
	}
	
	state.showClear = showClear;
}

function emitChange(detail: any) {
	const { extraEventParams } = props;
	
	let result: InputDetails | undefined;
	
	emit('update:modelValue', detail.value);
	
	const data = extraEventParams
	  ? {
		  ...detail,
		  callback: (data: InputDetails) => {
			  result = data;
		  }
	  } : detail.value;

	emit('input', data);
	emit('change', data);

	return result;
}

function setValue(value: string) {
	_value = value;
	setShowClear();
	
	if (value === '') {
		state.innerValue = '';
	}

	emitChange({ value });
}

defineExpose({
	setValue
})
</script>

<style lang="scss">
@import './style.scss';
</style>
