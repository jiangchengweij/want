<template>
  <view class="nav-bar-wrap" :class="[customClass || '']">
    <view
      v-if="fixed && placeholder"
      :style="{ height: state.height + 'px' }"
    ></view>
    <view
      :class="[bem('nav-bar', { fixed }), border ? 'wan-hairline--bottom' : '']"
      :style="barStyle"
    >
      <view class="wan-nav-bar__content">
        <view class="wan-nav-bar__left">
          <template v-if="leftArrow || leftText">
            <wan-icon
              v-if="leftArrow"
              size="16px"
              name="arrow-left"
              custom-class="wan-nav-bar__arrow"
            />
            <view
              v-if="leftText"
              class="wan-nav-bar__text"
              hover-class="wan-nav-bar__text--hover"
              hover-stay-time="70"
              >{{ leftText }}</view
            >
          </template>
          <slot v-else name="left"></slot>
        </view>
        <view
          class="wan-nav-bar__title wan-ellipsis"
          :class="[titleClass || '']"
        >
          <template v-if="title">{{ title }}</template>
          <slot v-else name="title"></slot>
        </view>
        <view class="wan-nav-bar__right">
          <view
            v-if="rightText"
            class="wan-nav-bar__text"
            hover-class="wan-nav-bar__text--hover"
            hover-stay-time="70"
            >{{ rightText }}</view
          >
        </view>
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
