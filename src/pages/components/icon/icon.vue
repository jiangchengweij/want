<template>
	<w-tabs
		:active="state.active"
		color="#1989fa"
		@change="onSwitch(index)"
	>
		<w-tab title="用法示例" custom-class="demo-tab-pane" :index="0">
			<demo-block title="基础用法">
				<w-col
					custom-class="col"
					span="6"
				>
					<w-icon
						:name="state.demoIcon"
						size="32px"
						custom-class="icon"
					/>
				</w-col>
			</demo-block>
			<demo-block title="提示信息">
				<w-col
					custom-class="col"
					span="6"
				>
					<w-icon
						:name="state.demoIcon"
						size="32px"
						custom-class="icon"
						dot
					/>
				</w-col>
				<w-col
					custom-class="col"
					span="6"
				>
					<w-icon
						:name="state.demoIcon"
						size="32px"
						custom-class="icon"
						info="9"
					/>
				</w-col>
				<w-col
					custom-class="col"
					span="6"
				>
					<w-icon
						:name="state.demoIcon"
						size="32px"
						custom-class="icon"
						info="99+"
					/>
				</w-col>
			</demo-block>
			<demo-block title="图标颜色">
				<w-col
					custom-class="col"
					span="6"
				>
					<w-icon
						:name="state.demoIcon"
						size="32px"
						custom-class="icon"
						color="#1989fa"
					/>
				</w-col>
				<w-col
					custom-class="col"
					span="6"
				>
					<w-icon
						:name="state.demoIcon"
						size="32px"
						custom-class="icon"
						color="#07c160"
					/>
				</w-col>
			</demo-block>
			<demo-block title="图标大小">
				<w-col
					custom-class="col"
					span="6"
				>
					<w-icon
						:name="state.demoIcon"
						size="40"
						custom-class="icon"
					/>
				</w-col>
				<w-col
					custom-class="col"
					span="6"
				>
					<w-icon
						:name="state.demoIcon"
						size="3rem"
						custom-class="icon"
					/>
				</w-col>
			</demo-block>
		</w-tab>
		<w-tab title="基础图标" custom-class="demo-tab-pane" :index="1">
			<w-col
				v-for="(item, index) in icons.basic"
				:key="index"
				custom-class="col"
				span="6"
			>
				<w-icon
					:name="item"
					size="32px"
					custom-class="icon"
				/>
				<view class="text">{{ item }}</view>
			</w-col>
		</w-tab>
		<w-tab title="线框风格" custom-class="demo-tab-pane" :index="2">
			<w-col
				v-for="(item, index) in icons.outline"
				:key="index"
				custom-class="col"
				span="6"
			>
				<w-icon
					:name="item"
					size="32px"
					custom-class="icon"
				/>
				<view class="text">{{ item }}</view>
			</w-col>
		</w-tab>
		<w-tab title="实底风格" custom-class="demo-tab-pane" :index="3">
			<w-col
				v-for="(item, index) in icons.filled"
				:key="index"
				custom-class="col"
				span="6"
			>
				<w-icon
					:name="item"
					size="32px"
					custom-class="icon"
				/>
				<view class="text">{{ item }}</view>
			</w-col>
		</w-tab>
	</w-tabs>
</template>

<script setup>
import { reactive } from 'vue';
import icons from './config.js';

const state = reactive({
	active: 0,
	demoIcon: 'chat-o',
	demoImage: 'https://b.yzcdn.cn/wt/icon-demo-1126.png',
})

function onSwitch(index) {
	state.active = index
}
</script>

<style>
.col {
	display: inline-block;
	float: none;
	text-align: center;
	vertical-align: middle;
}

::v-deep .icon {
	margin: 16px 0;
	color: #323233;
}

.text {
	display: block;
	height: 36px;
	margin: -4px 0 4px;
	padding: 0 5px;
	color: #646566;
	font-size: 12px;
	line-height: 18px;
}

::v-deep .demo-tab-pane {
	margin: 20px;
	background-color: #fff;
}
</style>
