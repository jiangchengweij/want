<template>
  <demo-block custom-class="white" title="基础用法">
    <wan-dropdown-menu web-offset-top="44">
      <wan-dropdown-item v-model="state.value1" :options="state.option1" />
      <wan-dropdown-item v-model="state.value2" :options="state.option2" />
    </wan-dropdown-menu>
  </demo-block>

  <demo-block custom-class="white" title="自定义菜单内容">
    <wan-dropdown-menu web-offset-top="44">
      <wan-dropdown-item v-model="state.value1" :options="state.option1" />
      <wan-dropdown-item ref="itemRef" :title="state.itemTitle">
        <wan-cell :title="state.switchTitle1">
          <template #right-icon>
            <wan-switch
              v-model="state.switch1"
              size="24px"
              style="height: 26px"
              active-color="#ee0a24"
              @change="onSwitch1Change"
            />
          </template>
        </wan-cell>
        <wan-cell :title="state.switchTitle2">
          <template #right-icon>
            <wan-switch
              v-model="state.switch2"
              size="24px"
              style="height: 26px"
              active-color="#ee0a24"
              @change="onSwitch2Change"
            />
          </template>
        </wan-cell>
        <view style="padding: 5px 16px">
          <wan-button type="danger" block round @click="onConfirm">
            确认
          </wan-button>
        </view>
      </wan-dropdown-item>
    </wan-dropdown-menu>
  </demo-block>

  <demo-block custom-class="white" title="自定义选中状态颜色">
    <wan-dropdown-menu active-color="#1989fa" web-offset-top="44">
      <wan-dropdown-item v-model="state.value1" :options="state.option1" />
      <wan-dropdown-item v-model="state.value2" :options="state.option2" />
    </wan-dropdown-menu>
  </demo-block>

  <demo-block custom-class="white" title="向上展开">
    <wan-dropdown-menu direction="up" web-offset-top="44">
      <wan-dropdown-item v-model="state.value1" :options="state.option1" />
      <wan-dropdown-item v-model="state.value2" :options="state.option2" />
    </wan-dropdown-menu>
  </demo-block>

  <demo-block custom-class="white" title="禁用菜单">
    <wan-dropdown-menu web-offset-top="44">
      <wan-dropdown-item
        v-model="state.value1"
        disabled
        :options="state.option1"
      />
      <wan-dropdown-item
        v-model="state.value2"
        disabled
        :options="state.option2"
      />
    </wan-dropdown-menu>
  </demo-block>

  <demo-block custom-class="white" title="异步打开/关闭">
    <wan-dropdown-menu web-offset-top="44">
      <wan-dropdown-item
        v-model="state.value1"
        :options="state.option1"
        use-before-toggle
        @before-toggle="onBeforeChange"
      />
    </wan-dropdown-menu>
  </demo-block>
</template>

<script setup>
import { reactive, ref } from 'vue';
const state = reactive({
  switchTitle1: '包邮',
  switchTitle2: '团购',
  itemTitle: '筛选',
  option1: [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 }
  ],
  option2: [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' }
  ],
  switch1: true,
  switch2: false,
  value1: 0,
  value2: 'a'
});

const itemRef = ref(null);

function onConfirm() {
  itemRef.value.toggle();
}

function onSwitch1Change(event) {
  state.switch1 = event;
}

function onSwitch2Change(event) {
  state.switch2 = event;
}

function onBeforeChange({ status, callback }) {
  uni.showModal({
    title: '异步打开/关闭',
    content: `确定要${status ? '打开' : '关闭'}下拉菜单吗？`,
    success: (res) => {
      if (res.confirm) {
        callback(true);
      } else if (res.cancel) {
        callback(false);
      }
    }
  });
}
</script>

<style></style>
