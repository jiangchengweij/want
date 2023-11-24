<template>
	<demo-block title="基本用法">
	  <w-grid>
	    <w-grid-item 
				icon="photo-o" 
				:text="'文字'+item" 
				v-for="(item, index) in state.array4" 
				:key="item"
				:index="index"
			/>
	  </w-grid>
	</demo-block>
	
	<demo-block title="自定义列数">
	  <w-grid :column-num="3">
	    <w-grid-item icon="photo-o" text="文字" v-for="(item, index) in state.array6" :key="item" :index="index" />
	  </w-grid>
	</demo-block>
	
	<demo-block title="自定义内容">
	  <w-grid :column-num="3" :border="false">
	    <w-grid-item use-slot v-for="(item, index) in state.array3" :index="index" :key="item">
	      <image style="width: 100%; height: 90px;" :src="`https://img.yzcdn.cn/vant/apple-${index + 1}.jpg`" />
	    </w-grid-item>
	  </w-grid>
	</demo-block>
	
	<demo-block title="正方形格子">
	  <w-grid square>
	    <w-grid-item icon="photo-o" text="文字" v-for="(item, index) in state.array8" :key="item" :index="index" />
	  </w-grid>
	</demo-block>
	
	<demo-block title="格子间距">
	  <w-grid :gutter="10">
	    <w-grid-item icon="photo-o" text="文字" v-for="(item, index) in state.array8" :key="item" :index="index" />
	  </w-grid>
	</demo-block>
	
	<demo-block title="内容横排">
	  <w-grid direction="horizontal" :column-num="3">
	    <w-grid-item icon="photo-o" text="文字" v-for="(item, index) in state.array3" :key="item" :index="index" />
	  </w-grid>
	</demo-block>
	
	<demo-block title="页面跳转">
	  <w-grid clickable :column-num="2">
	    <w-grid-item icon="home-o" :index="0" link-type="navigateTo" url="/pages/components/button/button" text="Navigate 跳转" />
	    <w-grid-item icon="search" :index="1" link-type="reLaunch" url="/pages/components/button/button" text="ReLaunch 跳转" />
	  </w-grid>
	</demo-block>
	
	<demo-block title="徽标提示">
	  <w-grid :column-num="2">
	    <w-grid-item icon="home-o" :index="0" text="文字" dot />
	    <w-grid-item icon="search" :index="1" text="文字" badge="99+" />
	  </w-grid>
	</demo-block>
</template>

<script setup>
import { reactive, ref } from 'vue';
const state = reactive({
	array3: [0, 1, 2],
	array4: [0, 1, 2, 3],
	array6: [0, 1, 2, 3, 4, 5],
	array8: [0, 1, 2, 3, 4, 5, 6, 7],
})
</script>

<style>
</style>
