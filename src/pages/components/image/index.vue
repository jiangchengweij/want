<template>
  <view class="default-content">
    <demo-block title="基础用法" padding>
      <wan-row>
        <wan-image width="100" height="100" :src="state.src" />
      </wan-row>
    </demo-block>

    <demo-block title="填充模式" padding>
      <wan-row gutter="20">
        <wan-col v-for="fit in state.fits" :key="fit" span="8">
          <wan-image :fit="fit" width="100%" height="27vw" :src="state.src" />
          <view class="text">{{ fit }}</view>
        </wan-col>
      </wan-row>
    </demo-block>

    <demo-block title="圆形图片" padding>
      <wan-row gutter="20">
        <wan-col v-for="fit in state.fits" :key="fit" span="8">
          <wan-image
            round
            :fit="fit"
            width="100%"
            height="27vw"
            :src="state.src"
          />
          <view class="text">{{ fit }}</view>
        </wan-col>
      </wan-row>
    </demo-block>

    <demo-block title="加载中提示" padding>
      <wan-row gutter="20">
        <wan-col span="8">
          <wan-image width="100%" height="27vw" />
          <view class="text">默认提示</view>
        </wan-col>

        <wan-col span="8">
          <wan-image width="100%" height="27vw" use-loading-slot>
            <template #loading>
              <wan-loading type="spinner" size="20" vertical />
            </template>
          </wan-image>
          <view class="text">自定义提示</view>
        </wan-col>
      </wan-row>
    </demo-block>

    <demo-block title="加载失败提示" padding>
      <wan-row gutter="20">
        <wan-col span="8">
          <wan-image width="100%" height="27vw" src="x" />
          <view class="text">默认提示</view>
        </wan-col>

        <wan-col span="8">
          <wan-image width="100%" height="27vw" src="x" use-error-slot>
            <template #error>
              <text>加载失败</text>
            </template>
          </wan-image>
          <view class="text">自定义提示</view>
        </wan-col>
      </wan-row>
    </demo-block>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  fits: [
    'contain',
    'cover',
    'fill',
    'none',
    'scale-down',
    'widthFix',
    'heightFix'
  ],
  src: 'https://img.yzcdn.cn/vant/cat.jpeg'
});
</script>

<style>
.text {
  width: 100%;
  margin: 5px 0 20px;
  color: #7d7e80;
  font-size: 14px;
  text-align: center;
}
</style>
