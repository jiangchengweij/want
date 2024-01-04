<template>
  <demo-block card title="提示弹窗" padding>
    <wan-cell title="提示弹窗" is-link @click="onClickAlert" />
    <wan-cell title="提示弹窗（无标题）" is-link @click="onClickAlert2" />
    <wan-cell title="确认弹窗" is-link @click="onClickConfirm" />
  </demo-block>

  <demo-block card title="圆角按钮样式" padding>
    <wan-cell title="提示弹窗" is-link @click="onClickThemeAlert" />
    <wan-cell title="提示弹窗（无标题）" is-link @click="onClickThemeAlert2" />
  </demo-block>

  <demo-block card title="异步关闭" padding>
    <wan-cell title="异步关闭" @click="onClickAsyncClose" />
  </demo-block>

  <demo-block card title="组件调用" padding>
    <wan-cell title="组件调用" @click="showCustomDialog" />
  </demo-block>

  <wan-dialog
    use-slot
    title="标题"
    :show="state.show"
    show-cancel-button
    confirm-button-open-type="getUserInfo"
    @close="onClose"
    @getuserinfo="getUserInfo"
  >
    <image
      class="demo-image"
      src="https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg"
    />
  </wan-dialog>

  <wan-dialog ref="dialogRef" />
</template>

<script setup>
import { reactive, ref } from 'vue';

const message = '代码是写出来给人看的，附带能在机器上运行';

const dialogRef = ref(null);

const state = reactive({
  show: false
});

function showCustomDialog() {
  state.show = true;
}

function getUserInfo(event) {
  console.log(event.detail);
}

function onClickThemeAlert() {
  dialogRef.value.show({
    title: '标题',
    theme: 'round-button',
    message
  });
}

function onClickThemeAlert2() {
  dialogRef.value.show({
    theme: 'round-button',
    message
  });
}

function onClickAlert() {
  dialogRef.value.show({
    title: '标题',
    message
  });
}

function onClickAlert2() {
  dialogRef.value.show({
    message
  });
}

function onClickConfirm() {
  dialogRef.value
    .show({
      showCancelButton: true,
      title: '标题',
      message
    })
    .catch((e) => {});
}

function onClickAsyncClose() {
  const beforeClose = (action) =>
    new Promise((resolve) => {
      setTimeout(() => {
        if (action === 'confirm') {
          resolve(true);
        } else {
          // 拦截取消操作
          resolve(false);
        }
      }, 1000);
    });

  dialogRef.value
    .show({
      showCancelButton: true,
      title: '标题',
      message,
      beforeClose
    })
    .catch((e) => {});
}

function onClose() {
  state.show = false;
}
</script>

<style>
.demo-image {
  box-sizing: border-box;
  width: 100%;
  padding: 25px 20px 0;
}
</style>
