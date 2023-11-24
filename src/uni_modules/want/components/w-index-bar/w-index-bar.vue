<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-index-bar">
	  <slot />
	
	  <view
	    v-if="state.showSidebar"
	    class="wan-index-bar__sidebar"
	    @touchmove.stop="onTouchMove"
	    @touchend.stop="onTouchStop"
	    @touchcancel.stop="onTouchStop"
	  >
	    <view
	      v-for="(item, index) in indexList"
	      :key="index"
	      class="wan-index-bar__index"
	      :style="`z-index: ${ zIndex + 1 }; color: ${ state.activeAnchorIndex === index ? highlightColor : '' }`"
				@tap="onClick(index)"
	    >
	      {{ item }}
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
import { getCurrentInstance, nextTick, PropType, reactive } from 'vue';
import { GREEN } from '../common/color';
import { addUnit, getRect } from '../utils';
import { useChildren } from '../utils/relation';
import { isDef } from '../utils/validator';
import getIndexList from './indexList'

const emit = defineEmits(['select'])

const props = defineProps({
	sticky: {
		type: Boolean,
		default: true,
	},
	zIndex: {
		type: Number,
		default: 1,
	},
	highlightColor: {
		type: String,
		default: GREEN,
	},
	stickyOffsetTop: {
		type: Number,
		default: 0,
	},
	indexList: {
		type: Array as PropType<any>,
		default: getIndexList(),
	},
	webOffsetTop: {
		type: null,
		default: 0
	},
})

const { children } = useChildren('index-bar', {
	onLink() { updateData() },
	onUnLink() { updateData() }
})

const instance: AnyObject = getCurrentInstance()

const state = reactive({
	activeAnchorIndex: null,
	showSidebar: false,
})

let _scrollToAnchorIndex = null
let _scrollTop = 0
let _sidebar: any = {}
let _timer = null

function updateData() {
	nextTick(() => {
		if (_timer != null) {
			clearTimeout(_timer)
			_timer = null
		}
		
		_timer = setTimeout(() => {
			state.showSidebar = !!children.length
			setRect().then(() => {
				onScroll()
			})
		}, 0)
	})
}

function setRect() {
	return Promise.all([
		setAnchorsRect(),
		setListRect(),
		setSiderbarRect(),
	]);
}

function setAnchorsRect() {
	return Promise.all(
		children.map((anchor) =>
			getRect(anchor, '.wan-index-anchor-wrapper').then((rect) => {
				Object.assign(anchor, {
					height: rect.height,
					top: rect.top + _scrollTop,
				})
			})
		)
	);
}

async function setListRect() {
	return getRect(instance, '.wan-index-bar').then((rect) => {
		if (!isDef(rect)) {
			return;
		}
		Object.assign(instance, {
			height: rect.height,
			top: rect.top + _scrollTop,
		});
	});
}

async function setSiderbarRect() {
	return getRect(instance, '.wan-index-bar__sidebar').then((res) => {
		if (!isDef(res)) {
			return;
		}
		_sidebar = {
			height: res.height,
			top: res.top,
		};
	});
}

function setDiffData({ target, data }) {	
	target?.exposed?.setState(data)
}

async function getAnchorRect(anchor) {
	return getRect(anchor, '.wan-index-anchor-wrapper').then((rect) => ({
		height: rect.height,
		top: rect.top,
	}));
}

function getActiveAnchorIndex() {

	const { sticky, stickyOffsetTop } = props;

	for (let i = children.length - 1; i >= 0; i--) {
		const preAnchorHeight = i > 0 ? children[i - 1].height : 0;
		const reachTop = sticky ? preAnchorHeight + stickyOffsetTop : 0;

		if (reachTop + _scrollTop >= children[i].top) {
			return i;
		}
	}

	return -1;
}

