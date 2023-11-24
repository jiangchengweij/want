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
	<view :class="[bem('checkbox', [{ horizontal: state.direction === 'horizontal' }]), customClass || '']">
	  <view
	    v-if="labelPosition === 'left'"
	    :class="[labelClass || '', bem('checkbox__label', [labelPosition, { disabled: disabled || state.parentDisabled }])]"
	    @tap="onClickLabel"
	  >
	    <slot />
	  </view>
	  <view class="wan-checkbox__icon-wrap" @tap="toggle">
	    <slot v-if="useIconSlot" name="icon" />
			<view v-else :class="[bem('checkbox__icon', [shape, { disabled: disabled || state.parentDisabled, checked: state.innerValue }])]">
				<w-icon
				  name="success"
				  size="0.8em"
				  :style="iconStyle"
				  :custom-class="iconClass || ''"
				  custom-style="line-height: 1.25em;"
				></w-icon>
			</view>
	  </view>
	  <view
	    v-if="labelPosition === 'right'"
	    :class="[labelClass || '', bem('checkbox__label', [labelPosition, { disabled: disabled || state.parentDisabled }])]"
	    @tap="onClickLabel"
	  >
	    <slot />
	  </view>
	</view>
</template>

<script setup lang="ts">
import { reactive, computed, getCurrentInstance, watch } from 'vue'
import { useParent } from '../utils/relation'
import { addUnit } from '../utils'
import { style } from '../utils/style'
import { bem } from '../utils/bem'

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
	modelValue: Boolean,
	disabled: Boolean,
	useIconSlot: Boolean,
	checkedColor: String,
	labelPosition: {
		type: String,
		default: 'right',
	},
	labelDisabled: Boolean,
	shape: {
		type: String,
		default: 'round',
	},
	iconSize: {
		type: null,
		default: 20,
	},
	name: {
		type: String,
		default: ''
	},
	index: Number,
	iconClass: [String, Array],
	labelClass: [String, Array],
	customClass: [String, Array],
})

watch(() => props.modelValue, (newValue) => {
	if (newValue !== state.innerValue) {
		state.innerValue = newValue
	}
})

const state = reactive({
	parentDisabled: false,
	direction: 'vertical',
	innerValue: props.modelValue
})

const { parent } = useParent('wanCheckbox')

const instance = getCurrentInstance()

const iconStyle = computed(() => {
	const { checkedColor, disabled, iconSize } = props
	const styles = {
		'font-size': addUnit(iconSize),
	};

	if (checkedColor && state.innerValue && !disabled && !state.parentDisabled) {
		styles['border-color'] = checkedColor;
		styles['background-color'] = checkedColor;
	}

	return style(styles);
})

function emitEvent(target: any, value: boolean | any[]) {
	target.emit('update:modelValue', value)
	target.emit('change', value)
}

function emitChange(value: boolean) {
	if (parent) {
		setParentValue(parent, value);
	} else {
		emitEvent(instance, value);
	}
}

function toggle() {
	const { disabled } = props;
	if (!disabled && !state.parentDisabled) {
		emitChange(!state.innerValue);
	}
}

function onClickLabel() {
	const { labelDisabled, disabled } = props
	if (!disabled && !labelDisabled && !state.parentDisabled) {
		emitChange(!state.innerValue);
	}
}

function setParentValue(parent: any, value: boolean) {
	const parentValue = parent.proxy.modelValue.slice();
	const { name } = props;
	const { max } = parent.proxy;

	if (value) {
		if (max && parentValue.length >= max) {
			return;
		}

		if (parentValue.indexOf(name) === -1) {
			parentValue.push(name);
			emitEvent(parent, parentValue);
		}
	} else {
		const index = parentValue.indexOf(name);
		if (index !== -1) {
			parentValue.splice(index, 1);
			emitEvent(parent, parentValue);
		}
	}
}

function setState(options: any) {
	Object.keys(options).forEach((key) => {
		state[key] = options[key]
	})
	if(options.innerValue) {
		emitEvent(instance, options.innerValue)
	}
}

defineExpose({ setState, toggle })
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-checkbox {
  display: flex;
  align-items: center;
  overflow: hidden;
  user-select: none;

  &--horizontal {
    margin-right: $padding-sm;
  }

  &__icon-wrap,
  &__label {
    line-height: var(--checkbox-size, $checkbox-size);
  }

  &__icon-wrap {
    flex: none;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 1em;
    height: 1em;
    color: transparent;
    text-align: center;
    transition-property: color, border-color, background-color;
    font-size: var(--checkbox-size, $checkbox-size);
    border: 1px solid var(--checkbox-border-color, $checkbox-border-color);
    transition-duration: var(
      --checkbox-transition-duration,
      $checkbox-transition-duration
    );

    &--round {
      border-radius: 100%;
    }

    &--checked {
      color: $white;
      background-color: var(
        --checkbox-checked-icon-color,
        $checkbox-checked-icon-color
      );
      border-color: var(
        --checkbox-checked-icon-color,
        $checkbox-checked-icon-color
      );
    }

    &--disabled {
      background-color: var(
        --checkbox-disabled-background-color,
        $checkbox-disabled-background-color
      );
      border-color: var(
        --checkbox-disabled-icon-color,
        $checkbox-disabled-icon-color
      );
    }

    &--disabled.wan-checkbox__icon--checked {
      color: var(--checkbox-disabled-icon-color, $checkbox-disabled-icon-color);
    }
  }

  &__label {
    word-wrap: break-word;
    padding-left: var(--checkbox-label-margin, $checkbox-label-margin);
    color: var(--checkbox-label-color, $checkbox-label-color);

    &--left {
      float: left;
      margin: 0 var(--checkbox-label-margin, $checkbox-label-margin) 0 0;
    }

    &--disabled {
      color: var(
        --checkbox-disabled-label-color,
        $checkbox-disabled-label-color
      );
    }

    &:empty {
      margin: 0;
    }
  }
}
</style>
