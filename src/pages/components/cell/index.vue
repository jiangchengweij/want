<template>
  <view class="default-content">
    <demo-block title="基础用法">
      <wan-cell-group>
        <wan-cell title="单元格" value="内容" />
        <wan-cell
          title="单元格"
          value="内容"
          label="描述信息"
          :border="false"
        />
      </wan-cell-group>
    </demo-block>
    <demo-block title="卡片风格">
      <wan-cell-group inset>
        <wan-cell title="单元格" value="内容" />
        <wan-cell title="单元格" value="内容" label="描述信息" />
      </wan-cell-group>
    </demo-block>
    <demo-block title="单元格大小">
      <wan-cell-group>
        <wan-cell title="单元格" value="内容" size="large" />
        <wan-cell
          title="单元格"
          value="内容"
          size="large"
          use-label-slot
          :border="false"
        >
          <template #label>
            <view>描述信息</view>
          </template>
        </wan-cell>
      </wan-cell-group>
    </demo-block>

    <demo-block title="展示图标">
      <wan-cell title="单元格" value="内容" icon="location-o" :border="false" />
    </demo-block>

    <demo-block title="展示箭头">
      <wan-cell title="单元格" is-link />
      <wan-cell title="单元格" value="内容" is-link />
      <wan-cell
        title="单元格"
        is-link
        arrowan-direction="down"
        value="内容"
        :border="false"
      />
    </demo-block>

    <demo-block title="页面跳转">
      <wan-cell title="单元格" is-link url="/pages/dashboard/index" />
      <wan-cell
        title="单元格"
        is-link
        url="/pages/dashboard/index"
        link-type="redirectTo"
      />
    </demo-block>

    <demo-block title="分组标题">
      <wan-cell-group title="分组 1">
        <wan-cell title="单元格" value="内容" />
      </wan-cell-group>
      <wan-cell-group title="分组 2">
        <wan-cell title="单元格" value="内容" />
      </wan-cell-group>
    </demo-block>

    <demo-block title="使用插槽">
      <wan-cell value="内容" icon="shop-o" is-link>
        <template #title>
          <view class="title">单元格</view>
          <wan-tag type="danger">标签</wan-tag>
        </template>
      </wan-cell>
      <wan-cell title="单元格" :border="false">
        <template #right-icon>
          <wan-icon name="search" />
        </template>
      </wan-cell>
    </demo-block>

    <demo-block title="垂直居中">
      <wan-cell center title="单元格" value="内容" label="描述信息" />
    </demo-block>
  </view>
</template>

<script></script>

<style>
.title {
  margin-right: 5px;
  display: inline-block;
  vertical-align: middle;
}
</style>
