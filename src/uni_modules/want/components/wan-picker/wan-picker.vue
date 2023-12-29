<template>
  <view class="wan-picker" :class="columnClass || ''">
    <template v-if="toolbarPosition === 'top'">
      <view
        v-if="showToolbar"
        class="wan-picker__toolbar"
        :class="[toolbarClass || '']"
      >
        <view
          class="wan-picker__cancel"
          hover-class="wan-picker__cancel--hover"
          :hover-stay-time="70"
          @tap="emitEvent('cancel')"
        >
          {{ cancelButtonText }}
        </view>
        <view v-if="title" class="wan-picker__title wan-ellipsis">{{
          title
        }}</view>
        <view
          class="wan-picker__confirm"
          hover-class="wan-picker__confirm--hover"
          :hover-stay-time="70"
          @tap="emitEvent('confirm')"
        >
          {{ confirmButtonText }}
        </view>
      </view>
    </template>

    <view v-if="loading" class="wan-picker__loading">
      <wan-loading color="#1989fa" />
    </view>
    <picker-view
      class="wan-picker__columns"
      :style="columnsStyle"
      :indicator-style="`height: ${itemHeight}px`"
      :value="state.pickerValues"
      mask-class="wan-picker__mask"
      @change="onChange"
    >
      <picker-view-column
        v-for="(item, index) in state.columns"
        :key="index"
        class="wan-picker__column"
      >
        <view
          v-for="(option, optIndex) in item.values"
          :key="optIndex"
          :class="
            bem('picker-column__item', { disabled: option && option.disabled })
          "
          :style="`height: ${itemHeight}px; line-height: ${itemHeight}px;`"
        >
          {{ optionText(option) }}
        </view>
      </picker-view-column>
      <view
        class="wan-picker__frame wan-hairline--top-bottom"
        :style="frameStyle"
      />
    </picker-view>
    <template v-if="toolbarPosition === 'bottom'">
      <view
        v-if="showToolbar"
        class="wan-picker__toolbar"
        :class="[toolbarClass || '']"
      >
        <view
          class="wan-picker__cancel"
          hover-class="wan-picker__cancel--hover"
          :hover-stay-time="70"
          @tap="emitEvent('cancel')"
        >
          {{ cancelButtonText }}
        </view>
        <view v-if="title" class="wan-picker__title wan-ellipsis">{{
          title
        }}</view>
        <view
          class="wan-picker__confirm"
          hover-class="wan-picker__confirm--hover"
          :hover-stay-time="70"
          @tap="emitEvent('confirm')"
        >
          {{ confirmButtonText }}
        </view>
      </view>
    </template>
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
