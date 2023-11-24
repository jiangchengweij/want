<template>
<!-- 	<form @submit="onSubmit"> -->
	<demo-block title="基本用法" padding>
	  <w-radio-group
	    v-model="state.radio1"
	    @change="onChange('radio1', $event)"
	  >
	    <w-radio name="1" custom-class="demo-radio">单选框 1</w-radio>
	    <w-radio name="2">单选框 2</w-radio>
	  </w-radio-group>
	</demo-block>
	
	<demo-block title="水平排列" padding>
	  <w-radio-group
			v-model="state.radio1"
	    @change="onChange('radio1', $event)"
	    direction="horizontal"
	  >
	    <w-radio name="1">单选框 1</w-radio>
	    <w-radio name="2">单选框 2</w-radio>
	  </w-radio-group>
	</demo-block>
	
	<demo-block title="禁用状态" padding>
	  <w-radio-group
	    disabled
	    v-model="state.radio2"
	    @change="onChange('radio2', $event)"
	  >
	    <w-radio name="1" custom-class="demo-radio">单选框 1</w-radio>
	    <w-radio name="2">单选框 2</w-radio>
	  </w-radio-group>
	</demo-block>
	
	<demo-block title="自定义形状" padding>
	  <w-radio-group
	    v-model="state.radioShape"
	    @change="onChange('radioShape', $event)"
	  >
	    <w-radio name="1" shape="square" custom-class="demo-radio"
	    >单选框</w-radio
	    >
	    <w-radio name="2" shape="square">单选框</w-radio>
	  </w-radio-group>
	</demo-block>
	
	<demo-block title="自定义颜色" padding>
	  <w-radio-group
	    v-model="state.radio3"
	    @change="onChange('radio3', $event)"
	  >
	    <w-radio name="1" custom-class="demo-radio" checked-color="#07c160"
	    >单选框</w-radio
	    >
	    <w-radio name="2" checked-color="#07c160">单选框</w-radio>
	  </w-radio-group>
	</demo-block>
	
	<demo-block title="自定义大小" padding>
	  <w-radio-group
	    v-model="state.radioSize"
	    @change="onChange('radioSize', $event)"
	  >
	    <w-radio name="1" icon-size="24px" custom-class="demo-radio"
	    >单选框</w-radio
	    >
	    <w-radio name="2" icon-size="24px">单选框</w-radio>
	  </w-radio-group>
	</demo-block>
	
	<demo-block title="自定义图标" padding>
	  <w-radio-group
	    v-model="state.radio4"
	    @change="onChange('radio4', $event)"
	  >
	    <w-radio use-icon-slot name="1">
	      自定义图标
				<template #icon>
					<image
					  :src="state.radio4 === '1' ? state.icon.active : state.icon.normal"
					  class="icon"
					  mode="widthFix"
					></image>
				</template>
	    </w-radio>
	    <w-radio use-icon-slot name="2">
	      自定义图标
				<template #icon>
					<image
					  :src="state.radio4 === '2' ? state.icon.active : state.icon.normal"
					  class="icon"
					  mode="widthFix"
					></image>
				</template>
	    </w-radio>
	  </w-radio-group>
	</demo-block>
	
	<demo-block title="禁用文本点击" padding>
	  <w-radio-group
			v-model="state.radioLabel"
	    @change="onChange('radioLabel', $event)"
	  >
	    <w-radio label-disabled name="1" custom-class="demo-radio"
	    >单选框 1</w-radio
	    >
	    <w-radio label-disabled name="2">单选框 2</w-radio>
	  </w-radio-group>
	</demo-block>
	
	<demo-block title="与 Cell 组件一起使用">
	  <w-radio-group v-model="state.radio5">
	    <w-cell-group>
	      <w-cell title="单选框 1" clickable @click="onClick('1')">
					<template #right-icon>
						<w-radio name="1"></w-radio>
					</template>
	      </w-cell>
	      <w-cell title="单选框 2" clickable @click="onClick('2')">
					<template #right-icon>
						<w-radio name="2"></w-radio>
					</template>
	      </w-cell>
	    </w-cell-group>
	  </w-radio-group>
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
			'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png',
	},
})

function onChange(key, event) {
	state[key] = event
}

function onClick(name) {
	state.radio5 = name
}

function onSubmit(event) {
	console.log(event)
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
