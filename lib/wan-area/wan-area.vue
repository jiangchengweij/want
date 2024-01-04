<template>
  <view class="wan-area__picker" :class="customClass || ''">
    <wan-picker
      ref="pickerRef"
      :active-class="activeClass"
      :toolbar-class="toolbarClass"
      :column-class="columnClass"
      :show-toolbar="showToolbar"
      value-key="name"
      :title="title"
      :loading="loading"
      :columns="displayColumns"
      :item-height="itemHeight"
      :visible-item-count="visibleItemCount"
      :cancel-button-text="cancelButtonText"
      :confirm-button-text="confirmButtonText"
      @change="onChange"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
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
<style></style>
