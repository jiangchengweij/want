<template>
	<demo-block card title="基础用法">
		<w-cell is-link title="显示分享面板" @click="onShowShareSheet('basic')" />
		<w-share-sheet
			:show="state.show.basic"
			title="立即分享给好友"
			:options="state.options"
			@close="onClose"
			@select="onSelect"
		/>
	</demo-block>

	<demo-block card title="展示多行选项">
		<w-cell is-link title="显示分享面板" @click="onShowShareSheet('multiLine')" />
		<w-share-sheet
			:show="state.show.multiLine"
			title="立即分享给好友"
			:options="state.multiLineOptions"
			@close="onClose"
			@select="onSelect"
		/>
	</demo-block>

	<demo-block card title="自定义图标">
		<w-cell is-link title="显示分享面板" @click="onShowShareSheet('customIcon')" />
		<w-share-sheet
			:show="state.show.customIcon"
			:options="state.customIconOptions"
			@close="onClose"
			@select="onSelect"
		/>
	</demo-block>

	<demo-block card title="展示描述信息">
		<w-cell is-link title="显示分享面板" @click="onShowShareSheet('withDesc')" />
		<w-share-sheet
			:show="state.show.withDesc"
			title="立即分享给好友"
			:options="state.optionsWithDesc"
			description="描述信息"
			@close="onClose"
			@select="onSelect"
		/>
	</demo-block>

	<w-toast ref="toastRef" />
</template>

<script setup>
import { reactive, ref } from 'vue';
import Toast from '@/uni_modules/want/components/utils/toast';

const state = reactive({
	show: {
		basic: false,
		withDesc: false,
		multiLine: false,
		customIcon: false,
	},
	options: [
		{ name: '微信', icon: 'wechat', openType: 'share' },
		{ name: '朋友圈', icon: 'wechat-moments' },
		{ name: 'QQ', icon: 'qq' },
		{ name: '微博', icon: 'weibo' },
		{ name: '复制链接', icon: 'link' },
		{ name: '分享海报', icon: 'poster' },
		{ name: '二维码', icon: 'qrcode' },
		{ name: '小程序码', icon: 'weapp-qrcode' },
	],
	multiLineOptions: [
		[
			{ name: '微信', icon: 'wechat' },
			{ name: '微博', icon: 'weibo' },
			{ name: 'QQ', icon: 'qq' },
		],
		[
			{ name: '复制链接', icon: 'link' },
			{ name: '分享海报', icon: 'poster' },
			{ name: '二维码', icon: 'qrcode' },
		],
	],
	customIconOptions: [
		{
			name: '名称',
			icon: 'https://img.yzcdn.cn/vant/custom-icon-fire.png',
		},
		{
			name: '名称',
			icon: 'https://img.yzcdn.cn/vant/custom-icon-light.png',
		},
		{
			name: '名称',
			icon: 'https://img.yzcdn.cn/vant/custom-icon-water.png',
		},
	],
	optionsWithDesc: [
		{ name: '微信', icon: 'wechat' },
		{ name: '微博', icon: 'weibo' },
		{
			name: '复制链接',
			icon: 'link',
			description: '描述信息',
		},
		{ name: '分享海报', icon: 'poster' },
		{ name: '二维码', icon: 'qrcode' },
	],
})

function onShowShareSheet(type) {
	state.show[type] = true;
}

function onClose() {
	state.show.basic = false;
	state.show.withDesc = false;
	state.show.multiLine = false;
	state.show.customIcon = false;
}

const toastRef = ref(null);

function onSelect(event) {
	Toast({ ref: toastRef.value, message: event.name });
	onClose();
}

</script>

<style>
</style>
