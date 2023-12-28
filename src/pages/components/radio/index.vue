<template>
  <!-- 	<form @submit="onSubmit"> -->
  <demo-block title="基本用法" padding>
    <wan-radio-group
      v-model="state.radio1"
      @change="onChange('radio1', $event)"
    >
      <wan-radio name="1" custom-class="demo-radio">单选框 1</wan-radio>
      <wan-radio name="2">单选框 2</wan-radio>
    </wan-radio-group>
  </demo-block>

  <demo-block title="水平排列" padding>
    <wan-radio-group
      v-model="state.radio1"
      direction="horizontal"
      @change="onChange('radio1', $event)"
    >
      <wan-radio name="1">单选框 1</wan-radio>
      <wan-radio name="2">单选框 2</wan-radio>
    </wan-radio-group>
  </demo-block>

  <demo-block title="禁用状态" padding>
    <wan-radio-group
      v-model="state.radio2"
      disabled
      @change="onChange('radio2', $event)"
    >
      <wan-radio name="1" custom-class="demo-radio">单选框 1</wan-radio>
      <wan-radio name="2">单选框 2</wan-radio>
    </wan-radio-group>
  </demo-block>

  <demo-block title="自定义形状" padding>
    <wan-radio-group
      v-model="state.radioShape"
      @change="onChange('radioShape', $event)"
    >
      <wan-radio name="1" shape="square" custom-class="demo-radio"
        >单选框</wan-radio
      >
      <wan-radio name="2" shape="square">单选框</wan-radio>
    </wan-radio-group>
  </demo-block>

  <demo-block title="自定义颜色" padding>
    <wan-radio-group
      v-model="state.radio3"
      @change="onChange('radio3', $event)"
    >
      <wan-radio name="1" custom-class="demo-radio" checked-color="#07c160"
        >单选框</wan-radio
      >
      <wan-radio name="2" checked-color="#07c160">单选框</wan-radio>
    </wan-radio-group>
  </demo-block>

  <demo-block title="自定义大小" padding>
    <wan-radio-group
      v-model="state.radioSize"
      @change="onChange('radioSize', $event)"
    >
      <wan-radio name="1" icon-size="24px" custom-class="demo-radio"
        >单选框</wan-radio
      >
      <wan-radio name="2" icon-size="24px">单选框</wan-radio>
    </wan-radio-group>
  </demo-block>

  <demo-block title="自定义图标" padding>
    <wan-radio-group
      v-model="state.radio4"
      @change="onChange('radio4', $event)"
    >
      <wan-radio use-icon-slot name="1">
        自定义图标
        <template #icon>
          <image
            :src="state.radio4 === '1' ? state.icon.active : state.icon.normal"
            class="icon"
            mode="widthFix"
          ></image>
        </template>
      </wan-radio>
      <wan-radio use-icon-slot name="2">
        自定义图标
        <template #icon>
          <image
            :src="state.radio4 === '2' ? state.icon.active : state.icon.normal"
            class="icon"
            mode="widthFix"
          ></image>
        </template>
      </wan-radio>
    </wan-radio-group>
  </demo-block>

  <demo-block title="禁用文本点击" padding>
    <wan-radio-group
      v-model="state.radioLabel"
      @change="onChange('radioLabel', $event)"
    >
      <wan-radio label-disabled name="1" custom-class="demo-radio"
        >单选框 1</wan-radio
      >
      <wan-radio label-disabled name="2">单选框 2</wan-radio>
    </wan-radio-group>
  </demo-block>

  <demo-block title="与 Cell 组件一起使用">
    <wan-radio-group v-model="state.radio5">
      <wan-cell-group>
        <wan-cell title="单选框 1" clickable @click="onClick('1')">
          <template #right-icon>
            <wan-radio name="1"></wan-radio>
          </template>
        </wan-cell>
        <wan-cell title="单选框 2" clickable @click="onClick('2')">
          <template #right-icon>
            <wan-radio name="2"></wan-radio>
          </template>
        </wan-cell>
      </wan-cell-group>
    </wan-radio-group>
  </demo-block>
  <!-- 	<button form-type="submit">提交</button>
    </form> -->
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
  radio1: '1',
  radio2: '2',
  radio3: '1',
  radio4: '1',
  radio5: '1',
  radioSize: '1',
  radioLabel: '1',
  radioShape: '1',
  icon: {
    normal:
      'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
    active:
      'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
  }
});

function onChange(key, event) {
  state[key] = event;
}

function onClick(name) {
  state.radio5 = name;
}

function onSubmit(event) {
  console.log(event);
}
</script>

<style>
.demo-radio {
  margin-bottom: 10px;
}

.icon {
  width: 20px;
}
</style>
