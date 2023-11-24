<script lang="ts">
	/**
	 * Calendar 日历
	 * @description 日历组件用于选择日期或日期区间。
	 * @tutorial https://wei.jiangchengwei.io/calendar
	 * @property {String} type=[single|multiple|range] 选择类型: `single`表示选择单个日期，`multiple`表示选择多个日期，`range`表示选择日期区间，默认 single
	 * @property {String} title 日历标题，默认 日期选择
	 * @property {String} color 主题色，对底部按钮和选中日期生效，默认 #ee0a24
	 * @property {Date} minDate 可选择的最小日期，默认 当前日期
	 * @property {Date} maxDate 可选择的最小日期，默认 当前日期的六个月后
	 * @property {Date|Array} defaultDate 默认选中的日期，`type`为`multiple`或`range`时为数组，传入 `null` 表示默认不选择，默认 今天
	 * @property {String|Number} rowHeight 日期行高，默认 64
	 * @property {Function} formatter 日期格式化函数 | (day: Day) => Day
	 * @property {Boolean} poppable 是否以弹层的形式展示日历，默认 true
	 * @property {Boolean} showMark 是否显示月份背景水印，默认 true
	 * @property {Boolean} showTitle 是否展示日历标题，默认 true
	 * @property {Boolean} showSubtitle 是否展示日历副标题（年月），默认 true
	 * @property {Boolean} showConfirm 是否展示确认按钮，默认 true
	 * @property {String} confirmText 确认按钮的文字，默认 确定
	 * @property {String} confirmDisabledText 确认按钮处于禁用状态时的文字，默认 确定
	 * @property {Number} firstDayOfWeek 设置周起始日，默认 0
	 * @property {Boolean} readonly 是否为只读状态，只读状态下不能选择日期，默认 false
	 * @property {Boolean} show 是否显示日历弹窗，默认 false
	 * @property {String} position=[top|bottom|right|left] 弹出位置，默认 bottom
	 * @property {Boolean} round 是否显示圆角弹窗，默认 true
	 * @property {Boolean} closeOnClickOverlay 是否在点击遮罩层后关闭，默认 true
	 * @property {Boolean} safeAreaInsetBottom 是否开启底部安全区适配，默认 true
	 * @property {Number} maxRange 日期区间最多可选天数，默认 无限制
	 * @property {String} rangePrompt 范围选择超过最多可选天数时的提示文案，默认 选择天数不能超过 xx 天
	 * @property {Boolean} showRangePrompt 范围选择超过最多可选天数时，是否展示提示文案，默认 true
	 * @property {Boolean} allowSameDay 是否允许日期范围的起止时间为同一天，默认 false
	 * @property {Number} minRange 日期最少可选天数，默认 1
	 * @property {String} customClass 根节点样式类
	 * @event {Function} select 点击任意日期时触发
	 * @event {Function} unselect 当 Calendar 的 `type` 为 `multiple` 时,点击已选中的日期时触发
	 * @event {Function} confirm 日期选择完成后触发，若`show-confirm`为`true`，则点击确认按钮后触发
	 * @event {Function} open 打开弹出层时触发
	 * @event {Function} close 关闭弹出层时触发
	 * @event {Function} opened 关闭弹出层且动画结束后触发
	 * @event {Function} overRange 范围选择超过最多可选天数时触发
	 * @event {Function} clickSubtitle 点击日历副标题时触发
	 * @example <w-calendar :show="show" @close="onClose" @confirm="onConfirm" />
	 */
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-calendar-wrap" :class="[customClass || '']">
		<w-popup
		  v-if="poppable"
		  :custom-class="`wan-calendar__popup--${ position }`"
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
				<wan-header
					:title="title"
					:showTitle="showTitle"
					:subtitle="state.subtitle"
					:showSubtitle="showSubtitle"
					:firstDayOfWeek="firstDayOfWeek"
					@click-subtitle="onClickSubtitle"
				>
					<slot name="title" slot="title"></slot>
				</wan-header>
				<scroll-view
					class="wan-calendar__body"
					scroll-y
					:scroll-into-view="state.scrollIntoView"
				>
					<wan-month
						v-for="(item, index) in months"
						:key="index"
						:id="`month${ index }`"
						class="month"
						:date="item"
						:data-date="item"
						:type="type"
						:color="color"
						:minDate="minDate"
						:maxDate="maxDate"
						:showMark="showMark"
						:formatter="formatter"
						:rowHeight="rowHeight"
						:currentDate="state.currentDate"
						:showSubtitle="showSubtitle"
						:allowSameDay="allowSameDay"
						:showMonthTitle="index !== 0 || !showSubtitle"
						:firstDayOfWeek="firstDayOfWeek"
						@click="onClickDay"
					/>
				</scroll-view>
				<view
					:class="[bem('calendar__footer', { safeAreaInsetBottom })]"
				>
					<slot name="footer"></slot>
				</view>
				<view
					:class="[bem('calendar__footer', { safeAreaInsetBottom })]"
				>
					<w-button
						v-if="showConfirm"
						round
						block
						type="danger"
						:color="color"
						custom-class="wan-calendar__confirm"
						:disabled="getButtonDisabled"
						nativeType="text"
						@click="onConfirm"
					>
						{{
							getButtonDisabled
								? confirmDisabledText
								: confirmText
						}}
					</w-button>
				</view>
			</view>
		</w-popup>
		<view v-else class="wan-calendar">
			<wan-header
				:title="title"
				:showTitle="showTitle"
				:subtitle="state.subtitle"
				:showSubtitle="showSubtitle"
				:firstDayOfWeek="firstDayOfWeek"
				@click-subtitle="onClickSubtitle"
			>
				<slot name="title" slot="title"></slot>
			</wan-header>
			<scroll-view
				class="wan-calendar__body"
				scroll-y
				:scroll-into-view="state.scrollIntoView"
			>
				<wan-month
					v-for="(item, index) in months"
					:key="index"
					:id="`month${ index }`"
					class="month"
					:date="item"
					:data-date="item"
					:type="type"
					:color="color"
					:minDate="minDate"
					:maxDate="maxDate"
					:showMark="showMark"
					:formatter="formatter"
					:rowHeight="rowHeight"
					:currentDate="state.currentDate"
					:showSubtitle="showSubtitle"
					:allowSameDay="allowSameDay"
					:showMonthTitle="index !== 0 || !showSubtitle"
					:firstDayOfWeek="firstDayOfWeek"
					@click="onClickDay"
				/>
			</scroll-view>
			<view
				:class="[bem('calendar__footer', { safeAreaInsetBottom })]"
			>
				<slot name="footer"></slot>
			</view>
			<view
				:class="[bem('calendar__footer', { safeAreaInsetBottom })]"
			>
				<w-button
					v-if="showConfirm"
					round
					block
					type="danger"
					:color="color"
					custom-class="wan-calendar__confirm"
					:disabled="getButtonDisabled"
					nativeType="text"
					@click="onConfirm"
				>
					{{
						getButtonDisabled
							? confirmDisabledText
							: confirmText
					}}
				</w-button>
			</view>
		</view>
		<w-toast ref="toastRef" />
	</view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, unref, watch } from 'vue';
