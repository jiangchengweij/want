<template>
	<demo-block title="基础用法">
	  <w-tabbar
	    :active="state.active"
	    custom-class="tabbar-position"
	    :safe-area-inset-bottom="false"
	    @change="onChange('active', $event)"
	  >
	    <w-tabbar-item icon="home-o">标签</w-tabbar-item>
	    <w-tabbar-item icon="search">标签</w-tabbar-item>
	    <w-tabbar-item icon="friends-o">标签</w-tabbar-item>
	    <w-tabbar-item icon="setting-o">标签</w-tabbar-item>
	  </w-tabbar>
	</demo-block>
	
	<demo-block title="通过名称匹配">
	  <w-tabbar
	    :active="state.active2"
	    custom-class="tabbar-position"
	    :safe-area-inset-bottom="false"
	    @change="onChange('active2', $event)"
	  >
	    <w-tabbar-item name="home" icon="home-o">标签</w-tabbar-item>
	    <w-tabbar-item name="search" icon="search">标签</w-tabbar-item>
	    <w-tabbar-item name="friends" icon="friends-o">标签</w-tabbar-item>
	    <w-tabbar-item name="setting" icon="setting-o">标签</w-tabbar-item>
	  </w-tabbar>
	</demo-block>
	
	<demo-block title="显示徽标">
	  <w-tabbar
	    :active="state.active3"
	    custom-class="tabbar-position"
	    :safe-area-inset-bottom="false"
	    @change="onChange('active3', $event)"
	  >
	    <w-tabbar-item icon="home-o">标签</w-tabbar-item>
	    <w-tabbar-item icon="search" dot>标签</w-tabbar-item>
	    <w-tabbar-item icon="friends-o" info="5">标签</w-tabbar-item>
	    <w-tabbar-item icon="setting-o" info="20">标签</w-tabbar-item>
	  </w-tabbar>
	</demo-block>
	
	<demo-block title="自定义图标">
	  <w-tabbar
	    :active="state.active4"
	    custom-class="tabbar-position"
	    :safe-area-inset-bottom="false"
	    @change="onChange('active4', $event)"
	  >
	    <w-tabbar-item info="3">
				<template #icon>
					<image
					  slot="icon"
					  :src="state.icon.normal"
					  mode="aspectFit"
					  style="width: 30px; height: 18px;"
					/>
				</template>
				<template #icon-active>
					<image
					  :src="state.icon.active"
					  mode="aspectFit"
					  style="width: 30px; height: 18px;"
					/>
				</template>
	      自定义
	    </w-tabbar-item>
	    <w-tabbar-item icon="search">标签</w-tabbar-item>
	    <w-tabbar-item icon="setting-o">标签</w-tabbar-item>
	  </w-tabbar>
	</demo-block>

	<demo-block title="自定义颜色">
	  <w-tabbar
	    :active="state.active5"
	    custom-class="tabbar-position"
	    active-color="#07c160"
	    inactive-color="#000"
	    :safe-area-inset-bottom="false"
	    @change="handleChange('active5', $event)"
	  >
	    <w-tabbar-item icon="home-o">标签</w-tabbar-item>
	    <w-tabbar-item icon="search">标签</w-tabbar-item>
	    <w-tabbar-item icon="friends-o">标签</w-tabbar-item>
	    <w-tabbar-item icon="setting-o">标签</w-tabbar-item>
	  </w-tabbar>
	</demo-block>

	<demo-block title="切换标签事件">
	  <w-tabbar
	    :active="state.active6"
	    custom-class="tabbar-position"
	    :safe-area-inset-bottom="false"
	    @change="handleChange('active6', $event)"
	  >
	    <w-tabbar-item icon="home-o">标签1</w-tabbar-item>
	    <w-tabbar-item icon="search">标签2</w-tabbar-item>
	    <w-tabbar-item icon="friends-o">标签3</w-tabbar-item>
	    <w-tabbar-item icon="setting-o">标签4</w-tabbar-item>
	  </w-tabbar>
	</demo-block>
</template>

<script setup lang="ts">
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
		active: 'https://img.yzcdn.cn/vant/user-active.png',
	},
})

function onChange(key, event) {
	state[key] = event
}

function handleChange(key, event) {
	state[key] = event
	uni.showToast({ title: `点击标签 ${event + 1}`, icon: 'none' });
}
</script>

<style>
:deep(.tabbar-position) {
  position: relative !important;
}
</style>
