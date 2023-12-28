<template>
  <wan-overlay
    v-if="options.mask || options.forbidClick"
    :show="options.show"
    :z-index="options.zIndex"
    :custom-style="options.mask ? '' : 'background-color: transparent;'"
  />
  <wan-transition
    :show="options.show"
    :custom-style="`z-index: ${options.zIndex}`"
    custom-class="wan-toast__container"
  >
    <view
      class="wan-toast"
      :class="[
        `wan-toast--${
          options.type === 'text' || options.type === 'html' ? 'text' : 'icon'
        }`,
        `wan-toast--${options.position}`
      ]"
      @touchmove.stop="noop"
    >
      <!-- text only -->
      <text v-if="options.type === 'text'">{{ options.message }}</text>

      <!-- html only -->
      <rich-text
        v-else-if="options.type === 'html'"
        :nodes="options.message"
      ></rich-text>

      <!-- with icon -->
      <template v-else>
        <wan-loading
          v-if="options.type === 'loading'"
          color="white"
          :type="options.loadingType"
          custom-class="wan-toast__loading"
        />
        <wan-icon v-else class="wan-toast__icon" :name="options.type" />
        <text v-if="options.message" class="wan-toast__text">{{
          options.message
        }}</text>
      </template>

      <slot />
    </view>
  </wan-transition>
</template>
<script>
import { getCurrentInstance } from 'vue';
import { setup, props, emits } from './index';

/**
* Toast 轻提示
* description 在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。
* @property {String} type 提示类型 默认:text
* @value text 
* @value loading 
* @value success 
* @value fail 
* @value html 
* @property {String} position 位置 默认:middle
* @value middle 
* @value top 
* @value middle 
* @value bottom 
* @property {String} message 内容 
* @property {Boolean} mask 是否显示遮罩层 默认:false
* @property {Boolean} forbidClick 是否禁止背景点击 默认:false
* @property {Boolean} loadingType 加载图标类型 默认:circular
* @value spinner 
* @value circular 
* @property {Number} zIndex 层级 默认:1000
* @property {Number} duration 展示时长(ms),值为0时,toast不会消失 默认:2000
* @property {Function} onClose 关闭时的回调函数 
* @property {String} customClass 根节点样式类
* @event {Function} click 点击按钮，且按钮状态不为加载或禁用时触发 
* @example <wan-toast ref="toast" />
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
@import './index.scss';
</style>
