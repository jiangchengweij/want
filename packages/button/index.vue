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
<script lang="ts">
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
