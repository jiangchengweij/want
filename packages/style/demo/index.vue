<template>
  <demo-block title="文字省略">
    <view class="demo-style">
      <view class="wan-ellipsis">
        这是一段宽度限制 250px 的文字，后面的内容会省略。
      </view>

      <!-- 最多显示两行 -->
      <view class="wan-multi-ellipsis--l2">
        这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。
      </view>
    </view>
  </demo-block>
  <demo-block title="1px 边框">
    <view class="demo-block-card">
      <view class="wan-hairline--top"></view>
    </view>
  </demo-block>
</template>

<script setup></script>

<style>
.demo-style .wan-ellipsis {
  margin-bottom: 16px;
}
.demo-style .wan-ellipsis,
.demo-style .wan-multi-ellipsis--l2 {
  max-width: 300px;
  margin-left: 16px;
  font-size: 14px;
  line-height: 18px;
}
.demo-block-card {
  margin: 12px 12px 0;
  overflow: hidden;
  border-radius: 8px;
}
.demo-block-card .wan-hairline--top {
  height: 30px;
  background-color: #fff;
}
.demo-block-card .wan-hairline--top::after {
  top: 5px;
}
</style>
