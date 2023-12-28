<template>
  <view
    :class="[
      bem('checkbox-group', [{ horizontal: direction === 'horizontal' }])
    ]"
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
  // #ifndef MP-ALIPAY
  behaviors: ['uni://form-field'],
  // #endif
  props,
  emits: [...emits],
  setup(props, context) {
    const instance = getCurrentInstance();
    return setup.call(instance, props, context);
  }
};
</script>
<style lang="scss">
.wan-checkbox-group {
  &--horizontal {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
