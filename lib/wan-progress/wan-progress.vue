<template>
  <view class="wan-progress" :class="customClass || ''" :style="rootStyle">
    <view class="wan-progress__portion" :style="portionStyle">
      <view
        v-if="showPivot && getPivotText"
        :style="pivotStyle"
        class="wan-progress__pivot"
      >
        {{ getPivotText }}
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
