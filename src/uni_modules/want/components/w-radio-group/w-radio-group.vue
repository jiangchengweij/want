<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		},
		// #ifndef MP-ALIPAY
		behaviors: ['uni://form-field'],
		// #endif
	}
</script>
<template>
	<view :class="[bem('radio-group', [direction])]">
	  <slot></slot>
	</view>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useChildren } from '../utils/relation'
import { bem } from '../utils/bem'

defineEmits(['update:modelValue', 'change'])
const props = defineProps({
	modelValue: {
		type: null,
	},
	direction: String,
	disabled: {
		type: Boolean,
	},
})

watch(() => props.modelValue, () => {
	updateChildren()
})

watch(() => props.disabled, () => {
	updateChildren()
})

const { children } = useChildren('wanRadio', {
	onLink() {
		updateChildren()
	}
})

function updateChildren() {
	children.forEach((child) => child.exposed.updateFromParent());
}
</script>

<style lang="scss">
.wan-radio-group {
  &--horizontal {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
