<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-collapse" :class="[customClass || '', border ? 'wan-hairline--top-bottom' : '']">
		<slot />
	</view>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useChildren } from '../utils/relation';

const emit = defineEmits(['update:modelValue', 'open', 'close', 'change'])

const props = defineProps({
	modelValue: {
		type: null,
		required: true
	},
	accordion: {
		type: Boolean,
	},
	border: {
		type: Boolean,
		default: true,
	},
	customClass: [String, Array]
})

const { children } = useChildren('wanCollapse')

function updateExpanded() {
	children.forEach((child) => {
		child.exposed.updateExpanded();
	})
}


function toggle(name: string | number, expanded: boolean) {
	const { accordion, modelValue } = props;
	const changeItem = name;
	if (!accordion) {
		name = expanded 
			? (modelValue || []).concat(name) 
			: (modelValue || []).filter((activeName: string | number) => activeName !== name)
	} else {
		name = expanded ? name : '';
	}
	
	if (expanded) {
		emit('open', changeItem)
	} else {
		emit('close', changeItem)
	}
	
	emit('change', name);
	emit('update:modelValue', name);
}

watch(() => props.modelValue, () => {
	updateExpanded();
})

watch(() => props.accordion, () => {
	updateExpanded();
})

defineExpose({
	toggle
})

</script>

<style>
</style>
