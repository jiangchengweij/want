<template>
  <view :class="[bem('stepper', [theme]), customClass || '']">
    <view
      v-if="showMinus"
      data-type="minus"
      :style="buttonStyle"
      :class="[
        minusClass || '',
        bem('stepper__minus', {
          disabled: disabled || disableMinus || state.innterValue <= min
        })
      ]"
      hover-class="wan-stepper__minus--hover"
      hover-stay-time="70"
      @tap="onTap('minus')"
      @touchstart="onTouchStart('minus')"
      @touchend="onTouchEnd"
    >
      <slot name="minus" />
    </view>
    <input
      :type="integer ? 'number' : 'digit'"
      :class="[
        inputClass || '',
        bem('stepper__input', { disabled: disabled || disableInput })
      ]"
      :style="inputStyle"
      :value="state.innterValue"
      :focus="focus"
      :disabled="disabled || disableInput"
      :always-embed="alwaysEmbed"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <view
      v-if="showPlus"
      :style="buttonStyle"
      :class="[
        plusClass || '',
        bem('stepper__plus', {
          disabled: disabled || disablePlus || state.innterValue >= max
        })
      ]"
      hover-class="wan-stepper__plus--hover"
      hover-stay-time="70"
      @tap="onTap('plus')"
      @touchstart="onTouchStart('plus')"
      @touchend="onTouchEnd"
    >
      <slot name="plus" />
    </view>
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
  // #ifndef MP-ALIPAY
  behaviors: ['uni://form-field'],
  // #endif
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
