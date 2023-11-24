<template>
	<view class="default-content">
		<demo-block title="基础用法" padding>
		  <w-row>
		    <w-image
		      width="100"
		      height="100"
		      :src="state.src"
		    />
		  </w-row>
		</demo-block>
		
		<demo-block title="填充模式" padding>
		  <w-row gutter="20">
		    <w-col
		      v-for="fit in state.fits"
		      :key="fit"
		      span="8"
		    >
		      <w-image
		        :fit="fit"
		        width="100%"
		        height="27vw"
		        :src="state.src"
		      />
		      <view class="text">{{ fit }}</view>
		    </w-col>
		  </w-row>
		</demo-block>
		
		<demo-block title="圆形图片" padding>
		  <w-row gutter="20">
		    <w-col
		      v-for="fit in state.fits"
		      :key="fit"
		      span="8"
		    >
		      <w-image
		        round
		        :fit="fit"
		        width="100%"
		        height="27vw"
		        :src="state.src"
		      />
		      <view class="text">{{ fit }}</view>
		    </w-col>
		  </w-row>
		</demo-block>
		
		<demo-block title="加载中提示" padding>
		  <w-row gutter="20">
		    <w-col span="8">
		      <w-image
		        width="100%"
		        height="27vw"
		      />
		      <view class="text">默认提示</view>
		    </w-col>
		
		    <w-col span="8">
		      <w-image
		        width="100%"
		        height="27vw"
		        use-loading-slot
		      >
						<template #loading>
							<w-loading
							  type="spinner"
							  size="20"
							  vertical
							/>
						</template>
		      </w-image>
		      <view class="text">自定义提示</view>
		    </w-col>
		  </w-row>
		</demo-block>
		
		<demo-block title="加载失败提示" padding>
		  <w-row gutter="20">
		    <w-col span="8">
		      <w-image
		        width="100%"
		        height="27vw"
		        src="x"
		      />
		      <view class="text">默认提示</view>
		    </w-col>
		
		    <w-col span="8">
		      <w-image
		        width="100%"
		        height="27vw"
		        src="x"
		        use-error-slot
		      >
						<template #error>
							<text>加载失败</text>
						</template>
		      </w-image>
		      <view class="text">自定义提示</view>
		    </w-col>
		  </w-row>
		</demo-block>
	</view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	fits: [
		'contain',
		'cover',
		'fill',
		'none',
		'scale-down',
		'widthFix',
		'heightFix',
	],
	src: 'https://img.yzcdn.cn/vant/cat.jpeg',
})
</script>

<style>
.text {
	width: 100%;
	margin: 5px 0 20px;
	color: #7d7e80;
	font-size: 14px;
	text-align: center;
}
</style>
