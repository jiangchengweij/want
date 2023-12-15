<template>
  <view :class="[customClass || '', bem('loading', { vertical })]">
    <view
      class="wan-loading__spinner"
      :class="[`wan-loading__spinner--${type}`]"
      :style="spinnerStyle"
    >
      <template v-if="type === 'spinner'">
        <view
          v-for="(_, index) in array12"
          :key="index"
          class="wan-loading__dot"
          :class="[`wan-loading__dot--${index}`]"
        >
        </view>
      </template>
    </view>
    <view
      class="wan-loading__text"
      :style="
        style({
          fontSize: addUnit(textSize)
        })
      "
    >
      <slot />
    </view>
  </view>
</template>
<script lang="ts">
import { getCurrentInstance } from 'vue';
import { setup, props } from './index';

export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared'
  },
  props,
  setup(props, context) {
    const instance = getCurrentInstance();
    return setup.call(instance, props, context);
  }
};
</script>
<style lang="scss">
@import './index.scss';
</style>
