<template>
  <page-meta :page-style="state.showCalendar ? 'overflow: hidden;' : ''" />
  <demo-block title="基础用法">
    <wan-cell
      is-link
      title="选择单个日期"
      :value="formatFullDate(state.date.selectSingle)"
      @click="show('single', 'selectSingle')"
    />
    <wan-cell
      is-link
      title="选择多个日期"
      :value="formatMultiple(state.date.selectMultiple)"
      @click="show('multiple', 'selectMultiple')"
    />
    <wan-cell
      is-link
      title="选择日期区间"
      :value="formatRange(state.date.selectRange)"
      @click="show('range', 'selectRange')"
    />
  </demo-block>
  <demo-block title="快捷选择">
    <wan-cell
      is-link
      title="选择单个日期"
      :value="formatFullDate(state.date.quickSelect1)"
      @click="show('single', 'quickSelect1')"
    />
    <wan-cell
      is-link
      title="选择日期区间"
      :value="formatRange(state.date.quickSelect2)"
      @click="show('range', 'quickSelect2')"
    />
  </demo-block>
  <demo-block title="自定义日历">
    <wan-cell
      is-link
      title="自定义颜色"
      :value="formatRange(state.date.customColor)"
      @click="show('range', 'customColor')"
    />
    <wan-cell
      is-link
      title="自定义日期范围"
      :value="formatFullDate(state.date.customRange)"
      @click="show('single', 'customRange')"
    />
    <wan-cell
      is-link
      title="自定义按钮文字"
      :value="formatRange(state.date.customConfirm)"
      @click="show('range', 'customConfirm')"
    />

    <wan-cell
      is-link
      title="自定义日期文案"
      :value="formatRange(state.date.customDayText)"
      @click="show('range', 'customDayText')"
    />

    <wan-cell
      is-link
      title="自定义弹出位置"
      :value="formatFullDate(state.date.customPosition)"
      @click="show('single', 'customPosition')"
    />

    <wan-cell
      is-link
      title="日期区间最大范围"
      :value="formatRange(state.date.maxRange)"
      @click="show('range', 'maxRange')"
    />
  </demo-block>

  <demo-block title="平铺展示">
    <wan-calendar
      title="日历"
      :poppable="false"
      :show-confirm="false"
      :min-date="state.tiledMinDate"
      :max-date="state.tiledMaxDate"
      :first-day-of-week="state.firstDayOfWeek"
      class="tiled-calendar"
    />
  </demo-block>
  <wan-calendar
    :show="state.showCalendar"
    :type="state.type"
    :color="state.color"
    :round="state.round"
    :position="state.position"
    :min-date="state.minDate"
    :max-date="state.maxDate"
    :max-range="state.maxRange"
    :formatter="state.formatter"
    :show-confirm="state.showConfirm"
    :confirm-text="state.confirmText"
    :confirm-disabled-text="state.confirmDisabledText"
    :first-day-of-week="state.firstDayOfWeek"
    @confirm="onConfirm"
    @select="onSelect"
    @unselect="onUnselect"
    @open="onOpen"
    @opened="onOpened"
    @close="onClose"
    @closed="onClosed"
  >
  </wan-calendar>
</template>

<script setup>
import { computed, reactive } from 'vue';
const state = reactive({
  date: {
    maxRange: [],
    selectSingle: null,
    selectRange: [],
    selectMultiple: [],
    quickSelect1: null,
    quickSelect2: [],
    customColor: [],
    customConfirm: [],
    customRange: null,
    customDayText: [],
    customPosition: null
  },
  type: 'single',
  round: true,
  color: '',
  minDate: Date.now(),
  maxDate: new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 6,
    new Date().getDate()
  ).getTime(),
  maxRange: undefined,
  position: 'bottom',
  formatter: undefined,
  showConfirm: false,
  showCalendar: false,
  tiledMinDate: new Date(2012, 0, 10).getTime(),
  tiledMaxDate: new Date(2012, 2, 20).getTime(),
  confirmText: '确定',
  confirmDisabledText: '确定',
  firstDayOfWeek: 0
});

function onConfirm(event) {
  console.log(event);
  state.showCalendar = false;

  state.date[`${state.id}`] = Array.isArray(event)
    ? event.map((date) => date.valueOf())
    : event.valueOf();
}

function onSelect(event) {
  console.log(event);
}

function onUnselect(event) {
  console.log(event);
}

function onClose() {
  state.showCalendar = false;
}

function onOpen() {
  console.log('open');
}

function onOpened() {
  console.log('opened');
}

function onClosed() {
  console.log('closed');
}

function resetSettings() {
  const obj = {
    round: true,
    color: '',
    minDate: Date.now(),
    maxDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 6,
      new Date().getDate()
    ).getTime(),
    maxRange: undefined,
    position: 'bottom',
    formatter: undefined,
    showConfirm: true,
    confirmText: '确定',
    confirmDisabledText: '确定'
  };
  Object.keys(obj).forEach((key) => {
    state[key] = obj[key];
  });
}

function show(type, id) {
  resetSettings();
  const data = {
    id,
    type,
    showCalendar: true
  };

  switch (id) {
    case 'quickSelect1':
    case 'quickSelect2':
      data.showConfirm = false;
      break;
    case 'customColor':
      data.color = '#07c160';
      break;
    case 'customConfirm':
      data.confirmText = '完成';
      data.confirmDisabledText = '请选择结束时间';
      break;
    case 'customRange':
      data.minDate = new Date(2010, 0, 1).getTime();
      data.maxDate = new Date(2010, 0, 31).getTime();
      break;
    case 'customDayText':
      data.minDate = new Date(2010, 4, 1).getTime();
      data.maxDate = new Date(2010, 4, 31).getTime();
      data.formatter = dayFormatter;
      break;
    case 'customPosition':
      data.round = false;
      data.position = 'right';
      break;
    case 'maxRange':
      data.maxRange = 3;
      break;
  }

  Object.keys(data).forEach((key) => {
    state[key] = data[key];
  });
}

function dayFormatter(day) {
  const month = day.date.getMonth() + 1;
  const date = day.date.getDate();

  if (month === 5) {
    if (date === 1) {
      day.topInfo = '劳动节';
    } else if (date === 4) {
      day.topInfo = '五四青年节';
    } else if (date === 11) {
      day.text = '今天';
    }
  }

  if (day.type === 'start') {
    day.bottomInfo = '入店';
  } else if (day.type === 'end') {
    day.bottomInfo = '离店';
  }

  return day;
}

function formatDate(date) {
  if (date) {
    date = new Date(date);
    return date.getMonth() + 1 + '/' + date.getDate();
  }
}

function formatFullDate(date) {
  if (date) {
    date = new Date(date);
    return date.getFullYear() + '/' + formatDate(date);
  }
}

function formatMultiple(dates) {
  if (dates.length) {
    return '选择了 ' + dates.length + '个日期';
  }
}

function formatRange(dateRange) {
  if (dateRange.length) {
    return formatDate(dateRange[0]) + ' - ' + formatDate(dateRange[1]);
  }
}
</script>

<style></style>
