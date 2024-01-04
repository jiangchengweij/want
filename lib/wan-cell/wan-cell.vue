<template>
  <view
    :class="[
      customClass || '',
      bem('cell', [
        size,
        {
          center,
          required,
          borderless: !border,
          clickable: isLink || clickable
        }
      ])
    ]"
    hover-class="wan-cell--hover"
    hover-stay-time="70"
    :style="customStyle"
    @tap="onClick"
  >
    <view v-if="icon" class="wan-cell__left-icon-wrap">
      <wan-icon :name="icon" custom-class="wan-cell__left-icon"></wan-icon>
    </view>
    <slot v-else name="icon" />
    <view
      v-if="title || $slots.title || label || useLabelSlot"
      :style="getTitleStyle"
      class="wan-cell__title"
    >
      <template v-if="title">{{ title }}</template>
      <slot v-else name="title" />

      <view v-if="label || useLabelSlot" class="wan-cell__label">
        <slot v-if="useLabelSlot" name="label" />
        <template v-else-if="label">{{ label }}</template>
      </view>
    </view>
    <view class="wan-cell__value" :class="valueClass || ''">
      <template v-if="value || value === 0">{{ value }}</template>
      <slot v-else />
    </view>
    <wan-icon
      v-if="isLink"
      :name="arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'"
      class="wan-cell__right-icon-wrap"
      :class="[rightIconClass || '']"
      custom-class="wan-cell__right-icon"
    />
    <slot v-else name="right-icon" />
    <slot name="extra" />
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
