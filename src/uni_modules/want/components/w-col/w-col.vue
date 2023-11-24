<script lang="ts">
	/**
	 * Col 布局列
	 * @description Layout 提供了w-row和w-col两个组件来进行行列布局。
	 * @tutorial https://wei.jiangchengwei.io/layout
	 * @property {String|Number} span 列元素宽度
	 * @property {Number} offset 列元素偏移距离
	 * @property {String} customClass 根节点样式类
	 * @event {Function} click 点击事件
	 * @example <w-col span="8">span: 8</w-col>
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
		:class="[customClass, bem('col', [ span ]), offset ? 'wan-col--offset-' + offset : '']"
		:style="rootStyle"
		@tap="onClick"
	>
		<slot />
	</view>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue';
import { bem } from '../utils/bem'
import { addUnit } from '../utils';

const emit = defineEmits(['click'])
defineProps({
	span: [Number, String],
	offset: [Number, String],
	customClass: String,
})

const parent: anyObj = inject('wanRow', null)

const rootStyle = computed(() => {
	if (!parent) {
		return '';
	}
	const { gutter } = parent.proxy;
	return {
		paddingRight: addUnit(gutter / 2),
		paddingLeft: addUnit(gutter / 2)
	}
})

function onClick(event) {
	emit('click', event)
}
</script>

<style lang="scss">
	@import './style.scss';
</style>
