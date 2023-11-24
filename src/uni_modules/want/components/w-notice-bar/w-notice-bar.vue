<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view
		v-if="state.show"
		:class="[customClass || '', bem('notice-bar', { withicon: mode, wrapable })]"
		:style="rootStyle"
		@tap="onClick"
	>
		<view v-if="leftIcon" class="wan-notice-bar__left-icon">
			<w-icon :name="leftIcon" />
		</view>
		<slot v-else name="left-icon" />

		<view class="wan-notice-bar__wrap">
			<view class="wan-notice-bar__content" :class="[scrollable === false && !wrapable ? 'wan-ellipsis' : '']" :animation="state.animationData">
				{{ text }}
				<slot v-if="!text"></slot>
			</view>
		</view>
		<view v-if="mode === 'closeable'" class="wan-notice-bar__right-icon">
			<w-icon
				name="cross"
				@tap.stop="onClickIcon"
			/>
		</view>
		<navigator
			v-else-if="mode === 'link'"
			:url="url"
			:open-type="openType"
		>
			<view class="wan-notice-bar__right-icon">
				<w-icon name="arrow" />
			</view>
		</navigator>
		<slot v-else name="right-icon" />
	</view>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, watch } from 'vue';
import { getRect, requestAnimationFrame } from '../utils';
import { style } from '../utils/style';
import { bem } from '../utils/bem';

const emit = defineEmits(['close', 'click'])
const props = defineProps({
	text: {
		type: String,
		default: '',
	},
	mode: {
		type: String,
		default: '',
	},
	url: {
		type: String,
		default: '',
	},
	openType: {
		type: String,
		default: 'navigate',
	},
	delay: {
		type: Number,
		default: 1,
	},
	speed: {
		type: Number,
		default: 60,
	},
	scrollable: null,
	leftIcon: {
		type: String,
		default: '',
	},
	color: String,
	backgroundColor: String,
	background: String,
	wrapable: Boolean,
	customClass: null
})

const instance = getCurrentInstance()

const state = reactive({
	show: true,
	animationData: null,
})

let _wrapWidth, _contentWidth, _duration, _animation, _timer;

let  _resetAnimation = uni.createAnimation({
	duration: 0,
	timingFunction: 'linear'
})

onMounted(() => {
	init()
})

watch(() => props.text, () => {
	init()
})

watch(() => props.speed, () => {
	init()
})

const rootStyle = computed(() => {
	return style({
		color: props.color,
		'background-color': props.backgroundColor,
		background: props.background,
	})
})

function init() {
	requestAnimationFrame(() => {
		Promise.all([
			getRect(instance, '.wan-notice-bar__content'),
			getRect(instance, '.wan-notice-bar__wrap'),
		]).then((rects) => {
			const [contentRect, wrapRect] = rects;
			const { speed, scrollable, delay } = props;
			if (
				contentRect == null ||
				wrapRect == null ||
				!contentRect.width ||
				!wrapRect.width ||
				scrollable === false
			) {
				return;
			}

			if (scrollable || wrapRect.width < contentRect.width) {
				const duration =
					((wrapRect.width + contentRect.width) / speed) * 1000;

				_wrapWidth = wrapRect.width;
				_contentWidth = contentRect.width;
				_duration = duration;
				_animation = uni.createAnimation({
					duration,
					timingFunction: 'linear',
					delay,
				});

				scroll(true);
			}
		})
	})
}

function scroll(isInit = false) {
	_timer && clearTimeout(_timer);
	_timer = null;
	_resetAnimation.translateX(isInit ? 0 : _wrapWidth).step()
	state.animationData =_resetAnimation.export();

	requestAnimationFrame(() => {
		_animation.translateX(-_contentWidth).step()
		state.animationData = _animation.export()
	});

	_timer = setTimeout(() => {
		scroll();
	}, _duration);
}

function onClickIcon(event) {
	if (props.mode === 'closeable') {
		_timer && clearTimeout(_timer);
		_timer = null;
		state.show = false;
		emit('close', event.detail);
	}
}

function onClick(event: TouchEvent) {
	emit('click', event);
}
</script>

<style lang="scss">
@import './style.scss';
</style>
