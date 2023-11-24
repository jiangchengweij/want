<template>
	<demo-block padding title="基础用法">
	  <w-button type="danger" @click="showNotify">基础用法</w-button>
	</demo-block>
	
	<demo-block padding title="通知类型">
	  <view class="demo-margin-bottom">
	    <w-button type="info" @click="showNotifyByType('primary')">主要通知</w-button>
	    <w-button type="primary" custom-class="demo-margin-left" @click="showNotifyByType('success')">成功通知</w-button>
	  </view>
	  <view class="demo-margin-bottom">
	    <w-button @click="showNotifyByType('danger')">危险通知</w-button>
	    <w-button type="warning" custom-class="demo-margin-left" @click="showNotifyByType('warning')">警告通知</w-button>
	  </view>
	</demo-block>
	
	<demo-block padding title="自定义通知">
	  <w-button type="primary" @click="showCustomColor">自定义颜色</w-button>
	  <w-button type="primary" custom-class="demo-margin-left" @click="showCustomDuration">自定义时长</w-button>
	</demo-block>
	
	<demo-block padding title="插入状态栏高度">
	  <w-button type="primary" @click="showSafe">插入状态栏高度</w-button>
	</demo-block>
	
	<w-notify ref="notifyRef" webOffsetTop="44" />
</template>

<script setup>
import { ref } from 'vue';
import Notify from '@/uni_modules/want/components/utils/notify';

const notifyRef = ref(null);

function showNotify() {
	Notify({ ref: notifyRef.value, message: '通知内容' });
}

function showCustomColor() {
	Notify({
		ref: notifyRef.value,
		message: '自定义颜色',
		color: '#ad0000',
		background: '#ffe1e1',
	});

	Notify.clear();
}

function showCustomDuration() {
	Notify({
		ref: notifyRef.value,
		duration: 1000,
		message: '自定义时长',
	});
}

function showNotifyByType(type) {
	Notify({
		type,
		ref: notifyRef.value,
		message: '通知内容',
	});
}

function showSafe() {
	Notify({
		ref: notifyRef.value,
		message: '通知内容',
		safeAreaInsetTop: true,
	});
}

</script>

<style>
</style>
