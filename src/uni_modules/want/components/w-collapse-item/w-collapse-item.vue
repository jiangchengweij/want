<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-collapse-item" :class="[customClass || '', curIndex !== 0 ? 'wan-hairline--top' : '']">
		<view :class="[bem('collapse-item__title', { disabled, expanded: state.expanded })]">
			<w-cell
			  :size="size"
			  :title="title"
			  :title-class="titleClass"
			  :icon="icon"
			  :value="value"
			  :label="label"
			  :is-link="isLink"
			  :clickable="clickable"
			  :border="border && state.expanded"
			  hover-class="wan-cell--hover"
			  @click="onClick"
			>
				<template #title>
					<slot name="title"></slot>
				</template>
				<template #icon>
					<slot name="icon"></slot>
				</template>
			  <slot name="value" />
				<template #right-icon>
					<slot name="right-icon"></slot>
				</template>
			</w-cell>
		</view>
		<view
		  :class="[bem('collapse-item__wrapper')]" :style="animationStyle" :animation="animationData"
		>
	    <view
	      class="wan-collapse-item__content" :class="contentClass"
	    >
	      <slot />
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, reactive } from 'vue';
import { useParent } from '../utils/relation';
import { bem } from '../utils/bem';
import { useAnimation } from './animate';

const props = defineProps({
	size: String,
	name: null,
	title: null,
	value: null,
	icon: String,
	label: String,
	disabled: Boolean,
	clickable: Boolean,
	border: {
		type: Boolean,
		default: true,
	},
	isLink: {
		type: Boolean,
		default: true,
	},
	index: {
		type: Number,
	},
	customClass: [String, Array],
	titleClass: String,
	contentClass: [String, Array]
})
const instance = getCurrentInstance();
const { parent, index } = useParent('wanCollapse');
const { animationData, setContextAnimate, animationStyle } = useAnimation();

const state = reactive({
	expanded: false,
})

const curIndex = computed(() => {
	return props.index != null ? props.index : index;
})

onMounted(() => {
	updateExpanded();
})

function updateExpanded() {
	if (!parent) return;
	const { modelValue, accordion } = parent.proxy;
	const currentName = props.name == null ? curIndex.value : props.name;
	
	const expanded = accordion 
		? modelValue === currentName 
		: (modelValue || []).some((name: string | number) => name === currentName);
	
	if (expanded !== state.expanded) {
		setContextAnimate(instance, expanded)
	}

	state.expanded = expanded;
}

function onClick() {
	if (props.disabled) {
		return;
	}
	
	const currentName = props.name == null ? curIndex.value : props.name;
	
	if (parent) {
		parent.exposed.toggle(currentName, !state.expanded)
	}
}

defineExpose({
	updateExpanded
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-collapse-item {
  &__title {
    .wan-cell__right-icon {
      transform: rotate(90deg);
      transition: transform
        var(
          --collapse-item-transition-duration,
          $collapse-item-transition-duration
        );
    }

    &--expanded {
      .wan-cell__right-icon {
        transform: rotate(-90deg);
      }
    }

    &--disabled {
      .wan-cell,
      .wan-cell__right-icon {
        color: var(
          --collapse-item-title-disabled-color,
          $collapse-item-title-disabled-color
        ) !important;
      }

      .wan-cell--hover {
        background-color: $white !important;
      }
    }
  }

  &__wrapper {
    overflow: hidden;
  }

  &__content {
    padding: var(
      --collapse-item-content-padding,
      $collapse-item-content-padding
    );
    color: var(
      --collapse-item-content-text-color,
      $collapse-item-content-text-color
    );
    font-size: var(
      --collapse-item-content-font-size,
      $collapse-item-content-font-size
    );
    line-height: var(
      --collapse-item-content-line-height,
      $collapse-item-content-line-height
    );
    background-color: var(
      --collapse-item-content-background-color,
      $collapse-item-content-background-color
    );
  }
}
</style>
