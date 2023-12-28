<template>
  <demo-block title="基础用法">
    <wan-cell title="展示弹出层" is-link @click="showBasic" />
    <wan-popup
      :show="state.basic"
      custom-style="padding: 30px 50px"
      @close="hideBasic"
    >
      内容
    </wan-popup>
  </demo-block>

  <demo-block title="弹出位置">
    <wan-cell title="顶部弹出" is-link @click="showTop" />
    <wan-cell title="底部弹出" is-link @click="showBottom" />
    <wan-cell title="左侧弹出" is-link @click="showLeft" />
    <wan-cell title="右侧弹出" is-link @click="showRight" />

    <wan-popup
      :show="state.top"
      position="top"
      custom-style="height: 20%"
      @close="hideTop"
    />
    <wan-popup
      :show="state.bottom"
      position="bottom"
      custom-style="height: 20%"
      @close="hideBottom"
    />
    <wan-popup
      :show="state.left"
      position="left"
      custom-style="width: 20%; height: 100%;"
      @close="hideLeft"
    />
    <wan-popup
      :show="state.right"
      position="right"
      custom-style="width: 20%; height: 100%;"
      @close="hideRight"
    />
  </demo-block>

  <demo-block title="关闭图标">
    <wan-cell title="关闭图标" is-link @click="showCloseIcon" />
    <wan-cell title="自定义图标" is-link @click="showCustomCloseIcon" />
    <wan-cell title="图标位置" is-link @click="showCustomIconPosition" />

    <wan-popup
      :show="state.closeIcon"
      closeable
      position="bottom"
      custom-style="height: 20%"
      @close="hideCloseIcon"
    />

    <wan-popup
      :show="state.customCloseIcon"
      closeable
      close-icon="close"
      position="bottom"
      custom-style="height: 20%"
      @close="hideCustomCloseIcon"
    />

    <wan-popup
      :show="state.customIconPosition"
      closeable
      close-icon-position="top-left"
      position="bottom"
      custom-style="height: 20%"
      @close="hideCustomIconPosition"
    />
  </demo-block>

  <demo-block title="圆角弹窗">
    <wan-cell title="圆角弹窗" is-link @click="showRound" />

    <wan-popup
      :show="state.round"
      round
      position="bottom"
      custom-style="height: 20%"
      @close="hideRound"
    />
  </demo-block>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
  basic: false,
  top: false,
  bottom: false,
  left: false,
  right: false,
  round: false,
  closeIcon: false,
  customCloseIcon: false,
  customIconPosition: false
});

function toggle(type, show) {
  state[type] = show;
}

function showBasic() {
  toggle('basic', true);
}

function hideBasic() {
  toggle('basic', false);
}

function showTop() {
  toggle('top', true);
}

function hideTop() {
  toggle('top', false);
}

function showLeft() {
  toggle('left', true);
}

function hideLeft() {
  toggle('left', false);
}

function showRight() {
  toggle('right', true);
}

function hideRight() {
  toggle('right', false);
}

function showBottom() {
  toggle('bottom', true);
}

function hideBottom() {
  toggle('bottom', false);
}

function showRound() {
  toggle('round', true);
}

function hideRound() {
  toggle('round', false);
}

function showCloseIcon() {
  toggle('closeIcon', true);
}

function hideCloseIcon() {
  toggle('closeIcon', false);
}

function showCustomCloseIcon() {
  toggle('customCloseIcon', true);
}

function hideCustomCloseIcon() {
  toggle('customCloseIcon', false);
}

function showCustomIconPosition() {
  toggle('customIconPosition', true);
}

function hideCustomIconPosition() {
  toggle('customIconPosition', false);
}
</script>
