<template>
  <view
    class="wan-config-provider"
    :class="[customClass || '']"
    :style="mapThemeVarsToCSSVars"
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
.wan-config-provider {
  /* #ifdef MP-ALIPAY */
  display: block;
  width: 100%;
  /* #endif */
}
</style>
