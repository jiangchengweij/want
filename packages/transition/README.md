---
title: Transition 动画
description: 使元素从一种样式逐渐变化为另一种样式的效果。
vueDoc:
  - property String 动画类型 fade
  - value fade,fade-up,fade-down,fade-left,fade-right,slide-up,slide-down,slide-left,slide-right
  - property Boolean show 是否展示组件 true
  - property Number|Object duration 动画时长,单位为毫秒 300
  - property String customStyle 自定义样式
  - class customClass 根节点样式类
  - class beforeClass 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
  - class enterActiveClass 定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
  - class enterToClass 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 enter-class 被移除)，在过渡/动画完成之后移除。
  - class leaveClass 义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
  - class leaveActiveClass 定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
  - class leaveToClass 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 leave-class 被删除)，在过渡/动画完成之后移除。
  - event Function beforeEnter 进入前触发
  - event Function enter 进入中触发
  - event Function afterEnter 进入后触发
  - event Function beforeLeave 离开前触发
  - event Function leave 离开中触发
  - event Function afterLeave 离开后触发
  - example <wan-transition :show="show" custom-class="block">内容</wan-transition>
---
