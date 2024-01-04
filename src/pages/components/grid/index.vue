<template>
  <demo-block title="基本用法">
    <wan-grid>
      <wan-grid-item
        v-for="(item, index) in state.array4"
        :key="item"
        icon="photo-o"
        :text="'文字' + item"
        :index="index"
      />
    </wan-grid>
  </demo-block>

  <demo-block title="自定义列数">
    <wan-grid :column-num="3">
      <wan-grid-item
        v-for="(item, index) in state.array6"
        :key="item"
        icon="photo-o"
        text="文字"
        :index="index"
      />
    </wan-grid>
  </demo-block>

  <demo-block title="自定义内容">
    <wan-grid :column-num="3" :border="false">
      <wan-grid-item
        v-for="(item, index) in state.array3"
        :key="item"
        use-slot
        :index="index"
      >
        <image
          style="width: 100%; height: 90px"
          :src="`https://img.yzcdn.cn/vant/apple-${index + 1}.jpg`"
        />
      </wan-grid-item>
    </wan-grid>
  </demo-block>

  <demo-block title="正方形格子">
    <wan-grid square>
      <wan-grid-item
        v-for="(item, index) in state.array8"
        :key="item"
        icon="photo-o"
        text="文字"
        :index="index"
      />
    </wan-grid>
  </demo-block>

  <demo-block title="格子间距">
    <wan-grid :gutter="10">
      <wan-grid-item
        v-for="(item, index) in state.array8"
        :key="item"
        icon="photo-o"
        text="文字"
        :index="index"
      />
    </wan-grid>
  </demo-block>

  <demo-block title="内容横排">
    <wan-grid direction="horizontal" :column-num="3">
      <wan-grid-item
        v-for="(item, index) in state.array3"
        :key="item"
        icon="photo-o"
        text="文字"
        :index="index"
      />
    </wan-grid>
  </demo-block>

  <demo-block title="页面跳转">
    <wan-grid clickable :column-num="2">
      <wan-grid-item
        icon="home-o"
        :index="0"
        link-type="navigateTo"
        url="/pages/components/button/index"
        text="Navigate 跳转"
      />
      <wan-grid-item
        icon="search"
        :index="1"
        link-type="reLaunch"
        url="/pages/components/button/index"
        text="ReLaunch 跳转"
      />
    </wan-grid>
  </demo-block>

  <demo-block title="徽标提示">
    <wan-grid :column-num="2">
      <wan-grid-item icon="home-o" :index="0" text="文字" dot />
      <wan-grid-item icon="search" :index="1" text="文字" badge="99+" />
    </wan-grid>
  </demo-block>
</template>

<script setup>
import { reactive } from 'vue';
const state = reactive({
  array3: [0, 1, 2],
  array4: [0, 1, 2, 3],
  array6: [0, 1, 2, 3, 4, 5],
  array8: [0, 1, 2, 3, 4, 5, 6, 7]
});
</script>

<style></style>
