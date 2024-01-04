<template>
  <demo-block title="基础用法" padding>
    <wan-empty description="描述文字" />
  </demo-block>

  <demo-block title="图片类型">
    <wan-tabs :active="state.activeTab" @change="onChange">
      <wan-tab title="通用错误">
        <wan-empty image="error" description="描述文字" />
      </wan-tab>
      <wan-tab title="网络错误">
        <wan-empty image="network" description="描述文字" />
      </wan-tab>
      <wan-tab title="搜索提示">
        <wan-empty image="search" description="描述文字" />
      </wan-tab>
    </wan-tabs>
  </demo-block>

  <demo-block title="自定义图片" padding>
    <wan-empty
      custom-class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="描述文字"
    />
  </demo-block>

  <demo-block title="底部内容" padding>
    <wan-empty description="描述文字">
      <wan-button round type="danger" custom-class="bottom-button">
        按钮
      </wan-button>
    </wan-empty>
  </demo-block>
</template>

<script setup>
import { reactive } from 'vue';
const state = reactive({ activeTab: 0 });

function onChange(event) {
  state.activeTab = event.name;
}
</script>

<style>
.custom-image .wan-empty__image {
  width: 90px;
  height: 90px;
}

.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
