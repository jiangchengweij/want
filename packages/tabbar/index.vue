<template>
  <view class="wan-tabbar-wrapper">
    <view
      :class="[
        border ? 'van-hairline--top-bottom' : '',
        bem('tabbar', { fixed, safe: safeAreaInsetBottom }),
        customClass || ''
      ]"
      :style="zIndex ? 'z-index: ' + zIndex : ''"
    >
      <slot />
    </view>
    <view
      v-if="fixed && placeholder"
      :style="`height: ${state.height}px;`"
    ></view>
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
