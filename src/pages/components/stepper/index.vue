<template>
  <wan-cell center title="基础用法">
    <wan-stepper :model-value="1" />
  </wan-cell>

  <wan-cell center title="步长设置">
    <wan-stepper :model-value="1" :step="2" />
  </wan-cell>

  <wan-cell center title="限制输入范围">
    <wan-stepper :model-value="1" :min="5" :max="8" />
  </wan-cell>

  <wan-cell center title="限制输入整数">
    <wan-stepper :model-value="1" integer />
  </wan-cell>

  <wan-cell center title="禁用状态">
    <wan-stepper :model-value="1" disabled />
  </wan-cell>

  <wan-cell center title="禁用长按">
    <wan-stepper :model-value="1" :long-press="false" />
  </wan-cell>

  <wan-cell center title="固定小数位数">
    <wan-stepper :model-value="1" :step="0.2" :decimal-length="1" />
  </wan-cell>

  <wan-cell center title="异步变更">
    <wan-stepper :model-value="state.value" async-change @change="onChange" />
  </wan-cell>

  <wan-cell center title="自定义大小">
    <wan-stepper :model-value="1" input-width="40px" button-size="32px" />
  </wan-cell>

  <wan-cell center title="圆角风格">
    <wan-stepper :model-value="1" theme="round" button-size="22px" />
  </wan-cell>
</template>

<script setup>
import { reactive } from 'vue';
const state = reactive({
  value: 1
});

function onChange(event) {
  uni.showLoading({
    mask: true
  });
  setTimeout(() => {
    uni.hideLoading();
    state.value = event;
  }, 500);
}
</script>

<style></style>
