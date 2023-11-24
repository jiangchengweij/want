<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="nav-bar-wrap" :class="[customClass || '']">
		<view v-if="fixed && placeholder" :style="{ height: state.height + 'px' }"></view>
		<view 
			:class="[bem('nav-bar', { fixed }), border ? 'wan-hairline--bottom' : '']"
			:style="barStyle"
		>
			<view class="wan-nav-bar__content">
				<view class="wan-nav-bar__left">
					<template v-if="leftArrow || leftText">
						<w-icon
							v-if="leftArrow"
							size="16px"
							name="arrow-left"
							custom-class="wan-nav-bar__arrow"
						/>
						<view 
							v-if="leftText"
							class="wan-nav-bar__text"
							hover-class="wan-nav-bar__text--hover"
							hover-stay-time="70"
						>{{ leftText }}</view>
					</template>
					<slot v-else name="left"></slot>
				</view>
				<view class="wan-nav-bar__title wan-ellipsis" :class="[titleClass || '']">
					<template v-if="title">{{ title }}</template>
					<slot v-else name="title"></slot>
				</view>
				<view class="wan-nav-bar__right">
					<view
						v-if="rightText"
						class="wan-nav-bar__text"
						hover-class="wan-nav-bar__text--hover"
						hover-stay-time="70"
					>{{ rightText }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { onMounted, nextTick, getCurrentInstance, reactive, watch, computed } from 'vue';
import { getRect, getSystemInfoSync } from '../utils'
import { bem } from '../utils/bem'

const props = defineProps({
	title: String,
	fixed: {
		type: Boolean,
	},
	placeholder: {
		type: Boolean,
	},
	leftText: String,
	rightText: String,
	leftArrow: Boolean,
	border: {
		type: Boolean,
		default: true,
	},
	zIndex: {
		type: Number,
		default: 1,
	},
	safeAreaInsetTop: {
		type: Boolean,
		default: true,
	},
	customStyle: null,
	customClass: null,
	titleClass: null
})

const that = getCurrentInstance()

watch(() => props.fixed, () => { setHeight() })
watch(() => props.placeholder, () => { setHeight() })

const { statusBarHeight } = getSystemInfoSync()

const state = reactive({
	height: 46 + statusBarHeight
})

onMounted(() => {
	setHeight()
})

const barStyle = computed(() => {
	const { zIndex, safeAreaInsetTop, customStyle } = props
	return Object.assign({
		zIndex: zIndex,
		paddingTop: safeAreaInsetTop ? statusBarHeight + 'px' : 0,
	}, customStyle)
})
	
function setHeight() {
	const { fixed, placeholder } = props
	if(!fixed || !placeholder) {
		return
	}
	nextTick(() => {
		getRect(that, '.wan-nav-bar').then(res => {
			if (res && 'height' in res) {
				state.height = res.height
			}
		})
	})
}
</script>

<style lang="scss">
@import './style.scss';
</style>
