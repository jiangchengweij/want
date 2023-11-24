<template>
	<view class="default-content">
		<demo-block title="基础用法">
		  <w-cell-group>
		    <w-cell title="单元格" value="内容" />
		    <w-cell
		      title="单元格"
		      value="内容"
		      label="描述信息"
		      :border="false"
		    />
		  </w-cell-group>
		</demo-block>
		<demo-block title="卡片风格">
		  <w-cell-group inset>
		    <w-cell title="单元格" value="内容" />
		    <w-cell title="单元格" value="内容" label="描述信息" />
		  </w-cell-group>
		</demo-block>
		<demo-block title="单元格大小">
		  <w-cell-group>
		    <w-cell
		      title="单元格"
		      value="内容"
		      size="large"
		    />
		    <w-cell
		      title="单元格"
		      value="内容"
		      size="large"
		      use-label-slot
		      :border="false"
		    >
		      <view slot="label">描述信息</view>
		    </w-cell>
		  </w-cell-group>
		</demo-block>
		
		<demo-block title="展示图标">
		  <w-cell
		    title="单元格"
		    value="内容"
		    icon="location-o"
		    :border="false"
		  />
		</demo-block>
		
		<demo-block title="展示箭头">
		  <w-cell title="单元格" is-link />
		  <w-cell
		    title="单元格"
		    value="内容"
		    is-link
		  />
		  <w-cell
		    title="单元格"
		    is-link
		    arrow-direction="down"
		    value="内容"
		    :border="false"
		  />
		</demo-block>
		
		<demo-block title="页面跳转">
		  <w-cell title="单元格" is-link url="/pages/dashboard/index" />
		  <w-cell title="单元格" is-link url="/pages/dashboard/index" link-type="redirectTo" />
		</demo-block>
		
		<demo-block title="分组标题">
		  <w-cell-group title="分组 1">
		    <w-cell title="单元格" value="内容" />
		  </w-cell-group>
		  <w-cell-group title="分组 2">
		    <w-cell title="单元格" value="内容" />
		  </w-cell-group>
		</demo-block>
		
		<demo-block title="使用插槽">
		  <w-cell value="内容" icon="shop-o" is-link>
		    <view slot="title">
		      <view class="title">单元格</view>
		      <w-tag type="danger">标签</w-tag>
		    </view>
		  </w-cell>
		  <w-cell title="单元格" :border="false">
		    <w-icon slot="right-icon" name="search" />
		  </w-cell>
		</demo-block>
		
		<demo-block title="垂直居中">
		  <w-cell
		    center
		    title="单元格"
		    value="内容"
		    label="描述信息"
		  />
		</demo-block>
	</view>

</template>

<script>
</script>

<style>
.title {
	margin-right: 5px;
	display: inline-block;
	vertical-align: middle;
}
</style>