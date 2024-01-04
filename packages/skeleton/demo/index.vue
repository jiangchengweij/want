<template>
  <demo-block title="基础用法">
    <wan-skeleton title :row="3" :row-width="['100%', '100%', '80%']" />
  </demo-block>

  <demo-block title="显示头像">
    <wan-skeleton title avatar :row="3" />
  </demo-block>

  <demo-block title="展示子组件">
    <wan-switch v-model="show" size="24px" @change="onChange" />
    <wan-skeleton title avatar :row="3" :loading="!show">
      <view class="demo-preview">
        <image class="demo-preview-img" src="/static/logo.png" />
        <view class="demo-content">
          <view class="demo-content-h3">关于 Want</view>
          <view class="domo-content-p"
            >Want是一款跨平台移动应用组件库，助力开发者快速搭建小程序和H5应用。</view
          >
        </view>
      </view>
    </wan-skeleton>
  </demo-block>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);

function onChange(event) {
  show.value = event;
}
</script>

<style>
.wan-switch {
  margin: 0 16px 8px;
}

.demo-preview {
  display: flex;
  padding: 0 16px;
}

.demo-content {
  padding-top: 6px;
}

.demo-content-h3 {
  margin: 0;
  font-size: 18px;
  line-height: 20px;
}

.demo-content-p {
  margin: 13px 0 0;
  font-size: 14px;
  line-height: 20px;
}

.demo-preview-img {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  margin-right: 16px;
}
</style>