import { bem } from '../utils/bem'
import wanMonth from './components/wanMonth'
import wanHeader from './components/wanHeader'
import Toast from '../utils/toast'
import { requestAnimationFrame } from '../utils'

import {
  ROW_HEIGHT,
  getPrevDay,
  getNextDay,
  getToday,
  compareDay,
  copyDates,
  calcDateNum,
  formatMonthTitle,
  compareMonth,
  getMonths,
  getDayByOffset,
	initialMinDate,
	initialMaxDate,
	getTime,
	Day
} from './utils';

const emit = defineEmits(['open', 'opened', 'close', 'closed', 'unselect', 'select', 'confirm', 'click-subtitle', 'over-range'])
const props = defineProps({
	title: {
		type: String,
		default: '日期选择',
	},
	color: String,
	show: {
		default: Boolean,
	},
	formatter: null,
	confirmText: {
		type: String,
		default: '确定',
	},
	confirmDisabledText: {
		type: String,
		default: '确定',
	},
	rangePrompt: String,
	showRangePrompt: {
		type: Boolean,
		default: true,
	},
	defaultDate: {
		type: null,
		default: () => getToday().getTime(),
	},
	allowSameDay: Boolean,
	type: {
		type: String,
		default: 'single',
	},
	minDate: {
		type: Number,
		default: initialMinDate,
	},
	maxDate: {
		type: Number,
		default: initialMaxDate,
	},
	position: {
		type: String,
		default: 'bottom',
	},
	rowHeight: {
		type: null,
		default: ROW_HEIGHT,
	},
	round: {
		type: Boolean,
		default: true,
	},
	poppable: {
		type: Boolean,
		default: true,
	},
	showMark: {
		type: Boolean,
		default: true,
	},
	showTitle: {
		type: Boolean,
		default: true,
	},
	showConfirm: {
		type: Boolean,
		default: true,
	},
	showSubtitle: {
		type: Boolean,
		default: true,
	},
	safeAreaInsetBottom: {
		type: Boolean,
		default: true,
	},
	closeOnClickOverlay: {
		type: Boolean,
		default: true,
	},
	maxRange: {
		type: null,
		default: null,
	},
	minRange: {
		type: Number,
		default: 1,
	},
	firstDayOfWeek: {
		type: Number,
		default: 0,
	},
	readonly: Boolean,
	customClass: null
})

