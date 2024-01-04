<template>
  <view
    :class="[
      bem('checkbox', [{ horizontal: state.direction === 'horizontal' }]),
      customClass || ''
    ]"
  >
    <view
      v-if="labelPosition === 'left'"
      :class="[
        labelClass || '',
        bem('checkbox__label', [
          labelPosition,
          { disabled: disabled || state.parentDisabled }
        ])
      ]"
      @tap="onClickLabel"
    >
      <slot />
    </view>
    <view class="wan-checkbox__icon-wrap" @tap="toggle">
      <slot v-if="useIconSlot" name="icon" />
      <view
        v-else
        :class="[
          bem('checkbox__icon', [
            shape,
            {
              disabled: disabled || state.parentDisabled,
              checked: state.innerValue
            }
          ])
        ]"
        :style="iconStyle"
      >
        <wan-icon
          name="success"
          size="0.8em"
          :custom-class="iconClass || ''"
          custom-style="line-height: 1.25em;"
        ></wan-icon>
      </view>
    </view>
    <view
      v-if="labelPosition === 'right'"
      :class="[
        labelClass || '',
        bem('checkbox__label', [
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
