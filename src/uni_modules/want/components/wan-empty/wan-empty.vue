<template>
  <view class="wan-empty" :class="[customClass]">
    <view class="wan-empty__image">
      <slot name="image"></slot>
    </view>
    <view class="wan-empty__image">
      <image v-if="image" class="wan-empty__image__img" :src="imageUrl" />
    </view>
    <view class="wan-empty__description">
      <slot name="description"></slot>
    </view>
    <view class="wan-empty__description">
      {{ description }}
    </view>
    <view class="wan-empty__bottom">
      <slot></slot>
    </view>
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
