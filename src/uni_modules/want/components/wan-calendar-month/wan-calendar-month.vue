<template>
  <view
    :id="id"
    class="wan-calendar__month"
    :class="customClass || ''"
    :style="getMonthStyle"
  >
    <view v-if="showMonthTitle" class="wan-calendar__month-title">
      {{ getFormatMonthTitle }}
    </view>

    <view v-if="state.visible" class="wan-calendar__days">
      <view v-if="showMark" class="wan-calendar__month-mark">
        {{ getMark }}
      </view>

      <view
        v-for="(item, index) in state.days"
        :key="index"
        :style="getDayStyle(item.type, index)"
        :class="[bem('calendar__day', [item.type]), item.className || '']"
        @tap="onClick(index)"
      >
        <view
          v-if="item.type === 'selected'"
          class="wan-calendar__selected-day"
          :style="`width: ${rowHeight}px; height: ${rowHeight}px; background: ${color}`"
        >
          <view v-if="item.topInfo" class="wan-calendar__top-info">{{
            item.topInfo
          }}</view>
          {{ item.text }}
          <view v-if="item.bottomInfo" class="wan-calendar__bottom-info">
            {{ item.bottomInfo }}
          </view>
        </view>

        <view v-else>
          <view v-if="item.topInfo" class="wan-calendar__top-info">{{
            item.topInfo
          }}</view>
          {{ item.text }}
          <view v-if="item.bottomInfo" class="wan-calendar__bottom-info">
            {{ item.bottomInfo }}
          </view>
        </view>
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
