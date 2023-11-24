<script lang="ts">
	/**
	 * Toast 轻提示
	 * @description 在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。
	 * @tutorial https://wei.jiangchengwei.io/toast
	 * @property {String} type=[text|loading|success|fail|html] 提示类型，默认 text
	 * @property {String} position=[middle|top|middle|bottom] 位置
	 * @property {String} message 内容
	 * @property {Boolean} mask 是否显示遮罩层，默认 false
	 * @property {Boolean} forbidClick 是否禁止背景点击，默认 false
	 * @property {String} loadingType=[spinner|circular] 加载图标类型，默认 circular
	 * @property {Number} zIndex 层级，默认 1000
	 * @property {Number} duration 展示时长(ms)，值为 0 时，toast 不会消失，默认 2000
	 * @property {Function} onClose 关闭时的回调函数
	 * @property {String} customClass 根节点样式类
	 * @event {Function} click 点击事件
	 * @example <w-toast ref="toastRef" />
	 */
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<w-overlay
	  v-if="options.mask || options.forbidClick"
	  :show="options.show"
	  :z-index="options.zIndex"
	  :custom-style="options.mask ? '' : 'background-color: transparent;'"
	/>
	<w-transition
	  :show="options.show"
	  :custom-style="`z-index: ${ options.zIndex }`"
	  custom-class="wan-toast__container"
	>
	  <view
			class="wan-toast"
	    :class="[`wan-toast--${(options.type === 'text' || options.type === 'html') ? 'text' : 'icon'}`, `wan-toast--${ options.position }`]"
	    @touchmove.stop="noop"
	  >
	    <!-- text only -->
	    <text v-if="options.type === 'text'">{{ options.message }}</text>
	
	    <!-- html only -->
	    <rich-text v-else-if="options.type === 'html'" :nodes="options.message"></rich-text>
	
	    <!-- with icon -->
	    <template v-else>
	      <w-loading
	        v-if="options.type === 'loading'"
	        color="white"
	        :type="options.loadingType"
	        custom-class="wan-toast__loading"
	      />
	      <w-icon v-else class="wan-toast__icon" :name="options.type" />
	      <text v-if="options.message" class="wan-toast__text">{{ options.message }}</text>
	    </template>
	
	    <slot />
	  </view>
	</w-transition>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

const props = defineProps({
	show: Boolean,
	mask: Boolean,
	message: String,
	forbidClick: Boolean,
	zIndex: {
		type: Number,
		default: 1000,
	},
	type: {
		type: String,
		default: 'text',
	},
	loadingType: {
		type: String,
		default: 'circular',
	},
	position: {
		type: String,
		default: 'middle',
	},
	top: null,
})

const options = reactive({
	show: props.show,
	mask: props.mask,
	message: props.message,
	forbidClick: props.forbidClick,
	zIndex: props.zIndex,
	type: props.type,
	loadingType: props.loadingType,
	position: props.position,
	top: props.top
})

watch(() => props, 
	(newOptions) => {
	setOptions(newOptions)
}, {
	deep: true,
})

function setOptions(opts: anyObj) {
	if (!opts) { return }
	Object.keys(opts).forEach((key) => {
		options[key] = opts[key]
	})
}

function noop() { }

defineExpose({
	setOptions
})
</script>

<style lang="scss">
@import './style.scss';
</style>
