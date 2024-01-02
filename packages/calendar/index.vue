<template>
  <view class="wan-calendar-wrapper" :class="[customClass || '']">
    <wan-popup
      v-if="poppable"
      :custom-class="`wan-calendar__popup--${position}`"
      close-icon-class="wan-calendar__close-icon"
      :show="show"
      :round="round"
      :position="position"
      :closeable="showTitle || showSubtitle"
      :close-on-click-overlay="closeOnClickOverlay"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @enter="onOpen"
      @close="onClose"
      @after-enter="onOpened"
      @after-leave="onClosed"
    >
      <view class="wan-calendar">
        <wan-calendar-header
          :title="title"
          :show-title="showTitle"
          :subtitle="state.subtitle"
          :show-subtitle="showSubtitle"
          :first-day-of-week="firstDayOfWeek"
          @click-subtitle="onClickSubtitle"
        >
          <template #title>
            <slot name="title"></slot>
          </template>
        </wan-calendar-header>
        <scroll-view
          class="wan-calendar__body"
          scroll-y
          :scroll-into-view="state.scrollIntoView"
        >
          <view
            v-for="(item, index) in months"
            :id="`month${index}`"
            :key="index"
            class="month"
            :data-date="item"
          >
            <wan-calendar-month
              :date="item"
              :type="type"
              :color="color"
              :min-date="minDate"
              :max-date="maxDate"
              :show-mark="showMark"
              :formatter="formatter"
              :row-height="rowHeight"
              :current-date="state.currentDate"
              :show-subtitle="showSubtitle"
              :allow-same-day="allowSameDay"
              :show-month-title="index !== 0 || !showSubtitle"
              :first-day-of-week="firstDayOfWeek"
              @click="onClickDay"
            />
          </view>
        </scroll-view>
        <view :class="[bem('calendar__footer', { safeAreaInsetBottom })]">
          <slot name="footer"></slot>
        </view>
        <view :class="[bem('calendar__footer', { safeAreaInsetBottom })]">
          <wan-button
            v-if="showConfirm"
            round
            block
            type="danger"
            :color="color"
            custom-class="wan-calendar__confirm"
            :disabled="getButtonDisabled"
            native-type="text"
            @click="onConfirm"
          >
            {{ getButtonDisabled ? confirmDisabledText : confirmText }}
          </wan-button>
        </view>
      </view>
    </wan-popup>
    <view v-else class="wan-calendar">
      <wan-calendar-header
        :title="title"
        :show-title="showTitle"
        :subtitle="state.subtitle"
        :show-subtitle="showSubtitle"
        :first-day-of-week="firstDayOfWeek"
        @click-subtitle="onClickSubtitle"
      >
        <template #title>
          <slot name="title"></slot>
        </template>
      </wan-calendar-header>
      <scroll-view
        class="wan-calendar__body"
        scroll-y
        :scroll-into-view="state.scrollIntoView"
      >
        <view
          v-for="(item, index) in months"
          :id="`month${index}`"
          :key="index"
          :data-date="item"
          class="month"
        >
          <wan-calendar-month
            :date="item"
            :type="type"
            :color="color"
            :min-date="minDate"
            :max-date="maxDate"
            :show-mark="showMark"
            :formatter="formatter"
            :row-height="rowHeight"
            :current-date="state.currentDate"
            :show-subtitle="showSubtitle"
            :allow-same-day="allowSameDay"
            :show-month-title="index !== 0 || !showSubtitle"
            :first-day-of-week="firstDayOfWeek"
            @click="onClickDay"
          />
        </view>
      </scroll-view>
      <view :class="[bem('calendar__footer', { safeAreaInsetBottom })]">
        <slot name="footer"></slot>
      </view>
      <view :class="[bem('calendar__footer', { safeAreaInsetBottom })]">
        <wan-button
          v-if="showConfirm"
          round
          block
          type="danger"
          :color="color"
          custom-class="wan-calendar__confirm"
          :disabled="getButtonDisabled"
          native-type="text"
          @click="onConfirm"
        >
          {{ getButtonDisabled ? confirmDisabledText : confirmText }}
        </wan-button>
      </view>
    </view>
    <wan-toast ref="toastRef" />
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