function onScroll() {

	if (!children.length) {
		return;
	}

	const { sticky, stickyOffsetTop, zIndex, highlightColor } = props;

	const active = getActiveAnchorIndex();

	setDiffData({
		target: instance,
		data: {
			activeAnchorIndex: active,
		},
	});

	if (sticky) {
		let isActiveAnchorSticky = false;

		if (active !== -1) {
			isActiveAnchorSticky =
				children[active].top <= stickyOffsetTop + _scrollTop;
		}

		children.forEach((item, index) => {
			if (index === active) {
				let wrapperStyle = '';
				let anchorStyle = `
					color: ${highlightColor};
				`;

				if (isActiveAnchorSticky) {
					wrapperStyle = `
						height: ${children[index].height}px;
					`;
					// #ifdef WEB
					anchorStyle = `
						position: fixed;
						top: calc(${stickyOffsetTop}px + ${addUnit(props.webOffsetTop)});
						z-index: ${zIndex};
						color: ${highlightColor};
					`;
					// #endif
					// #ifndef WEB
					anchorStyle = `
						position: fixed;
						top: ${stickyOffsetTop}px;
						z-index: ${zIndex};
						color: ${highlightColor};
					`;
					// #endif
				}

				setDiffData({
					target: item,
					data: {
						active: true,
						anchorStyle,
						wrapperStyle,
					},
				});
			} else if (index === active - 1) {
				const currentAnchor = children[index];

				const currentOffsetTop = currentAnchor.top;
				const targetOffsetTop =
					index === children.length - 1
						? instance.top
						: children[index + 1].top;

				const parentOffsetHeight = targetOffsetTop - currentOffsetTop;
				const translateY = parentOffsetHeight - currentAnchor.height;

				const anchorStyle = `
					position: relative;
					transform: translate3d(0, ${translateY}px, 0);
					z-index: ${zIndex};
					color: ${highlightColor};
				`;

				setDiffData({
					target: item,
					data: {
						active: true,
						anchorStyle,
					},
				});
			} else {
				setDiffData({
					target: item,
					data: {
						active: false,
						anchorStyle: '',
						wrapperStyle: '',
					},
				});
			}
		});
	}
}

function onClick(index: number) {
	scrollToAnchor(index);
}

function onTouchMove(event) {
	const sidebarLength = children.length;
	const touch = event.touches[0];
	const itemHeight = _sidebar.height / sidebarLength;
	let index = Math.floor((touch.clientY - _sidebar.top) / itemHeight);

	if (index < 0) {
		index = 0;
	} else if (index > sidebarLength - 1) {
		index = sidebarLength - 1;
	}

	scrollToAnchor(index);
}

function onTouchStop() {
	_scrollToAnchorIndex = null;
}

function scrollToAnchor(index) {
	if (typeof index !== 'number' || _scrollToAnchorIndex === index) {
		return;
	}

	_scrollToAnchorIndex = index;

	const anchor = children.find(
		(item) => item.proxy.index === props.indexList[index]
	);

	if (anchor) {
		anchor.exposed.scrollIntoView(_scrollTop);
		emit('select', anchor.proxy.index);
	}
}

function onPageScroll(event) {
	_scrollTop = event?.scrollTop || 0;
	onScroll();
}

function setState(opts: anyObj) {
	if (!opts) { return }
	Object.keys(opts).forEach((key) => {
		state[key] = opts[key]
	})
}

defineExpose({
	onPageScroll: onPageScroll,
	getAnchorRect,
	setState
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-index-bar {
	position: relative;

	&__sidebar {
		position: fixed;
		top: 50%;
		right: 0;
		display: flex;
		flex-direction: column;
		text-align: center;
		transform: translateY(-50%);
		user-select: none;
	}

	&__index {
		font-weight: 500;
		padding: 0 var(--padding-base, $padding-base) 0
			var(--padding-md, $padding-md);
		font-size: var(--index-bar-index-font-size, $index-bar-index-font-size);
		line-height: var(
			--index-bar-index-line-height,
			$index-bar-index-line-height
		);
	}
}
</style>
