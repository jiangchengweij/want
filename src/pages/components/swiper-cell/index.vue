<template>
  <demo-block title="基础用法">
    <wan-swipe-cell :right-width="65" :left-width="65">
      <template #left>
        <view class="wan-swipe-cell__left">选择</view>
      </template>
      <wan-cell-group>
        <wan-cell title="单元格" value="内容" />
      </wan-cell-group>
      <template #right>
        <view class="wan-swipe-cell__right">删除</view>
      </template>
    </wan-swipe-cell>
  </demo-block>

  <demo-block title="异步关闭">
    <wan-swipe-cell
      id="swipe-cell"
      :right-width="65"
      :left-width="65"
      async-close
      @close="onClose"
    >
      <template #left>
        <view class="wan-swipe-cell__left">选择</view>
      </template>
      <wan-cell-group>
        <wan-cell title="单元格" value="内容" />
      </wan-cell-group>
      <template #right>
        <view class="wan-swipe-cell__right">删除</view>
      </template>
    </wan-swipe-cell>
  </demo-block>

  <demo-block title="主动打开">
    <wan-swipe-cell
      id="swipe-cell2"
      :right-width="65"
      :left-width="65"
      name="示例"
      @open="onOpen"
    >
      <template #left>
        <view class="wan-swipe-cell__left">选择</view>
      </template>
      <wan-cell-group>
        <wan-cell title="单元格" value="内容" />
      </wan-cell-group>
      <template #right>
        <view class="wan-swipe-cell__right">
          <text>删除</text>
        </view>
      </template>
    </wan-swipe-cell>
  </demo-block>
  <wan-notify ref="notifyRef" />
</template>

<script setup>
import { ref } from 'vue';

const notifyRef = ref(null);

function onClose(event) {
  const { position, target } = event;
  switch (position) {
    case 'left':
    case 'cell':
      target.exposed.close();
      break;
    case 'right':
      uni.showModal({
        title: '提示',
        content: '确定删除吗？',
        showCancel: true,
        success: ({ confirm, cancel }) => {
          target.exposed.close();
        }
      });
      break;
  }
}

function onOpen(event) {
  const { position, name } = event;
  switch (position) {
    case 'left':
      notifyRef.value.show({
        type: 'primary',
        message: `${name}${position}部分展示open事件被触发`
      });
      break;
    case 'right':
      notifyRef.value.show({
        type: 'primary',
        message: `${name}${position}部分展示open事件被触发`
      });
      break;
  }
}
</script>

<style>
.demo-swipe-cell {
  user-select: none;
}

.wan-swipe-cell__left,
.wan-swipe-cell__right {
  display: inline-block;
  width: 65px;
  height: 44px;
  font-size: 15px;
  line-height: 44px;
  color: #fff;
  text-align: center;
  background-color: #ee0a24;
}
</style>
