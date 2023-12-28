<template>
  <demo-block title="基础用法">
    <wan-rate v-model="state.value1" custom-class="rate-position" />
  </demo-block>

  <demo-block title="自定义图标">
    <wan-rate
      v-model="state.value2"
      custom-class="rate-position"
      icon="like"
      void-icon="like-o"
    />
  </demo-block>

  <demo-block title="自定义样式">
    <wan-rate
      v-model="state.value3"
      custom-class="rate-position"
      :size="25"
      color="#ffd21e"
      void-icon="star"
      void-color="#eee"
    />
  </demo-block>

  <demo-block title="半星">
    <wan-rate
      v-model="state.value4"
      custom-class="rate-position"
      allow-half
      void-icon="star"
      void-color="#eee"
    />
  </demo-block>

  <demo-block title="自定义数量">
    <wan-rate v-model="state.value5" custom-class="rate-position" :count="6" />
  </demo-block>

  <demo-block title="禁用状态">
    <wan-rate v-model="state.value6" custom-class="rate-position" disabled />
  </demo-block>

  <demo-block title="只读状态">
    <wan-rate v-model="state.value6" custom-class="rate-position" readonly />
  </demo-block>

  <demo-block title="监听 change 事件">
    <wan-rate
      v-model="state.value8"
      custom-class="rate-position"
      @change="onChange"
    />
  </demo-block>

  <wan-toast ref="toastRef" />
</template>

<script setup>
import { reactive, ref } from 'vue';

const state = reactive({
  value1: 3,
  value2: 3,
  value3: 3,
  value4: 2.5,
  value5: 4,
  value6: 3,
  value8: 2
});
const toastRef = ref(null);

function onChange(event) {
  toastRef.value.show({
    message: '当前值：' + event
  });
}
</script>

<style>
.rate-position {
  margin-left: 15px;
}
</style>
