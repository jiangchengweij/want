<template>
  <view class="wan-popup-wrap">
    <wan-overlay
      v-if="overlay"
      :show="show"
      :z-index="zIndex"
      :custom-style="overlayStyle"
      :duration="duration"
      :lock-scroll="lockScroll"
      @click="onClickOverlay"
    />
    <view
      v-if="state.inited"
      :style="popupStyle"
      :class="[
        customClass || '',
        state.classes,
        bem('popup', [
          position,
          {
            round,
            safe: safeAreaInsetBottom,
            safeTop: safeAreaInsetTop,
            safeTabBar: safeAreaTabBar
          }
        ])
      ]"
      @transitionend="onTransitionEnd"
    >
      <slot></slot>
      <view
        class="wan-popup__close-icon"
        :class="[
          closeIconClass || '',
          `wan-popup__close-icon--${closeIconPosition}`
        ]"
        @tap="onClickCloseIcon"
      >
        <wan-icon v-if="closeable" :name="closeIcon"></wan-icon>
      </view>
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
