<template>
  <demo-block title="基础用法" padding>
    <wan-switch v-model="state.checked" @change="onChange" />
  </demo-block>

  <demo-block title="禁用状态" padding>
    <wan-switch v-model="state.checked" disabled @change="onChange" />
  </demo-block>

  <demo-block title="加载状态" padding>
    <wan-switch v-model="state.checked" loading bind:change="onChange" />
  </demo-block>

  <demo-block title="自定义大小" padding>
    <wan-switch v-model="state.checked" size="24px" @change="onChange" />
  </demo-block>

  <demo-block title="自定义颜色" padding>
    <wan-switch
      v-model="state.checked"
      active-color="#07c160"
      inactive-color="#ee0a24"
      @change="onChange"
    />
  </demo-block>

  <demo-block title="异步控制" padding>
    <wan-switch :model-value="state.checked2" size="36px" @change="onChange2" />
  </demo-block>
</template>

<script setup>
import { reactive } from 'vue';
const state = reactive({
  checked: true,
  checked2: true
});

function onChange() {}

function onChange2(event) {
  uni.showModal({
    title: '提示',
    content: '是否切换开关？',
    success() {
      state.checked2 = event;
    }
  });
}
</script>

<style></style>
