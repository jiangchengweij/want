<template>
	<demo-block title="基础用法">
	  <w-notice-bar
	    :text="state.text"
	    left-icon="volume-o"
	  />
	</demo-block>
	
	<demo-block title="滚动模式">
	  <w-notice-bar scrollable :text="state.shortText" custom-class="demo-margin-bottom" />
	  <w-notice-bar :scrollable="false" :text="state.text" custom-class="demo-margin-bottom" />
	</demo-block>
	
	<demo-block title="多行展示">
	  <w-notice-bar wrapable :scrollable="false" :text="state.text" />
	</demo-block>
	
	<demo-block title="通知栏模式">
	  <w-notice-bar mode="closeable" :text="state.shortText" />
	  <w-notice-bar custom-class="margin-top" mode="link" :text="state.shortText" />
	</demo-block>
	
	<demo-block title="自定义样式">
	  <w-notice-bar
	    :text="state.shortText"
	    color="#1989fa"
	    background="#ecf9ff"
	    left-icon="info-o"
	  >
	  </w-notice-bar>
	</demo-block>
</template>

<script setup>
import { reactive } from 'vue';
const state = reactive({
	text: '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。',
	shortText: '技术是开发它的人的共同灵魂。',
})

</script>

<style>
.margin-top {
  margin-top: 4px;
}
</style>
