<template>
	<demo-block title="基本用法">
	  <w-checkbox
	    v-model="state.checkbox1"
	    custom-class="demo-checkbox"
	    @change="onChange('checkbox1', $event)"
	  >
	    复选框
	  </w-checkbox>
	</demo-block>
	
	<demo-block title="禁用状态">
	  <w-checkbox
	    disabled
	    :modelValue="false"
	    custom-class="demo-checkbox"
	  >
	    复选框
	  </w-checkbox>
	  <w-checkbox
	    disabled
	    :modelValue="true"
	    custom-class="demo-checkbox"
	  >
	    复选框
	  </w-checkbox>
	</demo-block>
	
	<demo-block title="自定义形状">
	  <w-checkbox
	    v-model="state.checkboxShape"
	    shape="square"
	    custom-class="demo-checkbox"
	    @change="onChange('checkboxShape', $event)"
	  >
	    复选框
	  </w-checkbox>
	</demo-block>
	
	<demo-block title="自定义颜色">
	  <w-checkbox
			v-model="state.checkbox2"
	    checked-color="#07c160"
	    custom-class="demo-checkbox"
	    @change="onChange('checkbox2', $event)"
	  >
	    复选框
	  </w-checkbox>
	</demo-block>
	
	<demo-block title="自定义大小">
	  <w-checkbox
	    icon-size="25px"
			v-model="state.checkboxSize"
	    custom-class="demo-checkbox"
	    @change="onChange('checkboxSize', $event)"
	  >
	    复选框
	  </w-checkbox>
	</demo-block>
	
	<demo-block title="自定义图标">
	  <w-checkbox
	    use-icon-slot
			v-model="state.checkbox3"
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
	  </w-checkbox>
	</demo-block>
	
	<demo-block title="禁用文本点击">
	  <w-checkbox
	    label-disabled
			v-model="state.checkboxLabel"
	    custom-class="demo-checkbox"
	    @change="onChange('checkboxLabel')"
	  >
	    复选框
	  </w-checkbox>
	</demo-block>
	
	<demo-block title="复选框组">
	  <w-checkbox-group v-model="state.result" @change="onChange('result', $event)">
	    <w-checkbox
	      v-for="(item, index) in state.list"
	      :key="item"
	      :name="item"
	      custom-class="demo-checkbox"
	    >
	      复选框 {{ item }}
	    </w-checkbox>
	  </w-checkbox-group>
	</demo-block>
	
	<demo-block title="水平排列">
	  <w-checkbox-group direction="horizontal" v-model="state.result4" @change="onChange('result4', $event)">
	    <w-checkbox
				v-for="(item, index) in state.list"
				:key="item"
				:name="item"
				custom-class="demo-checkbox"
	    >
	      复选框 {{ item }}
	    </w-checkbox>
	  </w-checkbox-group>
	</demo-block>
	
	<demo-block title="限制最大可选数">
	  <w-checkbox-group v-model="state.result2" :max="2" @change="onChange('result2', $event)">
	    <w-checkbox
				v-for="(item, index) in state.list"
				:key="item"
				:name="item"
				custom-class="demo-checkbox"
	    >
	      复选框 {{ item }}
	    </w-checkbox>
	  </w-checkbox-group>
	</demo-block>
	
	<demo-block title="搭配单元格组件使用">
	  <w-checkbox-group  v-model="state.result3" @change="onChange('result3', $event)">
	    <w-cell-group >
	      <w-cell
					v-for="(item, index) in state.list"
					:key="item"
	        :title="`复选框 ${ item }`"
	        value-class="value-class"
	        clickable
	        @click="toggle(index)"
	      >
	        <w-checkbox @tap.stop="noop" ref="checkboxRefs" :name="item" />
	      </w-cell>
	    </w-cell-group>
	  </w-checkbox-group>
	</demo-block>
</template>

<script setup >
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
	inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png',
})

const checkboxRefs = ref(null)

function onChange(key, event) {
	state[key] = event
}

function toggle(index) {
	checkboxRefs.value[index].toggle()
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
