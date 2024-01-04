<template>
  <view
    :style="rootStyle"
    :class="[customClass || '', bem('image', { round })]"
    @tap="onClick"
  >
    <image
      v-if="!state.error"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      :webp="webp"
      class="wan-image__img"
      :class="[imageClass]"
      :show-menu-by-longpress="showMenuByLongpress"
      @load="onLoad"
      @error="onError"
    />

    <view
      v-if="state.loading && showLoading"
      :class="loadingClass"
      class="wan-image__loading"
    >
      <slot v-if="useLoadingSlot" name="loading" />
      <wan-icon
        v-else
        name="photo"
        custom-class="wan-image__loading-icon"
      ></wan-icon>
    </view>

    <view
      v-if="state.error && showError"
      :class="[errorClass]"
      class="wan-image__error"
    >
      <slot v-if="useErrorSlot" name="error" />
      <wan-icon v-else name="photo-fail" custom-class="wan-image__error-icon" />
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
