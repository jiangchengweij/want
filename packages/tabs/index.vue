<template>
  <view :class="[customClass || '', bem('tabs')]">
    <wan-sticky
      :disabled="!sticky"
      :z-index="zIndex"
      :offset-top="offsetTop"
      :web-offset-top="webOffsetTop"
      :container="container"
      custom-class="wan-tabs__sticky"
      @scroll="onTouchScroll"
    >
      <view
        :class="[
          `wan-tabs--${type}`,
          bem('tabs__wrap', { scrollable: state.scrollable }),
          type === 'line' && border ? 'wan-hairline--top-bottom' : '',
          wrapClass || ''
        ]"
      >
        <slot name="nav-left"></slot>
        <scroll-view
          :scroll-x="state.scrollable"
          :scroll-with-animation="state.scrollWithAnimation"
          :scroll-left="state.scrollLeft"
          :class="[bem('tabs__scroll', [type])]"
          :style="color ? 'border-color: ' + color : ''"
        >
          <view
            :class="[
              bem('tabs__nav', [type, { complete: !ellipsis }]),
              navClass || ''
            ]"
            :style="navStyle"
          >
            <view
              v-if="type === 'line'"
              class="wan-tabs__line"
              :style="lineStyle"
            ></view>
            <view
              v-for="(item, index) in state.tabs"
              :key="index"
              :class="[
                tabClass({ active: index === state.currentIndex }),
                bem('tab', {
                  active: index === state.currentIndex,
                  disabled: item.disabled,
                  complete: !ellipsis
                })
              ]"
              :style="
                tabStyle({
                  disabled: item.disabled,
                  active: index === state.currentIndex
                })
              "
              @tap="onTap(index)"
            >
              <view
                :class="[ellipsis ? 'wan-ellipsis' : '']"
                :style="item.titleStyle"
              >
                {{ item.title }}
                <wan-info
                  v-if="item.info || item.dot"
                  :info="item.info"
                  :dot="item.dot"
                  custom-class="wan-tab__title__info"
                ></wan-info>
              </view>
            </view>
          </view>
        </scroll-view>
        <slot name="nav-right"></slot>
      </view>
    </wan-sticky>
    <view
      class="wan-tabs__content"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <view
        class="wan-tabs__track"
        :class="[bem('tabs__track', [{ animated }])]"
        :style="trackStyle"
      >
        <slot />
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { getCurrentInstance } from 'vue';
import { setup, props, emits } from './index';

export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared'
  },
  props,
  emits: [...emits],
  setup(props, context) {
    const instance = getCurrentInstance();
    return setup.call(instance, props, context);
  }
};
</script>
<style lang="scss">
@import './index.scss';
</style>
