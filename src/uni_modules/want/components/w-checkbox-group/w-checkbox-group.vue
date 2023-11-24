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
	<view :class="[bem('checkbox-group', [{ horizontal: direction === 'horizontal' }])]">
	  <slot />
	</view>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { bem } from '../utils/bem'
import { useChildren } from '../utils/relation'
defineEmits(['change', 'update:modelValue'])
const props = defineProps({
	max: Number,
	modelValue: {
		type: Array,
	},
	disabled: {
		type: Boolean,
	},
	direction: {
		type: String,
		default: 'vertical',
	}
})

const { children } = useChildren('wanCheckbox', {
	onLink(target: any) {
		updateChild(target)
	},
})

watch(() => props.modelValue, () => {
	updateChildren()
})

watch(() => props.disabled, () => {
	updateChildren()
})

function updateChildren() {
	children.forEach((child) => updateChild(child))
}

function updateChild(child) {
	const { modelValue, disabled, direction } = props;
	child.exposed.setState({
		innerValue: modelValue.indexOf(child.proxy.name) !== -1,
		parentDisabled: disabled,
		direction,
	});
}

defineExpose({ updateChildren })

</script>

<style lang="scss">
.wan-checkbox-group {
  &--horizontal {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
