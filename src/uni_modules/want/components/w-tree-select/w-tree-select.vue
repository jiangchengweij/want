<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view
	  class="wan-tree-select"
	  :style="`height: ${ addUnit(height) }`"
	>
	  <scroll-view scroll-y class="wan-tree-select__nav">
	    <w-sidebar :active-key="mainActiveIndex" @change="onClickNav" custom-class="wan-tree-select__nav__inner">
	      <w-sidebar-item
	        v-for="(item, index) in items"
	        :key="index"
	        :custom-class="mainItemClass || ''"
	        :active-class="mainActiveClass || ''"
	        :disabled-class="mainDisabledClass || ''"
	        :badge="item.badge"
	        :dot="item.dot"
	        :title="item.text"
	        :disabled="item.disabled"
	      />
	    </w-sidebar>
	  </scroll-view>
	  <scroll-view scroll-y class="wan-tree-select__content">
	    <slot name="content" />
	    <view
				v-for="item in state.subItems"
	      :key="item.id"
	      class="wan-ellipsis"
				:class="[bem('tree-select__item', 
					{ active: isActive(item.id), disabled: item.disabled }), 
					contentItemClass || '', isActive(item.id) ? (contentActiveClass || '') : '',
					item.disabled ? (contentDisabledClass || '') : '']"
	      @tap="onSelectItem(item)"
	    >
	      {{ item.text }}
	      <w-icon
	        v-if="isActive(item.id)"
	        :name="selectedIcon"
	        size="16px"
	        custom-class="wan-tree-select__selected"
	      />
	    </view>
	  </scroll-view>
	</view>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, PropType, reactive, watch } from 'vue';
import { addUnit } from '../utils'
import { bem } from '../utils/bem'

const emit = defineEmits(['click-item', 'click-nav'])
const props = defineProps({
	items: {
		type: Array as PropType<any>,
		default:() => []
	},
	activeId: null,
	mainActiveIndex: {
		type: Number,
		default: 0,
	},
	height: {
		type: null,
		default: 300,
	},
	max: {
		type: Number,
		default: 1000,
	},
	selectedIcon: {
		type: String,
		default: 'success',
	},
	mainItemClass: [String, Array],
	contentItemClass: [String, Array],
	mainActiveClass: [String, Array],
	contentActiveClass: [String, Array],
	mainDisabledClass: [String, Array],
	contentDisabledClass: [String, Array],
})

const state = reactive({
	subItems: [],
})

watch(() => props.items, () => {
	updateSubItems()
})

watch(() => props.mainActiveIndex, () => {
	updateSubItems()
})

onMounted(() => {
	updateSubItems()
})

const isActive = computed(() => {
	const { activeId } = props
	return (itemId: any) => {
		if (Array.isArray(activeId)) {
			return activeId.indexOf(itemId) > -1;
		}
		return activeId === itemId
	}
})

// 当一个子项被选择时
function onSelectItem(item: any) {
	const isArray = Array.isArray(props.activeId);
	// 判断有没有超出右侧选择的最大数
	const isOverMax = isArray && props.activeId.length >= props.max;
	// 判断该项有没有被选中, 如果有被选中，则忽视是否超出的条件
	const isSelected = isArray
		? props.activeId.indexOf(item.id) > -1
		: props.activeId === item.id;

	if (!item.disabled && (!isOverMax || isSelected)) {
		emit('click-item', item);
	}
}

// 当一个导航被点击时
function onClickNav(event: CustomEvent) {
	const index = (event as unknown) as number;
	const item: any = props.items[index];
	if (!item.disabled) {
		emit('click-nav', { index });
	}
}

// 更新子项列表
function updateSubItems() {
	const { items, mainActiveIndex } = props;
	const { children = [] } = items[mainActiveIndex] || {};
	
	state.subItems = children
}

</script>

<style lang="scss">
@import "./style.scss";
</style>
