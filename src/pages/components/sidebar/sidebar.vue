<template>
	<w-grid :column-num="2" :border="false">
	  <w-grid-item use-slot>
	    <h3 class="demo-sidebar-title">基础用法</h3>
	    <w-sidebar custom-class="custom-sidebar">
	      <w-sidebar-item title="标签名" />
	      <w-sidebar-item title="标签名" />
	      <w-sidebar-item title="标签名" />
	    </w-sidebar>
	  </w-grid-item>
	
	  <w-grid-item use-slot>
	    <h3 class="demo-sidebar-title">徽标提示</h3>
	    <w-sidebar custom-class="custom-sidebar">
	      <w-sidebar-item title="标签名" dot />
	      <w-sidebar-item title="标签名" badge="5" />
	      <w-sidebar-item title="标签名" badge="99+" />
	    </w-sidebar>
	  </w-grid-item>
	
	  <w-grid-item use-slot>
	    <h3 class="demo-sidebar-title">禁用选项</h3>
	    <w-sidebar custom-class="custom-sidebar">
	      <w-sidebar-item title="标签名" />
	      <w-sidebar-item title="标签名" disabled />
	      <w-sidebar-item title="标签名" />
	    </w-sidebar>
	  </w-grid-item>
	
	  <w-grid-item use-slot>
	    <h3 class="demo-sidebar-title">监听切换事件</h3>
	    <w-sidebar custom-class="custom-sidebar" @change="onChange">
	      <w-sidebar-item title="标签名 1" />
	      <w-sidebar-item title="标签名 2" />
	      <w-sidebar-item title="标签名 3" />
	    </w-sidebar>
	  </w-grid-item>
	</w-grid>
	
	<w-notify ref="notifyRef" />
</template>

<script setup>
import { ref } from 'vue'
import Notify from '@/uni_modules/want/components/utils/notify'

const notifyRef = ref(null)
function onChange(event) {
	Notify({
		ref: notifyRef.value,
		type: 'primary',
		message: `切换至第${event}项`,
	});
}
</script>

<style>
.custom-sidebar {
  margin-left: 16px;
}

.demo-sidebar {
  background-color: #fff;
}

.demo-sidebar-title {
  margin-bottom: 16px;
  color: #969799;
  font-weight: normal;
  font-size: 14px;
}
</style>
