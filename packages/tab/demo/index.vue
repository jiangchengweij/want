<template>
  <demo-block title="基础用法">
    <wan-tabs ref="tabs" :active="1" @change="onChange">
      <wan-tab
        v-for="(item, index) in state.tabs4"
        :key="index"
        :title="'标签 ' + item"
        :index="index"
      >
        <view class="content">
          {{ '内容' + item }}
        </view>
      </wan-tab>
    </wan-tabs>
  </demo-block>
  <demo-block title="通过名称匹配">
    <wan-tabs active="b">
      <wan-tab
        v-for="(item, index) in state.tabsWithName"
        :key="index"
        :index="index"
        :name="item.name"
        :title="'标签 ' + item.index"
      >
        <view class="content">
          {{ '内容' + item.index }}
        </view>
      </wan-tab>
    </wan-tabs>
  </demo-block>

  <demo-block title="横向滚动">
    <wan-tabs>
      <wan-tab
        v-for="(item, index) in state.tabs6"
        :key="index"
        :index="index"
        :title="'标签 ' + item"
      >
        <view class="content">
          {{ '内容' + item }}
        </view>
      </wan-tab>
    </wan-tabs>
  </demo-block>

  <demo-block title="禁用标签">
    <wan-tabs @disabled="onClickDisabled">
      <wan-tab
        v-for="(item, index) in state.tabs3"
        :key="index"
        :disabled="index === 1"
        :index="index"
        :title="'标签 ' + item"
      >
        <view class="content">
          {{ '内容' + item }}
        </view>
      </wan-tab>
    </wan-tabs>
  </demo-block>

  <demo-block title="样式风格">
    <wan-tabs type="card" tab-class="special-tab">
      <wan-tab
        v-for="(item, index) in state.tabs3"
        :key="index"
        :index="index"
        :title="'标签 ' + item"
      >
        <view class="content-2">
          {{ '内容' + item }}
        </view>
      </wan-tab>
    </wan-tabs>
  </demo-block>

  <demo-block title="点击事件">
    <wan-tabs @click="onClick">
      <wan-tab
        v-for="(item, index) in state.tabs2"
        :key="index"
        :index="index"
        :title="'标签 ' + item"
      >
        <view class="content">
          {{ '内容' + item }}
        </view>
      </wan-tab>
    </wan-tabs>
  </demo-block>

  <demo-block title="粘性布局">
    <wan-tabs ref="stickyTabRef" sticky :web-offset-top="44">
      <wan-tab
        v-for="(item, index) in state.tabs4"
        :key="index"
        :title="'标签 ' + item"
        :index="index"
      >
        <view class="content">
          {{ '内容' + item }}
        </view>
      </wan-tab>
    </wan-tabs>
  </demo-block>

  <demo-block title="切换动画">
    <wan-tabs animated>
      <wan-tab
        v-for="(item, index) in state.tabs4"
        :key="index"
        :title="'标签 ' + item"
        :index="index"
      >
        <view class="content">
          {{ '内容' + item }}
        </view>
      </wan-tab>
    </wan-tabs>
  </demo-block>

  <demo-block title="滑动切换">
    <wan-tabs swipeable>
      <wan-tab
        v-for="(item, index) in state.tabs4"
        :key="index"
        :title="'标签 ' + item"
        :index="index"
      >
        <view class="content">
          {{ '内容' + item }}
        </view>
      </wan-tab>
    </wan-tabs>
  </demo-block>

  <demo-block title="自定义标题">
    <wan-tabs
      :active="1"
      tab-class="special-tab"
      tab-active-class="special-tab-active"
      @change="onChange"
    >
      <template #nav-right>
        <wan-icon
          name="search"
          custom-class="right-nav"
          @click="onClickNavRight"
        />
      </template>
      <wan-tab
        v-for="(item, index) in state.tabs4"
        :key="index"
        :title="'标签 ' + item"
        :dot="index === 1"
        :info="index === 2 ? 99 : null"
        :index="index"
      >
        <view class="content">
          {{ '内容' + item }}
        </view>
      </wan-tab>
    </wan-tabs>
  </demo-block>

  <demo-block title="异步切换">
    <wan-tabs
      :active="1"
      swipeable
      use-before-change
      @change="onChange"
      @before-change="onBeforeChange"
    >
      <wan-tab
        v-for="(item, index) in state.tabs4"
        :key="index"
        :title="'标签 ' + item"
        :index="index"
      >
        <view class="content">
          {{ '内容' + item }}
        </view>
      </wan-tab>
    </wan-tabs>
  </demo-block>
  <view class="box"></view>
  <view class="box"></view>
</template>

<script setup>
import { reactive, ref } from 'vue';

const state = reactive({
  tabs2: [1, 2],
  tabs3: [1, 2, 3],
  tabs4: [1, 2, 3, 4],
  tabs6: [1, 2, 3, 4, 5, 6],
  tabsWithName: [
    { name: 'a', index: 1 },
    { name: 'b', index: 2 },
    { name: 'c', index: 3 }
  ]
});

function onChange(event) {
  console.log(event);
  uni.showToast({
    title: `切换到标签 ${event.index + 1}`,
    icon: 'none'
  });
}

function onClickDisabled(event) {
  uni.showToast({
    title: `标签 ${event.index + 1} 已被禁用`,
    icon: 'none'
  });
}

function onClickNavRight() {
  uni.showToast({
    title: '点击 right nav',
    icon: 'none'
  });
}

function onClick(event) {
  uni.showToast({
    title: `点击标签 ${event.index + 1}`,
    icon: 'none'
  });
}

function onBeforeChange(event) {
  const { callback, title } = event;

  uni.showModal({
    title: '异步切换',
    content: `确定要切换至 ${title} tab吗？`,
    success: (res) => {
      if (res.confirm) {
        callback(true);
      } else if (res.cancel) {
        callback(false);
      }
    }
  });
}

const tabs = ref(null);
</script>

<style>
.content {
  padding: 20px;
  background-color: #fff;
}

.content-2 {
  padding: 20px;
}

.right-nav {
  padding: 0 10px;
  line-height: 44px !important;
  background-color: #fff;
}

.special-tab {
  transition: all 0.25s ease-in-out;
}

.special-tab-active {
  font-size: 1.05em !important;
}

.box {
  width: 100%;
  height: 300px;
}
</style>
