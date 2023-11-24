<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<w-transition
		name="slide-down"
		:show="options.show"
		custom-class="wan-notify__container"
		:custom-style="rootStyle"
		@tap="onTap"
	>
		<view
			class="wan-notify"
			:class="[`wan-notify--${options.type}`]"
			:style="notifyStyle"
		>
			<view
				v-if="options.safeAreaInsetTop"
				:style="`height: ${ statusBarHeight }px`"
			/>
			<text>{{ options.message }}</text>
		</view>
	</w-transition>
</template>

<script setup lang="ts">
import { computed, reactive, watch, nextTick } from 'vue';
import { WHITE } from '../common/color';
import { addUnit, getSystemInfoSync } from '../utils';
import { style } from '../utils/style';

const props = defineProps({
	message: String,
	background: String,
	type: {
		type: String,
		default: 'danger',
	},
	color: {
		type: String,
		default: WHITE,
	},
	duration: {
		type: Number,
		default: 3000,
	},
	zIndex: {
		type: Number,
		default: 110,
	},
	safeAreaInsetTop: {
		type: Boolean,
		default: false,
	},
	top: [String, Number],
	webOffsetTop: {
		type: null,
		default: 0
	},
})

const { statusBarHeight } = getSystemInfoSync()

const options = reactive({
	show: false,
	type: props.type,
	message: props.message,
	background: props.background,
	color: props.color,
	duration: props.duration,
	zIndex: props.zIndex,
	safeAreaInsetTop: props.safeAreaInsetTop,
	top: props.top,
	onOpened: (null as unknown) as () => void,
	onClose: (null as unknown) as () => void,
	onClick: (null as unknown) as (detail: Record<string, null>) => void,
})

watch(() => props, 
	(newOptions) => {
	setOptions(newOptions)
}, {
	deep: true,
})

const rootStyle = computed(() => {
	return style({
		'z-index': options.zIndex,
		// #ifdef WEB
		top : `calc(${addUnit(options.top)} + ${addUnit(props.webOffsetTop)})`
		// #endif
		// #ifndef WEB
		top: addUnit(options.top)
		// #endif
	})
})

const notifyStyle = computed(() => {
	return style({
		background: options.background,
		color: options.color,
	})
})

let _timer = null;

function show() {
	clearTimeout(_timer);
	options.show = true;

	nextTick(options.onOpened);

	if (options.duration > 0 && options.duration !== Infinity) {
		_timer = setTimeout(() => {
			hide();
		}, options.duration);
	}
}

function hide() {
	clearTimeout(_timer);
	options.show = false;
	
	nextTick(options.onClose);
}

function onTap(event: any) {
	if (options.onClick) {
		options.onClick(event);
	}
}

function setOptions(opts: anyObj) {
	if (!opts) { return }
	Object.keys(opts).forEach((key) => {
		options[key] = opts[key]
	})
}

defineExpose({
	setOptions,
	show,
	hide,
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-notify {
  text-align: center;
  word-wrap: break-word;
  padding: var(--notify-padding, $notify-padding);
  font-size: var(--notify-font-size, $notify-font-size);
  line-height: var(--notify-line-height, $notify-line-height);

  &__container {
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
  }

  &--primary {
    background-color: var(
      --notify-primary-background-color,
      $notify-primary-background-color
    );
  }

  &--success {
    background-color: var(
      --notify-success-background-color,
      $notify-success-background-color
    );
  }

  &--danger {
    background-color: var(
      --notify-danger-background-color,
      $notify-danger-background-color
    );
  }

  &--warning {
    background-color: var(
      --notify-warning-background-color,
      $notify-warning-background-color
    );
  }
}
</style>
