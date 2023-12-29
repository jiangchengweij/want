<template>
  <demo-block title="选择完整时间">
    <wan-datetime-picker
      v-model="state.currentDate1"
      type="datetime"
      data-type="datetime"
      :loading="state.loading"
      :min-date="state.minDate"
      @change="onInput('currentDate1', 'datetime')"
    />
  </demo-block>

  <demo-block title="选择日期（年月日）">
    <wan-datetime-picker
      v-model="state.currentDate2"
      :formatter="state.formatter"
      type="date"
      data-type="date"
      :min-date="state.minDate"
      @change="onInput('currentDate2', 'date')"
    />
  </demo-block>

  <demo-block title="选择日期（年月）">
    <wan-datetime-picker
      v-model="state.currentDate3"
      type="year-month"
      data-type="year-month"
      :min-date="state.minDate"
      @change="onInput('currentDate3', 'year-month')"
    />
  </demo-block>

  <demo-block title="选择时间">
    <wan-datetime-picker
      v-model="state.currentDate4"
      type="time"
      data-type="time"
      :min-hour="state.minHour"
      :max-hour="state.maxHour"
      @change="onInput('currentDate4', 'time')"
    />
  </demo-block>

  <demo-block title="选项过滤器">
    <wan-datetime-picker
      v-model="state.currentDate4"
      type="time"
      :filter="state.filter"
    />
  </demo-block>
  <wan-toast ref="toastRef" />
</template>

<script setup>
import { reactive, ref } from 'vue';

const toastRef = ref(null);

const state = reactive({
  minHour: 10,
  maxHour: 20,
  minDate: new Date(2018, 0, 1).getTime(),
  maxDate: new Date(2019, 10, 1).getTime(),
  currentDate1: new Date(2018, 2, 31).getTime(),
  currentDate2: null,
  currentDate3: new Date(2018, 0, 1),
  currentDate4: '12:00',
  loading: false,
  formatter(type, value) {
    if (type === 'year') {
      return `${value}年`;
    }
    if (type === 'month') {
      return `${value}月`;
    }
    return value;
  },
  filter(type, options) {
    if (type === 'minute') {
      return options.filter((option) => option % 5 === 0);
    }

    return options;
  }
});

function onInput(key, type) {
  const result = getResult(state[key], type);
  toastRef.value.show({
    message: result
  });
}

function getResult(time, type) {
  const date = new Date(time);
  switch (type) {
    case 'datetime':
      return date.toLocaleString();
    case 'date':
      return date.toLocaleDateString();
    case 'year-month':
      return `${date.getFullYear()}/${date.getMonth() + 1}`;
    case 'time':
      return time;
    default:
      return '';
  }
}
</script>

<style></style>
