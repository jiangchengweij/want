<template>
  <view class="wan-row" :style="rootStyle" @tap="onClick">
    <slot />
  </view>
</template>
<script>
import { getCurrentInstance } from 'vue';
import { setup, props, emits } from './index';

/**
* Layout 布局
* description Layout 提供了wan-row和wan-col两个组件来进行行列布局。
* @property {String} 列元素之间的间距（单位为 px） 
* @property {String} customClass 根节点样式类
* @event {Function} click 点击按钮，且按钮状态不为加载或禁用时触发 
* @example <wan-row><wan-col span='8'>span</wan-col></wan-row>
*/
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
.wan-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
