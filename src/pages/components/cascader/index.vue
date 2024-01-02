<template>
  <demo-block title="基础用法">
    <wan-field
      :model-value="state.baseState.result"
      is-link
      readonly
      label="地区"
      :placeholder="state.selectArea"
      @click="onClick('baseState')"
    />
    <wan-popup :show="state.baseState.show" round position="bottom">
      <wan-cascader
        v-if="state.baseState.show"
        :value="state.baseState.value"
        :title="state.selectArea"
        :options="state.options"
        @close="onClose('baseState')"
        @finish="onFinish('baseState', $event)"
      />
    </wan-popup>
  </demo-block>

  <demo-block title="自定义颜色">
    <wan-field
      :model-value="state.customColorState.result"
      is-link
      readonly
      label="地区"
      :placeholder="state.selectArea"
      @click="onClick('customColorState')"
    />
    <wan-popup :show="state.customColorState.show" round position="bottom">
      <wan-cascader
        v-if="state.customColorState.show"
        :value="state.customColorState.value"
        :title="state.selectArea"
        :options="state.options"
        active-color="#ee0a24"
        @close="onClose('customColorState')"
        @finish="onFinish('customColorState', $event)"
      />
    </wan-popup>
  </demo-block>

  <demo-block title="异步加载选项">
    <wan-field
      :model-value="state.asyncState.result"
      is-link
      readonly
      label="地区"
      :placeholder="state.selectArea"
      @click="onClick('asyncState')"
    />
    <wan-popup :show="state.asyncState.show" round position="bottom">
      <wan-cascader
        v-if="state.asyncState.show"
        :value="state.asyncState.value"
        :title="state.selectArea"
        :options="state.asyncState.options"
        @close="onClose('asyncState')"
        @change="loadDynamicOptions"
        @finish="onFinish('asyncState', $event)"
      />
    </wan-popup>
  </demo-block>

  <demo-block title="自定义字段名">
    <wan-field
      :model-value="state.customFieldState.result"
      is-link
      readonly
      label="地区"
      :placeholder="state.selectArea"
      @click="onClick('customFieldState')"
    />
    <wan-popup
      :show="state.customFieldState.show"
      round
      position="bottom"
      safe-area-inset-bottom
    >
      <wan-cascader
        v-if="state.customFieldState.show"
        :value="state.customFieldState.value"
        :title="state.selectArea"
        :options="state.customFieldOptions"
        :field-names="state.fieldNames"
        @close="onClose('customFieldState')"
        @finish="onFinish('customFieldState', $event)"
      />
    </wan-popup>
  </demo-block>
</template>

<script setup>
import {
  isDef,
  isObj
} from '@/uni_modules/want/components/common/utils/validator';
import { reactive } from 'vue';

function deepClone(obj) {
  if (!isDef(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  if (isObj(obj)) {
    const to = {};
    Object.keys(obj).forEach((key) => {
      to[key] = deepClone(obj[key]);
    });

    return to;
  }

  return obj;
}

const zhCNOptions = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          {
            text: '上城区',
            value: '330102'
          },
          {
            text: '下城区',
            value: '330103'
          },
          {
            text: '江干区',
            value: '330104'
          }
        ]
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          {
            text: '海曙区',
            value: '330203'
          },
          {
            text: '江北区',
            value: '330205'
          },
          {
            text: '北仑区',
            value: '330206'
          }
        ]
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          {
            text: '鹿城区',
            value: '330302'
          },
          {
            text: '龙湾区',
            value: '330303'
          },
          {
            text: '瓯海区',
            value: '330304'
          }
        ]
      }
    ]
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          {
            text: '玄武区',
            value: '320102'
          },
          {
            text: '秦淮区',
            value: '320104'
          },
          {
            text: '建邺区',
            value: '320105'
          }
        ]
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          {
            text: '锡山区',
            value: '320205'
          },
          {
            text: '惠山区',
            value: '320206'
          },
          {
            text: '滨湖区',
            value: '320211'
          }
        ]
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          {
            text: '鼓楼区',
            value: '320302'
          },
          {
            text: '云龙区',
            value: '320303'
          },
          {
            text: '贾汪区',
            value: '320305'
          }
        ]
      }
    ]
  }
];

const asyncOptions1 = [
  {
    text: '浙江省',
    value: '330000',
    children: []
  }
];
const asyncOptions2 = [
  { text: '杭州市', value: '330100' },
  { text: '宁波市', value: '330200' }
];

function getCustomFieldOptions(options) {
  const newOptions = deepClone(options);
  const adjustFieldName = (item) => {
    if ('text' in item) {
      item.name = item.text;
      delete item.text;
    }
    if ('value' in item) {
      item.code = item.value;
      delete item.value;
    }
    if ('children' in item) {
      item.items = item.children;
      delete item.children;
      item.items.forEach(adjustFieldName);
    }
  };
  newOptions.forEach(adjustFieldName);
  return newOptions;
}
const state = reactive({
  area: '地区',
  options: zhCNOptions,
  selectArea: '请选择地区',
  baseState: {
    show: false,
    value: '',
    result: ''
  },
  asyncState: {
    show: false,
    value: undefined,
    result: '',
    options: asyncOptions1
  },
  fieldNames: {
    text: 'name',
    value: 'code',
    children: 'items'
  },
  customFieldOptions: getCustomFieldOptions(zhCNOptions),
  customFieldState: {
    show: false,
    value: '',
    result: ''
  },
  customColorState: {
    show: false,
    value: '',
    result: ''
  }
});

function onClick(stateKey) {
  state[`${stateKey}`].show = true;
}

function onClose(stateKey) {
  state[`${stateKey}`].show = false;
}

function onFinish(stateKey, event) {
  console.log(event);
  const { selectedOptions, value } = event;
  const result = selectedOptions
    .map((option) => option.text || option.name)
    .join('/');
  state[stateKey].value = value;
  state[stateKey].result = result;
  onClose(stateKey);
}

function loadDynamicOptions(e) {
  const { value } = e;
  if (value === '330000') {
    setTimeout(() => {
      state['asyncState'].options[0].children = asyncOptions2;
    }, 500);
  }
}
</script>

<style></style>
