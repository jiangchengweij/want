<template>
	<demo-block title="基础用法">
	  <w-swipe-cell :right-width="65" :left-width="65">
			<template #left>
				<view class="w-swipe-cell__left">选择</view>
			</template>
	    <w-cell-group>
	      <w-cell title="单元格" value="内容" />
	    </w-cell-group>
			<template #right>
				<view class="w-swipe-cell__right">删除</view>
			</template>
	  </w-swipe-cell>
	</demo-block>
	
	<demo-block title="异步关闭">
	  <w-swipe-cell id="swipe-cell" :right-width="65" :left-width="65" async-close @close="onClose">
			<template #left>
				<view class="w-swipe-cell__left">选择</view>
			</template>
	    <w-cell-group>
	      <w-cell title="单元格" value="内容" />
	    </w-cell-group>
			<template #right>
				<view class="w-swipe-cell__right">删除</view>
			</template>
	  </w-swipe-cell>
	</demo-block>
	
	<demo-block title="主动打开">
	  <w-swipe-cell id="swipe-cell2" :right-width="65" :left-width="65" name="示例" @open="onOpen" >
			<template #left>
				<view class="w-swipe-cell__left">选择</view>
			</template>
	    <w-cell-group>
	      <w-cell title="单元格" value="内容" />
	    </w-cell-group>
			<template #right>
				<view class="w-swipe-cell__right">
					<text>删除</text>
				</view>
			</template>
	  </w-swipe-cell>
	</demo-block>
	<w-dialog ref="dialogRef" />
	<w-notify ref="notifyRef" />
</template>

<script setup>
import { ref } from 'vue';
import Dialog from '@/uni_modules/want/components/utils/dialog';
import Notify from '@/uni_modules/want/components/utils/notify';

const dialogRef = ref(null)
const notifyRef = ref(null)

function onClose(event) {
	const { position, instance } = event;
	switch (position) {
		case 'left':
		case 'cell':
			instance.exposed.close();
			break;
		case 'right':
			Dialog.confirm({
				ref: dialogRef.value,
				message: '确定删除吗？',
			}).then(() => {
				instance.exposed.close();
			}).catch(e => {});
			break;
	}
}

function onOpen(event) {
	const { position, name } = event;
	switch (position) {
		case 'left':
			Notify({
				ref: notifyRef.value,
				type: 'primary',
				message: `${name}${position}部分展示open事件被触发`,
			});
			break;
		case 'right':
			Notify({
				ref: notifyRef.value,
				type: 'primary',
				message: `${name}${position}部分展示open事件被触发`,
			});
			break;
	}
}
</script>

<style>
.demo-swipe-cell {
  user-select: none;
}

.w-swipe-cell__left,
.w-swipe-cell__right {
  display: inline-block;
  width: 65px;
  height: 44px;
  font-size: 15px;
  line-height: 44px;
  color: #fff;
  text-align: center;
  background-color: #ee0a24;
}
</style>
