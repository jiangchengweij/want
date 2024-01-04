<template>
  <view
    class="wan-dropdown-menu wan-dropdown-menu--top-bottom"
    :class="customClass || ''"
  >
    <view
      v-for="(item, index) in state.itemListData"
      :key="index"
      :class="[bem('dropdown-menu__item', { disabled: item.disabled })]"
      @tap="onTitleTap(index)"
    >
      <view
        :class="[
          item.titleClass || '',
          bem('dropdown-menu__title', {
            active: item.showPopup,
            down: item.showPopup === (direction === 'down')
          }),
          titleClass || ''
        ]"
        :style="item.showPopup ? 'color:' + activeColor : ''"
      >
        <view class="wan-ellipsis">
          {{ displayTitle(item) }}
        </view>
      </view>
    </view>
    <slot />
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
