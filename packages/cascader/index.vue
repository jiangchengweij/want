<template>
  <view class="wan-cascader" :class="customClass || ''">
    <view v-if="showHeader" class="wan-cascader__header">
      <text class="wan-cascader__title"
        ><slot name="title"></slot>{{ title }}</text
      >
      <wan-icon
        v-if="closeable"
        :name="closeIcon"
        class="wan-cascader__close-icon"
        @tap="onClose"
      />
    </view>

    <wan-tabs
      :active="state.activeTab"
      custom-class="wan-cascader__tabs"
      wrap-class="wan-cascader__tabs-wrap"
      tab-class="wan-cascader__tab"
      :color="activeColor"
      :border="false"
      :swipeable="swipeable"
      @click="onClickTab"
    >
      <wan-tab
        v-for="(tab, tabIndex) in state.tabs"
        :key="tabIndex"
        :index="tabIndex"
        :title="tab.selected ? tab.selected[state.textKey] : placeholder"
        style="width: 100%"
        :title-style="!tab.selected ? 'color: #969799;font-weight:normal;' : ''"
      >
        <!-- 暂不支持 -->
        <!-- <slot name="options-top"></slot> -->

        <view class="wan-cascader__options">
          <view
            v-for="(option, index) in tab.options"
            :key="index"
            :class="[
              option.className,
              optionClass(tab, state.valueKey, option)
            ]"
            :style="
              optionStyle({
                tab,
                valueKey: state.valueKey,
                option,
                activeColor
              })
            "
            @tap="onSelect({ option, tabIndex })"
          >
            <text>{{ option[state.textKey] }}</text>
            <wan-icon
              v-if="isSelected(tab, state.valueKey, option)"
              name="success"
              size="18"
            />
          </view>
        </view>
        <!-- 暂不支持 -->
        <!-- <slot name="options-bottom"></slot> -->
      </wan-tab>
    </wan-tabs>
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
