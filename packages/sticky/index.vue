<template>
  <view :class="[customClass || '']">
    <view class="wan-sticky" :style="containerStyle">
      <view :class="[fixed ? 'wan-sticky__fixed' : '']" :style="wrapStyle">
        <slot></slot>
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
.wan-sticky {
  position: relative;
  &__fixed {
    position: fixed;
    left: 0;
    top: 0;
  }
}
</style>
