<template>
  <demo-block title="基础用法">
    <wan-tabbar
      :active="state.active"
      custom-class="tabbar-position"
      :safe-area-inset-bottom="false"
      @change="onChange('active', $event)"
    >
      <wan-tabbar-item icon="home-o">标签</wan-tabbar-item>
      <wan-tabbar-item icon="search">标签</wan-tabbar-item>
      <wan-tabbar-item icon="friends-o">标签</wan-tabbar-item>
      <wan-tabbar-item icon="setting-o">标签</wan-tabbar-item>
    </wan-tabbar>
  </demo-block>

  <demo-block title="通过名称匹配">
    <wan-tabbar
      :active="state.active2"
      custom-class="tabbar-position"
      :safe-area-inset-bottom="false"
      @change="onChange('active2', $event)"
    >
      <wan-tabbar-item name="home" icon="home-o">标签</wan-tabbar-item>
      <wan-tabbar-item name="search" icon="search">标签</wan-tabbar-item>
      <wan-tabbar-item name="friends" icon="friends-o">标签</wan-tabbar-item>
      <wan-tabbar-item name="setting" icon="setting-o">标签</wan-tabbar-item>
    </wan-tabbar>
  </demo-block>

  <demo-block title="显示徽标">
    <wan-tabbar
      :active="state.active3"
      custom-class="tabbar-position"
      :safe-area-inset-bottom="false"
      @change="onChange('active3', $event)"
    >
      <wan-tabbar-item icon="home-o">标签</wan-tabbar-item>
      <wan-tabbar-item icon="search" dot>标签</wan-tabbar-item>
      <wan-tabbar-item icon="friends-o" info="5">标签</wan-tabbar-item>
      <wan-tabbar-item icon="setting-o" info="20">标签</wan-tabbar-item>
    </wan-tabbar>
  </demo-block>

  <demo-block title="自定义图标">
    <wan-tabbar
      :active="state.active4"
      custom-class="tabbar-position"
      :safe-area-inset-bottom="false"
      @change="onChange('active4', $event)"
    >
      <wan-tabbar-item info="3">
        <template #icon>
          <image
            :src="state.icon.normal"
            mode="aspectFit"
            style="width: 30px; height: 18px"
          />
        </template>
        <template #icon-active>
          <image
            :src="state.icon.active"
            mode="aspectFit"
            style="width: 30px; height: 18px"
          />
        </template>
        自定义
      </wan-tabbar-item>
      <wan-tabbar-item icon="search">标签</wan-tabbar-item>
      <wan-tabbar-item icon="setting-o">标签</wan-tabbar-item>
    </wan-tabbar>
  </demo-block>

  <demo-block title="自定义颜色">
    <wan-tabbar
      :active="state.active5"
      custom-class="tabbar-position"
      active-color="#07c160"
      inactive-color="#000"
      :safe-area-inset-bottom="false"
      @change="handleChange('active5', $event)"
    >
      <wan-tabbar-item icon="home-o">标签</wan-tabbar-item>
      <wan-tabbar-item icon="search">标签</wan-tabbar-item>
      <wan-tabbar-item icon="friends-o">标签</wan-tabbar-item>
      <wan-tabbar-item icon="setting-o">标签</wan-tabbar-item>
    </wan-tabbar>
  </demo-block>

  <demo-block title="切换标签事件">
    <wan-tabbar
      :active="state.active6"
      custom-class="tabbar-position"
      :safe-area-inset-bottom="false"
      @change="handleChange('active6', $event)"
    >
      <wan-tabbar-item icon="home-o">标签1</wan-tabbar-item>
      <wan-tabbar-item icon="search">标签2</wan-tabbar-item>
      <wan-tabbar-item icon="friends-o">标签3</wan-tabbar-item>
      <wan-tabbar-item icon="setting-o">标签4</wan-tabbar-item>
    </wan-tabbar>
  </demo-block>
</template>

<script setup>
import { reactive } from 'vue';
const state = reactive({
  active: 0,
  active2: 'home',
  active3: 0,
  active4: 0,
  active5: 0,
  active6: 0,
  icon: {
    normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
    active: 'https://img.yzcdn.cn/vant/user-active.png'
  }
});

function onChange(key, event) {
  state[key] = event;
}

function handleChange(key, event) {
  state[key] = event;
  uni.showToast({ title: `点击标签 ${event + 1}`, icon: 'none' });
}
</script>

<style>
:deep(.tabbar-position) {
  position: relative !important;
}
</style>
