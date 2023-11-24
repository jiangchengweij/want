<template>
	<demo-block title="基础用法">
		<w-progress custom-class="progress-position" :percentage="0" />
	</demo-block>

	<demo-block title="线条粗细">
		<w-progress custom-class="progress-position" stroke-width="8" :percentage="100" />
	</demo-block>

	<demo-block title="置灰">
		<w-progress custom-class="progress-position" inactive :percentage="50" />
	</demo-block>

	<demo-block title="样式定制">
		<w-progress custom-class="progress-position" pivot-text="橙色" color="#f2826a" :percentage="25" />
		<w-progress custom-class="progress-position" pivot-text="红色" color="#ee0a24" :percentage="50" />
		<w-progress
			custom-class="progress-position"
			:percentage="75"
			pivot-text="紫色"
			pivot-color="#7232dd"
			color="linear-gradient(to right, #be99ff, #7232dd)"
		/>
	</demo-block>
</template>

<script>
</script>

<style>
.progress-position {
  margin: 5px 15px 20px;
}
</style>