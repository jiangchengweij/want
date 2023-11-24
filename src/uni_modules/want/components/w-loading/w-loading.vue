<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view :class="[customClass || '', bem('loading', { vertical })]">
		<view
			class="wan-loading__spinner "
			:class="[`wan-loading__spinner--${type}`]"
			:style="spinnerStyle"
		>
			<view 
				v-if="type === 'spinner'"
				v-for="(_, index) in array12"
				:key="index"
				class="wan-loading__dot"
				:class="[`wan-loading__dot--${index}`]"
			>
			</view>
		</view>
		<view 
			class="wan-loading__text"
			:style="style({
				fontSize: addUnit(textSize)
			})"
		>
			<slot />
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '../utils'
import { style } from '../utils/style'
import { bem } from '../utils/bem'

const props = defineProps({
	color: String,
	vertical: Boolean,
	type: {
		type: String,
		default: 'circular',
	},
	size: String,
	textSize: String,
	customClass: String,
	hostClass: String,
})
const array12 = Array.from({ length: 12 });

const spinnerStyle = computed(() => {
	const { color, size } = props
	return style({
		color,
		width: addUnit(size),
		height: addUnit(size)
	})
})
</script>

<style lang="scss">
@import './style.scss';
</style>
