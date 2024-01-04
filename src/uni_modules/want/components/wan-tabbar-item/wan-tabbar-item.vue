<template>
  <view
    :class="[bem('tabbar-item', { active: state.active }), customClass || '']"
    :style="`color: ${state.active ? state.activeColor : state.inactiveColor}`"
    @tap="onClick"
  >
    <view class="wan-tabbar-item__icon">
      <wan-icon
        v-if="icon"
        :name="icon"
        :class-prefix="iconPrefix"
        custom-class="wan-tabbar-item__icon__inner"
      />
      <template v-else>
        <slot v-if="state.active" name="icon-active" />
        <slot v-else name="icon" />
      </template>
      <wan-info :dot="dot" :info="info" custom-class="wan-tabbar-item__info" />
    </view>
    <view class="wan-tabbar-item__text">
      <slot />
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
