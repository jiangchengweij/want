<template>
  <view
    v-if="(info && info !== '') || dot"
    class="wan-info"
    :class="[bem('info', { dot }), customClass]"
    :style="customStyle"
    >{{ dot ? '' : info }}</view
  >
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
