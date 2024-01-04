<template>
  <wan-grid :column-num="2" :border="false">
    <wan-grid-item use-slot>
      <h3 class="demo-sidebar-title">基础用法</h3>
      <wan-sidebar custom-class="custom-sidebar">
        <wan-sidebar-item title="标签名" />
        <wan-sidebar-item title="标签名" />
        <wan-sidebar-item title="标签名" />
      </wan-sidebar>
    </wan-grid-item>

    <wan-grid-item use-slot>
      <h3 class="demo-sidebar-title">徽标提示</h3>
      <wan-sidebar custom-class="custom-sidebar">
        <wan-sidebar-item title="标签名" dot />
        <wan-sidebar-item title="标签名" badge="5" />
        <wan-sidebar-item title="标签名" badge="99+" />
      </wan-sidebar>
    </wan-grid-item>

    <wan-grid-item use-slot>
      <h3 class="demo-sidebar-title">禁用选项</h3>
      <wan-sidebar custom-class="custom-sidebar">
        <wan-sidebar-item title="标签名" />
        <wan-sidebar-item title="标签名" disabled />
        <wan-sidebar-item title="标签名" />
      </wan-sidebar>
    </wan-grid-item>

    <wan-grid-item use-slot>
      <h3 class="demo-sidebar-title">监听切换事件</h3>
      <wan-sidebar custom-class="custom-sidebar" @change="onChange">
        <wan-sidebar-item title="标签名 1" />
        <wan-sidebar-item title="标签名 2" />
        <wan-sidebar-item title="标签名 3" />
      </wan-sidebar>
    </wan-grid-item>
  </wan-grid>

  <wan-notify ref="notifyRef" />
</template>

<script setup>
import { ref } from 'vue';

const notifyRef = ref(null);
function onChange(event) {
  notifyRef.value.show({
    type: 'primary',
    message: `切换至第${event}项`
  });
}
</script>

<style>
.custom-sidebar {
  margin-left: 16px;
}

.demo-sidebar {
  background-color: #fff;
}

.demo-sidebar-title {
  margin-bottom: 16px;
  color: #969799;
  font-weight: normal;
  font-size: 14px;
}
</style>
