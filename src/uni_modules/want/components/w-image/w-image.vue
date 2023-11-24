<script lang="ts">
	/**
	 * Image 图片
	 * @description 增强版的 image 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示。
	 * @tutorial https://wei.jiangchengwei.io/image
	 * @property {String} src 图片链接
	 * @property {String} fit=[contain|cover|fill|widthFix|heightFix|none] 图片填充模式
	 * @property {String} alt 替代文本
	 * @event {Function} click 点击事件
	 * @example <w-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
	 */
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view 
		:style="rootStyle"
		:class="[customClass, bem('image', { round })]"
		@tap="onClick"
	>
		<image
			v-if="!state.error"
			:src="src"
			:mode="mode"
			:lazy-load="lazyLoad"
			:webp="webp"
			class="wan-image__img"
			:class="[imageClass]"
			:show-menu-by-longpress="showMenuByLongpress"
			@load="onLoad"
			@error="onError"
		/>
		
		<view
			v-if="state.loading && showLoading"
			:class="loadingClass"
			class="wan-image__loading"
		>
			<slot v-if="useLoadingSlot" name="loading" />
			<w-icon v-else name="photo" custom-class="wan-image__loading-icon"></w-icon>
		</view>

		<view
			v-if="state.error && showError"
			:class="[errorClass]"
			class="wan-image__error"
		>
			<slot v-if="useErrorSlot" name="error" />
			<w-icon v-else name="photo-fail" custom-class="wan-image__error-icon" />
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { addUnit } from '../utils';
import { style } from '../utils/style';
import { bem } from '../utils/bem'

const emit = defineEmits(['load', 'error', 'click'])
const props = defineProps({
	src: {
		type: String,
	},
	round: Boolean,
	width: [String, Number],
	height: [String, Number],
	radius: [String, Number],
	lazyLoad: Boolean,
	useErrorSlot: Boolean,
	useLoadingSlot: Boolean,
	showMenuByLongpress: Boolean,
	fit: {
		type: String,
		default: 'fill',
	},
	webp: {
		type: Boolean,
		default: false,
	},
	showError: {
		type: Boolean,
		default: true,
	},
	showLoading: {
		type: Boolean,
		default: true,
	},
	customClass: String,
	loadingClass: String,
	errorClass: String,
	imageClass: String
})

watch(() => props.src, () => {
	state.error = false
	state.loading = true
})

const state = reactive({
	error: false,
	loading: true,
	viewStyle: ''
})

function onLoad(event) {
	state.loading = false
	emit('load')
}

function onError(event) {
	state.loading = false
	state.error = true
	emit('error', event)
}

function onClick(event) {
	emit('click', event)
}

const rootStyle = computed(() => {
	const { width, height, radius } = props
	return style([
		{
			width: addUnit(width),
			height: addUnit(height),
			borderRaduis: addUnit(radius)
		},
		radius ? 'overflow: hidden' : null
	])
})

const FIT_MODE_MAP = {
  none: 'center',
  fill: 'scaleToFill',
  cover: 'aspectFill',
  contain: 'aspectFit',
  widthFix: 'widthFix',
  heightFix: 'heightFix',
};

const mode = computed(() => {
	const { fit } = props
	return FIT_MODE_MAP[fit]
})

</script>

<style lang="scss">
@import './style.scss';
</style>
