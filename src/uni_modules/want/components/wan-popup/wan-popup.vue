<template>
  <view class="wan-popup-wrap">
    <wan-overlay
      v-if="overlay"
      :show="show"
      :z-index="zIndex"
      :custom-style="overlayStyle"
      :duration="duration"
      :lock-scroll="lockScroll"
      @click="onClickOverlay"
    />
    <view
      v-if="state.inited"
      :style="popupStyle"
      :class="[
        customClass || '',
        state.classes,
        bem('popup', [
          position,
          {
            round,
            safe: safeAreaInsetBottom,
            safeTop: safeAreaInsetTop,
            safeTabBar: safeAreaTabBar
          }
        ])
      ]"
      @transitionend="onTransitionEnd"
    >
      <slot></slot>
      <view
        class="wan-popup__close-icon"
        :class="[
          closeIconClass || '',
          `wan-popup__close-icon--${closeIconPosition}`
        ]"
        @tap="onClickCloseIcon"
      >
        <wan-icon v-if="closeable" :name="closeIcon"></wan-icon>
      </view>
    </view>
  </view>
</template>
<script>
import { getCurrentInstance } from 'vue';
import { setup, props, emits } from './index';

/**
* Popup 弹出层
* description 弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。
* @property {Boolean} show 是否显示弹出层 默认:false
* @property {Number} zIndex 层级 默认:100
* @property {String} position 弹出位置 默认:center
* @value center 
* @value top 
* @value bottom 
* @value right 
* @value left 
* @property {Number|Object} duration 动画时长,单位为毫秒 默认:300
* @property {Boolean} closeOnClickOverlay 是否在点击遮罩层后关闭 默认:true
* @property {Boolean} closeable 是否显示关闭图标 默认:false
* @property {String} closeIcon 关闭图标名称或图片链接 默认:cross
* @property {String} closeIconPosition 关闭图标位置 默认:top-right
* @value top-right 
* @value top-left 
* @value bottom-left 
* @value bottom-right 
* @property {Boolean} safeAreaInsetBottom 是否为iPhoneX留出底部安全距离 默认:true
* @property {Boolean} safeAreaInsetTop 是否留出顶部安全距离(状态栏高度) 默认:false
* @property {Boolean} safeAreaTabBar 是否留出底部tabbar安全距离(在使用tabbar组件&小程序自定义tabbar时,popup组件层级无法盖住tabbar) 默认:false
* @property {String} customStyle 自定义弹出层样式 
* @property {String} overlayStyle 自定义遮罩层样式 
* @property {String} customClass 根节点样式类
* @event {Function} close 关闭弹出层时触发 
* @event {Function} clickOverlay 点击遮罩层时触发 
* @event {Function} beforeEnter 进入前触发 
* @event {Function} enter 进入中触发 
* @event {Function} afterEnter 进入后触发 
* @event {Function} beforeLeave 离开前触发 
* @event {Function} leave 离开中触发 
* @event {Function} afterLeave 离开后触发 
* @example <wan-popup :show="show" @close="onClose">内容</wan-popup>
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
