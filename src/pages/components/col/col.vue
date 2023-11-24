<template>
	<demo-block title="基础用法" padding>
		<w-row>
			<w-col span="8" custom-class="dark">span: 8</w-col>
			<w-col span="8" custom-class="light">span: 8</w-col>
			<w-col span="8" custom-class="dark">span: 8</w-col>
		</w-row>

		<w-row>
			<w-col span="4" custom-class="dark">span: 4</w-col>
			<w-col span="10" offset="4" custom-class="light">offset: 4, span: 10</w-col>
		</w-row>

		<w-row>
			<w-col offset="12" span="12" custom-class="dark">offset: 12, span: 12</w-col>
		</w-row>
	</demo-block>

	<demo-block title="在列元素之间增加间距" padding>
		<w-row gutter="20">
			<w-col span="8" custom-class="dark">span: 8</w-col>
			<w-col span="8" custom-class="light">span: 8</w-col>
			<w-col span="8" custom-class="dark">span: 8</w-col>
		</w-row>
	</demo-block>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.dark,
.light {
  color: #fff;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 10px;
  background-clip: content-box;
}

.dark {
  background-color: #39a9ed;
}

.light {
  background-color: #66c6f2;
}
</style>
