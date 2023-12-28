<template>
  <view
    :class="[
      bem('switch', { on: modelValue === activeValue, disabled }),
      customClass || ''
    ]"
    :style="rootStyle"
    @tap="onClick"
  >
    <view class="wan-switch__node" :class="[nodeClass || '']">
      <wan-loading
        v-if="loading"
        :color="loadingColor"
        custom-class="wan-switch__loading"
      />
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
@import './index.scss';
</style>
