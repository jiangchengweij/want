<template>
  <wan-transition
    :show="show"
    :custom-class="['wan-overlay', customClass || '']"
    :custom-style="`z-index: ${zIndex}; ${customStyle || ''}`"
    :duration="duration"
    @touchmove.stop="noop"
    @click="onClick"
  >
    <slot />
  </wan-transition>
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
.wan-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--overlay-background-color, $overlay-background-color);
}
</style>
