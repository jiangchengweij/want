<template>
  <view class="wan-submit-bar" :class="[customClass || '']">
    <slot name="top" />
    <view class="wan-submit-bar__tip">
      <wan-icon
        v-if="tipIcon"
        size="12px"
        :name="tipIcon"
        custom-class="wan-submit-bar__tip-icon"
      />
      <view v-if="state.hasTip" class="wan-submit-bar__tip-text">
        {{ tip }}
      </view>
      <slot name="tip" />
    </view>

    <view class="wan-submit-bar__bar" :class="[barClass || '']">
      <slot />
      <view v-if="state.hasPrice" class="wan-submit-bar__text">
        <text>{{ label || '合计：' }}</text>
        <text class="wan-submit-bar__price" :class="priceClass || ''">
          <text class="wan-submit-bar__currency">{{ currency }} </text>
          <text class="wan-submit-bar__price-integer">{{
            state.integerStr
          }}</text>
          <text>{{ state.decimalStr }}</text>
        </text>
        <text class="wan-submit-bar__suffix-label">{{ suffixLabel }}</text>
      </view>
      <view class="wan-submit-bar__button">
        <wan-button
          round
          :type="buttonType"
          :loading="loading"
          :disabled="disabled"
          :custom-class="buttonClass || ''"
          custom-style="width: 100%;"
          @click="onSubmit"
        >
          {{ loading ? '' : buttonText }}
        </wan-button>
      </view>
    </view>
    <view v-if="safeAreaInsetBottom" class="wan-submit-bar__safe" />
  </view>
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
