<template>
	<demo-block title="基础用法">
		<w-sticky 
			ref="stickyRef1"
			:webOffsetTop="44"
		>
			<w-button type="primary" custom-style="margin-left: 15px">
				基础用法
			</w-button>
		</w-sticky>
	</demo-block>

	<demo-block title="吸顶距离">
		<w-sticky :offset-top="50" ref="stickyRef2" :webOffsetTop="44">
			<w-button type="info" custom-style="margin-left: 115px">
				吸顶距离
			</w-button>
		</w-sticky>
	</demo-block>

	<demo-block title="指定容器">
		<view id="container" style="height: 150px; background-color: #fff;">
			<w-sticky :container="state.container" ref="stickyRef3" :webOffsetTop="44">
				<w-button type="warning" custom-style="margin-left: 215px;">
					指定容器
				</w-button>
			</w-sticky>
		</view>
	</demo-block>

	<demo-block title="嵌套在 scroll-view 内使用">
		<scroll-view
			@scroll="onScroll"
			scroll-y
			id="scroller"
			style="height: 200px; background-color: #fff;"
		>
			<view style="height: 400px; padding-top: 50px;">
				<w-sticky :scroll-top="state.scrollTop" 
					:offset-top="state.offsetTop"
				>
					<w-button type="warning">
						嵌套在 scroll-view 内
					</w-button>
				</w-sticky>
			</view>
		</scroll-view>
	</demo-block>
	<view class="box"></view>
	<view class="box"></view>
</template>

<script setup lang="ts">
import { onLoad, onPageScroll } from '@dcloudio/uni-app'
import { getCurrentInstance, reactive, ref } from 'vue';
const state = reactive({
	container: () => {},
	scrollTop: 0,
	offsetTop: 0,
})

onLoad(() => {
	state.container = () => uni.createSelectorQuery().select('#container')
})

function onScroll(event: anyObj) {
	uni.createSelectorQuery()
		.select('#scroller')
		.boundingClientRect((res: any) => {
			state.scrollTop = event.detail.scrollTop
			state.offsetTop = res.top;
		})
		.exec();
}

const stickyRef1 = ref(null);
const stickyRef2 = ref(null);
const stickyRef3 = ref(null);

onPageScroll((event) => {
	stickyRef1.value.onPageScroll(event)
	stickyRef2.value.onPageScroll(event)
	stickyRef3.value.onPageScroll(event)
})

</script>

<style lang="scss">
.wan-button {
  margin-left: 16px;
}

.sticky-container {
  position: relative;
  z-index: -1;
  height: 150px;
  background-color: #fff;
}
.box {
	width: 100%;
	height: 300px;
}
</style>
