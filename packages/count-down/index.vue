<template>
  <view class="wan-count-down">
    <slot v-if="useSlot" />
    <template v-else>{{ state.formattedTime }}</template>
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
@import '../common/style/var.scss';

.wan-count-down {
  color: var(--count-down-text-color, $count-down-text-color);
  font-size: var(--count-down-font-size, $count-down-font-size);
  line-height: var(--count-down-line-height, $count-down-line-height);
}
</style>
