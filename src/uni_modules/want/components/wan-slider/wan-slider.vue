<template>
  <view
    :class="[customClass || '', bem('slider', { disabled, vertical })]"
    :style="state.wrapperStyle"
    @tap="onClick"
  >
    <view
      :class="bem('slider__bar')"
      :style="style([{ backgroundColor: activeColor }, state.barStyle])"
    >
      <view
        v-if="range"
        :class="[bem('slider__button-wrapper-left')]"
        @touchstart="onTouchStart($event, 0)"
        @touchmove.stop="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
        <slot v-if="useButtonSlot" name="left-button" />
        <view v-else :class="[bem('slider__button')]" />
      </view>
      <view
        v-if="range"
        :class="[bem('slider__button-wrapper-right')]"
        @touchstart="onTouchStart($event, 1)"
        @touchmove.stop="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
        <slot v-if="useButtonSlot" name="right-button" />
        <view v-else :class="bem('slider__button')" />
      </view>

      <view
        v-if="!range"
        :class="[bem('slider__button-wrapper')]"
        @touchstart="onTouchStart"
        @touchmove.stop="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
        <slot v-if="useButtonSlot" name="button" />
        <view v-else :class="[bem('slider__button')]" />
      </view>
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
