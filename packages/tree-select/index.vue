<template>
  <view class="wan-tree-select" :style="`height: ${addUnit(height)}`">
    <scroll-view scroll-y class="wan-tree-select__nav">
      <wan-sidebar
        :active-key="mainActiveIndex"
        custom-class="wan-tree-select__nav__inner"
        @change="onClickNav"
      >
        <wan-sidebar-item
          v-for="(item, index) in items"
          :key="index"
          :custom-class="mainItemClass || ''"
          :active-class="mainActiveClass || ''"
          :disabled-class="mainDisabledClass || ''"
          :badge="item.badge"
          :dot="item.dot"
          :title="item.text"
          :disabled="item.disabled"
        />
      </wan-sidebar>
    </scroll-view>
    <scroll-view scroll-y class="wan-tree-select__content">
      <slot name="content" />
      <view
        v-for="item in state.subItems"
        :key="item.id"
        class="wan-ellipsis"
        :class="[
          bem('tree-select__item', {
            active: isActive(item.id),
            disabled: item.disabled
          }),
          contentItemClass || '',
          isActive(item.id) ? contentActiveClass || '' : '',
          item.disabled ? contentDisabledClass || '' : ''
        ]"
        @tap="onSelectItem(item)"
      >
        {{ item.text }}
        <wan-icon
          v-if="isActive(item.id)"
          :name="selectedIcon"
          size="16px"
          custom-class="wan-tree-select__selected"
        />
      </view>
    </scroll-view>
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
