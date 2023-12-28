<template>
  <view :class="rootClass" :style="rootStyle" @tap="onClick">
    <wan-info
      v-if="info != null || dot"
      :dot="dot"
      :info="info"
      :custom-class="`wan-icon__info ${infoClass || ''}`"
    />
    <image
      v-if="isImage(name)"
      :src="name"
      mode="aspectFit"
      class="wan-icon__image"
    />
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
