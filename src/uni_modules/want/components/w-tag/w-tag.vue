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
	  :class="[customClass || '', bem('tag', [type, size, { mark, plain, round }])]"
	  :style="rootStyle"
		@tap="onClick"
	>
	  <slot />
	  <w-icon
	    v-if="closeable"
	    name="cross"
	    custom-class="wan-tag__close"
	    @click="onClose"
	  />
	</view>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { style } from '../utils/style';
import { bem } from '../utils/bem'

const emit = defineEmits(['close', 'click'])
const props = defineProps({
	size: String,
	mark: Boolean,
	color: String,
	plain: Boolean,
	round: Boolean,
	textColor: String,
	type: {
		type: String,
		default: 'default',
	},
	closeable: Boolean,
	customClass: null
})

const rootStyle = computed(() => {
	const { plain, color, textColor } = props;
	return style({
		'background-color': plain ? '' : color,
		color: textColor || plain ? textColor || color : '',
	});
})

function onClose() {
	emit('close')
}

function onClick() {
	emit('click')
}
</script>

<style lang="scss">
@import './style.scss';
</style>
