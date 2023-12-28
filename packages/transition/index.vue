<template>
  <view
    v-if="state.inited"
    class="wan-transition"
    :class="[state.classes, customClass || '']"
    :style="rootStyle"
    @transitionend="onTransitionEnd"
    @tap="onClick"
  >
    <slot />
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
