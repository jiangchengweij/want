<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<w-picker
	  class="wan-datetime-picker"
		ref="pickerRef"
	  :active-class="activeClass"
	  :toolbar-class="toolbarClass"
	  :column-class="columnClass"
	  :title="title"
	  :columns="state.columns"
	  :item-height="itemHeight"
	  :show-toolbar="showToolbar"
	  :visible-item-count="visibleItemCount"
	  :confirm-button-text="confirmButtonText"
	  :cancel-button-text="cancelButtonText"
	  @change="onChange"
	  @confirm="onConfirm"
	  @cancel="onCancel"
	/>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { pickerProps } from '../w-picker/shared'
import { currentYear, isValidDate, range, padZero, times, getTrueValue, getMonthEndDay, defaultFormatter, setNext } from './utils'

const emit = defineEmits(['update:modelValue', 'change', 'confirm', 'cancel'])
const props = defineProps({
	...pickerProps,
	modelValue: {
		type: null,
	},
	filter: null,
	type: {
		type: String,
		default: 'datetime',
	},
	showToolbar: {
		type: Boolean,
		default: true,
	},
	formatter: {
		type: null,
		default: defaultFormatter,
	},
	minDate: {
		type: Number,
		default: new Date(currentYear - 10, 0, 1).getTime(),
	},
	maxDate: {
		type: Number,
		default: new Date(currentYear + 10, 11, 31).getTime(),
	},
	minHour: {
		type: Number,
		default: 0,
	},
	maxHour: {
		type: Number,
		default: 23,
	},
	minMinute: {
		type: Number,
		default: 0,
	},
	maxMinute: {
		type: Number,
		default: 59,
	},
	customClass: null,
	activeClass: null,
	toolbarClass: null,
	columnClass: null,
})

const state = reactive({
	innerValue: Date.now(),
	columns: [],
})

const pickerRef = ref(null);

let _picker = null

watch(() => props.modelValue, (newVal) => {
	if (state.innerValue !== newVal) {
		updateValue()
	}
})

onMounted(() => {
	updateValue()
})

function updateValue() {
	const val = correctValue(props.modelValue);
	const isEqual = val === state.innerValue;
	updateColumnValue(val).then(() => {
		if (!isEqual) {
			emit('update:modelValue', val);
		}
	})
}

function getPicker() {
	if (_picker == null) {
		_picker = pickerRef.value;
		const { setColumnValues } = _picker;
		_picker.setColumnValues = (...args: any) =>
			setColumnValues.apply(null, [...args, false]);
	}
	return _picker;
}

function updateColumns() {
	const { formatter = defaultFormatter } = props;
	const results = getOriginColumns().map((column) => ({
		values: column.values.map((value) => formatter(column.type, value)),
	}));
	return setNext(() => {
		state.columns = results;
	})
}

function getOriginColumns() {
	const { filter } = props;
	const results = getRanges().map(({ type, range }) => {
		let values = times(range[1] - range[0] + 1, (index) => {
			const value = range[0] + index;
			return type === 'year' ? `${value}` : padZero(value);
		});

		if (filter) {
			values = filter(type, values);
		}

		return { type, values };
	});

	return results;
}

function getRanges() {
	if (props.type === 'time') {
		return [
			{
				type: 'hour',
				range: [props.minHour, props.maxHour],
			},
			{
				type: 'minute',
				range: [props.minMinute, props.maxMinute],
			},
		];
	}

	const {
		maxYear,
		maxDate,
		maxMonth,
		maxHour,
		maxMinute,
	} = getBoundary('max', state.innerValue);
	const {
		minYear,
		minDate,
		minMonth,
		minHour,
		minMinute,
	} = getBoundary('min', state.innerValue);

	const result = [
		{
			type: 'year',
			range: [minYear, maxYear],
		},
		{
			type: 'month',
			range: [minMonth, maxMonth],
		},
		{
			type: 'day',
			range: [minDate, maxDate],
		},
		{
			type: 'hour',
			range: [minHour, maxHour],
		},
		{
			type: 'minute',
			range: [minMinute, maxMinute],
		},
	];

	if (props.type === 'date') result.splice(3, 2);
	if (props.type === 'year-month') result.splice(2, 3);
	return result;
}

