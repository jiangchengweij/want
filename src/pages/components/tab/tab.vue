<template>
	<demo-block title="基础用法">
	  <w-tabs :active="1" @change="onChange" ref="tabs">
	    <w-tab
	      v-for="(item, index) in state.tabs4"
	      :key="index"
	      :title="'标签 ' + item"
				:index="index"
	    >
	      <view class="content">
	        {{ '内容' + item }}
	      </view>
	    </w-tab>
	  </w-tabs>
	</demo-block>
	<demo-block title="通过名称匹配">
	  <w-tabs active="b">
	    <w-tab
	      v-for="(item, index) in state.tabsWithName"
	      :key="index"
				:index="index"
	      :name="item.name"
	      :title="'标签 ' + item.index"
	    >
	      <view class="content">
	        {{ '内容' + item.index }}
	      </view>
	    </w-tab>
	  </w-tabs>
	</demo-block>
	
	<demo-block title="横向滚动">
	  <w-tabs>
	    <w-tab
	      v-for="(item, index) in  state.tabs6"
	      :key="index"
				:index="index"
	      :title="'标签 ' + item"
	    >
	      <view class="content">
	        {{ '内容' + item }}
	      </view>
	    </w-tab>
	  </w-tabs>
	</demo-block>
	
	<demo-block title="禁用标签">
	  <w-tabs @disabled="onClickDisabled">
	    <w-tab
	      v-for="(item, index) in state.tabs3"
	      :key="index"
	      :disabled="index === 1"
				:index="index"
	      :title="'标签 ' + item"
	    >
	      <view class="content">
	        {{ '内容' + item }}
	      </view>
	    </w-tab>
	  </w-tabs>
	</demo-block>
	
	<demo-block title="样式风格">
	  <w-tabs type="card" tab-class="special-tab">
	    <w-tab
	      v-for="(item, index) in state.tabs3"
	      :key="index"
				:index="index"
	      :title="'标签 ' + item"
	    >
	      <view class="content-2">
	        {{ '内容' + item }}
	      </view>
	    </w-tab>
	  </w-tabs>
	</demo-block>
	
	<demo-block title="点击事件">
	  <w-tabs @click="onClick">
	    <w-tab
	      v-for="(item, index) in state.tabs2"
	      :key="index"
				:index="index"
	      :title="'标签 ' + item"
	    >
	      <view class="content">
	        {{ '内容' + item }}
	      </view>
	    </w-tab>
	  </w-tabs>
	</demo-block>
	
	<demo-block title="粘性布局">
	  <w-tabs sticky ref="stickyTabRef" :webOffsetTop="44">
	    <w-tab
	      v-for="(item, index) in state.tabs4"
	      :key="index"
	      :title="'标签 ' + item"
				:index="index"
	    >
	      <view class="content">
	        {{ '内容' + item }}
	      </view>
	    </w-tab>
	  </w-tabs>
	</demo-block>
	
	<demo-block title="切换动画">
	  <w-tabs animated>
	    <w-tab
	      v-for="(item, index) in state.tabs4"
	      :key="index"
	      :title="'标签 ' + item"
				:index="index"
	    >
	      <view class="content">
	        {{ '内容' + item }}
	      </view>
	    </w-tab>
	  </w-tabs>
	</demo-block>
	
	<demo-block title="滑动切换">
	  <w-tabs swipeable>
	    <w-tab
	      v-for="(item, index) in state.tabs4"
	      :key="index"
	      :title="'标签 ' + item"
				:index="index"
	    >
	      <view class="content">
	        {{ '内容' + item }}
	      </view>
	    </w-tab>
	  </w-tabs>
	</demo-block>
	
	<demo-block title="自定义标题">
	  <w-tabs :active="1" @change="onChange" tab-class="special-tab" tab-active-class="special-tab-active">
			<template #nav-right>
				<w-icon
				  name="search"
				  custom-class="right-nav"
				  @click="onClickNavRight"
				/>
			</template>
	    <w-tab
	      v-for="(item, index) in state.tabs4"
	      :key="index"
	      :title="'标签 ' + item"
	      :dot="index === 1"
	      :info="index === 2 ? 99 : null"
				:index="index"
	    >
	      <view class="content">
	        {{ '内容' + item }}
	      </view>
	    </w-tab>
	  </w-tabs>
	</demo-block>
	
	<demo-block title="异步切换">
	  <w-tabs :active="1" swipeable use-before-change @change="onChange" @before-change="onBeforeChange" >
	   <w-tab
	      v-for="(item, index) in state.tabs4"
	      :key="index"
	      :title="'标签 ' + item"
				:index="index"
	    >
	      <view class="content">
	        {{ '内容' + item }}
	      </view>
	    </w-tab>
	  </w-tabs>
	</demo-block>
	<view class="box"></view>
	<view class="box"></view>
</template>

<script setup>
import { reactive, ref, nextTick } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app'

const state = reactive({
	tabs2: [1, 2],
	tabs3: [1, 2, 3],
	tabs4: [1, 2, 3, 4],
	tabs6: [1, 2, 3, 4, 5, 6],
	tabsWithName: [
		{ name: 'a', index: 1 },
		{ name: 'b', index: 2 },
		{ name: 'c', index: 3 },
	],
})

function onChange(event) {
	console.log(event);
	uni.showToast({
		title: `切换到标签 ${event.index + 1}`,
		icon: 'none',
	});
}

function onClickDisabled(event) {
	uni.showToast({
		title: `标签 ${event.index + 1} 已被禁用`,
		icon: 'none',
	});
}

function onClickNavRight() {
	uni.showToast({
		title: '点击 right nav',
		icon: 'none',
	});
}

function onClick(event) {
	uni.showToast({
		title: `点击标签 ${event.index + 1}`,
		icon: 'none',
	});
}

function onBeforeChange(event) {
	const { callback, title } = event;

	uni.showModal({
		title: '异步切换',
		content: `确定要切换至 ${title} tab吗？`,
		success: (res) => {
			if (res.confirm) {
				callback(true);
			} else if (res.cancel) {
				callback(false);
			}
		},
	});
}

const tabs = ref(null);

function onDeleteTab() {
	state.tabs4 = [1,2,3];
}

const stickyTabRef = ref(null);

onPageScroll((event) => {
	stickyTabRef.value.onPageScroll(event);
})

</script>

<style>
.content {
	padding: 20px;
	background-color: #fff;
}

.content-2 {
	padding: 20px;
}

.right-nav {
	padding: 0 10px;
	line-height: 44px !important;
	background-color: #fff;
}

.special-tab {
	transition: all 0.25s ease-in-out;
}

.special-tab-active {
	font-size: 1.05em !important;
}

.box {
	width: 100%;
	height: 300px;
}
</style>
