<template>
  <view
    :class="[
      bem('sidebar-item', { selected: state.selected, disabled }),
      state.selected ? activeClass || '' : '',
      disabled ? disabledClass || '' : '',
      customClass || ''
    ]"
    hover-class="wan-sidebar-item--hover"
    hover-stay-time="70"
    @tap="onClick"
  >
    <view class="wan-sidebar-item__text">
      <wan-info
        v-if="badge != null || info != null || dot"
        :dot="dot"
        :info="badge != null ? badge : info"
      />
      <view v-if="title">{{ title }}</view>
      <slot v-else name="title" />
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
