<template>
  <wan-overlay
    v-if="options.mask || options.forbidClick"
    :show="options.show"
    :z-index="options.zIndex"
    :custom-style="options.mask ? '' : 'background-color: transparent;'"
  />
  <wan-transition
    :show="options.show"
    :custom-style="`z-index: ${options.zIndex}`"
    custom-class="wan-toast__container"
  >
    <view
      class="wan-toast"
      :class="[
        `wan-toast--${
          options.type === 'text' || options.type === 'html' ? 'text' : 'icon'
        }`,
        `wan-toast--${options.position}`
      ]"
      @touchmove.stop="noop"
    >
      <!-- text only -->
      <text v-if="options.type === 'text'">{{ options.message }}</text>

      <!-- html only -->
      <rich-text
        v-else-if="options.type === 'html'"
        :nodes="options.message"
      ></rich-text>

      <!-- with icon -->
      <template v-else>
        <wan-loading
          v-if="options.type === 'loading'"
          color="white"
          :type="options.loadingType"
          custom-class="wan-toast__loading"
        />
        <wan-icon v-else class="wan-toast__icon" :name="options.type" />
        <text v-if="options.message" class="wan-toast__text">{{
          options.message
        }}</text>
      </template>

      <slot />
    </view>
  </wan-transition>
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
