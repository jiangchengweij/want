<template>
	<demo-block title="基础用法" padding>
		<w-tag custom-class="demo-margin-right" type="primary">标签</w-tag>
		<w-tag custom-class="demo-margin-right" type="success">标签</w-tag>
		<w-tag custom-class="demo-margin-right" type="danger">标签</w-tag>
		<w-tag custom-class="demo-margin-right" type="warning">标签</w-tag>
	</demo-block>

	<demo-block title="圆角样式" padding>
		<w-tag custom-class="demo-margin-right" round type="primary">标签</w-tag>
		<w-tag custom-class="demo-margin-right" round type="success">标签</w-tag>
		<w-tag custom-class="demo-margin-right" round type="danger">标签</w-tag>
		<w-tag custom-class="demo-margin-right" round type="warning">标签</w-tag>
	</demo-block>

	<demo-block title="标记样式" padding>
		<w-tag custom-class="demo-margin-right" mark type="primary">标签</w-tag>
		<w-tag custom-class="demo-margin-right" mark type="success">标签</w-tag>
		<w-tag custom-class="demo-margin-right" mark type="danger">标签</w-tag>
		<w-tag custom-class="demo-margin-right" mark type="warning">标签</w-tag>
	</demo-block>

	<demo-block title="空心样式" padding>
		<w-tag custom-class="demo-margin-right" plain type="primary">标签</w-tag>
		<w-tag custom-class="demo-margin-right" plain type="success">标签</w-tag>
		<w-tag custom-class="demo-margin-right" plain type="danger">标签</w-tag>
		<w-tag custom-class="demo-margin-right" plain type="warning">标签</w-tag>
	</demo-block>

	<demo-block title="自定义颜色" padding>
		<w-tag custom-class="demo-margin-right" color="#f2826a">标签</w-tag>
		<w-tag custom-class="demo-margin-right" color="#7232dd">标签</w-tag>
		<w-tag custom-class="demo-margin-right" color="#7232dd" plain>标签</w-tag>
		<w-tag custom-class="demo-margin-right" color="#ffe1e1" text-color="#ad0000"
		>标签</w-tag
		>
	</demo-block>

	<demo-block title="标签大小" padding>
		<w-tag custom-class="demo-margin-right" type="danger">标签</w-tag>
		<w-tag custom-class="demo-margin-right" type="danger" size="medium">标签</w-tag>
		<w-tag custom-class="demo-margin-right" type="danger" size="large">标签</w-tag>
	</demo-block>

	<demo-block title="可关闭标签" padding>
		<w-tag
			v-if="state.primary"
			custom-class="demo-margin-right"
			type="primary"
			size="medium"
			closeable
			@close="onClose('primary')"
		>标签</w-tag
		>
		<w-tag
			v-if="state.success"
			custom-class="demo-margin-right"
			type="success"
			size="medium"
			closeable
			@close="onClose('success')"
		>标签</w-tag
		>
	</demo-block>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
	success: true,
	primary: true,
})

function onClose(id: string) {
	state[id] = false;
}
</script>

<style>
</style>
