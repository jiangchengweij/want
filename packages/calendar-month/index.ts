import {
  computed,
  ExtractPropTypes,
  onMounted,
  reactive,
  SetupContext,
  watch
} from 'vue';
import { bem, addUnit, style } from '../common/utils';
import {
  getMonthEndDay,
  compareDay,
  getPrevDay,
  getNextDay,
  formatMonthTitle
} from '../common/utils/time';
import type { Day } from '../common/utils/time';

export const emits = ['click'] as const;
export const props = {
  date: {
    type: null
  },
  type: {
    type: String
  },
  color: String,
  minDate: {
    type: null
  },
  maxDate: {
    type: null
  },
  showMark: Boolean,
  rowHeight: null,
  formatter: {
    type: null
  },
  currentDate: {
    type: null
  },
  firstDayOfWeek: {
    type: Number,
    required: true,
    default: 0
  },
  allowSameDay: Boolean,
  showSubtitle: Boolean,
  showMonthTitle: Boolean
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { emit } = context;
  const state = reactive({
    visible: true,
    days: [] as Day[]
  });

  watch(
    () => [
      props.date,
      props.type,
      props.minDate,
      props.maxDate,
      props.formatter,
      props.currentDate,
      props.firstDayOfWeek
    ],
    () => {
      setDays();
    },
    { deep: true }
  );

  onMounted(() => {
    setDays();
  });

  const ROW_HEIGHT = 64;

  const getMark = computed(() => {
    return new Date(props.date).getMonth() + 1;
  });

  const getDayStyle = computed(() => {
    const { date, rowHeight, color, firstDayOfWeek } = props;
    const current = new Date(date).getDay() || 7;
    const offset =
      current < firstDayOfWeek!
        ? 7 - firstDayOfWeek! + current
        : current === 7 && firstDayOfWeek === 0
          ? 0
          : current - firstDayOfWeek!;

    return (type, index) => {
      const style: string[][] = [];
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
        .map(function (item) {
          return item.join(':');
        })
        .join(';');
    };
  });

  const getFormatMonthTitle = computed(() => {
    return formatMonthTitle(props.date);
  });

  const getMonthStyle = computed(() => {
    const { date, rowHeight } = props;
    if (!state.visible) {
      const curDate = new Date(date);

      const totalDay = getMonthEndDay(
        curDate.getFullYear(),
        curDate.getMonth() + 1
      );
      const offset = curDate.getDay();
      const padding = Math.ceil((totalDay + offset) / 7) * rowHeight;

      return 'padding-bottom:' + padding + 'px';
    }
    return '';
  });

  const onClick = (index: number) => {
    const item: Day = state.days[index];
    if (item.type !== 'disabled') {
      emit('click', item);
    }
  };

  const setDays = () => {
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
        bottomInfo: getBottomInfo(type)
      };

      if (props.formatter) {
        config = props.formatter(config);
      }

      days.push(config);
    }
    state.days = days;
  };

  const getMultipleDayType = (day) => {
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
  };

  const getRangeDayType = (day) => {
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
  };

  const getDayType = (day) => {
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
  };

  const getBottomInfo = (type) => {
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
  };
  return {
    bem,
    style,
    addUnit,
    state,
    getMark,
    getMonthStyle,
    getDayStyle,
    getFormatMonthTitle,
    onClick
  };
}
