<template>
  <demo-block title="文字提示" padding>
    <wan-button type="primary" @click="showToast">文字提示</wan-button>
    <wan-button
      type="primary"
      custom-class="demo-margin-left"
      @click="showLongToast"
      >长文字提示</wan-button
    >
  </demo-block>

  <demo-block title="加载提示" padding>
    <wan-button type="primary" @click="showLoadingToast">加载提示</wan-button>
    <wan-button
      type="primary"
      custom-class="demo-margin-left"
      @click="showCustomLoadingToast"
      >自定义加载图标</wan-button
    >
  </demo-block>

  <demo-block title="成功/失败提示" padding>
    <wan-button type="info" @click="showSuccessToast">成功提示</wan-button>
    <wan-button
      type="danger"
      custom-class="demo-margin-left"
      @click="showFailToast"
      >失败提示</wan-button
    >
  </demo-block>

  <demo-block title="动态更新提示" padding>
    <wan-button type="primary" @click="showCustomizedToast"
      >动态更新提示</wan-button
    >
  </demo-block>

  <wan-toast ref="toast" />
</template>

<script setup>
import { ref } from 'vue';
const toast = ref(null);

function showToast() {
  toast.value.show({ message: '提示内容' });
}

function showLongToast() {
  toast.value.show({
    message: '这是一条长文字提示，超过一定字数就会换行'
  });
}

function showLoadingToast() {
  toast.value.show({
    type: 'loading',
    message: '加载中...',
    forbidClick: true
  });
}

function showCustomLoadingToast() {
  toast.value.show({
    type: 'loading',
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner'
  });
}

function showSuccessToast() {
  toast.value.show({ message: '成功文案', type: 'success' });
}

function showFailToast() {
  toast.value.show({ type: 'fail', message: '失败提示' });
}

function showCustomizedToast() {
  const text = (second) => `倒计时 ${second} 秒`;
  toast.value.show({
    type: 'loading',
    duration: 0,
    forbidClick: true,
    message: text(3)
  });

  let second = 3;
  const timer = setInterval(() => {
    second--;
    if (second) {
      toast.value.setOptions({ message: text(second) });
    } else {
      clearInterval(timer);
      toast.value.clear();
    }
  }, 1000);
}
</script>

<style></style>
