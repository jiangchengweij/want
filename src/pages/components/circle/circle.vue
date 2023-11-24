<template>
	<demo-block title="基础用法">
	  <w-circle id="circle1" :value="state.value" :text="`${state.value}%`" />
	</demo-block>
	
	<demo-block title="样式定制">
	  <w-circle :value="state.value" id="circle2" :stroke-width="6" text="宽度定制" />
	  <w-circle :value="state.value" id="circle3" layer-color="#eee" color="#ee0a24" text="颜色定制" />
	  <w-circle :value="state.value" id="circle4" :color="state.gradientColor" text="渐变色" />
	  <w-circle :value="state.value" id="circle5" color="#07c160" :clockwise="false" text="逆时针" />
	  <w-circle :value="state.value" id="circle6" :size="120" text="大小定制" />
	</demo-block>
	
	<demo-block title=" ">
		<w-button type="primary" custom-class="demo-margin-left" size="small" @click="run(10)">增加</w-button>
		<w-button type="danger" custom-class="demo-margin-left" size="small" @click="run(-10)">减少</w-button>
	</demo-block>
</template>

<script setup>
import { reactive } from 'vue';
const state = reactive({
	value: 25,
	gradientColor: {
		'0%': '#ffd01e',
		'100%': '#ee0a24',
	},
})

const format = (rate) => Math.min(Math.max(rate, 0), 100);

function run(step) {
	state.value = format((state.value += step))
}

</script>

<style>
.demo-margin-left {
	margin-left: 10px;
}
</style>
