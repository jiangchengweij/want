<template>
	<demo-block title="基础用法">
		<w-slider
			:modelValue="50"
			custom-class="slider"
			@change="onChange"
		/>
	</demo-block>

	<demo-block title="双滑块">
		<w-slider
			range
			:modelValue="[20, 60]"
			custom-class="slider"
			@change="onChange"
		/>
	</demo-block>

	<demo-block title="指定选择范围">
		<w-slider
			custom-class="slider"
			:min="-50"
			:max="50"
			@change="onChange"
		/>
	</demo-block>

	<demo-block title="禁用">
		<w-slider
			custom-class="slider"
			:modelValue="50"
			disabled
		/>
	</demo-block>

	<demo-block title="指定步长">
		<w-slider
			custom-class="slider"
			:modelValue="50"
			:step="10"
			@change="onChange"
		/>
	</demo-block>

	<demo-block title="自定义样式">
		<w-slider
			:modelValue="50"
			custom-class="slider"
			bar-height="4px"
			active-color="#ee0a24"
		/>
	</demo-block>

	<demo-block title="自定义按钮">
		<w-slider
			:modelValue="state.currentValue"
			custom-class="slider"
			use-button-slot
			active-color="#ee0a24"
			@drag="onDrag"
		>
			<template #button>
				<view class="custom-button">
					{{ state.currentValue }}
				</view>
			</template>
		</w-slider>
	</demo-block>

	<demo-block title="垂直方向">
		<view style="height: 150px; padding-left: 30px;">
			<w-slider
				:modelValue="50"
				vertical
				custom-class="slider"
				@change="onChange"
			/>
			<w-slider
				:modelValue="[20, 60]"
				vertical
				range
				custom-class="slider"
				@change="onChange"
			/>
		</view>
	</demo-block>
</template>

<script setup>
import { reactive } from 'vue';
const state = reactive({
	currentValue: 50
})

function onChange(event) {
	uni.showToast({
		icon: 'none',
		title: `当前值：${event}`,
	});
}

function onDrag(event) {
	state.currentValue = event.value
}
</script>

<style>
.slider {
  margin: 0 15px 30px;
}

.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  border-radius: 100px;
  background-color: #ee0a24;
}
</style>
