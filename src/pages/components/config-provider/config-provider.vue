<template>
	<demo-block title="默认主题">
	  <w-cell-group>
	    <w-field label="评分">
				<template #input>
					<view style="width: 100%">
					  <w-rate v-model="state.rate" @change="onChange('rate', $event)" />
					</view>
				</template>
	    </w-field>
	    <w-field label="滑块" :border="false">
				<template #input>
					<view style="width: 100%">
					  <w-slider v-model="state.slider" @change="onChange('slider', $event)" />
					</view>
				</template>
	    </w-field>
	  </w-cell-group>
	  <view style="margin: 16px">
	    <w-button round block type="primary">提交</w-button>
	  </view>
	</demo-block>
	
	<demo-block title="定制主题">
	  <w-config-provider :theme-vars="state.themeVars">
	    <w-cell-group>
	      <w-field label="评分">
					<template #input>
						<view style="width: 100%">
						  <w-rate v-model="state.rate" @change="onChange('rate', $event)" />
						</view>
					</template>
	      </w-field>
	      <w-field label="滑块" :border="false">
					<template #input>
						<view style="width: 100%">
						  <w-slider v-model="state.slider" @change="onChange('slider', $event)" />
						</view>
					</template>
	      </w-field>
	    </w-cell-group>
	
	    <view style="margin: 16px">
	      <w-button round block type="primary">提交</w-button>
	    </view>
	  </w-config-provider>
	</demo-block>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
	rate: 4,
	slider: 50,
	themeVars: {
		rateIconFullColor: '#07c160',
		sliderBarHeight: '4px',
		sliderButtonWidth: '20px',
		sliderButtonHeight: '20px',
		sliderActiveBackgroundColor: '#07c160',
		buttonPrimaryBorderColor: '#07c160',
		buttonPrimaryBackgroundColor: '#07c160',
	},
})

function onChange(key, event) {
	state[key] = event
}
</script>

<style>
</style>
