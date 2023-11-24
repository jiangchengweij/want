<script lang="ts">
	/**
	 * Icon 图标
	 * @description 基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用。
	 * @tutorial https://wei.jiangchengwei.io/icon
	 * @property {String} name 图标名称或图片链接
	 * @property {Boolean} dot 是否显示图标右上角小红点，默认 fales
	 * @property {String|Number} info 图标右上角文字提示
	 * @property {String} color 图标颜色
	 * @property {String|Number} size 图标大小，如 `20px`，`2em`，默认单位为`px`
	 * @property {String} customStyle  自定义样式
	 * @property {String} classPrefix  类名前缀，默认 wan-icon
	 * @property {String} customClass 根节点样式类
	 * @property {String} infoClass 图标右上角文字样式类
	 * @event {Function} click 点击事件
	 * @example <w-icon name="close" />
	 */
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared'
		}
	}
</script>
<template>
	<view
		:class="rootClass"
		:style="rootStyle"
		@tap="onClick"
	>
		<w-info 
			v-if="info != null || dot"
			:dot="dot"
			:info="info"
			:custom-class="`wan-icon__info ${infoClass || ''}`"
		/>
		<image v-if="isImage(name)"
			:src="name"
			mode="aspectFit"
			class="wan-icon__image"
		/>
	</view>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { addUnit } from '../utils';
import { style } from '../utils/style';

const emit = defineEmits(['click'])

const props = defineProps({
	dot: Boolean,
	info: String,
	size: [String, Number],
	color: String,
	customStyle: null,
	classPrefix: {
		type: String,
		default: 'wan-icon',
	},
	name: String,
	customClass: String,
	infoClass: String,
	hostClass: [String, Array],
})


function isImage(name: string) {
	return name.indexOf('/') !== -1;
}

const rootClass = computed(() => {
	const { classPrefix, name, customClass } = props
	const classes = [customClass]
	if (classPrefix !== 'wan-icon') {
		classes.push('wan-icon--custom')
	}
	if (classPrefix != null) {
		classes.push(classPrefix)
	}
	if (isImage(name)) {
		classes.push('wan-icon--image')
	} else if (classPrefix != null) {
		classes.push(classPrefix + '-' + name)
	}
	return classes.join(' ')
})

const rootStyle = computed(() => {
	const { color, size, customStyle } = props
	return style([{
		color: color,
		fontSize: addUnit(size),
	}, customStyle])
})

function onClick() {
	emit('click')
}
</script>
<style lang="scss">
@import '../common/style/var.scss';
@import './icon.scss';

.wan-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	&--custom {
		position: relative;
	}

	&--image {
		width: 1em;
		height: 1em;
	}

	&__image {
		width: 100%;
		height: 100%;
	}

	&__info {
		z-index: 1;
	}
}
</style>
