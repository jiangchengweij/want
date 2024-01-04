<template>
  <view
    class="wan-swipe-cell"
    :class="customClass || ''"
    @tap.stop="onClick('cell')"
    @touchstart="startDrag"
    @touchmove.stop="onDrag"
    @touchend="endDrag"
    @touchcancel="endDrag"
  >
    <view :style="state.wrapperStyle">
      <view
        v-if="leftWidth"
        class="wan-swipe-cell__left"
        @tap="onClick('left')"
      >
        <slot name="left" />
      </view>
      <slot />
      <view
        v-if="rightWidth"
        class="wan-swipe-cell__right"
        @tap="onClick('right')"
      >
        <slot name="right" />
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
