<template>
  <demo-block title="基本用法">
    <wan-search
      v-model="modelValue"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
  </demo-block>

  <demo-block title="事件监听">
    <wan-search
      v-model="modelValue"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      @clear="onClear"
    />
  </demo-block>

  <demo-block title="搜索框内容对齐">
    <wan-search
      v-model="modelValue"
      input-align="center"
      placeholder="请输入搜索关键词"
    />
  </demo-block>

  <demo-block title="禁用搜索框">
    <wan-search v-model="modelValue" disabled placeholder="请输入搜索关键词" />
  </demo-block>

  <demo-block title="自定义背景色">
    <wan-search
      v-model="modelValue"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
    />
  </demo-block>

  <demo-block title="自定义按钮">
    <wan-search
      v-model="modelValue"
      label="地址"
      shape="round"
      placeholder="请输入搜索关键词"
      use-action-slot
      @search="onSearch"
    >
      <template #action>
        <view @tap="onClick">搜索</view>
      </template>
    </wan-search>
  </demo-block>
</template>

<script setup>
import { ref } from 'vue';
const modelValue = ref('');

function onChange(e) {
  modelValue.value = e;
}

function onSearch() {
  if (modelValue.value) {
    uni.showToast({
      title: '搜索：' + modelValue.value,
      icon: 'none'
    });
  }
}

function onClick() {
  if (modelValue.value) {
    uni.showToast({
      title: '搜索：' + modelValue.value,
      icon: 'none'
    });
  }
}

function onCancel() {
  uni.showToast({
    title: '取消',
    icon: 'none'
  });
}

function onClear() {
  uni.showToast({
    title: '清空',
    icon: 'none'
  });
}
</script>

<style></style>
