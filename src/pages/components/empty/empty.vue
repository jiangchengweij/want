<template>
	<demo-block title="基础用法" padding>
	  <w-empty description="描述文字" />
	</demo-block>
	
	<demo-block title="图片类型">
	  <w-tabs
	    :active="state.activeTab"
	    @change="onChange"
	  >
	    <w-tab title="通用错误">
	      <w-empty image="error" description="描述文字" />
	    </w-tab>
	    <w-tab title="网络错误">
	      <w-empty image="network" description="描述文字" />
	    </w-tab>
	    <w-tab title="搜索提示">
	      <w-empty image="search" description="描述文字" />
	    </w-tab>
	  </w-tabs>
	</demo-block>
	
	<demo-block title="自定义图片" padding>
	  <w-empty
	    custom-class="custom-image"
	    image="https://img.yzcdn.cn/vant/custom-empty-image.png"
	    description="描述文字"
	  />
	</demo-block>
	
	<demo-block title="底部内容" padding>
	  <w-empty description="描述文字">
	    <w-button round type="danger" custom-class="bottom-button">
	      按钮
	    </w-button>
	  </w-empty>
	</demo-block>
</template>

<script setup>
import { reactive } from 'vue';
const state = reactive({ activeTab: 0 });

function onChange(event) {
	state.activeTab = event.name
}
</script>

<style>
.custom-image .w-empty__image {
  width: 90px;
  height: 90px;
}

.bottom-button {
  width: 160px;
  height: 40px;
}
</style>