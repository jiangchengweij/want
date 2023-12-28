<template>
  <view :class="[bem('radio', [state.direction]), customClass || '']">
    <view
      v-if="labelPosition === 'left'"
      :class="[
        bem('radio__label', [
          labelPosition,
          { disabled: disabled || state.parentDisabled },
          labelClass || ''
        ])
      ]"
      @tap="onClickLabel"
    >
      <slot />
    </view>
    <view
      class="wan-radio__icon-wrapper"
      :style="iconSize ? `font-size: ${addUnit(iconSize)}` : ''"
      @tap="onChange"
    >
      <slot v-if="useIconSlot" name="icon" />
      <view
        v-else
        :class="[
          bem('radio__icon', [
            shape,
            {
              disabled: disabled || state.parentDisabled,
              checked: state.innerValue === name
            }
          ])
        ]"
        :style="iconStyle"
      >
        <wan-icon
          name="success"
          :custom-class="iconClass"
          :custom-style="iconCustomStyle"
        />
      </view>
    </view>
    <view
      v-if="labelPosition === 'right'"
      :class="[
        labelClass || '',
        bem('radio__label', [
          labelPosition,
          { disabled: disabled || state.parentDisabled }
        ])
      ]"
      @tap="onClickLabel"
    >
      <slot />
    </view>
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
