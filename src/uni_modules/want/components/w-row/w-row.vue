<script lang="ts">
	/**
	 * Col 布局行
	 * @description Layout 提供了w-row和w-col两个组件来进行行列布局。
	 * @tutorial https://wei.jiangchengwei.io/layout
	 * @property {String|Number} gutter 列元素之间的间距（单位为 px）
	 * @property {String} customClass 根节点样式类
	 * @event {Function} click 点击事件
	 * @example <w-row gutter="20"><w-col span="8">span: 8</w-col></w-row>
	 */
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-row" @tap="onClick" :style="rootStyle">
		<slot />
	</view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, provide } from 'vue'
import { addUnit, toNumber } from '../utils'

const instance = getCurrentInstance()

const emit = defineEmits(['click'])
const props = defineProps({
	gutter: [Number, String]
})

provide('wanRow', instance)

const rootStyle = computed(() => {
	const { gutter } = props
	return {
		marginRight: addUnit(-toNumber(gutter) / 2),
		marginLeft: addUnit(-toNumber(gutter) / 2)
	}
})

function onClick(event) {
	emit('click', event)
}
</script>

<style lang="scss" scoped>
.wan-row {
	display: flex;
	flex-wrap: wrap;
}
</style>