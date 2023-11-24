<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		},
		// #ifndef MP-ALIPAY
		behaviors: ['uni://form-field'],
		// #endif
	}
</script>
<template>
	<view
		:class="[bem('search', { withaction: showAction || useActionSlot }), customClass || '']"
		:style="{ background: background }"
	>
		<view :class="[bem('search__content', [shape])]">
			<view class="wan-search__label" v-if="label">{{ label }}</view>
			<slot v-else name="label" />
			<view class="wan-search__field">
				<w-field
					type="search"
					:left-icon="!useLeftIconSlot ? leftIcon : ''"
					:right-icon="!useRightIconSlot ? rightIcon : ''"
					:focus="focus"
					:error="error"
					:border="false"
					confirm-type="search"
					:class="[fieldClass]"
					:modelValue="modelValue"
					:disabled="disabled"
					:readonly="readonly"
					:clearable="clearable"
					:clear-trigger="clearTrigger"
					:clear-icon="clearIcon"
					:maxlength="maxlength"
					:input-align="inputAlign"
					:input-class="inputClass || ''"
					:placeholder="placeholder"
					:placeholder-style="placeholderStyle"
					:cursor-spacing="cursorSpacing"
					custom-style="padding: 5px 10px 5px 0; background-color: transparent;"
					@blur="onBlur"
					@focus="onFocus"
					@change="onChange"
					@confirm="onSearch"
					@clear="onClear"
					@click-input="onClickInput"
					@update:modelValue="onUpdateModelValue"
				>
					<template v-if="useLeftIconSlot" #left-icon>
						<slot name="left-icon" />
					</template>
					<template v-if="useRightIconSlot" #left-icon>
						<slot name="right-icon" />
					</template>
				</w-field>
			</view>
		</view>

		<view
			v-if="showAction || useActionSlot"
			class="wan-search__action"
			hover-class="wan-search__action--hover"
			hover-stay-time="70"
		>
			<slot v-if="useActionSlot" name="action" />
			<view v-else @tap="onCancel" class="wan-search__action-button" :class="cancelClass">{{ actionText }}</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { bem } from '../utils/bem';

const emit = defineEmits(['update:modelValue', 'change', 'cancel',
	'search', 'focus', 'blur', 'clear', 'click-input'])

defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	label: String,
	focus: Boolean,
	error: Boolean,
	disabled: Boolean,
	readonly: Boolean,
	inputAlign: String,
	showAction: Boolean,
	useActionSlot: Boolean,
	useLeftIconSlot: Boolean,
	useRightIconSlot: Boolean,
	leftIcon: {
		type: String,
		default: 'search',
	},
	rightIcon: String,
	placeholder: String,
	placeholderStyle: String,
	actionText: {
		type: String,
		default: '取消',
	},
	background: {
		type: String,
		default: '#ffffff',
	},
	maxlength: {
		type: Number,
		default: -1,
	},
	shape: {
		type: String,
		default: 'square',
	},
	clearable: {
		type: Boolean,
		default: true,
	},
	clearTrigger: {
		type: String,
		default: 'focus',
	},
	clearIcon: {
		type: String,
		default: 'clear',
	},
	cursorSpacing: {
		type: Number,
		default: 0,
	},
	customClass: [String, Array],
	fieldClass: [String, Array],
	inputClass: [String, Array],
	cancelClass: [String, Array]
})

function onChange(event: string) {
	emit('change', event);
}

function onCancel() {
	/**
	 * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
	 * https://github.com/youzan/vant-weapp/issues/1768
	 */
	setTimeout(() => {
		emit('update:modelValue', '')
		emit('cancel');
		emit('change', '');
	}, 200);
}

function onUpdateModelValue(event) {
	emit('update:modelValue', event)
}

function onSearch(event: anyObj) {
	emit('search', event);
}

function onFocus(event: anyObj) {
	emit('focus', event);
}

function onBlur(event: anyObj) {
	emit('blur', event);
}

function onClear(event: anyObj) {
	emit('clear', event);
}

function onClickInput(event: anyObj) {
	emit('click-input', event);
}

</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-search {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: var(--search-padding, $search-padding);

  &__content {
    display: flex;
    flex: 1;
    padding-left: var(--padding-sm, $padding-sm);
    border-radius: $border-radius-sm;
    background-color: var(--search-background-color, $search-background-color);

    &--round {
      border-radius: $border-radius-max;
    }
  }

  &__label {
    padding: var(--search-label-padding, $search-label-padding);
    font-size: var(--search-label-font-size, $search-label-font-size);
    line-height: var(--search-input-height, $search-input-height);
    color: var(--search-label-color, $search-label-color);
  }

  &__field {
    flex: 1;

    &__left-icon {
      color: var(--search-left-icon-color, $search-left-icon-color);
    }
  }

  &--withaction {
    padding-right: 0;
  }

  &__action {
		padding: var(--search-action-padding, $search-action-padding);
    font-size: var(--search-action-font-size, $search-action-font-size);
    line-height: var(--search-input-height, $search-input-height);
    color: var(--search-action-text-color, $search-action-text-color);

    &--hover {
      background-color: $active-color;
    }
  }
}
</style>
