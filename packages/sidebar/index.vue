<template>
  <view class="wan-sidebar" :class="customClass || ''">
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
@import '../common/style/var.scss';

.wan-sidebar {
  width: var(--sidebar-width, $sidebar-width);
}
</style>
