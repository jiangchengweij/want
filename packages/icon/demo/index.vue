<template>
  <wan-tabs :active="state.active" color="#1989fa" @change="onSwitch(index)">
    <wan-tab title="用法示例" custom-class="demo-tab-pane" :index="0">
      <demo-block title="基础用法">
        <wan-col custom-class="col" span="6">
          <wan-icon :name="state.demoIcon" size="32px" custom-class="icon" />
        </wan-col>
      </demo-block>
      <demo-block title="提示信息">
        <wan-col custom-class="col" span="6">
          <wan-icon
            :name="state.demoIcon"
            size="32px"
            custom-class="icon"
            dot
          />
        </wan-col>
        <wan-col custom-class="col" span="6">
          <wan-icon
            :name="state.demoIcon"
            size="32px"
            custom-class="icon"
            info="9"
          />
        </wan-col>
        <wan-col custom-class="col" span="6">
          <wan-icon
            :name="state.demoIcon"
            size="32px"
            custom-class="icon"
            info="99+"
          />
        </wan-col>
      </demo-block>
      <demo-block title="图标颜色">
        <wan-col custom-class="col" span="6">
          <wan-icon
            :name="state.demoIcon"
            size="32px"
            custom-class="icon"
            color="#1989fa"
          />
        </wan-col>
        <wan-col custom-class="col" span="6">
          <wan-icon
            :name="state.demoIcon"
            size="32px"
            custom-class="icon"
            color="#07c160"
          />
        </wan-col>
      </demo-block>
      <demo-block title="图标大小">
        <wan-col custom-class="col" span="6">
          <wan-icon :name="state.demoIcon" size="40" custom-class="icon" />
        </wan-col>
        <wan-col custom-class="col" span="6">
          <wan-icon :name="state.demoIcon" size="3rem" custom-class="icon" />
        </wan-col>
      </demo-block>
    </wan-tab>
    <wan-tab title="基础图标" custom-class="demo-tab-pane" :index="1">
      <wan-col
        v-for="(item, index) in icons.basic"
        :key="index"
        custom-class="col"
        span="6"
      >
        <wan-icon :name="item" size="32px" custom-class="icon" />
        <view class="text">{{ item }}</view>
      </wan-col>
    </wan-tab>
    <wan-tab title="线框风格" custom-class="demo-tab-pane" :index="2">
      <wan-col
        v-for="(item, index) in icons.outline"
        :key="index"
        custom-class="col"
        span="6"
      >
        <wan-icon :name="item" size="32px" custom-class="icon" />
        <view class="text">{{ item }}</view>
      </wan-col>
    </wan-tab>
    <wan-tab title="实底风格" custom-class="demo-tab-pane" :index="3">
      <wan-col
        v-for="(item, index) in icons.filled"
        :key="index"
        custom-class="col"
        span="6"
      >
        <wan-icon :name="item" size="32px" custom-class="icon" />
        <view class="text">{{ item }}</view>
      </wan-col>
    </wan-tab>
  </wan-tabs>
</template>

<script setup>
import { reactive } from 'vue';
import icons from './config.js';

const state = reactive({
  active: 0,
  demoIcon: 'chat-o',
  demoImage: 'https://b.yzcdn.cn/wt/icon-demo-1126.png'
});

function onSwitch(index) {
  state.active = index;
}
</script>

<style>
.col {
  display: inline-block;
  float: none;
  text-align: center;
  vertical-align: middle;
}

::v-deep .icon {
  margin: 16px 0;
  color: #323233;
}

.text {
  display: block;
  height: 36px;
  margin: -4px 0 4px;
  padding: 0 5px;
  color: #646566;
  font-size: 12px;
  line-height: 18px;
}

::v-deep .demo-tab-pane {
  margin: 20px;
  background-color: #fff;
}
</style>
