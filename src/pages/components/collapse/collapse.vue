<template>
	<demo-block title="基础用法">
	  <w-collapse v-model="state.active1" @change="onChange('active1', $event)">
	    <w-collapse-item :title="state.title1">{{ state.content1 }}</w-collapse-item>
	    <w-collapse-item :title="state.title2">{{ state.content2 }}</w-collapse-item>
	    <w-collapse-item :title="state.title3" disabled>{{ state.content3 }}</w-collapse-item>
	  </w-collapse>
	</demo-block>
	
	<demo-block title="手风琴">
	  <w-collapse v-model="state.active2" accordion @change="onChange('active2', $event)">
	    <w-collapse-item :title="state.title1">{{ state.content1 }}</w-collapse-item>
	    <w-collapse-item :title="state.title2">{{ state.content2 }}</w-collapse-item>
	    <w-collapse-item :title="state.title3">{{ state.content3 }}</w-collapse-item>
	  </w-collapse>
	</demo-block>
	
	<demo-block title="事件监听">
	  <w-collapse v-model="state.active3" @change="onChange('active3', $event)" @open="onOpen" @close="onClose">
	    <w-collapse-item :title="state.title1">{{ state.content1 }}</w-collapse-item>
	    <w-collapse-item :title="state.title2">{{ state.content2 }}</w-collapse-item>
	    <w-collapse-item :title="state.title3">{{ state.content3 }}</w-collapse-item>
	  </w-collapse>
	</demo-block>
	
	<demo-block title="自定义标题内容">
	  <w-collapse v-model="state.active4" @change="onChange('active4', $event)">
	    <w-collapse-item>
				<template #title>
					<view>
					  {{ state.title1 }}
					  <w-icon name="question-o" custom-class="wan-icon-question" />
					</view>
				</template>
	      {{ state.content1 }}
	    </w-collapse-item>
	    <w-collapse-item
	      :title="state.title2"
	      value="内容"
	      icon="shop-o"
	    >
	      {{ state.content2 }}
	    </w-collapse-item>
	  </w-collapse>
	</demo-block>
	
	<w-toast ref="toastRef" />
</template>

<script setup>
import { reactive, ref } from 'vue';
import Toast from '@/uni_modules/want/components/utils/toast';

const state = reactive({
	active1: [0],
	active2: 0,
	active3: [],
	active4: [],
	title1: '标题1',
	title2: '标题2',
	title3: '标题3',
	content1: '代码是写出来给人看的，附带能在机器上运行',
	content2: '代码是写出来给人看的，附带能在机器上运行',
	content3: '代码是写出来给人看的，附带能在机器上运行',
})

const toastRef = ref(null);

function onChange(key, event) {
	state[key] = event;
}

function onOpen(event) {
	Toast({
		ref: toastRef.value,
		message: `展开: ${event}`,
	});
}

function onClose(event) {
	Toast({
		ref: toastRef.value,
		message: `关闭: ${event}`,
	});
}
</script>

<style>
.wan-icon-question {
	margin-left: 5px;
	font-size: 15px !important;
	color: #1989fa;
	vertical-align: -3px;
}
</style>
