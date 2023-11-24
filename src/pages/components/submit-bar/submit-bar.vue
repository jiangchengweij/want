<template>
	<demo-block title="基础用法">
		<w-submit-bar
			:price="3050"
			button-text="提交订单"
			@submit="onClickButton"
			custom-class="wan-submit-bar"
			:safe-area-inset-bottom="false"
		/>
	</demo-block>

	<demo-block title="禁用状态">
		<w-submit-bar
			disabled
			:price="3050"
			button-text="提交订单"
			tip="您的收货地址不支持同城送, 我们已为您推荐快递"
			tip-icon="info-o"
			@submit="onClickButton"
			custom-class="wan-submit-bar"
			:safe-area-inset-bottom="false"
		/>
	</demo-block>

	<demo-block title="加载状态">
		<w-submit-bar
			loading
			:price="3050"
			button-text="提交订单"
			@submit="onClickButton"
			custom-class="wan-submit-bar"
			:safe-area-inset-bottom="false"
		/>
	</demo-block>

	<demo-block title="高级用法">
		<w-submit-bar
			:price="3050"
			button-text="提交订单"
			@submit="onClickButton"
			custom-class="wan-submit-bar"
			:tip="true"
			:safe-area-inset-bottom="false"
		>
			<w-tag type="primary" custom-class="submit-tag">标签</w-tag>
			<template #tip>
				您的收货地址不支持同城送
				<text class="edit-address" @tap="onClickLink">修改地址</text>
			</template>
		</w-submit-bar>
	</demo-block>
</template>

<script setup>
function onClickButton() {
	uni.showToast({
		icon: 'none',
		title: '点击按钮'
	})
}

function onClickLink() {
	uni.showToast({
		icon: 'none',
		title: '修改地址'
	})
}
</script>

<style lang="scss">
.wan-submit-bar {
  position: relative !important;
}

.edit-address {
  color: #1989fa;
}

.submit-tag {
  margin-left: 15px;
}
</style>
