<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
			virtualHost: true,
		}
	}
</script>
<template>
	<view class="wan-dropdown-menu wan-dropdown-menu--top-bottom" :class="customClass || ''">
		<view
			v-for="(item, index) in state.itemListData"
			:key="index"
			:class="[bem('dropdown-menu__item', { disabled: item.disabled })]"
			@tap="onTitleTap(index)"
		>
			<view
				:class="[item.titleClass || '', bem('dropdown-menu__title', { active: item.showPopup, down: item.showPopup === (direction === 'down') }), titleClass || '']"
				:style="item.showPopup ? 'color:' + activeColor : ''"
			>
				<view class="wan-ellipsis">
					{{ displayTitle(item) }}
				</view>
			</view>
		</view>
		<slot />
	</view>
</template>

<script setup lang="ts">
import { getCurrentInstance, onUnmounted, reactive, watch } from 'vue'
import { addUnit, getRect, getSystemInfoSync } from '../utils';
import { useChildren } from '../utils/relation';
import { bem } from '../utils/bem';
import { ARRAY } from './items'

const props = defineProps({
	activeColor: {
		type: String,
	},
	overlay: {
		type: Boolean,
		default: true,
	},
	zIndex: {
		type: Number,
		default: 10,
	},
	duration: {
		type: Number,
		default: 200,
	},
	direction: {
		type: String,
		default: 'down',
	},
	safeAreaTabBar: {
		type: Boolean,
		default: false,
	},
	closeOnClickOverlay: {
		type: Boolean,
		default: true,
	},
	closeOnClickOutside: {
		type: Boolean,
		default: true,
	},
	webOffsetTop: {
		type: null,
		default: 0
	},
	customClass: [String, Array],
	titleClass: [String, Array]
})

watch(() => [props.activeColor, props.overlay, props.direction, props.direction, props.closeOnClickOverlay], () => {
	updateChildrenData()
}, { deep: true })

const state = reactive({
	itemListData: [] as Record<string, unknown>[],
})

const { children } = useChildren('wanDropdownItem', {
	onLink() { updateItemListData() },
	onUnLink() { updateItemListData() }
})

const instance = getCurrentInstance()

ARRAY.push(instance)

const { windowHeight } = getSystemInfoSync()

onUnmounted(() => {
	const index = ARRAY.findIndex((item) => item === instance);
	ARRAY.splice(index, 1)
})

function updateItemListData() {
	state.itemListData = children.map((child) => child.exposed.getData())
}

function updateChildrenData() {
	children.forEach(child => {
		child.exposed.updateDataFromParent();
	})
}

function displayTitle(item) {
	if (item.title) {
		return item.title;
	}
	const match = item.options.filter(function(option) {
		return option.value === item.modelValue;
	});
	const displayTitle = match.length ? match[0].text : '';
	return displayTitle;
}

function toggleItem(active: number) {
	children.forEach((item, index) => {
		const { showPopup } = item.exposed.getData();
		if (index === active) {
			item.exposed.toggle();
		} else if (showPopup) {
			item.exposed.toggle(false, { immediate: true });
		}
	});
}

function close() {
	children.forEach((child) => {
		child.exposed.toggle(false, { immediate: true });
	});
}

async function getChildWrapperStyle() {
	const { zIndex, direction, webOffsetTop } = props;

	return getRect(instance, '.wan-dropdown-menu').then((rect) => {
		const { top = 0, bottom = 0 } = rect;
		const offset = direction === 'down' ? bottom : windowHeight - top;

		let wrapperStyle = `z-index: ${zIndex};`;

		if (direction === 'down') {
			// #ifdef WEB
			wrapperStyle += `top: calc(${addUnit(offset)} + ${addUnit(webOffsetTop)});`;
			// #endif
			// #ifndef WEB
			wrapperStyle += `top: ${addUnit(offset)};`;
			// #endif
		} else {
			// #ifdef WEB
			wrapperStyle += `bottom: calc(${addUnit(offset)} - ${addUnit(webOffsetTop)});`;
			// #endif
			// #ifndef WEB
			wrapperStyle += `bottom: ${addUnit(offset)};`;
			// #endif
		}

		return wrapperStyle;
	});
}

function onTitleTap(index: number) {

	const childData = children[index].exposed.getData();

	if (!childData.disabled) {
		ARRAY.forEach((menuItem: anyObj) => {
			if (
				menuItem &&
				menuItem.proxy.closeOnClickOutside &&
				menuItem !== instance
			) {
				menuItem.exposed.close();
			}
		});

		toggleItem(index);
	}
}

defineExpose({
	updateItemListData,
	getChildWrapperStyle,
	close,
})
</script>

<style lang="scss">
@import './style.scss';
</style>
