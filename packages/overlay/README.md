---
title: Overlay 遮罩层
description: 创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。
vueDoc:
  - property Boolean show 是否展示遮罩层 false
  - property Number zIndex 层级 1
  - property Number|Object duration 动画时长,单位为毫秒 300
  - property String customStyle 自定义样式
  - class customClass 根节点样式类
  - event Function click 点击按钮，且按钮状态不为加载或禁用时触发
  - example <wan-overlay :show="show" @click="onClickHide" />
---
