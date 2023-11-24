<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-sidebar" :class="customClass || ''">
	  <slot />
	</view>
</template>

<script setup lang="ts">
import { useChildren } from '../utils/relation';
const emit = defineEmits(['change']);
const props = defineProps({
	activeKey: {
		type: Number,
		default: 0,
	},
	customClass: [String, Array],
})

let _currentActive = -1;

const { children } = useChildren('wanSidebar', { 
	onLink: () => { setActive(props.activeKey) },
	onUnLink: () => { setActive(props.activeKey) }
})

function setActive(activeKey: number) {
	if (!children.length) {
		return Promise.resolve();
	}

	const stack: Promise<unknown>[] = [];

	if (_currentActive !== activeKey && children[_currentActive]) {
		stack.push(children[_currentActive].exposed.setActive(false));
	}

	if (children[activeKey]) {
		stack.push(children[activeKey].exposed.setActive(true));
	}
	
	_currentActive = activeKey;

	return Promise.all(stack);
}

defineExpose({
	setActive
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-sidebar {
  width: var(--sidebar-width, $sidebar-width);
}
</style>
