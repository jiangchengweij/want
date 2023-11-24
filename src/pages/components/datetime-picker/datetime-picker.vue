<template>
	<demo-block title="选择完整时间">
	  <w-datetime-picker
	    type="datetime"
	    data-type="datetime"
	    :loading="state.loading"
	    v-model="state.currentDate1"
	    :min-date="state.minDate"
	    @change="onInput('currentDate1', 'datetime')"
	  />
	</demo-block>
	
	<demo-block title="选择日期（年月日）">
	  <w-datetime-picker
	    type="date"
	    data-type="date"
			v-model="state.currentDate2"
	    :min-date="state.minDate"
	    @change="onInput('currentDate2', 'date')"
	    :formatter="state.formatter"
	  />
	</demo-block>
	
	<demo-block title="选择日期（年月）">
	  <w-datetime-picker
	    type="year-month"
	    data-type="year-month"
			v-model="state.currentDate3"
	    :min-date="state.minDate"
	    @change="onInput('currentDate3', 'year-month')"
	  />
	</demo-block>
	
	<demo-block title="选择时间">
	  <w-datetime-picker
	    type="time"
	    data-type="time"
	    v-model="state.currentDate4"
	    :min-hour="state.minHour"
	    :max-hour="state.maxHour"
	    @change="onInput('currentDate4', 'time')"
	  />
	</demo-block>
	
	<demo-block title="选项过滤器">
	  <w-datetime-picker
	    type="time"
	    v-model="state.currentDate4"
	    :filter="state.filter"
	  />
	</demo-block>
	<w-toast ref="toastRef" />
</template>

<script setup>
import { reactive, ref } from 'vue'
import Toast from '@/uni_modules/want/components/w-col/w-col.vue'

const toastRef = ref(null)

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
	},
})

function onInput(key, type) {
	const result = getResult(state[key], type);
	Toast({
		ref: toastRef.value,
		message: result,
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

<style>
</style>
