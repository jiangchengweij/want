<template>
	<view class="wan-calendar__header">
	  <template v-if="showTitle">
	    <view class="wan-calendar__header-title"><slot name="title"></slot></view>
	    <view class="wan-calendar__header-title">{{ title }}</view>
	  </template>
	
	  <view v-if="showSubtitle" class="wan-calendar__header-subtitle" @tap="onClickSubtitle">
	    {{ subtitle }}
	  </view>
	
	  <view class="wan-calendar__weekdays">
	    <view v-for="(item, index) in state.weekdays" :key="index" class="wan-calendar__weekday">
	      {{ item }}
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const emit = defineEmits(['click-subtitle'])
const props = defineProps({
	title: {
		type: String,
		default: '日期选择',
	},
	subtitle: String,
	showTitle: Boolean,
	showSubtitle: Boolean,
	firstDayOfWeek: {
		type: Number,
	},
})

const state = reactive({
	weekdays: [] as Array<string>,
})

initWeekDay()

function initWeekDay() {
	const defaultWeeks = ['日', '一', '二', '三', '四', '五', '六'];
	const firstDayOfWeek = props.firstDayOfWeek || 0;
	
	state.weekdays = [
		...defaultWeeks.slice(firstDayOfWeek, 7),
		...defaultWeeks.slice(0, firstDayOfWeek),
	]
}

function onClickSubtitle(event: WechatMiniprogram.TouchEvent) {
	emit('click-subtitle', event);
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.wan-calendar {
  &__header {
    flex-shrink: 0;
    box-shadow: var(--calendar-header-box-shadow, $calendar-header-box-shadow);
  }

  &__header-title,
  &__header-subtitle {
    text-align: center;
    height: var(--calendar-header-title-height, $calendar-header-title-height);
    font-weight: var(--font-weight-bold, $font-weight-bold);
    line-height: var(
      --calendar-header-title-height,
      $calendar-header-title-height
    );
  }

  &__header-title:empty,
  &__header-title + &__header-title {
    display: none;
  }

  &__header-title:empty + &__header-title {
    display: block !important;
  }

  &__weekdays {
    display: flex;
  }

  &__weekday {
    flex: 1;
    text-align: center;
    font-size: var(--calendar-weekdays-font-size, $calendar-weekdays-font-size);
    line-height: var(--calendar-weekdays-height, $calendar-weekdays-height);
  }
}
</style>
