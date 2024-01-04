<template>
  <view
    class="wan-grid"
    :class="[customClass || '', border && !gutter ? 'wan-hairline--top' : '']"
    :style="rootStyle"
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
.wan-grid {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
