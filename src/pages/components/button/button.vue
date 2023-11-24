<template>
	<view class="default-content">
		<demo-block title="类型按钮" padding>
			<view class="row">
				<w-button>默认按钮</w-button>
				<w-button type="primary" custom-class="demo-margin-left">主要按钮</w-button>
				<w-button type="info" custom-class="demo-margin-left">信息按钮</w-button>
			</view>
			<w-button type="danger">危险按钮</w-button>
			<w-button type="warning" custom-class="demo-margin-left">警告按钮</w-button>
		</demo-block>
		<demo-block title="朴素按钮" padding>
		  <w-button type="primary" plain>朴素按钮</w-button>
		  <w-button type="info" plain custom-class="demo-margin-left">朴素按钮</w-button>
		</demo-block>
		<demo-block title="细边框" padding>
		  <w-button type="primary" plain hairline>细边框按钮</w-button>
		  <w-button type="info" plain hairline custom-class="demo-margin-left">细边框按钮</w-button>
		</demo-block>
		<demo-block title="禁用状态" padding>
		  <w-button type="primary" disabled>禁用状态</w-button>
		  <w-button type="info" disabled custom-class="demo-margin-left">禁用状态</w-button>
		</demo-block>
		
		<demo-block title="加载状态" padding>
		  <w-button loading type="primary" />
		  <w-button loading type="primary" loading-type="spinner" custom-class="demo-margin-left" />
		  <w-button loading type="info" loading-text="加载中..." custom-class="demo-margin-left" />
		</demo-block>
		
		<demo-block title="按钮形状" padding>
		  <w-button type="primary" square>方形按钮</w-button>
		  <w-button type="info" round custom-class="demo-margin-left">圆形按钮</w-button>
		</demo-block>
		
		<demo-block title="按钮尺寸" padding>
		  <w-button type="primary" size="large" block custom-class="demo-margin-bottom">大号按钮</w-button>
		  <w-button type="primary">普通按钮</w-button>
		  <w-button type="primary" size="small" custom-class="demo-margin-left">小型按钮</w-button>
		  <w-button type="primary" size="mini" custom-class="demo-margin-left">迷你按钮</w-button>
		</demo-block>
		
		<demo-block title="块级元素" padding>
		  <w-button type="primary" custom-class="demo-margin-bottom">普通按钮</w-button>
		  <w-button type="primary" block>块级元素</w-button>
		</demo-block>
		
		<demo-block title="自定义颜色" padding>
		  <w-button color="#7232dd">单色按钮</w-button>
		  <w-button color="#7232dd" custom-class="demo-margin-left" plain>单色按钮</w-button>
		  <w-button color="linear-gradient(to right, #4bb0ff, #6149f6)" custom-class="demo-margin-left">渐变色按钮</w-button>
		</demo-block>
	</view>
</template>

<script>
</script>

<style>
.row {
	height: 44px;
	margin-bottom: 15px;
}

.demo-margin-left {
	margin-left: 10px;
}

.demo-margin-right {
	margin-right: 10px;
}

.demo-margin-bottom {
	margin-bottom: 15px;
}
</style>