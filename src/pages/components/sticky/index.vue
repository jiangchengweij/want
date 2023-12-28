<template>
  <demo-block title="基础用法">
    <wan-sticky :web-offset-top="44">
      <wan-button type="primary" custom-style="margin-left: 15px">
        基础用法
      </wan-button>
    </wan-sticky>
  </demo-block>

  <demo-block title="吸顶距离">
    <wan-sticky :offset-top="50" :web-offset-top="44">
      <wan-button type="info" custom-style="margin-left: 115px">
        吸顶距离
      </wan-button>
    </wan-sticky>
  </demo-block>

  <demo-block title="指定容器">
    <view id="container" style="height: 150px; background-color: #fff">
      <wan-sticky :container="state.container" :web-offset-top="44">
        <wan-button type="warning" custom-style="margin-left: 215px;">
          指定容器
        </wan-button>
      </wan-sticky>
    </view>
  </demo-block>

  <!-- <demo-block title="嵌套在 scroll-view 内使用">
    <scroll-view
      id="scroller"
      scroll-y
      style="height: 200px; background-color: #fff"
    >
      <view style="height: 400px; padding-top: 50px">
        <wan-sticky
          :container="state.container2"
          :offset-top="state.offsetTop"
          :web-offset-top="44"
        >
          <wan-button type="warning"> 嵌套在 scroll-view 内 </wan-button>
        </wan-sticky>
      </view>
    </scroll-view>
  </demo-block> -->
  <view class="box"></view>
  <view class="box"></view>
  <view class="box"></view>
  <view class="box"></view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { reactive } from 'vue';
const state = reactive({
  container: () => {},
  container2: () => {},
  scrollTop: 0,
  offsetTop: 0
});

onLoad(() => {
  state.container = () => uni.createSelectorQuery().select('#container');
  state.container2 = () => uni.createSelectorQuery().select('#scroller');
});
</script>

<style lang="scss">
.wan-button {
  margin-left: 16px;
}

.sticky-container {
  position: relative;
  z-index: -1;
  height: 150px;
  background-color: #fff;
}
.box {
  width: 100%;
  height: 300px;
}
</style>
