<template>
  <button
    :id="id"
    :class="[
      bem('button', [
        type,
        size,
        {
          block,
          round,
          plain,
          square,
          loading,
          disabled,
          hairline,
          unclickable: disabled || loading
        }
      ]),
      hairline ? 'wan-hairline--surround' : '',
      customClass || ''
    ]"
    :hover-class="
      disabled || loading ? '' : 'wan-button--active ' + (hoverClass || '')
    "
    :lang="lang"
    :form-type="formType"
    :style="rootStyle"
    :open-type="disabled || loading ? '' : openType"
    :business-id="businessId"
    :session-from="sessionFrom"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    :app-parameter="appParameter"
    :aria-label="ariaLabel"
    @tap="onClick"
    @getuserinfo="onGetUserInfo"
    @contact="onContact"
    @getphonenumber="onGetPhoneNumber"
    @getrealtimephonenumber="onGetRealTimePhoneNumber"
    @error="onError"
    @launchapp="onLaunchApp"
    @opensetting="onOpenSetting"
    @chooseavatar="onChooseAvatar"
  >
    <template v-if="loading">
      <w-loading
        :custom-class="loadingClass"
        :size="loadingSize"
        :type="loadingType"
        :color="loadingColor"
      />
      <view v-if="loadingText" class="wan-button__loading-text">
        {{ loadingText }}
      </view>
    </template>
    <template v-else>
      <view class="wan-button__text">
        <slot />
      </view>
    </template>
  </button>
</template>
<script>
import { getCurrentInstance } from 'vue';
import { setup, props, emits } from './index';

/**
* Button 按钮
* description 按钮用于触发一个操作，如提交表单。
* @property {String} id 标识符 
* @property {String} type 按钮类型 默认:default
* @value primary 
* @value success 
* @value warning 
* @value danger 
* @property {String} size type 默认:按钮尺寸
* @value normal 
* @value large 
* @value small 
* @value mini 
* @property {String} color 按钮颜色，支持传入linear-gradient渐变色 
* @property {String} classPrefix 图标类名前缀，同 默认:wan-icon
* @property {Boolean} plain 是否为朴素按钮 默认:false
* @property {Boolean} block 是否为块级元素 默认:false
* @property {Boolean} round 是否为圆形按钮 默认:false
* @property {Boolean} round 是否为圆形按钮 默认:false
* @property {Boolean} square 是否为方形按钮 默认:false
* @property {Boolean} disabled 是否禁用按钮 默认:false
* @property {Boolean} hairline 是否使用 默认:0.5px
* @property {Boolean} loading 是否显示为加载状态	false 
* @property {String} loadingText 加载状态提示文字 
* @property {String} loadingType 加载状态图标类型 默认:circular
* @value spinner 
* @value circular 
* @property {String} loadingSize 加载图标大小 默认:20px
* @property {String} customClass 根节点样式类
* @property {String} loadingClass 加载图标样式类
* @event {Function} click 点击按钮，且按钮状态不为加载或禁用时触发 
* @example <wan-button></wan-button>
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
