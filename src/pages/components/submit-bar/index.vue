<template>
  <demo-block title="基础用法">
    <wan-submit-bar
      :price="3050"
      button-text="提交订单"
      custom-class="wan-submit-bar"
      :safe-area-inset-bottom="false"
      @submit="onClickButton"
    />
  </demo-block>

  <demo-block title="禁用状态">
    <wan-submit-bar
      disabled
      :price="3050"
      button-text="提交订单"
      tip="您的收货地址不支持同城送, 我们已为您推荐快递"
      tip-icon="info-o"
      custom-class="wan-submit-bar"
      :safe-area-inset-bottom="false"
      @submit="onClickButton"
    />
  </demo-block>

  <demo-block title="加载状态">
    <wan-submit-bar
      loading
      :price="3050"
      button-text="提交订单"
      custom-class="wan-submit-bar"
      :safe-area-inset-bottom="false"
      @submit="onClickButton"
    />
  </demo-block>

  <demo-block title="高级用法">
    <wan-submit-bar
      :safe-area-inset-bottom="false"
      custom-class="wan-submit-bar"
      :tip="true"
      :price="3050"
      button-text="提交订单"
      @submit="onClickButton"
    >
      <wan-tag type="primary" custom-class="submit-tag">标签</wan-tag>
      <template #tip>
        您的收货地址不支持同城送
        <text class="edit-address" @tap="onClickLink">修改地址</text>
      </template>
    </wan-submit-bar>
  </demo-block>
</template>

<script setup>
function onClickButton() {
  uni.showToast({
    icon: 'none',
    title: '点击按钮'
  });
}

function onClickLink() {
  uni.showToast({
    icon: 'none',
    title: '修改地址'
  });
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
