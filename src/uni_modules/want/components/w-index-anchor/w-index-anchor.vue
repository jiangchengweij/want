<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view
	  class="wan-index-anchor-wrapper"
	  :style="state.wrapperStyle"
	>
	  <view
	    class="wan-index-anchor"
			:class="[state.active ? 'wan-index-anchor--active wan-hairline--bottom' : '']"
	    :style="state.anchorStyle"
	  >
	    <slot v-if="useSlot"/>
	    <template v-else>
	      <text>{{ index }}</text>
	    </template>
	  </view>
	</view>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive } from 'vue'
import { getRect } from '../utils'
import { useParent } from '../utils/relation';

const instance = getCurrentInstance()

defineProps({
	useSlot: Boolean,
	index: null,
})

const { parent } = useParent('index-bar')

const state = reactive({
	active: false,
	wrapperStyle: '',
	anchorStyle: '',
})

function scrollIntoView(scrollTop: number) {
	getRect(instance, '.wan-index-anchor-wrapper').then((rect) => {

		uni.pageScrollTo({
			// #ifndef MP-ALIPAY
			duration: 0,
			// #endif
			scrollTop: scrollTop + rect.top - parent.proxy.stickyOffsetTop,
		});
	});
}

function setState(opts: anyObj) {
	if (!opts) { return }
	Object.keys(opts).forEach((key) => {
		state[key] = opts[key]
	})
}

defineExpose({
	scrollIntoView,
	setState
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-index-anchor {
  padding: var(--index-anchor-padding, $index-anchor-padding);
  color: var(--index-anchor-text-color, $index-anchor-text-color);
  font-weight: var(--index-anchor-font-weight, $index-anchor-font-weight);
  font-size: var(--index-anchor-font-size, $index-anchor-font-size);
  line-height: var(--index-anchor-line-height, $index-anchor-line-height);
  background-color: var(
    --index-anchor-background-color,
    $index-anchor-background-color
  );

  &--active {
    right: 0;
    left: 0;
    color: var(
      --index-anchor-active-text-color,
      $index-anchor-active-text-color
    );
    background-color: var(
      --index-anchor-active-background-color,
      $index-anchor-active-background-color
    );
  }
}
</style>