const state = reactive({
	subtitle: '',
	currentDate: getInitialDate(props.defaultDate),
	scrollIntoView: '',
})

const instance = getCurrentInstance()

const toastRef = ref(null)

watch(() => props.defaultDate, (newVal) => {
	state.currentDate = newVal;
	scrollIntoView();
})

watch(() => props.show, () => {
  if (props.show) {
		initRect();
		scrollIntoView();
	}
})

watch(() => props.minDate, () => {
	initRect()
})

watch(() => props.maxDate, () => {
	initRect()
})

watch(() => props.type, () => {
	reset()
})

onMounted(() => {
	const { show, poppable } = props
	if (show || !poppable) {
		initRect()
		scrollIntoView()
	}
})

const months = computed(() => {
	const { minDate, maxDate } = props;
	return getMonths(minDate, maxDate)
})

const getButtonDisabled = computed(() => {
	const { type, minRange } = props;
	if (!state.currentDate) {
		return true;
	}

	if (type === 'range') {
		return !state.currentDate[0] || !state.currentDate[1];
	}

	if (type === 'multiple') {
		return (state.currentDate as any[]).length < minRange;
	}

	return !state.currentDate;
})

let _contentObserver = null

function initRect() {
	// #ifndef MP
	setTimeout(() => {
	// #endif
		if (_contentObserver) {
			_contentObserver.disconnect();
		}
		const contentObserver = uni.createIntersectionObserver(instance, {
			thresholds: [0, 0.1, 0.9, 1],
			observeAll: true,
		});	
		_contentObserver = contentObserver;
		contentObserver.relativeTo('.wan-calendar__body').observe('.month', (res) => {
			if (res.boundingClientRect.top <= res.relativeRect.top) {
				// @ts-ignore
				state.subtitle = formatMonthTitle(res.dataset.date)
			}
		});
	// #ifndef MP
	}, 200)
	// #endif
}

function limitDateRange(
	date: number,
	minDate: number | null = null,
	maxDate: number | null = null
) {
	minDate = minDate || (props.minDate as number);
	maxDate = maxDate || (props.maxDate as number);
	
	if (compareDay(date, minDate) === -1) {
		return minDate
	}
	if (compareDay(date, minDate) === 1) {
		return minDate
	}
	return date
}

function reset() {
	state.currentDate = getInitialDate()
	scrollIntoView()
}

function getInitialDate(defaultDate: number | number[] | null = null) {
	const { type, minDate, maxDate, allowSameDay } = props;
	
	if (!defaultDate) return [];
	
	const now = getToday().getTime();
	
	if (type === 'range') {
		if (!Array.isArray(defaultDate)) {
			defaultDate = []
		}
		
		const [startDay, endDay] = defaultDate || [];
		
		const startDate = getTime(startDay || now);
		const start = limitDateRange(
			startDate,
			minDate,
			allowSameDay ? startDate : getPrevDay(new Date(maxDate)).getTime()
		);
		
		const date = getTime(endDay || now);
		const end = limitDateRange(
			date,
			allowSameDay ? date : getNextDay(new Date(minDate)).getTime()
		);
		
		return [start, end]
	}
	
	if (type === 'multiple') {
		if (Array.isArray(defaultDate)) {
			return defaultDate.map(date => limitDateRange(date))
		}
		
		return [limitDateRange(now)]
	}
	
	if (!defaultDate || Array.isArray(defaultDate)) {
		defaultDate = now
	}
	
	return limitDateRange(defaultDate)
}

function scrollIntoView() {
	requestAnimationFrame(() => {
		const { type, show, poppable, minDate, maxDate } = props;
		if (!state.currentDate) return;
		// @ts-ignore
		const targetDate = type === 'single' ? state.currentDate : state.currentDate[0];
		const displayed = show || !poppable;
		if (!targetDate || !displayed) {
			return;
		}

		const months = getMonths(minDate, maxDate);

		months.some((month, index) => {
			if (compareMonth(month, targetDate) === 0) {
				state.scrollIntoView = `month${index}`
				return true;
			}

			return false;
		});
	})
}

