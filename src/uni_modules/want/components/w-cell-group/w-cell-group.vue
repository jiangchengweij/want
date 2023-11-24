<script lang="ts">
	/**
	 * CellGroup 单元格组
	 * @description 对分组单元格进行分组
	 * @tutorial https://wei.jiangchengwei.io/cell
	 * @property {String} title 分组标题
	 * @property {Boolean} inset 是否展示为圆角卡片风格，默认 false
	 * @property {Boolean} border 是否显示外边框，默认 true
	 * @property {String} customClass 根节点样式类
	 * @example <w-cell-group><w-cell title="单元格" value="内容" /></w-cell-group>
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
		v-if="title"
		:class="[bem('cell-group__title', { inset })]"
	>{{ title }}</view>
	<view :class="[customClass, bem('cell-group', { inset }), border ? 'wan-hairline--top-bottom' : '']">
		<slot />
	</view>
</template>

<script setup lang="ts">
import { bem } from '../utils/bem'

defineProps({
	title: String,
	border: {
		type: Boolean,
		default: true
	},
	inset: Boolean,
	customClass: String
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-cell-group {
	&--inset {
    margin: var(--cell-group-inset-padding, $cell-group-inset-padding);
    border-radius: var(
      --cell-group-inset-border-radius,
      $cell-group-inset-border-radius
    );
    overflow: hidden;
	} 
	
	&__title {
    padding: var(--cell-group-title-padding, $cell-group-title-padding);
    font-size: var(--cell-group-title-font-size, $cell-group-title-font-size);
    line-height: var(
      --cell-group-title-line-height,
      $cell-group-title-line-height
    );
    color: var(--cell-group-title-color, $cell-group-title-color);

    &--inset {
      padding: var(
        --cell-group-inset-title-padding,
        $cell-group-inset-title-padding
      );
    }
	}
}
</style>
