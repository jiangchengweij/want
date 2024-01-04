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
        :style="`z-index: ${zIndex + 1}; color: ${
          state.activeAnchorIndex === index ? highlightColor : ''
        }`"
        @tap="onClick(index)"
      >
        {{ item }}
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { getCurrentInstance } from 'vue';
import { setup, props, emits } from './index';

export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared'
  },
  props,
  emits: [...emits],
  setup(props, context) {
    const instance = getCurrentInstance();
    return setup.call(instance, props, context);
  }
};
</script>
<style lang="scss">
@import './index.scss';
</style>
