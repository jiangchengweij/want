<template>
  <demo-block title="基础用法">
    <wan-goods-action
      custom-class="goods-action-position"
      :safe-area-inset-bottom="false"
    >
      <wan-goods-action-icon icon="chat-o" text="客服" open-type="contact" />
      <wan-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <wan-goods-action-button
        text="加入购物车"
        type="warning"
        :index="0"
        @click="onClickButton"
      />
      <wan-goods-action-button
        text="立即购买"
        :index="1"
        @click="onClickButton"
      />
    </wan-goods-action>
  </demo-block>

  <demo-block title="提示信息">
    <wan-goods-action
      custom-class="goods-action-position"
      :safe-area-inset-bottom="false"
    >
      <wan-goods-action-icon icon="chat-o" text="客服" dot />
      <wan-goods-action-icon icon="cart-o" text="购物车" info="5" />
      <wan-goods-action-icon icon="shop-o" text="店铺" />
      <wan-goods-action-button text="加入购物车" type="warning" />
      <wan-goods-action-button text="立即购买" />
    </wan-goods-action>
  </demo-block>

  <demo-block title="自定义按钮颜色">
    <wan-goods-action
      custom-class="goods-action-position"
      :safe-area-inset-bottom="false"
    >
      <wan-goods-action-icon icon="chat-o" text="客服" />
      <wan-goods-action-icon icon="shop-o" text="店铺" />
      <wan-goods-action-button
        color="#be99ff"
        type="warning"
        text="加入购物车"
      />
      <wan-goods-action-button color="#7232dd" text="立即购买" />
    </wan-goods-action>
  </demo-block>

  <demo-block title="朴素按钮">
    <wan-goods-action
      custom-class="goods-action-position"
      :safe-area-inset-bottom="false"
    >
      <wan-goods-action-icon icon="chat-o" text="客服" />
      <wan-goods-action-icon icon="shop-o" text="店铺" />
      <wan-goods-action-button
        color="#7232dd"
        text="加入购物车"
        type="warning"
      />
      <wan-goods-action-button plain color="#7232dd" text="立即购买" />
    </wan-goods-action>
  </demo-block>

  <wan-toast ref="toastRef" />
</template>

<script setup>
import { ref } from 'vue';

const toastRef = ref(null);

function onClickIcon() {
  toastRef.value.show({ message: '点击图标' });
}

function onClickButton() {
  toastRef.value.show({ message: '点击按钮' });
}
</script>

<style>
.goods-action-position {
  position: relative !important;
}
</style>
