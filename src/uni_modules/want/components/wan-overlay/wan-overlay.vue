<template>
  <wan-transition
    :show="show"
    :custom-class="['wan-overlay', customClass || '']"
    :custom-style="`z-index: ${zIndex}; ${customStyle || ''}`"
    :duration="duration"
    @touchmove.stop="noop"
    @click="onClick"
  >
    <slot />
  </wan-transition>
</template>
<script>
import { getCurrentInstance } from 'vue';
import { setup, props, emits } from './index';

/**
* Overlay 遮罩层
* description 创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。
* @property {Boolean} show 是否展示遮罩层 默认:false
* @property {Number} zIndex 层级 默认:1
* @property {Number|Object} duration 动画时长,单位为毫秒 默认:300
* @property {String} customStyle 自定义样式 
* @property {String} customClass 根节点样式类
* @event {Function} click 点击按钮，且按钮状态不为加载或禁用时触发 
* @example <wan-overlay :show="show" @click="onClickHide" />
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
@import '../common/style/var.scss';
.wan-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--overlay-background-color, $overlay-background-color);
}
</style>
