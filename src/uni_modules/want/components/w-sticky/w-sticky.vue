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
		class="wan-sticky" 
		:class="[customClass || '']"
		:style="containerStyle"
	>
		<view 
			:class="[bem('sticky-wrap', { fixed: state.fixed })]"
			:style="wrapStyle"
		>
			<slot />
		</view>
	</view>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, watch, nextTick, computed } from 'vue';
import { addUnit, getRect } from '../utils';
import { style } from '../utils/style';
import { isDef } from '../utils/validator'
import { bem } from '../utils/bem'

const ROOT_ELEMENT = '.wan-sticky';
const emit = defineEmits(['scroll'])
const props = defineProps({
	zIndex: {
		type: Number,
		default: 99,
	},
	offsetTop: {
		type: Number,
		default: 0,
	},
	disabled: {
		type: Boolean,
	},
	container: {
		type: Function,
	},
	scrollTop: {
		type: Number,
	},
	webOffsetTop: {
		type: Number,
		default: 0,
	},
	customClass: null
})

const $this = getCurrentInstance()

const state = reactive({
	height: 0,
	fixed: false,
	transform: 0,
})

let _scrollTop = null;

watch(() => props.offsetTop, () => {
	onScroll();
})

watch(() => props.disabled, () => {
	onScroll();
})

watch(() => props.container, () => {
	onScroll();
})

watch(() => props.scrollTop, () => {
	onScroll({ scrollTop: props.scrollTop });
})

onMounted(() => {
	onScroll();
})

const getOffsetTop = computed(() => {
	let offsetTop = props.offsetTop;
	// #ifdef WEB
	offsetTop = offsetTop + props.webOffsetTop;
	// #endif
	return offsetTop;
}) 

function onScroll({ scrollTop }: { scrollTop?: number } = {}) {
	const { container, disabled, offsetTop } = props;
	if (disabled) {
		setDataAfterDiff({
			fixed: false,
			transform: 0,
		})
		return;
	}
	
	_scrollTop = scrollTop || props.scrollTop;
	
	if (typeof container === 'function') {
		Promise.all([getRect($this, ROOT_ELEMENT), getContainerRect()])
			.then(([root, container]) => {
				if (offsetTop + root.height > container.height + container.top) {
					setDataAfterDiff({
						fixed: false,
						transform: container.height - root.height
					})
				} else if (offsetTop >= root.top) {
					setDataAfterDiff({
					  fixed: true,
						height: root.height,
						transform: 0,
					})
				} else {
					setDataAfterDiff({ fixed: false, transform: 0 })
				}
			})
			.catch(() => {})

		return;
	}
	
	getRect($this, ROOT_ELEMENT).then((root) => {
		if (!isDef(root) || (!root.width && !root.height)) {
			return;
		}
		if (offsetTop >= root.top) {
			setDataAfterDiff({ fixed: true, height: root.height });
			state.transform = 0;
		} else {
			setDataAfterDiff({ fixed: false });
		}
	})
}

function setDataAfterDiff(data: anyObj) {
	nextTick(() => {
		const diff = Object.keys(data).reduce((prev, key) => {
			if (data[key] !== state[key]) {
				prev[key] = data[key];
			}
			return prev;
		}, {});
		Object.keys(diff).forEach((key) => {
			state[key] = diff[key]
		})
		
		emit('scroll', {
			scrollTop: _scrollTop,
			isFixed: data.fixed || state.fixed,
		})
	})
}

const wrapStyle = computed(() => {
	return style({
		transform: state.transform
			? 'translate3d(0, ' + state.transform + 'px, 0)'
			: '',
		top: state.fixed ? addUnit(getOffsetTop.value) : '',
		'z-index': props.zIndex,
	})
})

const containerStyle = computed(() => {
	return style({
		height: state.fixed ? addUnit(state.height) : '',
		'z-index': props.zIndex,
	})
})

function getContainerRect() {
	const nodesRef: UniApp.NodesRef = props.container()
	if (!nodesRef) {
		return Promise.reject(new Error('not found container'));
	}
	return new Promise<UniApp.NodeInfo>((resolve) => nodesRef.boundingClientRect(resolve).exec())
}

function onPageScroll(event) {
	if (props.scrollTop != null) {
		return;
	}
	onScroll(event);
}
defineExpose({
	onPageScroll: onPageScroll
})
</script>

<style lang="scss">
.wan-sticky {
  position: relative;

  &-wrap {
    &--fixed {
      position: fixed;
      right: 0;
      left: 0;
    }
  }
}
</style>
