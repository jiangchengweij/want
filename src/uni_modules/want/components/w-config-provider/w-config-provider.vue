<script lang="ts">
	/**
	 * ConfigProvider 全局配置
	 * @description 用于配置 WeiUniApp 组件的主题样式
	 * @tutorial https://wei.jiangchengwei.io/configProvider
	 * @property {Object} themeVars 自定义主题变量
	 */
	export default {
		virtualHost: true,
		styleIsolation: 'shared',
	}
</script>
<template>
	<view class="wan-config-provider" :class="[customClass || '']" :style="mapThemeVarsToCSSVars">
		<slot />
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { style } from '../utils/style';

const props = defineProps({
	themeVars: {
		type: Object,
		default: () => {}
	},
	customClass: null
})

const mapThemeVarsToCSSVars = computed(() => {
	const { themeVars } = props
	const cssVars = {}
	Object.keys(themeVars).forEach((key) => {
		const cssVarsKey = '--' + kebabCase(key)
		cssVars[cssVarsKey] = themeVars[key]
	})
	return style(cssVars)
})

function kebabCase(word : string) {
	var newWord = word
		.replace(/[A-Z]/g, function (i) {
			return '-' + i;
		})
		.toLowerCase()
		.replace(/^-/, '');
	return newWord;
}
</script>

<style>
.wan-config-provider {
	/* #ifdef MP-ALIPAY */
	display: block;
	width: 100%;
	/* #endif */
}
</style>
