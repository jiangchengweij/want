<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view
	  :class="[customClass, bem('divider', [{ dashed, hairline }, contentPosition])]"
	  :style="rootStyle"
	>
	  <slot />
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { addUnit } from '../utils';
import { style } from '../utils/style';
import { bem } from '../utils/bem';

const props = defineProps({
	dashed: Boolean,
	hairline: Boolean,
	contentPosition: String,
	fontSize: String,
	borderColor: String,
	textColor: String,
	customStyle: String,
	customClass: String
})

const rootStyle = computed(() => {
	const { borderColor, textColor, fontSize, customStyle } = props;
	return style([
		{
			'border-color': borderColor,
			color: textColor,
			'font-size': addUnit(fontSize),
		},
		customStyle,
	]);
})
</script>

<style lang="scss">
@import './style.scss';
</style>
