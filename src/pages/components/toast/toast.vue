<template>
	<demo-block title="文字提示" padding>
		<w-button type="primary" @click="showToast">文字提示</w-button>
		<w-button type="primary" @click="showLongToast" custom-class="demo-margin-left">长文字提示</w-button>
	</demo-block>
	
	<demo-block title="加载提示" padding>
	  <w-button type="primary" @click="showLoadingToast">加载提示</w-button>
	  <w-button type="primary" @click="showCustomLoadingToast" custom-class="demo-margin-left">自定义加载图标</w-button>
	</demo-block>
	
	<demo-block title="成功/失败提示" padding>
	  <w-button type="info" @click="showSuccessToast">成功提示</w-button>
	  <w-button type="danger" @click="showFailToast" custom-class="demo-margin-left">失败提示</w-button>
	</demo-block>
	
	<demo-block title="动态更新提示" padding>
	  <w-button type="primary" @click="showCustomizedToast">动态更新提示</w-button>
	</demo-block>
	
	<w-toast ref="toastRef" />
</template>

<script setup>
import Toast from '@/uni_modules/want/components/utils/toast';
import { ref } from 'vue';
const toastRef = ref(null);

function showToast() {
	Toast({ ref: toastRef.value, message: '提示内容' });
}

function showLongToast() {
	Toast({
		ref: toastRef.value,
		message: '这是一条长文字提示，超过一定字数就会换行',
	});
}

function showLoadingToast() {
	Toast.loading({ ref: toastRef.value, message: '加载中...', forbidClick: true });
}

function showCustomLoadingToast() {
	Toast.loading({
		ref: toastRef.value,
		message: '加载中...',
		forbidClick: true,
		loadingType: 'spinner',
	});
}

function showSuccessToast() {
	Toast.success({ ref: toastRef.value, message: '成功文案' });
}

function showFailToast() {
	Toast.fail({ ref: toastRef.value, message: '失败提示' });
}

function showCustomizedToast() {
	const text = (second) => `倒计时 ${second} 秒`;
	const toast = Toast.loading({
		ref: toastRef.value,
		duration: 0,
		forbidClick: true,
		message: text(3),
	});

	let second = 3;
	const timer = setInterval(() => {
		second--;
		if (second) {
			toast?.setOptions({ message: text(second) });
		} else {
			clearInterval(timer);
			Toast.clear();
		}
	}, 1000);
}
</script>

<style>
</style>
