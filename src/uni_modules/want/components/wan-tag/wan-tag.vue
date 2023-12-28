<template>
  <view
    :class="[
      customClass || '',
      bem('tag', [type, size, { mark, plain, round }])
    ]"
    :style="rootStyle"
    @tap="onClick"
  >
    <slot />
    <wan-icon
      v-if="closeable"
      name="cross"
      custom-class="wan-tag__close"
      @click="onClose"
    />
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
