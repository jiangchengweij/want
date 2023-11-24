<template>
	<demo-block title="基础用法">
		<w-action custom-class="goods-action-position" :safe-area-inset-bottom="false">
			<w-action-icon
				icon="chat-o"
				text="客服"
				open-type="contact"
			/>
			<w-action-icon
				icon="cart-o"
				text="购物车"
				@click="onClickIcon"
			/>
			<w-action-button
				text="加入购物车"
				type="warning"
				@click="onClickButton"
				:index="0"
			/>
			<w-action-button
				text="立即购买"
				@click="onClickButton"
				:index="1"
			/>
		</w-action>
	</demo-block>

	<demo-block title="提示信息">
		<w-action custom-class="goods-action-position" :safe-area-inset-bottom="false">
			<w-action-icon icon="chat-o" text="客服" dot />
			<w-action-icon icon="cart-o" text="购物车" info="5" />
			<w-action-icon icon="shop-o" text="店铺" />
			<w-action-button text="加入购物车" type="warning" />
			<w-action-button text="立即购买" />
		</w-action>
	</demo-block>

	<demo-block title="自定义按钮颜色">
		<w-action custom-class="goods-action-position" :safe-area-inset-bottom="false">
			<w-action-icon icon="chat-o" text="客服" />
			<w-action-icon icon="shop-o" text="店铺" />
			<w-action-button color="#be99ff" type="warning" text="加入购物车" />
			<w-action-button color="#7232dd" text="立即购买" />
		</w-action>
	</demo-block>

	<demo-block title="朴素按钮">
		<w-action custom-class="goods-action-position" :safe-area-inset-bottom="false">
			<w-action-icon icon="chat-o" text="客服" />
			<w-action-icon icon="shop-o" text="店铺" />
			<w-action-button color="#7232dd" text="加入购物车" type="warning" />
			<w-action-button plain color="#7232dd" text="立即购买" />
		</w-action>
	</demo-block>

	<w-toast ref="toastRef" />
</template>

<script setup>
import { ref } from 'vue';
import Toast from '@/uni_modules/want/components/w-col/w-col.vue';

const toastRef = ref(null);

function onClickIcon() {
	Toast({ ref: toastRef.value, message: '点击图标' });
}

function onClickButton() {
	Toast({ ref: toastRef.value, message: '点击按钮' });
}
</script>

<style>
.goods-action-position {
  position: relative !important;
}
</style>
