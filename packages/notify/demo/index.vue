<template>
  <demo-block padding title="基础用法">
    <wan-button type="danger" @click="showNotify">基础用法</wan-button>
  </demo-block>

  <demo-block padding title="通知类型">
    <view class="demo-margin-bottom">
      <wan-button type="info" @click="showNotifyByType('primary')"
        >主要通知</wan-button
      >
      <wan-button
        type="primary"
        custom-class="demo-margin-left"
        @click="showNotifyByType('success')"
        >成功通知</wan-button
      >
    </view>
    <view class="demo-margin-bottom">
      <wan-button @click="showNotifyByType('danger')">危险通知</wan-button>
      <wan-button
        type="warning"
        custom-class="demo-margin-left"
        @click="showNotifyByType('warning')"
        >警告通知</wan-button
      >
    </view>
  </demo-block>

  <demo-block padding title="自定义通知">
    <wan-button type="primary" @click="showCustomColor">自定义颜色</wan-button>
    <wan-button
      type="primary"
      custom-class="demo-margin-left"
      @click="showCustomDuration"
      >自定义时长</wan-button
    >
  </demo-block>

  <demo-block padding title="插入状态栏高度">
    <wan-button type="primary" @click="showSafe">插入状态栏高度</wan-button>
  </demo-block>

  <wan-notify ref="notifyRef" web-offset-top="44" />
</template>

<script setup>
import { ref } from 'vue';

const notifyRef = ref(null);

function showNotify() {
  notifyRef.value.show({ message: '通知内容' });
}

function showCustomColor() {
  notifyRef.value.show({
    message: '自定义颜色',
    color: '#ad0000',
    background: '#ffe1e1'
  });
}

function showCustomDuration() {
  notifyRef.value.show({
    duration: 1000,
    message: '自定义时长'
  });
}

function showNotifyByType(type) {
  notifyRef.value.show({
    type,
    message: '通知内容'
  });
}

function showSafe() {
  notifyRef.value.show({
    message: '通知内容',
    safeAreaInsetTop: true
  });
}
</script>

<style></style>
