<template>
  <view class="default-content">
    <demo-block title="类型按钮" padding>
      <view class="row">
        <wan-button>默认按钮</wan-button>
        <wan-button type="primary" custom-class="demo-margin-left"
          >主要按钮</wan-button
        >
        <wan-button type="info" custom-class="demo-margin-left"
          >信息按钮</wan-button
        >
      </view>
      <wan-button type="danger">危险按钮</wan-button>
      <wan-button type="warning" custom-class="demo-margin-left"
        >警告按钮</wan-button
      >
    </demo-block>
    <demo-block title="朴素按钮" padding>
      <wan-button type="primary" plain>朴素按钮</wan-button>
      <wan-button type="info" plain custom-class="demo-margin-left"
        >朴素按钮</wan-button
      >
    </demo-block>
    <demo-block title="细边框" padding>
      <wan-button type="primary" plain hairline>细边框按钮</wan-button>
      <wan-button type="info" plain hairline custom-class="demo-margin-left"
        >细边框按钮</wan-button
      >
    </demo-block>
    <demo-block title="禁用状态" padding>
      <wan-button type="primary" disabled>禁用状态</wan-button>
      <wan-button type="info" disabled custom-class="demo-margin-left"
        >禁用状态</wan-button
      >
    </demo-block>

    <demo-block title="加载状态" padding>
      <wan-button loading type="primary" />
      <wan-button
        loading
        type="primary"
        loading-type="spinner"
        custom-class="demo-margin-left"
      />
      <wan-button
        loading
        type="info"
        loading-text="加载中..."
        custom-class="demo-margin-left"
      />
    </demo-block>

    <demo-block title="按钮形状" padding>
      <wan-button type="primary" square>方形按钮</wan-button>
      <wan-button type="info" round custom-class="demo-margin-left"
        >圆形按钮</wan-button
      >
    </demo-block>

    <demo-block title="按钮尺寸" padding>
      <wan-button
        type="primary"
        size="large"
        block
        custom-class="demo-margin-bottom"
        >大号按钮</wan-button
      >
      <wan-button type="primary">普通按钮</wan-button>
      <wan-button type="primary" size="small" custom-class="demo-margin-left"
        >小型按钮</wan-button
      >
      <wan-button type="primary" size="mini" custom-class="demo-margin-left"
        >迷你按钮</wan-button
      >
    </demo-block>

    <demo-block title="块级元素" padding>
      <wan-button type="primary" custom-class="demo-margin-bottom"
        >普通按钮</wan-button
      >
      <wan-button type="primary" block>块级元素</wan-button>
    </demo-block>

    <demo-block title="自定义颜色" padding>
      <wan-button color="#7232dd">单色按钮</wan-button>
      <wan-button color="#7232dd" custom-class="demo-margin-left" plain
        >单色按钮</wan-button
      >
      <wan-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        custom-class="demo-margin-left"
        >渐变色按钮</wan-button
      >
    </demo-block>
  </view>
</template>
<script></script>

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
