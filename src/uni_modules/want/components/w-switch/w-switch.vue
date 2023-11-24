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
	<view
	  :class="[bem('switch', { on: checked === activeValue, disabled }), customClass || '']"
	  :style="rootStyle"
	  @tap="onClick"
	>
	  <view class="wan-switch__node" :class="[nodeClass]">
	    <w-loading
	      v-if="loading"
	      :color="loadingColor"
	      custom-class="wan-switch__loading"
	    />
	  </view>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { addUnit } from '../utils';
import { style } from '../utils/style';
import { bem } from '../utils/bem'

const emit = defineEmits(['input', 'change']);

const props = defineProps({
	checked: { type: null, },
	loading: Boolean,
	disabled: Boolean,
	activeColor: String,
	inactiveColor: String,
	size: {
		type: String,
		default: '30',
	},
	activeValue: {
		type: null,
		default: true,
	},
	inactiveValue: {
		type: null,
		default: false,
	},
	customClass: String,
	nodeClass: String,
})

const rootStyle = computed(() => {
	const { checked, activeValue, activeColor, inactiveColor, size } = props;
	const currentColor = checked === activeValue ? activeColor : inactiveColor;

	return style({
		'font-size': addUnit(size),
		'background-color': currentColor,
	});
})

const BLUE = '#1989fa';
const GRAY_DARK = '#969799';

const loadingColor = computed(() => {
	const { checked, activeValue, activeColor, inactiveColor } = props;
  return checked === activeValue
    ? activeColor || BLUE
    : inactiveColor || GRAY_DARK;
})

function onClick() {
	const { activeValue, inactiveValue, disabled, loading } = props;

	if (disabled || loading) {
		return;
	}

	const checked = props.checked === activeValue;
	const value = checked ? inactiveValue : activeValue;

	emit('input', value);
	emit('change', value);
}

</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-switch {
  position: relative;
  display: inline-block;
  box-sizing: content-box;
  width: var(--switch-width, $switch-width);
  height: var(--switch-height, $switch-height);
  background-color: var(--switch-background-color, $switch-background-color);
  border: var(--switch-border, $switch-border);
  border-radius: var(--switch-node-size, $switch-node-size);
  transition: background-color
    var(--switch-transition-duration, $switch-transition-duration);

  &__node {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 100%;
    z-index: var(--switch-node-z-index, $switch-node-z-index);
    width: var(--switch-node-size, $switch-node-size);
    height: var(--switch-node-size, $switch-node-size);
    background-color: var(
      --switch-node-background-color,
      $switch-node-background-color
    );
    box-shadow: var(--switch-node-box-shadow, $switch-node-box-shadow);
    transition: var(--switch-transition-duration, $switch-transition-duration)
      cubic-bezier(0.3, 1.05, 0.4, 1.05);
  }

  &__loading {
    position: absolute !important;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
  }

  &--on {
    background-color: var(
      --switch-on-background-color,
      $switch-on-background-color
    );

    .wan-switch__node {
      transform: translateX(
        calc(
          var(--switch-width, $switch-width) -
            var(--switch-node-size, $switch-node-size)
        )
      );
    }
  }

  &--disabled {
    opacity: var(--switch-disabled-opacity, $switch-disabled-opacity);
  }
}
</style>
