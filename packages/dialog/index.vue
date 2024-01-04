<template>
  <wan-popup
    :show="options.show"
    :z-index="options.zIndex"
    :overlay="options.overlay"
    :transition="options.transition"
    :custom-class="`wan-dialog wan-dialog--${options.theme}${
      options.className
    } ${customClass || ''}`"
    :custom-style="style([{ width: addUnit(options.width) }, customStyle])"
    :overlay-style="options.overlayStyle"
    :close-on-click-overlay="closeOnClickOverlay"
    @close="onClickOverlay"
  >
    <view
      v-if="options.title || useTitleSlot"
      :class="[
        bem('dialog__header', { isolated: !(options.message || useSlot) })
      ]"
    >
      <slot v-if="useTitleSlot" name="title" />
      <template v-else-if="options.title">{{ options.title }}</template>
    </view>

    <slot v-if="useSlot" />
    <view
      v-else-if="options.message"
      :class="[
        bem('dialog__message', [
          options.theme,
          options.messageAlign,
          { hasTitle: options.title }
        ])
      ]"
    >
      <text class="wan-dialog__message-text">{{ options.message }}</text>
    </view>

    <wan-goods-action
      v-if="options.theme === 'round-button'"
      custom-class="wan-dialog__footer--round-button"
    >
      <wan-goods-action-button
        v-if="options.showCancelButton"
        size="normal"
        :loading="options.loading.cancel"
        class="wan-dialog__button wan-hairline--right"
        :custom-class="`wan-dialog__cancel ${cancelButtonClass || ''}`"
        :custom-style="`color: ${cancelButtonColor}`"
        @click="onCancel"
      >
        {{ options.cancelButtonText }}
      </wan-goods-action-button>
      <wan-goods-action-button
        v-if="options.showConfirmButton"
        size="normal"
        class="wan-dialog__button"
        :loading="options.loading.confirm"
        :custom-class="`wan-dialog__confirm ${confirmButtonClass}`"
        :custom-style="`color: ${cancelButtonColor}`"
        :open-type="options.confirmButtonOpenType"
        :lang="lang"
        :business-id="businessId"
        :session-from="sessionFrom"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        :app-parameter="appParameter"
        @click="onConfirm"
        @getuserinfo="onGetUserInfo"
        @contact="onContact"
        @getphonenumber="onGetPhoneNumber"
        @error="onError"
        @launchapp="onLaunchApp"
        @opensetting="onOpenSetting"
      >
        {{ confirmButtonText }}
      </wan-goods-action-button>
    </wan-goods-action>

    <view
      v-else-if="options.showCancelButton || options.showConfirmButton"
      class="wan-hairline--top wan-dialog__footer"
    >
      <template v-if="options.showCancelButton">
        <slot v-if="useCancelButtonSlot" name="cancel-button" />

        <wan-button
          v-else
          size="large"
          :loading="options.loading.cancel"
          class="wan-dialog__button wan-hairline--right"
          :custom-class="`wan-dialog__cancel ${cancelButtonClass || ''}`"
          :custom-style="`color: ${cancelButtonColor}`"
          @click="onCancel"
        >
          {{ options.cancelButtonText }}
        </wan-button>
      </template>

      <template v-if="options.showConfirmButton">
        <slot v-if="useConfirmButtonSlot" name="confirm-button" />

        <wan-button
          v-else
          size="large"
          class="wan-dialog__button"
          :loading="options.loading.confirm"
          :custom-class="`wan-dialog__confirm ${confirmButtonClass}`"
          :custom-style="`color: ${confirmButtonColor}`"
          :open-type="options.confirmButtonOpenType"
          :lang="lang"
          :business-id="businessId"
          :session-from="sessionFrom"
          :send-message-title="sendMessageTitle"
          :send-message-path="sendMessagePath"
          :send-message-img="sendMessageImg"
          :show-message-card="showMessageCard"
          :app-parameter="appParameter"
          @click="onConfirm"
          @getuserinfo="onGetUserInfo"
          @contact="onContact"
          @getphonenumber="onGetPhoneNumber"
          @error="onError"
          @launchapp="onLaunchApp"
          @opensetting="onOpenSetting"
        >
          {{ options.confirmButtonText }}
        </wan-button>
      </template>
    </view>
  </wan-popup>
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
