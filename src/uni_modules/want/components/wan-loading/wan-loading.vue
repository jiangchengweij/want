<template>
  <view :class="[customClass || '', bem('loading', { vertical })]">
    <view
      class="wan-loading__spinner"
      :class="[`wan-loading__spinner--${type}`]"
      :style="spinnerStyle"
    >
      <template v-if="type === 'spinner'">
        <view
          v-for="(_, index) in array12"
          :key="index"
          class="wan-loading__dot"
          :class="[`wan-loading__dot--${index}`]"
        >
        </view>
      </template>
    </view>
    <view
      class="wan-loading__text"
      :style="
        style({
          fontSize: addUnit(textSize)
        })
      "
    >
      <slot />
    </view>
  </view>
</template>
<script>
import { getCurrentInstance } from 'vue';
import { setup, props } from './index';

/**
* Loading 加载
* description 加载图标，用于表示加载中的过渡状态。
* @property {String} color 颜色 
* @property {String} type 类型 默认:circular
* @value spinner 
* @value circular 
* @property {String} size 加载图标大小，默认单位为px 默认:30px
* @property {String} text-size 文字大小，默认单位为px 默认:14px
* @property {Boolean} vertical 是否垂直排列图标和文字内容 默认:false
* @property {String} customClass 根节点样式类
* @example <van-loading />
*/
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared'
  },
  props,
  setup(props, context) {
    const instance = getCurrentInstance();
    return setup.call(instance, props, context);
  }
};
</script>
<style lang="scss">
@import './index.scss';
</style>
