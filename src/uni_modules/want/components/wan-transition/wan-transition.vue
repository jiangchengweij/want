<template>
  <view
    v-if="state.inited"
    class="wan-transition"
    :class="[state.classes, customClass || '']"
    :style="rootStyle"
    @transitionend="onTransitionEnd"
    @tap="onClick"
  >
    <slot />
  </view>
</template>
<script>
import { getCurrentInstance } from 'vue';
import { setup, props, emits } from './index';

/**
* Transition 动画
* description 使元素从一种样式逐渐变化为另一种样式的效果。
* @property {String} 动画类型 fade 
* @value fade 
* @value fade-up 
* @value fade-down 
* @value fade-left 
* @value fade-right 
* @value slide-up 
* @value slide-down 
* @value slide-left 
* @value slide-right 
* @property {Boolean} show 是否展示组件 默认:true
* @property {Number|Object} duration 动画时长,单位为毫秒 默认:300
* @property {String} customStyle 自定义样式 
* @property {String} customClass 根节点样式类
* @property {String} beforeClass 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
* @property {String} enterActiveClass 定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
* @property {String} enterToClass 定义进入过渡的结束状态。在元素被插入之后下一帧生效
* @property {String} leaveClass 义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
* @property {String} leaveActiveClass 定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
* @property {String} leaveToClass 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效
* @event {Function} beforeEnter 进入前触发 
* @event {Function} enter 进入中触发 
* @event {Function} afterEnter 进入后触发 
* @event {Function} beforeLeave 离开前触发 
* @event {Function} leave 离开中触发 
* @event {Function} afterLeave 离开后触发 
* @example <wan-transition :show="show" custom-class="block">内容</wan-transition>
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
