<template>
  <view class="wan-index-anchor-wrapper" :style="state.wrapperStyle">
    <view
      class="wan-index-anchor"
      :class="[
        state.active ? 'wan-index-anchor--active wan-hairline--bottom' : ''
      ]"
      :style="state.anchorStyle"
    >
      <slot v-if="useSlot" />
      <template v-else>
        <text>{{ index }}</text>
      </template>
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
