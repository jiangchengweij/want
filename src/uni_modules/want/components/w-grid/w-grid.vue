<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view
		class="wan-grid"
		:class="[customClass || '', border && !gutter ? 'wan-hairline--top' : '']"
		:style="rootStyle"
	>
		<slot />
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { addUnit } from '../utils';
import { useChildren } from '../utils/relation';
import { style } from '../utils/style';

const props = defineProps({
	square: {
		type: Boolean,
	},
	gutter: {
		type: [Number, String],
		default: 0,
	},
	clickable: {
		type: Boolean,
	},
	columnNum: {
		type: [Number, String],
		default: 4,
	},
	center: {
		type: Boolean,
		default: true,
	},
	border: {
		type: Boolean,
		default: true,
	},
	direction: {
		type: String,
	},
	iconSize: {
		type: String,
	},
	reverse: {
		type: Boolean,
		default: false,
	},
	customClass: {
		type: String,
	}
})

useChildren('wanGrid');

const rootStyle = computed(() => {
	return style({
		'padding-left': addUnit(props.gutter),
	})
})

</script>

<style lang="scss">
.wan-grid {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
