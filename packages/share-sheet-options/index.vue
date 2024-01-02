<template>
  <view :class="[bem('share-sheet__options', { border: showBorder })]">
    <view
      v-for="(item, index) in options"
      :key="index"
      class="wan-share-sheet__option"
      @tap="onSelect(index)"
    >
      <button class="wan-share-sheet__button" :open-type="item.openType">
        <image :src="getIconURL(item.icon)" class="wan-share-sheet__icon" />
        <view v-if="item.name" class="wan-share-sheet__name">{{
          item.name
        }}</view>
        <view
          v-if="item.description"
          class="wan-share-sheet__option-description"
        >
          {{ item.description }}
        </view>
      </button>
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
