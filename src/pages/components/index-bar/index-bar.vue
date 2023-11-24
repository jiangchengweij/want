<template>
	<w-tabs
		:active="state.activeTab"
		@change="onChange"
	>
		<w-tab title="基础用法">
			<w-index-bar
				v-if="state.activeTab === 0"
				:scroll-top="state.scrollTop"
				ref="indexBarRef1"
				webOffsetTop="44"
			>
				<view
					v-for="item in state.indexList"
					:key="item"
				>
					<w-index-anchor :index="item" />
					<w-cell title="文本" />
					<w-cell title="文本" />
					<w-cell title="文本" />
				</view>
			</w-index-bar>
		</w-tab>

		<w-tab title="自定义索引列表">
			<w-index-bar
				v-if="state.activeTab === 1"
				:index-list="state.customIndexList"
				:scroll-top="state.scrollTop"
				webOffsetTop="44"
				ref="indexBarRef2"
			>
				<view
					v-for="(item, index) in state.customIndexList"
					:key="index"
				>
					<w-index-anchor
						use-slot
						:index="item"
					>
						<text>标题{{ item }}</text>
					</w-index-anchor>
					<w-cell title="文本" />
					<w-cell title="文本" />
					<w-cell title="文本" />
				</view>
			</w-index-bar>
		</w-tab>
	</w-tabs>
</template>

<script setup>
import { onPageScroll } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue';

const indexList = [];
const charCodeOfA = 'A'.charCodeAt(0);
for (let i = 0; i < 26; i++) {
  indexList.push(String.fromCharCode(charCodeOfA + i));
}
const state = reactive({
	activeTab: 0,
	indexList,
	customIndexList: [1, 2, 3, 4, 5, 6, 8, 9, 10],
	scrollTop: 0,
})

function onChange(event) {
	state.activeTab = event.name
}

const indexBarRef1 = ref(null)
const indexBarRef2 = ref(null)

onPageScroll((event) => {
	state.scrollTop = event.scrollTop
	if(indexBarRef1.value) {
		indexBarRef1.value.onPageScroll(event)
	}
	if(indexBarRef2.value) {
		indexBarRef2.value.onPageScroll(event)
	}
})
</script>

<style>
</style>
