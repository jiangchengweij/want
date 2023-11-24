<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view v-if="info && info !== '' || dot"
		class="wan-info"
		:class="[bem('info', { dot }), customClass]"
		:style="customStyle"
	>{{ dot ? '' : info }}</view>
</template>

<script setup lang="ts">
import { bem } from '../utils/bem'
defineProps({
	dot: Boolean,
	info: [String, Number],
	customStyle: String,
	customClass: String
})
</script>

<style lang="scss">
	@import '../common/style/var.scss';
	.wan-info {
		position: absolute;
		top: 0;
		right: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		white-space: nowrap;
		transform: translate(50%, -50%);
		transform-origin: 100%;
		height: var(--info-size, $info-size);
		min-width: var(--info-size, $info-size);
		padding: var(--info-padding, $info-padding);
		color: var(--info-color, $info-color);
		font-weight: var(--info-font-weight, $info-font-weight);
		font-size: var(--info-font-size, $info-font-size);
		font-family: var(--info-font-family, $info-font-family);
		background-color: var(--info-background-color, $info-background-color);
		border: var(--info-border-width, $info-border-width) solid $white;
		border-radius: var(--info-size, $info-size);
		
		&--dot {
			min-width: 0;
			border-radius: 100%;
			width: var(--info-dot-size, $info-dot-size);
			height: var(--info-dot-size, $info-dot-size);
			background-color: var(--info-dot-color, $info-dot-color);
		}
	}
</style>
