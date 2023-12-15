---
title: Button 按钮
description: 按钮用于触发一个操作，如提交表单。
vueDoc:
  - property String id 标识符
  - property String type 按钮类型 default
  - value primary,success,warning,danger
  - property String size 按钮尺寸 normal
  - value normal,large,small,mini
  - property String color 按钮颜色，支持传入linear-gradient渐变色
  - property String classPrefix 图标类名前缀，同 wan-icon 组件的 classPrefix 属性
  - property Boolean plain 是否为朴素按钮 false
  - property Boolean block 是否为块级元素 false
  - property Boolean round 是否为圆形按钮 false
  - property Boolean round 是否为圆形按钮 false
  - property Boolean square 是否为方形按钮 false
  - property Boolean disabled 是否禁用按钮 false
  - property Boolean hairline 是否使用 0.5px 边框	false
  - property Boolean loading 是否显示为加载状态	false
  - property String loadingText 加载状态提示文字
  - property String loadingType 加载状态图标类型 circular
  - value spinner,circular
  - property String loadingSize 加载图标大小 20px
  - class customClass 根节点样式类
  - class loadingClass 加载图标样式类
  - event Function click 点击按钮，且按钮状态不为加载或禁用时触发
  - example <wan-button></wan-button>
---
