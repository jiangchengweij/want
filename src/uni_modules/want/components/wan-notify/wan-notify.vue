<template>
  <wan-transition
    name="slide-down"
    :show="options.show"
    custom-class="wan-notify__container"
    :custom-style="rootStyle"
    @tap="onTap"
  >
    <view
      class="wan-notify"
      :class="[`wan-notify--${options.type}`]"
      :style="notifyStyle"
    >
      <view
        v-if="options.safeAreaInsetTop"
        :style="`height: ${statusBarHeight}px`"
      />
      <text>{{ options.message }}</text>
    </view>
  </wan-transition>
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
