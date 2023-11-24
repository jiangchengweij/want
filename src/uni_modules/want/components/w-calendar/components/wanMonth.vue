<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-calendar__month" :style="getMonthStyle">
	  <view v-if="showMonthTitle" class="wan-calendar__month-title">
	    {{ getFormatMonthTitle }}
	  </view>
	
	  <view v-if="state.visible" class="wan-calendar__days">
	    <view v-if="showMark" class="wan-calendar__month-mark">
	      {{ getMark }}
	    </view>
	
	    <view
	      v-for="(item, index) in state.days"
	      :key="index"
	      :style="getDayStyle(item.type, index)"
	      :class="[bem('calendar__day', [item.type]), item.className || '']"
	      @tap="onClick(index)"
	    >
	      <view v-if="item.type === 'selected'" class="wan-calendar__selected-day" :style="`width: ${ rowHeight }px; height: ${ rowHeight }px; background: ${ color }`">
	        <view v-if="item.topInfo" class="wan-calendar__top-info">{{ item.topInfo }}</view>
	        {{ item.text }}
	        <view v-if="item.bottomInfo" class="wan-calendar__bottom-info">
	          {{ item.bottomInfo }}
	        </view>
	      </view>
	
	      <view v-else>
	        <view v-if="item.topInfo" class="wan-calendar__top-info">{{ item.topInfo }}</view>
	        {{ item.text }}
	        <view v-if="item.bottomInfo" class="wan-calendar__bottom-info">
	          {{ item.bottomInfo }}
	        </view>
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue'
import { getMonthEndDay, compareDay, getPrevDay, getNextDay, formatMonthTitle, Day } from '../utils';
import { bem } from '../../utils/bem'

const emit = defineEmits(['click'])
const props = defineProps({
	date: {
		type: null,
	},
	type: {
		type: String,
	},
	color: String,
	minDate: {
		type: null,
	},
	maxDate: {
		type: null,
	},
	showMark: Boolean,
	rowHeight: null,
	formatter: {
		type: null,
	},
	currentDate: {
		type: null,
	},
	firstDayOfWeek: {
		type: Number,
	},
	allowSameDay: Boolean,
	showSubtitle: Boolean,
	showMonthTitle: Boolean,
})

watch(() => [props.date, props.type, props.minDate, props.maxDate, 
	props.formatter, props.currentDate, props.firstDayOfWeek], () => {
	setDays()
}, { deep: true })

const state = reactive({
	visible: true,
	days: [] as Day[],
})

onMounted(() => {
	setDays()
})

const ROW_HEIGHT = 64;

const getMark = computed(() => {
	return new Date(props.date).getMonth() + 1;
})

const getDayStyle = computed(() => {
	const { date, rowHeight, color, firstDayOfWeek } = props;
	const current = new Date(date).getDay() || 7;
	const offset = current < firstDayOfWeek ? (7 - firstDayOfWeek + current) :
		 current === 7 && firstDayOfWeek === 0 ? 0 :
		 (current - firstDayOfWeek);
	
	return (type, index) => {
		const style = [];
		if (index === 0) {
			style.push(['margin-left', (100 * offset) / 7 + '%']);
		}
	
		if (rowHeight !== ROW_HEIGHT) {
			style.push(['height', rowHeight + 'px']);
		}
	
		if (color) {
			if (
				type === 'start' ||
				type === 'end' ||
				type === 'start-end' ||
				type === 'multiple-selected' ||
				type === 'multiple-middle'
			) {
				style.push(['background', color]);
			} else if (type === 'middle') {
				style.push(['color', color]);
			}
		}
	
		return style
			.map(function(item) {
				return item.join(':');
			})
			.join(';');
	}
})

const getFormatMonthTitle = computed(() => {
	return formatMonthTitle(props.date)
})

const getMonthStyle = computed(() => {
	const { date, rowHeight } = props;
	if (!state.visible) {
		const curDate = new Date(date);

		var totalDay = getMonthEndDay(
			curDate.getFullYear(),
			curDate.getMonth() + 1
		);
		var offset = curDate.getDay();
		var padding = Math.ceil((totalDay + offset) / 7) * rowHeight;

		return 'padding-bottom:' + padding + 'px';
	}
})

function onClick(index: number) {
	const item: Day = state.days[index];
	if (item.type !== 'disabled') {
		emit('click', item);
	}
}

function setDays() {
	const days: Day[] = [];
	const startDate = new Date(props.date);
	const year = startDate.getFullYear();
	const month = startDate.getMonth();

	const totalDay = getMonthEndDay(
		startDate.getFullYear(),
		startDate.getMonth() + 1
	);
	for (let day = 1; day <= totalDay; day++) {
		const date = new Date(year, month, day);
		const type = getDayType(date);

		let config: Day = {
			date,
			type,
			text: day,
			bottomInfo: getBottomInfo(type),
		};

		if (props.formatter) {
			config = props.formatter(config);
		}

		days.push(config);
	}
	state.days = days
}

