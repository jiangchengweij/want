<template>
  <wan-area
    :value="state.value"
    :loading="state.loading"
    :area-list="areaList"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script setup>
import { reactive } from 'vue';
import { areaList } from './areaList.js';

const state = reactive({
  loading: false,
  value: '330302'
});

function onChange(event) {
  const { values } = event;

  uni.showToast({
    icon: 'none',
    title: values.map((item) => item.name).join('-')
  });
}

function onConfirm(event) {
  console.log(event);
}

function onCancel(event) {
  console.log(event);
}
</script>

<style></style>
