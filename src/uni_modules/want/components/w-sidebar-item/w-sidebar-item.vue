<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view
	  :class="[bem('sidebar-item', { selected: state.selected, disabled })
			,state.selected ? (activeClass || '') : '', disabled ? (disabledClass || '') : '', customClass || '']"
	  hover-class="wan-sidebar-item--hover"
	  hover-stay-time="70"
	  @tap="onClick"
	>
	  <view class="wan-sidebar-item__text">
	    <w-info
	      v-if="badge != null || info != null || dot"
	      :dot="dot"
	      :info="badge != null ? badge : info"
	    />
	    <view v-if="title">{{ title }}</view>
	    <slot v-else name="title" />
	  </view>
	</view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useParent } from '../utils/relation'
import { bem } from '../utils/bem'

const emit = defineEmits(['click', 'change'])
const props = defineProps({
	dot: Boolean,
	badge: null,
	info: null,
	title: String,
	disabled: Boolean,
	index: Number,
	customClass: [String, Array],
	activeClass: [String, Array],
	disabledClass: [String, Array],
})

const state = reactive({
	selected: false,
})

const { parent, index } = useParent('wanSidebar')

const curIndex = computed(() => {
	return props.index != null ? props.index : index;
})

function onClick() {
	if (!parent || props.disabled) {
		return;
	}

	parent.exposed.setActive(curIndex.value).then(() => {
		emit('click', curIndex.value);
		parent.emit('change', curIndex.value);
	})
}

function setActive(selected: boolean) {
	state.selected = selected;
}

defineExpose({
	setActive
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-sidebar-item {
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  border-left: 3px solid transparent;
  user-select: none;
  padding: var(--sidebar-padding, $sidebar-padding);
  font-size: var(--sidebar-font-size, $sidebar-font-size);
  line-height: var(--sidebar-line-height, $sidebar-line-height);
  color: var(--sidebar-text-color, $sidebar-text-color);
  background-color: var(--sidebar-background-color, $sidebar-background-color);

  &__text {
    position: relative;
    display: inline-block;
    word-break: break-all;
  }

  &--hover:not(&--disabled) {
    background-color: var(--sidebar-active-color, $sidebar-active-color);
  }

  &::after {
    border-bottom-width: 1px;
  }

  &--selected {
    color: var(--sidebar-selected-text-color, $sidebar-selected-text-color);
    font-weight: var(
      --sidebar-selected-font-weight,
      $sidebar-selected-font-weight
    );
    border-color: var(
      --sidebar-selected-border-color,
      $sidebar-selected-border-color
    );

    &::after {
      border-right-width: 1px;
    }
  }

  &--selected,
  &--selected.wan-sidebar-item--hover {
    background-color: var(
      --sidebar-selected-background-color,
      $sidebar-selected-background-color
    );
  }

  &--disabled {
    color: var(--sidebar-disabled-text-color, $sidebar-disabled-text-color);
  }
}
</style>