function checkRange(date) {
	const { maxRange, rangePrompt, showRangePrompt } = props;

	if (maxRange && calcDateNum(date) > maxRange) {
		if (showRangePrompt) {
			Toast({
				ref: toastRef.value,
				message: rangePrompt || `选择天数不能超过 ${maxRange} 天`,
			});
		}
		emit('over-range');

		return false;
	}

	return true;
}

function onConfirm() {
	if (props.type === 'range' && !checkRange(state.currentDate)) {
		return;
	}
	nextTick(() => {
		emit('confirm', copyDates(unref(state.currentDate)));
	})
}


function onClickDay(event) {
	if (props.readonly) {
		return;
	}
	let { date } = event;
	const { type, allowSameDay } = props
	
	if (type === 'range') {
		// @ts-ignore
		const [startDay, endDay] = state.currentDate;

		if (startDay && !endDay) {
			const compareToStart = compareDay(date, startDay);

			if (compareToStart === 1) {
				// const { days } = this.selectComponent('.month').data;
				// days.some((day: Day, index) => {
				// 	const isDisabled =
				// 		day.type === 'disabled' &&
				// 		getTime(startDay) < getTime(day.date) &&
				// 		getTime(day.date) < getTime(date);
				// 	if (isDisabled) {
				// 		({ date } = days[index - 1]);
				// 	}
				// 	return isDisabled;
				// });
				select([startDay, date], true);
			} else if (compareToStart === -1) {
				select([date, null]);
			} else if (allowSameDay) {
				select([date, date], true);
			}
		} else {
			select([date, null]);
		}
	} else if (type === 'multiple') {
		let selectedIndex: number;

		// @ts-ignore
		const selected = state.currentDate.some((dateItem: number, index: number) => {
			const equal = compareDay(dateItem, date) === 0;
			if (equal) {
				selectedIndex = index;
			}
			return equal;
		});

		if (selected) {
			// @ts-ignore
			const cancelDate = state.currentDate.splice(selectedIndex, 1);
			unselect(cancelDate);
		} else {
			// @ts-ignore
			select([...state.currentDate, date]);
		}
	} else {
		select(date, true);
	}
}

function unselect(dateArray) {
	const date = dateArray[0]
	if (date) {
		emit('unselect', copyDates(date))
	}
}

function select(date, complete?: boolean) {
	if (complete && props.type === 'range') {
		const valid = checkRange(date);

		if (!valid) {
			// auto selected to max range if showConfirm
			if (props.showConfirm) {
				emitEvent([
					date[0],
					getDayByOffset(date[0], props.maxRange - 1),
				]);
			} else {
				emitEvent(date);
			}
			return;
		}
	}

	emitEvent(date);

	if (complete && !props.showConfirm) {
		onConfirm();
	}
}

function onOpen() {
	emit('open');
}

function onOpened() {
	emit('opened');
}

function onClose() {
	emit('close');
}

function onClosed() {
	emit('closed');
}

function emitEvent(date) {
	state.currentDate = Array.isArray(date) ? date.map(getTime) : getTime(date)
	emit('select', copyDates(date))
}

function onClickSubtitle(event: TouchEvent) {
	emit('click-subtitle', event);
}

defineExpose({
	reset
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-calendar {
  display: flex;
  flex-direction: column;
  height: var(--calendar-height, $calendar-height);
  background-color: var(
    --calendar-background-color,
    $calendar-background-color
  );

  &__close-icon {
    top: 11px;
  }

  ::v-deep &__popup--top,
  ::v-deep &__popup--bottom {
    height: var(--calendar-popup-height, $calendar-popup-height);
  }

  &__popup--left,
  &__popup--right {
    height: 100%;
  }

  &__body {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    flex-shrink: 0;
    padding: 0 var(--padding-md, $padding-md);

    &--safe-area-inset-bottom {
      padding-bottom: var(--window-bottom);
    }
  }

  &__footer:empty,
  &__footer + &__footer {
    display: none;
  }

  &__footer:empty + &__footer {
    display: block !important;
  }

  ::v-deep &__confirm {
    height: var(
      --calendar-confirm-button-height,
      $calendar-confirm-button-height
    ) !important;
    margin: var(
      --calendar-confirm-button-margin,
      $calendar-confirm-button-margin
    ) !important;
    line-height: var(
      --calendar-confirm-button-line-height,
      $calendar-confirm-button-line-height
    ) !important;
  }
}
</style>

