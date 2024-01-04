<template>
  <view
    class="wan-collapse-item"
    :class="[customClass || '', curIndex !== 0 ? 'wan-hairline--top' : '']"
  >
    <view
      :class="[
        bem('collapse-item__title', { disabled, expanded: state.expanded })
      ]"
    >
      <wan-cell
        :size="size"
        :title="title"
        :title-class="titleClass"
        :icon="icon"
        :value="value"
        :label="label"
        :is-link="isLink"
        :clickable="clickable"
        :border="border && state.expanded"
        hover-class="wan-cell--hover"
        @click="onClick"
      >
        <template #title>
          <slot name="title"></slot>
        </template>
        <template #icon>
          <slot name="icon"></slot>
        </template>
        <slot name="value" />
        <template #right-icon>
          <slot name="right-icon"></slot>
        </template>
      </wan-cell>
    </view>
    <view
      :class="[bem('collapse-item__wrapper')]"
      :style="animationStyle"
      :animation="animationData"
    >
      <view class="wan-collapse-item__content" :class="contentClass">
        <slot />
      </view>
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
