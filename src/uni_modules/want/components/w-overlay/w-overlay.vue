<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<w-transition
		:show="show"
		:custom-class="['wan-overlay', customClass || '']"
		:custom-style="`z-index: ${ zIndex }; ${ customStyle || '' }`"
		:duration="duration"
		@touchmove.stop="noop"
		@click="onClick"
	>
		<slot />
	</w-transition>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])
defineProps({
	show: Boolean,
	customStyle: String,
	customClass: null,
	duration: {
		type: [String, Number],
		default: 300,
	},
	zIndex: {
		type: Number,
		default: 1,
	},
})
function onClick() {
	emit('click');
}
function noop() {}
</script>

<style lang="scss">
@import '../common/style/var.scss';
.wan-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: var(--overlay-background-color, $overlay-background-color);
}
</style>
