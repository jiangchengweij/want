<template>
  <demo-block title="基本用法">
    <wan-checkbox
      v-model="state.checkbox1"
      custom-class="demo-checkbox"
      @change="onChange('checkbox1', $event)"
    >
      复选框
    </wan-checkbox>
  </demo-block>

  <demo-block title="禁用状态">
    <wan-checkbox disabled :model-value="false" custom-class="demo-checkbox">
      复选框
    </wan-checkbox>
    <wan-checkbox disabled :model-value="true" custom-class="demo-checkbox">
      复选框
    </wan-checkbox>
  </demo-block>

  <demo-block title="自定义形状">
    <wan-checkbox
      v-model="state.checkboxShape"
      shape="square"
      custom-class="demo-checkbox"
      @change="onChange('checkboxShape', $event)"
    >
      复选框
    </wan-checkbox>
  </demo-block>

  <demo-block title="自定义颜色">
    <wan-checkbox
      v-model="state.checkbox2"
      checked-color="#07c160"
      custom-class="demo-checkbox"
      @change="onChange('checkbox2', $event)"
    >
      复选框
    </wan-checkbox>
  </demo-block>

  <demo-block title="自定义大小">
    <wan-checkbox
      v-model="state.checkboxSize"
      icon-size="25px"
      custom-class="demo-checkbox"
      @change="onChange('checkboxSize', $event)"
    >
      复选框
    </wan-checkbox>
  </demo-block>

  <demo-block title="自定义图标">
    <wan-checkbox
      v-model="state.checkbox3"
      use-icon-slot
      custom-class="demo-checkbox"
      @change="onChange('checkbox3', $event)"
    >
      自定义图标
      <template #icon>
        <image
          class="icon"
          mode="widthFix"
          :src="state.checkbox3 ? state.activeIcon : state.inactiveIcon"
        />
      </template>
    </wan-checkbox>
  </demo-block>

  <demo-block title="禁用文本点击">
    <wan-checkbox
      v-model="state.checkboxLabel"
      label-disabled
      custom-class="demo-checkbox"
      @change="onChange('checkboxLabel')"
    >
      复选框
    </wan-checkbox>
  </demo-block>

  <demo-block title="复选框组">
    <wan-checkbox-group
      v-model="state.result"
      @change="onChange('result', $event)"
    >
      <wan-checkbox
        v-for="item in state.list"
        :key="item"
        :name="item"
        custom-class="demo-checkbox"
      >
        复选框 {{ item }}
      </wan-checkbox>
    </wan-checkbox-group>
  </demo-block>

  <demo-block title="水平排列">
    <wan-checkbox-group
      v-model="state.result4"
      direction="horizontal"
      @change="onChange('result4', $event)"
    >
      <wan-checkbox
        v-for="item in state.list"
        :key="item"
        :name="item"
        custom-class="demo-checkbox"
      >
        复选框 {{ item }}
      </wan-checkbox>
    </wan-checkbox-group>
  </demo-block>

  <demo-block title="限制最大可选数">
    <wan-checkbox-group
      v-model="state.result2"
      :max="2"
      @change="onChange('result2', $event)"
    >
      <wan-checkbox
        v-for="item in state.list"
        :key="item"
        :name="item"
        custom-class="demo-checkbox"
      >
        复选框 {{ item }}
      </wan-checkbox>
    </wan-checkbox-group>
  </demo-block>

  <demo-block title="搭配单元格组件使用">
    <wan-checkbox-group
      v-model="state.result3"
      @change="onChange('result3', $event)"
    >
      <wan-cell-group>
        <wan-cell
          v-for="(item, index) in state.list"
          :key="item"
          :title="`复选框 ${item}`"
          value-class="value-class"
          clickable
          @click="toggle(index)"
        >
          <wan-checkbox ref="checkboxRefs" :name="item" @tap.stop="noop" />
        </wan-cell>
      </wan-cell-group>
    </wan-checkbox-group>
  </demo-block>
</template>

<script setup>
import { reactive, ref } from 'vue';
const state = reactive({
  checkbox1: true,
  checkbox2: true,
  checkbox3: true,
  checkboxLabel: true,
  checkboxSize: true,
  checkboxShape: true,
  list: ['a', 'b', 'c'],
  result: ['a', 'b'],
  result2: [],
  result3: [],
  result4: [],
  activeIcon: 'https://img.yzcdn.cn/vant/user-active.png',
  inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png'
});

const checkboxRefs = ref(null);

function onChange(key, event) {
  state[key] = event;
}

function toggle(index) {
  checkboxRefs.value[index].toggle();
}

function noop() {}
</script>

<style>
.demo-checkbox-group {
  margin: 10px 0 0 20px;
}

.demo-checkbox {
  margin: 10px 0 0 20px;
}

:deep(.value-class) {
  flex: none !important;
}

.icon {
  width: 20px;
}
</style>
