<template>
  <wan-popup
    :show="show"
    position="bottom"
    :round="round"
    :z-index="zIndex"
    :overlay="overlay"
    :custom-class="['wan-action-sheet', customClass || '']"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    :close-on-click-overlay="closeOnClickOverlay"
    @close="onClickOverlay"
  >
    <view v-if="title" class="wan-action-sheet__header">
      {{ title }}
      <wan-icon
        name="cross"
        custom-class="wan-action-sheet__close"
        @click="onClose"
      />
    </view>
    <view
      v-if="description"
      class="wan-action-sheet__description wan-hairline--bottom"
    >
      {{ description }}
    </view>
    <view v-if="actions && actions.length" class="list-class">
      <!-- button外包一层view，防止actions动态变化，导致渲染时button被打散 -->
      <button
        v-for="(item, index) in actions"
        :key="index"
        :open-type="
          item.disabled || item.loading || item.openType === 'getUserInfo'
            ? ''
            : item.openType
        "
        :style="item.color ? 'color: ' + item.color : ''"
        :class="[
          bem('action-sheet__item', {
            disabled: item.disabled || item.loading
          }),
          item.className || ''
        ]"
        hover-class="wan-action-sheet__item--hover"
        :lang="lang"
        :session-from="sessionFrom"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        :app-parameter="appParameter"
        @tap="onSelect(item)"
        @getuserinfo="onGetUserInfo"
        @contact="onContact"
        @getphonenumber="onGetPhoneNumber"
        @error="onError"
        @launchapp="onLaunchApp"
        @opensetting="onOpenSetting"
      >
        <template v-if="!item.loading">
          {{ item.name }}
          <view v-if="item.subname" class="wan-action-sheet__subname">{{
            item.subname
          }}</view>
        </template>
        <wan-loading
          v-else
          custom-class="wan-action-sheet__loading"
          size="22px"
        />
      </button>
    </view>
    <slot />
    <template v-if="cancelText">
      <view class="van-action-sheet__gap" />
      <view
        class="wan-action-sheet__cancel"
        hover-class="wan-action-sheet__cancel--hover"
        hover-stay-time="70"
        @tap="onCancel"
      >
        {{ cancelText }}
      </view>
    </template>
  </wan-popup>
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
