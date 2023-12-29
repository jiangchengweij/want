<template>
  <demo-block title="基础用法">
    <wan-picker :columns="state.column1" @change="onChange1" />
  </demo-block>

  <demo-block title="默认选中项">
    <wan-picker
      :columns="state.column1"
      :default-index="2"
      @change="onChange1"
    />
  </demo-block>

  <demo-block title="展示顶部栏">
    <wan-picker
      showan-toolbar
      title="标题"
      :columns="state.column1"
      @change="onChange1"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </demo-block>

  <demo-block title="多列联动">
    <wan-picker :columns="state.column4" @change="onChange2" />
  </demo-block>

  <demo-block title="禁用选项">
    <wan-picker :columns="state.column2" />
  </demo-block>

  <demo-block title="加载状态">
    <wan-picker loading :columns="state.column4" />
  </demo-block>
  <wan-toast ref="toastRef" />
</template>

<script setup>
import { reactive, ref } from 'vue';

const toastRef = ref(null);

const state = reactive({
  column1: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  column2: [
    { text: '杭州', disabled: true },
    { text: '宁波' },
    { text: '温州' }
  ],
  column3: {
    浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    福建: ['福州', '厦门', '莆田', '三明', '泉州']
  },
  column4: [
    {
      values: ['浙江', '福建'],
      className: 'column1'
    },
    {
      values: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      className: 'column2',
      defaultIndex: 2
    }
  ]
});

function onChange1(event) {
  const { value, index } = event;
  toastRef.value.show({ message: `Value: ${value}, Index：${index}` });
}

function onConfirm(event) {
  const { value, index } = event;
  toastRef.value.show({ message: `Value: ${value}, Index：${index}` });
}

function onCancel() {
  toastRef.value.show({ message: '取消' });
}

function onChange2(event) {
  const { picker, value } = event;
  picker.setColumnValues(1, state.column3[value[0]]);
}
</script>

<style></style>
