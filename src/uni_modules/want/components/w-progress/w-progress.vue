<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view
	  class="wan-progress"
		:class="customClass"
	  :style="rootStyle"
	>
	  <view
	    class="wan-progress__portion"
	    :style="portionStyle"
	  >
	    <view
	      v-if="showPivot && getPivotText"
	      :style="pivotStyle"
	      class="wan-progress__pivot"
	    >
	      {{ getPivotText }}
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, watch } from 'vue';
import { BLUE } from '../common/color';
import { addUnit, getRect } from '../utils';
import { style } from '../utils/style';

const props = defineProps({
	inactive: Boolean,
	percentage: {
		type: Number,
	},
	pivotText: String,
	pivotColor: String,
	trackColor: String,
	showPivot: {
		type: Boolean,
		default: true,
	},
	color: {
		type: String,
		default: BLUE,
	},
	textColor: {
		type: String,
		default: '#fff',
	},
	strokeWidth: {
		type: null,
		default: 4,
	},
	customClass: [String, Array]
})

const instance = getCurrentInstance();

watch(() => props.percentage, () => {
	setLeft();
})

onMounted(() => {
	setLeft();
})

const state = reactive({
	right: 0
})

const getPivotText = computed(() => {
	return props.pivotText || props.percentage + '%';
})

const rootStyle = computed(() => {
  return style({
    'height': props.strokeWidth ? addUnit(props.strokeWidth) : '',
    'background': props.trackColor,
  });
})

const portionStyle = computed(() => {
  return style({
    background: props.inactive ? '#cacaca' : props.color,
    width: props.percentage ? props.percentage + '%' : '',
  });
})

const pivotStyle = computed(() => {
  return style({
    color: props.textColor,
    right: state.right + 'px',
    background: props.pivotColor ? props.pivotColor : props.inactive ? '#cacaca' : props.color,
  });
})

function setLeft() {
	Promise.all([
		getRect(instance, '.wan-progress'),
		getRect(instance, '.wan-progress__pivot')
	]).then(([portion, pivot]) => {
		if (portion && pivot) {
			state.right = (pivot.width * (props.percentage - 100)) / 100;
		}
	})
}
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-progress {
  position: relative;
  height: var(--progress-height, $progress-height);
  border-radius: var(--progress-height, $progress-height);
  background: var(--progress-background-color, $progress-background-color);

  &__portion {
    position: absolute;
    left: 0;
    height: 100%;
    border-radius: inherit;
    background: var(--progress-color, $progress-color);
  }

  &__pivot {
    position: absolute;
    top: 50%;
    box-sizing: border-box;
    min-width: 3.6em;
    text-align: center;
    word-break: keep-all;
    border-radius: 1em;
    transform: translate(0, -50%);
    color: var(--progress-pivot-text-color, $progress-pivot-text-color);
    padding: var(--progress-pivot-padding, $progress-pivot-padding);
    font-size: var(--progress-pivot-font-size, $progress-pivot-font-size);
    line-height: var(--progress-pivot-line-height, $progress-pivot-line-height);
    background-color: var(
      --progress-pivot-background-color,
      $progress-pivot-background-color
    );
  }
}
</style>
