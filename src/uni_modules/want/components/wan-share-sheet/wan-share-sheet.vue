<template>
  <wan-popup
    round
    :show="show"
    position="bottom"
    :custom-class="['wan-share-sheet', customClass || '']"
    :overlay="overlay"
    :duration="duration"
    :z-index="zIndex"
    :overlay-style="overlayStyle"
    :close-on-click-overlay="closeOnClickOverlay"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    @close="onClose"
    @click-overlay="onClickOverlay"
  >
    <view class="wan-share-sheet__header">
      <view class="wan-share-sheet__title">
        <slot name="title" />
      </view>
      <view v-if="title" class="wan-share-sheet__title">{{ title }}</view>

      <view class="wan-share-sheet__description">
        <slot name="description" />
      </view>
      <view v-if="description" class="wan-share-sheet__description">
        {{ description }}
      </view>
    </view>

    <template v-if="isMulti">
      <wan-share-sheet-options
        v-for="(item, index) in options"
        :key="index"
        :show-border="index !== 0"
        :options="item"
        @select="onSelect"
      />
    </template>

    <wan-share-sheet-options v-else :options="options" @select="onSelect" />

    <button type="button" class="wan-share-sheet__cancel" @tap="onCancel">
      {{ cancelText }}
    </button>
  </wan-popup>
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
