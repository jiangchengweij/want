<template>
  <view class="wan-calendar__header">
    <template v-if="showTitle">
      <view class="wan-calendar__header-title"><slot name="title"></slot></view>
      <view class="wan-calendar__header-title">{{ title }}</view>
    </template>

    <view
      v-if="showSubtitle"
      class="wan-calendar__header-subtitle"
      @tap="onClickSubtitle"
    >
      {{ subtitle }}
    </view>

    <view class="wan-calendar__weekdays">
      <view
        v-for="(item, index) in state.weekdays"
        :key="index"
        class="wan-calendar__weekday"
      >
        {{ item }}
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
