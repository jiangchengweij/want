<template>
  <demo-block title="基础用法" padding>
    <wan-button type="primary" @click="toggleActionSheet1">弹出菜单</wan-button>
    <wan-action-sheet
      :show="state.show1"
      :actions="state.action1"
      @close="toggleActionSheet1"
    />
  </demo-block>

  <demo-block title="选项状态" padding>
    <wan-button type="primary" @click="toggleActionSheet2">弹出菜单</wan-button>
    <wan-action-sheet
      :show="state.show2"
      :actions="state.action2"
      @close="toggleActionSheet2"
    />
  </demo-block>

  <demo-block title="展示取消按钮" padding>
    <wan-button type="primary" @click="toggleActionSheet3">弹出菜单</wan-button>
    <wan-action-sheet
      :show="state.show3"
      :actions="state.action1"
      cancel-text="取消"
      @close="toggleActionSheet3"
    >
    </wan-action-sheet>
  </demo-block>

  <demo-block title="展示描述信息" padding>
    <wan-button type="primary" @click="toggleActionSheet4">弹出菜单</wan-button>
    <wan-action-sheet
      :show="state.show4"
      :actions="state.action1"
      description="这是一段描述信息"
      @close="toggleActionSheet4"
    >
    </wan-action-sheet>
  </demo-block>

  <demo-block title="展示标题栏" padding>
    <wan-button type="primary" @click="toggleActionSheet5">弹出菜单</wan-button>
    <wan-action-sheet
      :show="state.show5"
      title="标题"
      @close="toggleActionSheet5"
    >
      <view class="content">内容</view>
    </wan-action-sheet>
  </demo-block>

  <demo-block title="微信开放能力" padding>
    <wan-button type="primary" @click="toggleActionSheet6">弹出菜单</wan-button>
    <wan-action-sheet
      :show="state.show6"
      title="标题"
      :actions="state.action6"
      @close="toggleActionSheet6"
      @getuserinfo="onGetUserInfo"
    >
    </wan-action-sheet>
  </demo-block>
</template>

<script setup>
import { reactive } from 'vue';
const state = reactive({
  show1: false,
  show2: false,
  show3: false,
  show4: false,
  show5: false,
  show6: false,
  action1: [
    { name: '选项' },
    { name: '选项' },
    { name: '选项', subname: '描述信息' }
  ],
  action2: [
    { name: '着色选项', color: '#ee0a24' },
    { loading: true },
    { name: '禁用选项', disabled: true }
  ],
  action6: [{ name: '获取用户信息', color: '#07c160', openType: 'getUserInfo' }]
});

function toggle(type) {
  state[type] = !state[type];
}

function toggleActionSheet1() {
  toggle('show1');
}

function toggleActionSheet2() {
  toggle('show2');
}

function toggleActionSheet3() {
  toggle('show3');
}

function toggleActionSheet4() {
  toggle('show4');
}

function toggleActionSheet5() {
  toggle('show5');
}

function toggleActionSheet6() {
  toggle('show6');
}

function onGetUserInfo(e) {
  console.log(e.detail);
}
</script>

<style>
.content {
  padding: 20px;
}
</style>
