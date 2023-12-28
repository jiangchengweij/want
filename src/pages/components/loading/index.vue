<template>
  <demo-block title="加载类型" padding>
    <wan-loading custom-class="demo-loading" />
    <wan-loading custom-class="demo-loading" type="spinner" />
  </demo-block>

  <demo-block title="自定义颜色" padding>
    <wan-loading custom-class="demo-loading" color="#1989fa" />
    <wan-loading custom-class="demo-loading" type="spinner" color="#1989fa" />
  </demo-block>

  <demo-block title="加载文案" padding>
    <wan-loading custom-class="demo-loading" size="24px">加载中...</wan-loading>
  </demo-block>

  <demo-block title="垂直排列" padding>
    <wan-loading custom-class="demo-loading" size="24px" vertical
      >加载中...</wan-loading
    >
  </demo-block>
</template>

<script></script>

<style>
.demo-loading {
  margin: 4px 16px 4px 0;
}
</style>
