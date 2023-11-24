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
	<view :class="[bem('radio', [state.direction]), customClass || '']">
	  <view
	    v-if="labelPosition === 'left'"
	    :class="[bem('radio__label', [labelPosition, { disabled: disabled || state.parentDisabled }, labelClass || ''])]"
	    @tap="onClickLabel"
	  >
	    <slot />
	  </view>
	  <view class="wan-radio__icon-wrap" :style="iconSize ? `font-size: ${ addUnit(iconSize) }` : ''" @tap="onChange">
	    <slot v-if="useIconSlot" name="icon" />
			<view v-else :class="[bem('radio__icon', [shape, { disabled: disabled || state.parentDisabled, checked: state.innerValue === name }])]">
				<w-icon
				  name="success"
				  :style="iconStyle"
				  :custom-class="iconClass"
				  :custom-style="iconCustomStyle"
				/>
			</view>
	  </view>
	  <view
			v-if="labelPosition === 'right'"
	    :class="[labelClass || '', bem('radio__label', [labelPosition, { disabled: disabled || state.parentDisabled }])]"
	    @tap="onClickLabel"
	  >
	    <slot />
	  </view>
	</view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, reactive, watch } from 'vue'
import { addUnit } from '../utils'
import { useParent } from '../utils/relation'
import { style } from '../utils/style'
import { bem } from '../utils/bem'

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
	name: null,
	modelValue: null,
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
	customClass: null,
	iconClass: null,
	labelClass: null
})

const instance = getCurrentInstance()

const state = reactive({
	direction: '',
	parentDisabled: false,
	innerValue: props.modelValue,
})

const { parent } = useParent('wanRadio')

watch(() => props.modelValue, (newValue) => {
	if (newValue !== state.innerValue) {
		state.innerValue = newValue
	}
})

const iconStyle = computed(() => {
	const { iconSize, checkedColor, disabled, name } = props
  const styles = {
    'font-size': addUnit(iconSize),
  }
  if (
    checkedColor && !(disabled || state.parentDisabled) &&
    state.innerValue === name
  ) {
    styles['border-color'] = checkedColor;
    styles['background-color'] = checkedColor;
  }

  return style(styles);
})

const iconCustomStyle = computed(() => {
	return style({
	  'line-height': addUnit(props.iconSize),
	  'font-size': '.8em',
	  display: 'block',
	});
})

function updateFromParent() {
	if (!parent) {
		return;
	}

	const { modelValue, disabled: parentDisabled, direction } = parent.proxy;
	
	state.innerValue = modelValue;
	state.direction = direction;
	state.parentDisabled = parentDisabled
}

function emitChange(value: boolean) {
	const target = parent || instance;
	target.emit('update:modelValue', value);
	target.emit('change', value);
}

function onChange() {
	if (!props.disabled && !state.parentDisabled) {
		emitChange(props.name);
	}
}

function onClickLabel() {
	const { disabled, labelDisabled, name } = props;
	if (!(disabled || state.parentDisabled) && !labelDisabled) {
		emitChange(name);
	}
}

defineExpose({
	updateFromParent
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-radio {
  display: flex;
  align-items: center;
  overflow: hidden;
  user-select: none;

  &__icon-wrap {
    flex: none;
  }

  &--horizontal {
    margin-right: var(--padding-sm, $padding-sm);
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
    border: 1px solid var(--radio-border-color, $radio-border-color);
    font-size: var(--radio-size, $radio-size);
    transition-duration: var(
      --radio-transition-duration,
      $radio-transition-duration
    );

    &--round {
      border-radius: 100%;
    }

    &--checked {
      color: $white;
      background-color: var(
        --radio-checked-icon-color,
        $radio-checked-icon-color
      );
      border-color: var(--radio-checked-icon-color, $radio-checked-icon-color);
    }

    &--disabled {
      background-color: var(
        --radio-disabled-background-color,
        $radio-disabled-background-color
      );
      border-color: var(
        --radio-disabled-icon-color,
        $radio-disabled-icon-color
      );
    }

    &--disabled.wan-radio__icon--checked {
      color: var(--radio-disabled-icon-color, $radio-disabled-icon-color);
    }
  }

  &__label {
    word-wrap: break-word;
    padding-left: var(--radio-label-margin, $radio-label-margin);
    color: var(--radio-label-color, $radio-label-color);
    line-height: var(--radio-size, $radio-size);

    &--left {
      float: left;
      margin: 0 var(--radio-label-margin, $radio-label-margin) 0 0;
    }

    &--disabled {
      color: var(--radio-disabled-label-color, $radio-disabled-label-color);
    }

    &:empty {
      margin: 0;
    }
  }
}
</style>
