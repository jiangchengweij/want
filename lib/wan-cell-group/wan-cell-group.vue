<template>
  <view v-if="title" :class="[bem('cell-group__title', { inset })]">{{
    title
  }}</view>
  <view
    :class="[
      customClass,
      bem('cell-group', { inset }),
      border ? 'wan-hairline--top-bottom' : ''
    ]"
  >
    <slot />
  </view>
</template>
<script>
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
