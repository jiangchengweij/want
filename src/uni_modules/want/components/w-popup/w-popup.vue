<script lang="ts">
	/**
	 * Popup 弹出层
	 * @description 弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。
	 * @tutorial https://wei.jiangchengwei.io/popup
	 * @property {Boolean} show 是否显示弹出层，默认 false
	 * @property {Number} zIndex 层级，默认 100
	 * @property {String} position=[center|top|bottom|right|left] 弹出位置，默认 center
	 * @property {Number|Object} duration 动画时长，单位为毫秒，默认 300
	 * @property {Boolean} round 是否显示圆角，默认 false
	 * @property {String} customStyle 自定义弹出层样式
	 * @property {String} overlayStyle 自定义遮罩层样式
	 * @property {Boolean} closeOnClickOverlay 是否在点击遮罩层后关闭，默认 true
	 * @property {Boolean} closeable 是否显示关闭图标，默认 false
	 * @property {String} closeIcon 关闭图标名称或图片链接，默认 cross
	 * @property {String} closeIconPosition=[top-right|top-left|bottom-left|bottom-right] 关闭图标位置，默认 top-right
	 * @property {Boolean} safeAreaInsetBottom 是否为 iPhoneX 留出底部安全距离，默认 true
	 * @property {Boolean} safeAreaInsetTop 是否留出顶部安全距离（状态栏高度），默认 false
	 * @property {Boolean} safeAreaTabBar 是否留出底部 tabbar 安全距离（在使用 tabbar 组件 & 小程序自定义 tabbar 时，popup 组件层级无法盖住 tabbar），默认 false
	 * @property {String} customClass 根节点样式类
	 * @event {Function} close 关闭弹出层时触发
	 * @event {Function} clickOverlay 点击遮罩层时触发
	 * @event {Function} beforeEnter 进入前触发
	 * @event {Function} enter 进入中触发
	 * @event {Function} afterEnter 进入后触发
	 * @event {Function} beforeLeave 离开前触发
	 * @event {Function} leave 离开中触发
	 * @event {Function} afterLeave 离开后触发
	 * @example <w-popup :show="show" @close="onClose">内容</w-popup>
	 */
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-popup-wrap">
		<w-overlay
			v-if="overlay"
			:show="show"
			:z-index="zIndex"
			:custom-style="overlayStyle"
			:duration="duration"
			@click="onClickOverlay"
			:lock-scroll="lockScroll"
		/>
		<view
			v-if="state.inited"
			@transitionend="onTransitionEnd"
			:style="popupStyle"
			:class="[customClass || '', state.classes, 
				bem('popup', [ position, { round, safe: safeAreaInsetBottom, safeTop: safeAreaInsetTop, safeTabBar: safeAreaTabBar } ])]"
		>
			<slot></slot>
			<view 
				class="wan-popup__close-icon" 
				:class="[closeIconClass || '', `wan-popup__close-icon--${closeIconPosition}`]"
				@tap="onClickCloseIcon"
			>
				<w-icon
					v-if="closeable"
					:name="closeIcon"
				></w-icon>
			</view>
		</view>
	</view>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import { style } from '../utils/style';
import { useTransition, transitionProps, transitionEmits } from '../utils/transition';
import { bem } from '../utils/bem'

const emit = defineEmits([...transitionEmits, 'close', 'click-overlay'])
const props = defineProps({
	...transitionProps,
	show: {
		type: Boolean,
		default: false,
	},
	round: Boolean,
	closeable: Boolean,
	customStyle: [String, Object],
	overlayStyle: String,
	transition: {
		type: String,
	},
	zIndex: {
		type: Number,
		default: 100,
	},
	overlay: {
		type: Boolean,
		default: true,
	},
	closeIcon: {
		type: String,
		default: 'cross',
	},
	closeIconPosition: {
		type: String,
		default: 'top-right',
	},
	closeOnClickOverlay: {
		type: Boolean,
		default: true,
	},
	position: {
		type: String,
		default: 'center',
	},
	safeAreaInsetBottom: {
		type: Boolean,
		default: true,
	},
	safeAreaInsetTop: {
		type: Boolean,
		default: false,
	},
	safeAreaTabBar: {
		type: Boolean,
		default: false,
	},
	lockScroll: {
		type: Boolean,
		default: true,
	},
	customClass: [String, Array],
	closeIconClass: String,
})

const { state, onTransitionEnd } = useTransition({ props: props, emit: emit })

let originDuration: any = null;

changeClass();

watch(() => props.transition, () => {
	changeClass();
})

watch(() => props.position, () => {
	changeClass();
})

function changeClass() {
	const { transition, position, duration } = props;
	
	state.name = transition || position;
	
	if (transition === 'none') {
		state.duration = 0;
		originDuration = duration;
	} else if (originDuration != null) {
		state.duration = originDuration;
	}
}

const popupStyle = computed(() => {
	return style([
		{
			'z-index': props.zIndex,
			'-webkit-transition-duration': state.currentDuration + 'ms',
			'transition-duration': state.currentDuration + 'ms',
		},
		state.display ? null : 'display: none',
		props.customStyle,
	])
})

function onClickCloseIcon() {
	emit('close');
}		
function onClickOverlay() {
	emit('click-overlay');

	if (props.closeOnClickOverlay) {
		emit('close');
	}
}
</script>

<style lang="scss">
@import './style.scss';
</style>
