<template>
	<demo-block title="基础用法">
	  <w-steps
	    :steps="steps"
	    :active="state.active"
	    @click-step="onClick"
	    custom-class="demo-margin-bottom"
	  />
	
	  <w-button custom-class="demo-margin-left" @click="nextStep">下一步</w-button>
	</demo-block>
	
	<demo-block title="自定义样式">
	  <w-steps
	    :steps="steps"
	    :active="state.active"
	    active-icon="success"
	    active-color="#38f"
	    inactive-icon="arrow"
	  />
	</demo-block>
	
	<demo-block title="自定义图标">
	  <w-steps
	    :steps="state.customIconSteps"
	    :active="state.active"
	  />
	</demo-block>
	
	<demo-block title="竖向步骤条">
	  <w-steps
	    :steps="steps"
	    :active="state.active"
	    direction="vertical"
	    active-color="#ee0a24"
	  />
	</demo-block>
	
	<w-toast ref="toastRef" />
</template>

<script setup>
import { reactive, ref } from 'vue';
import icons from '../icon/config.js';
import Toast from '@/uni_modules/want/components/utils/toast.ts';

const steps = [
	{
		text: '步骤一',
		desc: '描述信息',
	},
	{
		text: '步骤二',
		desc: '描述信息',
	},
	{
		text: '步骤三',
		desc: '描述信息',
	},
	{
		text: '步骤四',
		desc: '描述信息',
	},
]

const state = reactive({
	active: 1,
	steps,
	customIconSteps: steps.map((item, index) => ({
		...item,
		inactiveIcon: icons.outline[index],
		activeIcon: icons.basic[index],
	})),
})

function nextStep() {
	state.active = ++state.active % 4
}

const toastRef = ref(null);

function onClick(event) {
	Toast({
		ref: toastRef.value,
		message: `Index: ${event}`,
	});
}
</script>

<style>
.demo-margin-left {
  margin-left: 10px;
}

.demo-margin-bottom {
  display: block;
  margin-bottom: 15px;
}
</style>
