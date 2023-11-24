<template>
	<demo-block title="基础用法">
	  <w-nav-bar
	    title="标题"
	    right-text="按钮"
	    left-arrow
	    @click-left="onClickLeft"
	    @click-right="onClickRight"
	  />
	</demo-block>
	<demo-block title="高级用法">
	  <w-nav-bar title="标题" left-text="返回" left-arrow>
			<template #right>
				<w-icon name="search" custom-class="icon" size="18" />
			</template>
	  </w-nav-bar>
	</demo-block>
</template>

<script setup lang="ts">
function onClickLeft() {
	uni.showToast({ title: '点击返回', icon: 'none' });
}

function onClickRight() {
	uni.showToast({ title: '点击按钮', icon: 'none' });
}
</script>

<style>
</style>