function getMultipleDayType(day) {
	const { currentDate } = props;
	
	if (!Array.isArray(currentDate)) {
		return '';
	}

	const isSelected = (date) =>
		currentDate.some((item) => compareDay(item, date) === 0);

	if (isSelected(day)) {
		const prevDay = getPrevDay(day);
		const nextDay = getNextDay(day);
		const prevSelected = isSelected(prevDay);
		const nextSelected = isSelected(nextDay);

		if (prevSelected && nextSelected) {
			return 'multiple-middle';
		}

		if (prevSelected) {
			return 'end';
		}

		return nextSelected ? 'start' : 'multiple-selected';
	}

	return '';
}

function getRangeDayType(day) {
	const { currentDate, allowSameDay } = props;
	if (!Array.isArray(currentDate)) {
		return '';
	}

	const [startDay, endDay] = currentDate;

	if (!startDay) {
		return '';
	}

	const compareToStart = compareDay(day, startDay);

	if (!endDay) {
		return compareToStart === 0 ? 'start' : '';
	}

	const compareToEnd = compareDay(day, endDay);

	if (compareToStart === 0 && compareToEnd === 0 && allowSameDay) {
		return 'start-end';
	}

	if (compareToStart === 0) {
		return 'start';
	}

	if (compareToEnd === 0) {
		return 'end';
	}

	if (compareToStart > 0 && compareToEnd < 0) {
		return 'middle';
	}

	return '';
}

function getDayType(day) {
	const { type, minDate, maxDate, currentDate } = props;

	if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
		return 'disabled';
	}

	if (type === 'single') {
		return compareDay(day, currentDate) === 0 ? 'selected' : '';
	}

	if (type === 'multiple') {
		return getMultipleDayType(day);
	}

	/* istanbul ignore else */
	if (type === 'range') {
		return getRangeDayType(day);
	}

	return '';
}

function getBottomInfo(type) {
	if (props.type === 'range') {
		if (type === 'start') {
			return '开始';
		}
		if (type === 'end') {
			return '结束';
		}
		if (type === 'start-end') {
			return '开始/结束';
		}
	}
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.wan-calendar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(
    --calendar-background-color,
    $calendar-background-color
  );

  &__month-title {
    text-align: center;
    height: var(--calendar-header-title-height, $calendar-header-title-height);
    font-weight: var(--font-weight-bold, $font-weight-bold);
    font-size: var(
      --calendar-month-title-font-size,
      $calendar-month-title-font-size
    );
    line-height: var(
      --calendar-header-title-height,
      $calendar-header-title-height
    );
  }

  &__days {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    user-select: none;
  }

  &__month-mark {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 0;
    transform: translate(-50%, -50%);
    pointer-events: none;
    color: var(--calendar-month-mark-color, $calendar-month-mark-color);
    font-size: var(
      --calendar-month-mark-font-size,
      $calendar-month-mark-font-size
    );
  }

  &__day,
  &__selected-day {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &__day {
    position: relative;
    width: 14.285%;
    height: var(--calendar-day-height, $calendar-day-height);
    font-size: var(--calendar-day-font-size, $calendar-day-font-size);

    &--end,
    &--start,
    &--start-end,
    &--multiple-middle,
    &--multiple-selected {
      color: var(--calendar-range-edge-color, $calendar-range-edge-color);
      background-color: var(
        --calendar-range-edge-background-color,
        $calendar-range-edge-background-color
      );
    }

    &--start {
      border-radius: $border-radius-md 0 0 $border-radius-md;
    }

    &--end {
      border-radius: 0 $border-radius-md $border-radius-md 0;
    }

    &--start-end,
    &--multiple-selected {
      border-radius: $border-radius-md;
    }

    &--middle {
      color: var(--calendar-range-middle-color, $calendar-range-middle-color);

      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: currentColor;
        content: '';
        opacity: var(
          --calendar-range-middle-background-opacity,
          $calendar-range-middle-background-opacity
        );
      }
    }

    &--disabled {
      cursor: default;
      color: var(--calendar-day-disabled-color, $calendar-day-disabled-color);
    }
  }

  &__top-info,
  &__bottom-info {
    position: absolute;
    right: 0;
    left: 0;
    font-size: var(--calendar-info-font-size, $calendar-info-font-size);
    line-height: var(--calendar-info-line-height, $calendar-info-line-height);

    @media (max-width: 350px) {
      font-size: 9px;
    }
  }

  &__top-info {
    top: 6px;
  }

  &__bottom-info {
    bottom: 6px;
  }

  &__selected-day {
    width: var(--calendar-selected-day-size, $calendar-selected-day-size);
    height: var(--calendar-selected-day-size, $calendar-selected-day-size);
    color: var(--calendar-selected-day-color, $calendar-selected-day-color);
    background-color: var(
      --calendar-selected-day-background-color,
      $calendar-selected-day-background-color
    );
    border-radius: $border-radius-md;
  }
}
</style>
