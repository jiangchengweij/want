<template>
  <demo-block title="基础用法" padding>
    <wan-row>
      <wan-col span="8" custom-class="dark">span: 8</wan-col>
      <wan-col span="8" custom-class="light">span: 8</wan-col>
      <wan-col span="8" custom-class="dark">span: 8</wan-col>
    </wan-row>

    <wan-row>
      <wan-col span="4" custom-class="dark">span: 4</wan-col>
      <wan-col span="10" offset="4" custom-class="light"
        >offset: 4, span: 10</wan-col
      >
    </wan-row>

    <wan-row>
      <wan-col offset="12" span="12" custom-class="dark"
        >offset: 12, span: 12</wan-col
      >
    </wan-row>
  </demo-block>

  <demo-block title="在列元素之间增加间距" padding>
    <wan-row gutter="20">
      <wan-col span="8" custom-class="dark">span: 8</wan-col>
      <wan-col span="8" custom-class="light">span: 8</wan-col>
      <wan-col span="8" custom-class="dark">span: 8</wan-col>
    </wan-row>
  </demo-block>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.dark,
.light {
  color: #fff;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 10px;
  background-clip: content-box;
}

.dark {
  background-color: #39a9ed;
}

.light {
  background-color: #66c6f2;
}
</style>
