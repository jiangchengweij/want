<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view
	  :class="[border ? 'van-hairline--top-bottom' : '', bem('tabbar', { fixed, safe: safeAreaInsetBottom }), customClass || ''] "
	  :style="zIndex ? 'z-index: ' + zIndex : ''"
	>
	  <slot />
	</view>
	
	<view v-if="fixed && placeholder" :style="`height: ${ state.height }px;`"></view>
</template>

<script setup lang="ts">
import { reactive, nextTick, getCurrentInstance, watch } from 'vue';
import { getRect } from '../utils';
import { bem } from '../utils/bem';
import { useChildren } from '../utils/relation';
defineEmits(['change'])
const props = defineProps({
	active: {
		type: null,
	},
	activeColor: {
		type: String,
	},
	inactiveColor: {
		type: String,
	},
	fixed: {
		type: Boolean,
		default: true,
	},
	placeholder: {
		type: Boolean,
	},
	border: {
		type: Boolean,
		default: true,
	},
	zIndex: {
		type: Number,
		default: 1,
	},
	safeAreaInsetBottom: {
		type: Boolean,
		default: true,
	},
	customClass: [String, Array]
})

const instance = getCurrentInstance()

const state = reactive({
	height: 50
})

const { children } = useChildren('wanTabbar', {
	onLink: () => updateChildren(),
	onUnLink: () => updateChildren()
})

watch(() => [props.active, props.activeColor, props.inactiveColor], () => {
	updateChildren();
}, {
	deep: true
})

watch(() => [props.fixed, props.placeholder], () => {
	setHeight();
}, {
	deep: true
})

function updateChildren() {

	if (!Array.isArray(children) || !children.length) {
		return;
	}

	children.forEach((child) => child.exposed.updateFromParent());
}

function setHeight() {
	const { fixed, placeholder } = props;

	if (!fixed || !placeholder) {
		return;
	}

	nextTick(() => {
		getRect(instance, '.wan-tabbar').then((res) => {
			state.height = res.height
		});
	});
}

defineExpose({
	updateChildren
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-tabbar {
  display: flex;
  box-sizing: content-box;
  width: 100%;
  height: var(--tabbar-height, $tabbar-height);
  background-color: var(--tabbar-background-color, $tabbar-background-color);

  &--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  &--safe {
    padding-bottom: var(--window-bottom);
  }
}
</style>
