<script lang="ts">
	/**
	 * Cell 单元格
	 * @description 单元格为列表中的单个展示项。
	 * @tutorial https://wei.jiangchengwei.io/cell
	 * @property {String} icon 左侧图标名称或图片链接，可选值见 w-icon
	 * @property {String} title 左侧标题
	 * @property {String} titleWidth 标题宽度，须包含单位
	 * @property {String} value 右侧内容
	 * @property {String} label 标题下方的描述信息
	 * @property {String} size 单元格大小，可选值为 `large`
	 * @property {Boolean} border 是否显示下边框，默认 true
	 * @property {Boolean} center 是否使内容垂直居中，默认 false
	 * @property {String} url 点击后跳转的链接地
	 * @property {String} linkType=[navigateTo|redirectTo|switchTab|reLaunch] 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch`，默认 navigateTo
	 * @property {Boolean} clickable 点击后跳转的链接地，默认 false
	 * @property {Boolean} isLink 是否展示右侧箭头并开启点击反馈，默认 false
	 * @property {Boolean} required 是否显示表单必填星号，默认 false
	 * @property {Boolean} arrowDirection=[right|left|up|down`] 箭头方向，可选值为 `left` `up` `down`，默认 right
	 * @property {Boolean} useLabelSlot 是否使用 label slot，默认 false
	 * @property {String} titleStyle 标题样式
	 * @property {String} customClass 根节点样式类
	 * @property {String} titleClass 标题样式类
	 * @property {String} labelClass 描述信息样式类
	 * @property {String} valueClass 右侧内容样式类
	 * @event {Function} click 点击事件
	 * @example <w-cell-group><w-cell title="单元格" value="内容" /></w-cell-group>
	 */
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view 
		:class="[customClass || '', bem('cell', [size, { center, required, borderless: !border, clickable: isLink || clickable }])]"
		hover-class="wan-cell--hover"
		hover-stay-time="70"
		:style="customStyle"
		@tap="onClick"
	>
		<w-icon
			v-if="icon"
			:name="icon"
			class="wan-cell__left-icon-wrap"
			custom-class="wan-cell__left-icon"
		></w-icon>
		<slot v-else name="icon" />
		
		<view
			v-if="title || $slots.title || (label || useLabelSlot)"
			:style="getTitleStyle"
			class="wan-cell__title"
		>
			<template v-if="title">{{ title }}</template>
			<slot v-else name="title" />
			
			<view v-if="label || useLabelSlot"
				class="wan-cell__label"
			>
				<slot v-if="useLabelSlot" name="label" />
				<template v-else-if="label">{{ label }}</template>
			</view>
		</view>
		
		<view class="wan-cell__value" :class="valueClass || ''">
			<template v-if="value || value === 0">{{ value }}</template>
			<slot v-else />
		</view>
		
		<w-icon
			v-if="isLink"
			:name="arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'"
			class="wan-cell__right-icon-wrap"
			:class="[rightIconClass || '']"
			custom-class="wan-cell__right-icon"
		/>
		<slot v-else name="right-icon" />
	
		<slot name="extra" />
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '../utils';
import { style } from '../utils/style'
import { linkProps, useLink } from '../utils/link'
import { bem } from '../utils/bem'

const emit = defineEmits(['click'])

const props = defineProps({
	title: String,
	value: [String, Object],
	icon: String,
	size: String,
	label: String,
	center: Boolean,
	isLink: Boolean,
	required: Boolean,
	clickable: Boolean,
	titleWidth: String,
	customStyle: String,
	arrowDirection: String,
	useLabelSlot: Boolean,
	border: {
		type: Boolean,
		default: true,
	},
	titleStyle: String,
	titleClass: [String, Array],
	labelClass: [String, Array],
	valueClass: [String, Array],
	rightIconClass: [String, Array],
	hoverClass: [String, Array],
	customClass: null,
	...linkProps
})

const { jumpLink } = useLink({ props })

const getTitleStyle = computed(() => {
	const { titleStyle, titleWidth } = props
	return style([
		{
			maxWidth: addUnit(titleWidth),
			minWidth: addUnit(titleWidth)
		},
		titleStyle
	])
})

function onClick(event: TouchEvent) {
	emit('click', event)
	jumpLink()
}

</script>

<style lang="scss">
	@import './style.scss';
</style>
