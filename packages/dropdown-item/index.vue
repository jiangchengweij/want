<template>
  <view
    v-if="state.showWrapper"
    :class="[bem('dropdown-item', state.direction), customClass || '']"
    :style="state.wrapperStyle"
  >
    <wan-popup
      :show="state.showPopup"
      :custom-style="`position: absolute;${popupStyle}`"
      overlay-style="position: absolute;"
      :overlay="state.overlay"
      :position="state.direction === 'down' ? 'top' : 'bottom'"
      :duration="state.transition ? state.duration : 0"
      :safe-area-tab-bar="state.safeAreaTabBar"
      :close-on-click-overlay="state.closeOnClickOverlay"
      @enter="onOpen"
      @leave="onClose"
      @close="toggle"
      @after-enter="onOpened"
      @after-leave="onClosed"
    >
      <wan-cell
        v-for="item in options"
        :key="item.value"
        :class="[
          bem('dropdown-item__option', { active: item.value === modelValue })
        ]"
        clickable
        :icon="item.icon"
        @click="onOptionTap(item)"
      >
        <template #title>
          <view
            class="wan-dropdown-item__title"
            :class="itemTitleClass || ''"
            :style="
              item.value === modelValue ? 'color:' + state.activeColor : ''
            "
          >
            {{ item.text }}
          </view>
        </template>
        <wan-icon
          v-if="item.value === modelValue"
          name="success"
          class="wan-dropdown-item__icon"
          :color="state.activeColor"
        />
      </wan-cell>

      <slot />
    </wan-popup>
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
