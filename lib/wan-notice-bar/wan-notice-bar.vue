<template>
  <view
    v-if="state.show"
    :class="[
      customClass || '',
      bem('notice-bar', { withicon: mode, wrapable })
    ]"
    :style="rootStyle"
    @tap="onClick"
  >
    <view v-if="leftIcon" class="wan-notice-bar__left-icon">
      <wan-icon :name="leftIcon" />
    </view>
    <slot v-else name="left-icon" />

    <view class="wan-notice-bar__wrap">
      <view
        class="wan-notice-bar__content"
        :class="[scrollable === false && !wrapable ? 'wan-ellipsis' : '']"
        :animation="state.animationData"
      >
        {{ text }}
        <slot v-if="!text"></slot>
      </view>
    </view>
    <view v-if="mode === 'closeable'" class="wan-notice-bar__right-icon">
      <wan-icon name="cross" @tap.stop="onClickIcon" />
    </view>
    <navigator v-else-if="mode === 'link'" :url="url" :open-type="openType">
      <view class="wan-notice-bar__right-icon">
        <wan-icon name="arrow" />
      </view>
    </navigator>
    <slot v-else name="right-icon" />
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
