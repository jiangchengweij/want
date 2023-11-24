<template>
	<demo-block title="基础用法">
	  <w-count-down :time="state.time" />
	</demo-block>
	
	<demo-block title="自定义格式">
	  <w-count-down
	    :time="state.time"
	    format="DD 天 HH 时 mm 分 ss 秒"
	  />
	</demo-block>
	
	<demo-block title="毫秒级渲染">
	  <w-count-down
	    millisecond
	    :time="state.time"
	    format="HH:mm:ss:SSS"
	  />
	</demo-block>
	
	<demo-block title="自定义样式">
	  <w-count-down
	    use-slot
	    :time="state.time"
	    @change="onChange"
	  >
	    <text class="item">{{ state.timeData.hours }}</text>
	    <text class="item">{{ state.timeData.minutes }}</text>
	    <text class="item">{{ state.timeData.seconds }}</text>
	  </w-count-down>
	</demo-block>
	
	<demo-block title="手动控制">
	  <w-count-down
			ref="countDownRef"
	    millisecond
	    :time="3000"
	    :auto-start="false"
	    format="ss:SSS"
			@finish="finished"
	  />
	  <w-grid clickable column-num="3">
	    <w-grid-item text="开始" icon="play-circle-o" @click="start" />
	    <w-grid-item text="暂停" icon="pause-circle-o" @click="pause" />
	    <w-grid-item text="重置" icon="replay" @click="reset" />
	  </w-grid>
	</demo-block>
	
	<w-toast ref="toastRef" />
</template>

<script setup>
import { reactive, ref } from 'vue'
import Toast from '@/uni_modules/want/components/utils/toast'

const countDownRef = ref(null)
const toastRef = ref(null)

const state = reactive({
	time: 30 * 60 * 60 * 1000,
	timeData: {},
})

function onChange(e) {
	state.timeData = e
}

function start() {
	countDownRef.value.start();
}

function pause() {
	countDownRef.value.pause();
}

function reset() {
	countDownRef.value.reset();
}

function finished() {
	Toast({
		ref: toastRef.value,
		message: '倒计时结束',
	});
}

</script>

<style>
.wan-count-down {
	margin: 0 16px 10px;
}

.item {
	display: inline-block;
	width: 22px;
	margin-right: 5px;
	color: #fff;
	font-size: 12px;
	text-align: center;
	background-color: #1989fa;
	border-radius: 2px;
}
</style>
