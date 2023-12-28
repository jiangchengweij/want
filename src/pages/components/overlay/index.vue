<template>
  <demo-block title="基础用法" padding>
    <wan-button type="primary" @click="onClickShow"> 显示遮罩层 </wan-button>
    <wan-overlay :show="state.show" @click="onClickHide" />
  </demo-block>

  <demo-block title="嵌入内容" padding>
    <wan-button type="primary" @click="onClickShowEmbedded">
      嵌入内容
    </wan-button>
    <wan-overlay :show="state.showEmbedded" @click="onClickHideEmbedded">
      <view class="wrapper">
        <view class="block" @tap.stop="noop" />
      </view>
    </wan-overlay>
  </demo-block>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
  show: false,
  showEmbedded: false
});
function onClickShow() {
  state.show = true;
}

function onClickHide() {
  state.show = false;
}

function onClickShowEmbedded() {
  state.showEmbedded = true;
}

function onClickHideEmbedded() {
  state.showEmbedded = false;
}

function noop() {}
</script>

<style lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
