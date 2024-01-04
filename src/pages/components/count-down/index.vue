<template>
  <demo-block title="基础用法">
    <wan-count-down :time="state.time" />
  </demo-block>

  <demo-block title="自定义格式">
    <wan-count-down :time="state.time" format="DD 天 HH 时 mm 分 ss 秒" />
  </demo-block>

  <demo-block title="毫秒级渲染">
    <wan-count-down millisecond :time="state.time" format="HH:mm:ss:SSS" />
  </demo-block>

  <demo-block title="自定义样式">
    <wan-count-down use-slot :time="state.time" @change="onChange">
      <text class="item">{{ state.timeData.hours }}</text>
      <text class="item">{{ state.timeData.minutes }}</text>
      <text class="item">{{ state.timeData.seconds }}</text>
    </wan-count-down>
  </demo-block>

  <demo-block title="手动控制">
    <wan-count-down
      ref="countDownRef"
      millisecond
      :time="3000"
      :auto-start="false"
      format="ss:SSS"
      @finish="finished"
    />
    <wan-grid clickable column-num="3">
      <wan-grid-item text="开始" icon="play-circle-o" @click="start" />
      <wan-grid-item text="暂停" icon="pause-circle-o" @click="pause" />
      <wan-grid-item text="重置" icon="replay" @click="reset" />
    </wan-grid>
  </demo-block>

  <wan-toast ref="toastRef" />
</template>

<script setup>
import { reactive, ref } from 'vue';

const countDownRef = ref(null);
const toastRef = ref(null);

const state = reactive({
  time: 30 * 60 * 60 * 1000,
  timeData: {}
});

function onChange(e) {
  state.timeData = e;
}

function start() {
  countDownRef.value.start();
}

function pause() {
  countDownRef.value.pause();
}

function reset() {
  countDownRef.value.reset();
}

function finished() {
  toastRef.value.show({
    message: '倒计时结束'
  });
}
</script>

<style>
.wan-count-down {
  margin: 0 16px 10px;
}

.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #1989fa;
  border-radius: 2px;
}
</style>