function correctValue(value: any) {
	// validate value
	const isDateType = props.type !== 'time';
	if (isDateType && !isValidDate(value)) {
		value = props.minDate;
	} else if (!isDateType && !value) {
		const { minHour } = props;
		value = `${padZero(minHour)}:00`;
	}

	// time type
	if (!isDateType) {
		let [hour, minute] = value.split(':');
		hour = padZero(range(hour, props.minHour, props.maxHour));
		minute = padZero(range(minute, props.minMinute, props.maxMinute));

		return `${hour}:${minute}`;
	}

	// date type
	value = Math.max(value, props.minDate);
	value = Math.min(value, props.maxDate);

	return value;
}

function getBoundary(type: string, innerValue: number) {
	const value = new Date(innerValue);
	const boundary = new Date(props[`${type}Date`]);
	const year = boundary.getFullYear();
	let month = 1;
	let date = 1;
	let hour = 0;
	let minute = 0;

	if (type === 'max') {
		month = 12;
		date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
		hour = 23;
		minute = 59;
	}

	if (value.getFullYear() === year) {
		month = boundary.getMonth() + 1;
		if (value.getMonth() + 1 === month) {
			date = boundary.getDate();
			if (value.getDate() === date) {
				hour = boundary.getHours();
				if (value.getHours() === hour) {
					minute = boundary.getMinutes();
				}
			}
		}
	}

	return {
		[`${type}Year`]: year,
		[`${type}Month`]: month,
		[`${type}Date`]: date,
		[`${type}Hour`]: hour,
		[`${type}Minute`]: minute,
	};
}

function onCancel() {
	emit('cancel');
}

function onConfirm() {
	emit('confirm', state.innerValue);
}

function onChange() {
	let value;

	const picker = getPicker();
	const originColumns = getOriginColumns();

	if (props.type === 'time') {
		const indexes = picker.getIndexes();
		value = `${+originColumns[0].values[indexes[0]]}:${+originColumns[1]
			.values[indexes[1]]}`;
	} else {
		const indexes = picker.getIndexes();
		const values = indexes.map(
			(value, index) => originColumns[index].values[value]
		);
		const year = getTrueValue(values[0]);
		const month = getTrueValue(values[1]);
		const maxDate = getMonthEndDay(year, month);
		let date = getTrueValue(values[2]);
		if (props.type === 'year-month') {
			date = 1;
		}
		date = date > maxDate ? maxDate : date;
		let hour = 0;
		let minute = 0;
		if (props.type === 'datetime') {
			hour = getTrueValue(values[3]);
			minute = getTrueValue(values[4]);
		}
		value = new Date(year, month - 1, date, hour, minute);
	}
	value = correctValue(value);

	updateColumnValue(value).then(() => {
		emit('update:modelValue', value);
		emit('change', picker);
	})
}

async function updateColumnValue(value) {
	let values: string[] = [];
	const { type } = props;
	const formatter = props.formatter || defaultFormatter;
	const picker = getPicker();

	if (type === 'time') {
		const pair = value.split(':');
		values = [formatter('hour', pair[0]), formatter('minute', pair[1])];
	} else {
		const date = new Date(value);
		values = [
			formatter('year', `${date.getFullYear()}`),
			formatter('month', padZero(date.getMonth() + 1)),
		];
		if (type === 'date') {
			values.push(formatter('day', padZero(date.getDate())));
		}
		if (type === 'datetime') {
			values.push(
				formatter('day', padZero(date.getDate())),
				formatter('hour', padZero(date.getHours())),
				formatter('minute', padZero(date.getMinutes()))
			);
		}
	}
	
	return setNext(() => { state.innerValue = value })
			.then(() => updateColumns())
			.then(() => picker.setValues(values))
}

</script>

<style>
</style>
