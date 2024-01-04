<template>
  <view :class="customClass || ''">
    <view v-if="loading" :class="[bem('skeleton', [{ animate }])]">
      <view
        v-if="avatar"
        :class="[avatarClass || '', bem('skeleton__avatar', [avatarShape])]"
        :style="'width:' + avatarSize + ';height:' + avatarSize"
      />
      <view :class="[bem('skeleton__content')]">
        <view
          v-if="title"
          :class="[titleClass || '', bem('skeleton__title')]"
          :style="'width:' + titleWidth"
        />
        <view
          v-for="(_, index) in state.rowArray"
          :key="index"
          :class="[rowClass || '', bem('skeleton__row')]"
          :style="'width:' + (state.isArray ? rowWidth[index] : rowWidth)"
        />
      </view>
    </view>
    <view v-else :class="[bem('skeleton__content')]">
      <slot />
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
