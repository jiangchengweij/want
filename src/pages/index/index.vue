<template>
	<view class="demo-home">
		<view class="demo-home__title">
			<image mode="aspectFit" class="demo-home__image" src="/static/logo.png" />
			<view class="demo-home__text">Want 组件库</view>
		</view>
		<view class="demo-home__desc">
			<view>轻量、可靠、全端通用的UniApp组件库</view>
		</view>
		<view 
			v-for="(group, index) in list"
			:key="index"
			class="demo-home-nav">
			<view class="demo-home-nav__title">{{ group.groupName }}</view>
			<view class="demo-home-nav__group">
				<view
					v-for="item in group.list"
					:key="item.title"
					class="demo-home-nav__block"
					@tap="onClick(item.path)"
					:style="{ backgroundColor: group.bgColor }"
				>
					{{ item.title }}
					<w-icon name="arrow" custom-class="demo-home-nav__icon" />
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { onReady } from '@dcloudio/uni-app'
import list from './config'

onReady(() => {
	// #ifdef MP-ALIPAY
		setTimeout(() => {
			uni.setNavigationBarColor({
				backgroundColor: '#fff'
			})
		}, 100)
	// #endif
})

function onClick(url: string) {
	
	uni.navigateTo({
		url: `/pages/components${url}${url}`,
		success() {
			// #ifdef MP-ALIPAY
				setTimeout(() => {
					uni.setNavigationBarColor({
						backgroundColor: '#fff'
					})
				}, 100)
			// #endif
		}
	})
}
</script>

<style>
	
.demo-home {
	box-sizing: border-box;
	width: 100%;
	min-height: 100vh;
	padding: 46px 20px 20px;
	background: #fff;
}

.demo-home__title,
.demo-home__desc {
	padding-left: 16px;
	font-weight: normal;
	line-height: 1;
	user-select: none;
}

.demo-home__title {
	margin: 0 0 16px;
	font-size: 32px;
}

.demo-home__image,
.demo-home__text {
	display: inline-block;
	vertical-align: middle;
}

.demo-home__image {
	width: 32px;
	height: 32px;
}

.demo-home__text {
	margin-left: 16px;
	font-weight: 500;
}

.demo-home__title .demo-home--small {
	font-size: 24px;
}

.demo-home__desc {
	margin: 0 0 40px;
	color: rgba(69, 90, 100, 0.6);
	font-size: 14px;
}

.demo-home-nav__title {
	margin: 24px 0 8px 16px;
	color: rgba(69, 90, 100, 0.6);
	font-size: 14px;
}

.demo-home-nav__block {
	position: relative;
	display: flex;
	margin: 0 0 12px;
	padding-left: 20px;
	color: #323233;
	font-weight: 500;
	font-size: 14px;
	line-height: 40px;
	background: #f7f8fa;
	border-radius: 99px;
	box-sizing: border-box;
	transition: background 0.3s;
}

.demo-home-nav__block:hover {
	background: darken(#f7f8fa, 3%);
}

.demo-home-nav__block:active {
	background: darken(#f7f8fa, 6%);
}

:deep(.demo-home-nav__icon ) {
	position: absolute !important;
	top: 50%;
	right: 16px;
	width: 16px;
	height: 16px;
	margin-top: -8px;
	color: rgb(182, 195, 210);
	font-weight: 900 !important;
}
</style>
