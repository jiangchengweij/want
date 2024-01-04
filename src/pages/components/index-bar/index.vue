<template>
  <wan-tabs :active="state.activeTab" @change="onChange">
    <wan-tab title="基础用法">
      <wan-index-bar
        v-if="state.activeTab === 0"
        ref="indexBarRef1"
        :scroll-top="state.scrollTop"
        web-offset-top="44"
      >
        <view v-for="item in state.indexList" :key="item">
          <wan-index-anchor :index="item" />
          <wan-cell title="文本" />
          <wan-cell title="文本" />
          <wan-cell title="文本" />
        </view>
      </wan-index-bar>
    </wan-tab>

    <wan-tab title="自定义索引列表">
      <wan-index-bar
        v-if="state.activeTab === 1"
        ref="indexBarRef2"
        :index-list="state.customIndexList"
        :scroll-top="state.scrollTop"
        web-offset-top="44"
      >
        <view v-for="(item, index) in state.customIndexList" :key="index">
          <wan-index-anchor use-slot :index="item">
            <text>标题{{ item }}</text>
          </wan-index-anchor>
          <wan-cell title="文本" />
          <wan-cell title="文本" />
          <wan-cell title="文本" />
        </view>
      </wan-index-bar>
    </wan-tab>
  </wan-tabs>
</template>

<script setup>
import { onPageScroll } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';

const indexList = [];
const charCodeOfA = 'A'.charCodeAt(0);
for (let i = 0; i < 26; i++) {
  indexList.push(String.fromCharCode(charCodeOfA + i));
}
const state = reactive({
  activeTab: 0,
  indexList,
  customIndexList: [1, 2, 3, 4, 5, 6, 8, 9, 10],
  scrollTop: 0
});

function onChange(event) {
  state.activeTab = event.name;
}

const indexBarRef1 = ref(null);
const indexBarRef2 = ref(null);

onPageScroll((event) => {
  state.scrollTop = event.scrollTop;
  if (indexBarRef1.value) {
    indexBarRef1.value.onPageScroll(event);
  }
  if (indexBarRef2.value) {
    indexBarRef2.value.onPageScroll(event);
  }
});
</script>

<style></style>
