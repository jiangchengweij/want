/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ComponentInternalInstance,
  computed,
  ExtractPropTypes,
  nextTick,
  onMounted,
  reactive,
  ref,
  SetupContext,
  unref,
  watch
} from 'vue';
import { bem, addUnit, style } from '../common/utils';
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
  getTime
} from '../common/utils/time';

export const emits = [
  'open',
  'opened',
  'close',
  'closed',
  'unselect',
  'select',
  'confirm',
  'click-subtitle',
  'over-range'
] as const;
export const props = {
  title: {
    type: String,
    default: '日期选择'
  },
  color: String,
  show: {
    default: Boolean
  },
  formatter: null,
  confirmText: {
    type: String,
    default: '确定'
  },
  confirmDisabledText: {
    type: String,
    default: '确定'
  },
  rangePrompt: String,
  showRangePrompt: {
    type: Boolean,
    default: true
  },
  defaultDate: {
    type: null,
    default: () => getToday().getTime()
  },
  allowSameDay: Boolean,
  type: {
    type: String,
    default: 'single'
  },
  minDate: {
    type: Number,
    default: initialMinDate
  },
  maxDate: {
    type: Number,
    default: initialMaxDate
  },
  position: {
    type: String,
    default: 'bottom'
  },
  rowHeight: {
    type: null,
    default: ROW_HEIGHT
  },
  round: {
    type: Boolean,
    default: true
  },
  poppable: {
    type: Boolean,
    default: true
  },
  showMark: {
    type: Boolean,
    default: true
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  showConfirm: {
    type: Boolean,
    default: true
  },
  showSubtitle: {
    type: Boolean,
    default: true
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  maxRange: {
    type: null,
    default: null
  },
  minRange: {
    type: Number,
    default: 1
  },
  firstDayOfWeek: {
    type: Number,
    default: 0
  },
  readonly: Boolean,
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(
  this: ComponentInternalInstance,
  props: Props,
  context: Context
) {
  const { emit } = context;
  const state = reactive({
    subtitle: '',
    currentDate: getInitialDate(props.defaultDate),
    scrollIntoView: ''
  });

  const toastRef = ref<AnyObject | null>(null);

  watch(
    () => props.defaultDate,
    (newVal) => {
      state.currentDate = newVal;
      scrollIntoView();
    }
  );

  watch(
    () => props.show,
    () => {
      if (props.show) {
        initRect();
        scrollIntoView();
      }
    }
  );

  watch(
    () => props.minDate,
    () => {
      initRect();
    }
  );

  watch(
    () => props.maxDate,
    () => {
      initRect();
    }
  );

  watch(
    () => props.type,
    () => {
      reset();
    }
  );

  onMounted(() => {
    const { show, poppable } = props;
    if (show || !poppable) {
      initRect();
      scrollIntoView();
    }
  });

  const months = computed(() => {
    const { minDate, maxDate } = props;
    return getMonths(minDate, maxDate);
  });

  const getButtonDisabled = computed(() => {
    const { type, minRange } = props;
    if (!state.currentDate) {
      return true;
    }

    if (type === 'range') {
      return !state.currentDate[0] || !state.currentDate[1];
    }

    if (type === 'multiple') {
      return (state.currentDate as number[]).length < minRange;
    }

    return !state.currentDate;
  });

  let _contentObserver: UniApp.IntersectionObserver | null = null;

  const initRect = () => {
    // #ifndef MP
    setTimeout(() => {
      // #endif
      if (_contentObserver) {
        _contentObserver.disconnect();
      }
      const contentObserver = uni.createIntersectionObserver(this, {
        thresholds: [0, 0.1, 0.9, 1],
        observeAll: true
      });
      _contentObserver = contentObserver;
      contentObserver
        .relativeTo('.wan-calendar__body')
        .observe('.month', (res) => {
          if (res.boundingClientRect.top <= res.relativeRect.top) {
            // @ts-expect-error
            state.subtitle = formatMonthTitle(res.dataset.date);
          }
        });
      // #ifndef MP
    }, 200);
    // #endif
  };

  function limitDateRange(
    date: number,
    minDate: number | null = null,
    maxDate: number | null = null
  ) {
    minDate = minDate || (props.minDate as number);
    maxDate = maxDate || (props.maxDate as number);

    if (compareDay(date, minDate) === -1) {
      return minDate;
    }
    if (compareDay(date, minDate) === 1) {
      return minDate;
    }
    return date;
  }

  const reset = () => {
    state.currentDate = getInitialDate();
    scrollIntoView();
  };

  function getInitialDate(defaultDate: number | number[] | null = null) {
    const { type, minDate, maxDate, allowSameDay } = props;

    if (!defaultDate) return [];

    const now = getToday().getTime();

    if (type === 'range') {
      if (!Array.isArray(defaultDate)) {
        defaultDate = [];
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

      return [start, end];
    }

    if (type === 'multiple') {
      if (Array.isArray(defaultDate)) {
        return defaultDate.map((date) => limitDateRange(date));
      }

      return [limitDateRange(now)];
    }

    if (!defaultDate || Array.isArray(defaultDate)) {
      defaultDate = now;
    }

    return limitDateRange(defaultDate);
  }

  const scrollIntoView = () => {
    requestAnimationFrame(() => {
      const { type, show, poppable, minDate, maxDate } = props;
      if (!state.currentDate) return;
      // @ts-ignore
      const targetDate =
        type === 'single' ? state.currentDate : state.currentDate[0];
      const displayed = show || !poppable;
      if (!targetDate || !displayed) {
        return;
      }

      const months = getMonths(minDate, maxDate);

      months.some((month, index) => {
        if (compareMonth(month, targetDate) === 0) {
          state.scrollIntoView = `month${index}`;
          return true;
        }

        return false;
      });
    });
  };

  const checkRange = (date) => {
    const { maxRange, rangePrompt, showRangePrompt } = props;

    if (maxRange && calcDateNum(date) > maxRange) {
      if (showRangePrompt) {
        toastRef.value!.show({
          message: rangePrompt || `选择天数不能超过 ${maxRange} 天`
        });
      }
      emit('over-range');

      return false;
    }

    return true;
  };

  const onConfirm = () => {
    if (props.type === 'range' && !checkRange(state.currentDate)) {
      return;
    }
    nextTick(() => {
      emit('confirm', copyDates(unref(state.currentDate)));
    });
  };

  const onClickDay = (event) => {
    if (props.readonly) {
      return;
    }
    const { date } = event;
    const { type, allowSameDay } = props;

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
      const selected = state.currentDate.some(
        (dateItem: number, index: number) => {
          const equal = compareDay(dateItem, date) === 0;
          if (equal) {
            selectedIndex = index;
          }
          return equal;
        }
      );

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
  };

  const unselect = (dateArray) => {
    const date = dateArray[0];
    if (date) {
      emit('unselect', copyDates(date));
    }
  };

  const select = (date, complete?: boolean) => {
    if (complete && props.type === 'range') {
      const valid = checkRange(date);

      if (!valid) {
        // auto selected to max range if showConfirm
        if (props.showConfirm) {
          emitEvent([date[0], getDayByOffset(date[0], props.maxRange - 1)]);
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
  };

  const onOpen = () => {
    emit('open');
  };

  const onOpened = () => {
    emit('opened');
  };

  const onClose = () => {
    emit('close');
  };

  const onClosed = () => {
    emit('closed');
  };

  const emitEvent = (date) => {
    state.currentDate = Array.isArray(date) ? date.map(getTime) : getTime(date);
    emit('select', copyDates(date));
  };

  const onClickSubtitle = (event: TouchEvent) => {
    emit('click-subtitle', event);
  };
  return {
    bem,
    style,
    addUnit,
    state,
    toastRef,
    months,
    getButtonDisabled,
    onClickDay,
    onOpen,
    onOpened,
    onClose,
    onClosed,
    onConfirm,
    onClickSubtitle
  };
}
