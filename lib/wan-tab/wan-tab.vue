<template>
  <view :class="customClass || ''">
    <view
      :class="[
        bem('tab__pane', { active: state.active, inactive: !state.active })
      ]"
      :style="state.shouldShow ? '' : 'display: none;'"
    >
      <slot v-if="state.shouldRender" />
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
  props,
  emits: [...emits],
  setup(props, context) {
    const instance = getCurrentInstance();
    return setup.call(instance, props, context);
  }
};
</script>
<style lang="scss">
.wan-tab__pane {
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &--active {
    height: auto;
  }

  &--inactive {
    height: 0;
    overflow: visible;
  }
}
</style>
