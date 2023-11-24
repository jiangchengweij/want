<template>
	<demo-block card title="提示弹窗" padding>
		<w-cell title="提示弹窗" @click="onClickAlert" is-link />
		<w-cell title="提示弹窗（无标题）" @click="onClickAlert2" is-link />
		<w-cell title="确认弹窗" @click="onClickConfirm" is-link />
	</demo-block>

	<demo-block card title="圆角按钮样式" padding>
		<w-cell title="提示弹窗" @click="onClickThemeAlert" is-link />
		<w-cell title="提示弹窗（无标题）" @click="onClickThemeAlert2" is-link />
	</demo-block>

	<demo-block card title="异步关闭" padding>
		<w-cell title="异步关闭" @click="onClickAsyncClose" />
	</demo-block>

	<demo-block card title="组件调用" padding>
		<w-cell title="组件调用" @click="showCustomDialog" />
	</demo-block>

	<w-dialog
		use-slot
		title="标题"
		:show="state.show"
		show-cancel-button
		@close="onClose"
		confirm-button-open-type="getUserInfo"
		@getuserinfo="getUserInfo"
	>
		<image
			class="demo-image"
			src="https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg"
		/>
	</w-dialog>

	<w-dialog ref="dialogRef" />
</template>

<script setup>
import { reactive, ref } from 'vue';
import Dialog from '@/uni_modules/want/components/utils/dialog'

const message = '代码是写出来给人看的，附带能在机器上运行';

const dialogRef = ref(null);

const state = reactive({
	show: false,
})

function showCustomDialog() {
	state.show = true;
}

function getUserInfo(event) {
	console.log(event.detail);
}

function onClickThemeAlert() {
	Dialog.alert({
		ref: dialogRef.value,
		title: '标题',
		theme: 'round-button',
		message,
	});
}

function onClickThemeAlert2() {
	Dialog.alert({
		ref: dialogRef.value,
		theme: 'round-button',
		message,
	});
}

function onClickAlert() {
	Dialog.alert({
		ref: dialogRef.value,
		title: '标题',
		message,
	});
}

function onClickAlert2() {
	Dialog.alert({
		ref: dialogRef.value,
		message,
	});
}

function onClickConfirm() {
	Dialog.confirm({
		ref: dialogRef.value,
		title: '标题',
		message,
	}).catch((e) => {});
}

function onClickAsyncClose() {
	const beforeClose = (action) =>
		new Promise((resolve) => {
			setTimeout(() => {
				if (action === 'confirm') {
					resolve(true);
				} else {
					// 拦截取消操作
					resolve(false);
				}
			}, 1000);
		});

	Dialog.confirm({
		ref: dialogRef.value,
		title: '标题',
		message,
		beforeClose,
	});
}

function onClose() {
	state.show = false;
}
</script>

<style>
.demo-image {
  box-sizing: border-box;
  width: 100%;
  padding: 25px 20px 0;
}
</style>
