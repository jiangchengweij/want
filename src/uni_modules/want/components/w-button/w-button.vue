<script lang="ts">
	/**
	 * Button 按钮
	 * @description 按钮用于触发一个操作，如提交表单。
	 * @tutorial https://wei.jiangchengwei.io/button
	 * @property {String} id 标识符
	 * @property {String} type = [primary|info|warning|danger] 类型，可选值为 primary info warning danger，默认值为 default
	 * @property {String} size = [normal|large|small|mini] 尺寸，可选值为 normal large small mini，默认值为 normal
	 * @property {String} color 按钮颜色，支持传入 linear-gradient 渐变色
	 * @property {String} icon 左侧图标名称或图片链接，等同于 Icon 组件的 name 属性
	 * @property {String} classPrefix 图标类名前缀，同 Icon 组件的 class-prefix 属性，默认值为 wan-icon
	 * @property {Boolean} plain 是否为朴素按钮，默认值为 false
	 * @property {Boolean} block 是否为块级元素，默认值为 false 
	 * @property {Boolean} round 是否为圆形按钮，默认值为 false
	 * @property {Boolean} square 是否为方形按钮，默认值为 false
	 * @property {Boolean} disabled 是否禁用按钮，默认值为 false
	 * @property {Boolean} hairline 是否使用 0.5px 边框，默认值为 false
	 * @property {Boolean} loading 	是否显示为加载状态，默认值为 false
	 * @property {String} loadingText 加载状态提示文字
	 * @property {String} loadingType = [circular|spinner] 加载状态图标类型，可选值为 spinner, 默认值为 circular
	 * @property {String} loadingSize 加载图标大小，默认值为 20px
	 * @property {String|Object} customStyle 自定义样式 
	 * @property {String} customClass 根节点样式类 
	 * @property {String} loadingClass 加载图标样式类 
	 * @event {Function} click 点击按钮，且按钮状态不为加载或禁用时触发 
	 * @example <w-button type="default">默认按钮</w-button>
	 */
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<button
		:id="id"
		:class="[bem('button', 
			[ type, size, { block, round, plain, square, loading, disabled, hairline, unclickable: disabled || loading }],
			hairline ? 'wan-hairline--surround' : ''
		), customClass || '',]"
		:hover-class="disabled || loading ? '' : 'wan-button--active '+(hoverClass || '')"
		:lang="lang"
		:form-type="formType"
		:style="rootStyle"
		:open-type="disabled || loading ? '' : openType"
		:business-id="businessId"
		:session-from="sessionFrom"
		:send-message-title="sendMessageTitle"
		:send-message-path="sendMessagePath"
		:send-message-img="sendMessageImg"
		:show-message-card="showMessageCard"
		:app-parameter="appParameter"
		:aria-label="ariaLabel"
		@tap="onClick"
		@getuserinfo="methods.onGetUserInfo"
		@contact="methods.onContact"
		@getphonenumber="methods.onGetPhoneNumber"
		@getrealtimephonenumber="methods.onGetRealTimePhoneNumber"
		@error="methods.onError"
		@launchapp="methods.onLaunchApp"
		@opensetting="methods.onOpenSetting"
		@chooseavatar="methods.onChooseAvatar"
	>
		<template v-if="loading">
			<w-loading
				:custom-class="loadingClass"
				:size="loadingSize"
				:type="loadingType"
				:color="loadingColor"
			/>
			<view v-if="loadingText" class="wan-button__loading-text">
				{{ loadingText }}
			</view>
		</template>
		<template v-else>
			<view class="wan-button__text">
				<slot />
			</view>
		</template>
	</button>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { bem } from '../utils/bem'
import { useButton, btnProps, btnEmits } from '../utils/button'
import { style } from '../utils/style';

const emit = defineEmits(['click', ...btnEmits])

const props = defineProps({
	...btnProps,
	formType: String,
	icon: String,
	classPrefix: {
		type: String,
		default: 'wan-icon',
	},
	plain: Boolean,
	block: Boolean,
	round: Boolean,
	square: Boolean,
	loading: Boolean,
	hairline: Boolean,
	disabled: Boolean,
	loadingText: String,
	loadingType: {
		type: String,
		default: 'circular',
	},
	type: {
		type: String,
		default: 'default',
	},
	dataset: null,
	size: {
		type: String,
		default: 'normal',
	},
	loadingSize: {
		type: String,
		default: '20px',
	},
	color: String,
	customStyle: [String, Object],
	loadingClass: String,
	customClass: String,
	hoverClass: String,
	hostClass: [String, Array],
})

const { methods } = useButton({ emit })

const rootStyle = computed(() => {
	const { customStyle, color } = props;
	if (!color) {
		return style(customStyle);
	}
	const styleObj: anyObj = {
		color: props.plain ? color : '#fff',
		background: props.plain ? null : props.color
	}
	if (color?.indexOf('gradient') !== -1) {
		styleObj.border = '0px';
	} else {
		styleObj['border-color'] = color
	}
	return style([styleObj, customStyle])
})

const loadingColor = computed(() => {
	const { plain, color, type } = props
	if (plain) {
		return color ? color : '#c9c9c9'
	}

	if (type) {
		return '#c9c9c9'
	}
	return '#fff'
})

function onClick(event: TouchEvent) {
	if (props.disabled || props.loading) return;
	emit('click', event)
}
</script>
<style lang="scss">
@import './style.scss';
</style>
