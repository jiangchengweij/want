<template>
  <view
    :class="
      bem('action-button', [
        type,
        { first: isFirst, last: isLast, plain: plain }
      ])
    "
  >
    <wan-button
      :lang="lang"
      :type="type"
      :size="size"
      :color="color"
      :plain="plain"
      :loading="loading"
      :disabled="disabled"
      :open-type="openType"
      :custom-class="`wan-action-button__inner ${customClass || ''}`"
      :business-id="businessId"
      :session-from="sessionFrom"
      :app-parameter="appParameter"
      :send-message-img="sendMessageImg"
      :send-message-path="sendMessagePath"
      :show-message-card="showMessageCard"
      :send-message-title="sendMessageTitle"
      @click="onClick"
      @error="onError"
      @contact="onContact"
      @opensetting="onOpenSetting"
      @getuserinfo="onGetUserInfo"
      @getphonenumber="onGetPhoneNumber"
      @launchapp="onLaunchApp"
    >
      <text>{{ text }}</text>
      <slot />
    </wan-button>
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
