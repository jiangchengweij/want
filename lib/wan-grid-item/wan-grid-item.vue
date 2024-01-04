<template>
  <view
    :class="[customClass || '', bem('grid-item', { square: square })]"
    :style="wrapperStyle"
    @tap="onClick"
  >
    <view
      :class="[
        contentClass || '',
        bem('grid-item__content', [
          direction,
          {
            center: center,
            square: square,
            reverse: reverse,
            clickable: clickable,
            surround: border && gutter
          }
        ]),
        border ? 'wan-hairline--surround' : ''
      ]"
      :style="contentStyle"
    >
      <template v-if="useSlot">
        <slot />
      </template>
      <template v-else>
        <view class="wan-grid-item__icon" :class="[iconClass || '']">
          <wan-icon
            v-if="icon"
            :name="icon"
            :color="iconColor"
            :class-prefix="iconPrefix"
            :dot="dot"
            :info="badge || info"
            :size="iconSize"
          />
          <slot v-else name="icon"></slot>
        </view>
        <view class="wan-grid-item__text" :class="[textClass || '']">
          <text v-if="text">{{ text }}</text>
          <slot v-else name="text"></slot>
        </view>
      </template>
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
