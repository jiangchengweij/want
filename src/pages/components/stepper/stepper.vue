<template>
	<w-cell center title="基础用法">
	  <w-stepper :modelValue="1" />
	</w-cell>
	
	<w-cell center title="步长设置">
	  <w-stepper :modelValue="1" :step="2" />
	</w-cell>
	
	<w-cell center title="限制输入范围">
	  <w-stepper :modelValue="1" :min="5" :max="8" />
	</w-cell>
	
	<w-cell center title="限制输入整数">
	  <w-stepper :modelValue="1" integer />
	</w-cell>
	
	<w-cell center title="禁用状态">
	  <w-stepper :modelValue="1" disabled />
	</w-cell>
	
	<w-cell center title="禁用长按">
	  <w-stepper :modelValue="1" :long-press="false" />
	</w-cell>
	
	<w-cell center title="固定小数位数">
	  <w-stepper :modelValue="1" :step="0.2" :decimal-length="1" />
	</w-cell>
	
	<w-cell center title="异步变更">
	  <w-stepper
	    :modelValue="state.value"
	    async-change
	    @change="onChange"
	  />
	</w-cell>
	
	<w-cell center title="自定义大小">
	  <w-stepper value="{{ 1 }}" input-width="40px" button-size="32px" />
	</w-cell>
	
	<w-cell center title="圆角风格">
	  <w-stepper value="{{ 1 }}" theme="round" button-size="22px" />
	</w-cell>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
	value: 1
})

function onChange(event) {
	console.log(event)
	uni.showLoading({
		mask: true
	})
	setTimeout(() => {
		uni.hideLoading()
		state.value = event;
	}, 500);
}
</script>

<style>
</style>
