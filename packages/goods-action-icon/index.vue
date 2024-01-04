<template>
  <wan-button
    square
    size="large"
    :lang="lang"
    :loading="loading"
    :disabled="disabled"
    :open-type="openType"
    :business-id="businessId"
    custom-class="wan-action-icon"
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
    <view v-if="icon" class="wan-action-icon__icon">
      <wan-icon
        :name="icon"
        :dot="dot"
        :info="info"
        :size="size"
        :color="color"
        :class-prefix="classPrefix"
        :custom-class="[iconClass || '']"
        :info-class="infoClass || ''"
      />
    </view>
    <view v-else>
      <slot name="icon" />
    </view>
    <text :class="textClass || ''">{{ text }}</text>
  </wan-button>
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
