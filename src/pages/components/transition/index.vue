<template>
  <demo-block title="基础用法" padding>
    <wan-cell title="Fade" is-link @click="onClickFade" />
    <wan-cell title="Fade Up" is-link @click="onClickFadeUp" />
    <wan-cell title="Fade Down" is-link @click="onClickFadeDown" />
    <wan-cell title="Fade Left" is-link @click="onClickFadeLeft" />
    <wan-cell title="Fade Right" is-link @click="onClickFadeRight" />
    <wan-cell title="Slide Up" is-link @click="onClickSlideUp" />
    <wan-cell title="Slide Down" is-link @click="onClickSlideDown" />
    <wan-cell title="Slide Left" is-link @click="onClickSlideLeft" />
    <wan-cell title="Slide Right" is-link @click="onClickSlideRight" />
    <wan-cell title="Custom" is-link @click="onClickCustom" />

    <wan-transition
      :show="state.show"
      :name="state.name"
      custom-class="block"
    />

    <wan-transition
      :show="state.showCustom"
      name=""
      :duration="{ enter: 300, leave: 1000 }"
      custom-class="block"
      enter-class="wan-enter-class"
      enter-active-class="wan-enter-active-class"
      leave-active-class="wan-leave-active-class"
      leave-to-class="wan-leave-to-class"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    />
  </demo-block>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
  show: false,
  name: 'fade',
  showCustom: false
});

function onClickFade() {
  trigger('fade');
}

function onClickFadeUp() {
  trigger('fade-up');
}

function onClickFadeDown() {
  trigger('fade-down');
}

function onClickFadeLeft() {
  trigger('fade-left');
}

function onClickFadeRight() {
  trigger('fade-right');
}

function onClickSlideUp() {
  trigger('slide-up');
}

function onClickSlideDown() {
  trigger('slide-down');
}

function onClickSlideLeft() {
  trigger('slide-left');
}

function onClickSlideRight() {
  trigger('slide-right');
}
function trigger(name: string) {
  state.name = name;
  state.show = true;
  setTimeout(() => {
    state.show = false;
  }, 500);
}
function onClickCustom() {
  state.showCustom = true;
  setTimeout(() => {
    state.showCustom = false;
  }, 1000);
}
function onBeforeEnter() {
  console.log('before enter');
}
function onEnter() {
  console.log('enter');
}
function onAfterEnter() {
  console.log('after enter');
}
function onBeforeLeave() {
  console.log('before leave');
}
function onLeave() {
  console.log('leave');
}
function onAfterLeave() {
  console.log('after leave');
}
</script>

<style lang="scss">
.block {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
  background-color: #1989fa;
}

.wan-enter-active-class,
.wan-leave-active-class {
  transition-property: background-color, transform;
}

.wan-enter-class,
.wan-leave-to-class {
  background-color: red;
  transform: rotate(-360deg) translate3d(-100%, -100%, 0);
}
</style>
