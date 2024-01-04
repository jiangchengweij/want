<template>
  <view :class="[customClass || '', bem('steps', [direction])]">
    <view class="wan-step__wrapper">
      <view
        v-for="(item, index) in steps"
        :key="index"
        class="wan-hairline"
        :class="[bem('step', [direction, get(index, active)])]"
        :style="
          get(index, active) === 'inactive' ? 'color: ' + inactiveColor : ''
        "
        @tap="onClick"
      >
        <view
          class="wan-step__title"
          :style="index === active ? 'color: ' + activeColor : ''"
        >
          <view>{{ item.text }}</view>
          <view :class="descClass || ''">{{ item.desc }}</view>
        </view>
        <view class="wan-step__circle-container">
          <template v-if="index !== active">
            <view
              v-if="item.inactiveIcon || inactiveIcon"
              class="wan-step__icon"
            >
              <wan-icon
                :color="
                  get(index, active) === 'inactive'
                    ? inactiveColor
                    : activeColor
                "
                :name="item.inactiveIcon || inactiveIcon"
              />
            </view>
            <view
              v-else
              class="wan-step__circle"
              :style="
                'background-color: ' +
                (index < active ? activeColor : inactiveColor)
              "
            />
          </template>
          <view v-else class="wan-step__icon">
            <wan-icon
              :name="item.activeIcon || activeIcon"
              :color="activeColor"
            />
          </view>
        </view>
        <view
          v-if="index !== steps.length - 1"
          class="wan-step__line"
          :style="
            'background-color: ' +
            (index < active ? activeColor : inactiveColor)
          "
        />
      </view>
    </view>
  </view>
</template>
<script>
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
