---
title: Toast 轻提示
description: 在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。
vueDoc:
  - property String type 提示类型 text
  - value text,loading,success,fail,html
  - property String position 位置 middle
  - value middle,top,middle,bottom
  - property String message 内容
  - property Boolean mask 是否显示遮罩层 false
  - property Boolean forbidClick 是否禁止背景点击 false
  - property Boolean loadingType 加载图标类型 circular
  - value spinner,circular
  - property Number zIndex 层级 1000
  - property Number duration 展示时长(ms),值为0时,toast不会消失 2000
  - property Function onClose 关闭时的回调函数
  - class customClass 根节点样式类
  - event Function click 点击按钮，且按钮状态不为加载或禁用时触发
  - example <wan-toast ref="toast" />
---
