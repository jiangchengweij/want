---
title: Cell 单元格
description: 单元格为列表中的单个展示项。
vueDoc:
	- property String icon 左侧图标名称或图片链接
	- property String title 左侧标题
	- property String titleWidth 标题宽度，须包含单位
	- property String value 右侧内容
	- property String label 标题下方的描述信息
	- property String size 单元格大小
  - value large
	- property Boolean border 是否显示下边框 true
	- property Boolean center 是否使内容垂直居中 false
	- property String url 点击后跳转的链接地
	- property String linkType 链接跳转类型 navigateTo
  - value navigateTo,redirectTo,switchTab,reLaunch
	- property Boolean clickable 点击后跳转的链接地 false
	- property Boolean isLink 是否展示右侧箭头并开启点击反馈 false
	- property Boolean required 是否显示表单必填星号 false
	- property Boolean arrowDirection 箭头方向 right
  - value nright,left,up,down
	- property Boolean useLabelSlot 是否使用labelSlot false
  - property String titleStyle 标题样式
  - class customClass 根节点样式类
  - class titleClass 标题样式类
  - class labelClass 描述信息样式类
  - class valueClass 右侧内容样式类
  - event Function click 点击事件
  - example <wan-cell-group><wan-cell title="单元格" value="内容" /></wan-cell-group>
---
