<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-picker" :class="columnClass || ''">
		<template v-if="toolbarPosition === 'top'">
			<view v-if="showToolbar" class="wan-picker__toolbar" :class="[toolbarClass || '']">
			  <view
			    class="wan-picker__cancel"
			    hover-class="wan-picker__cancel--hover"
			    :hover-stay-time="70"
			    @tap="emitEvent('cancel')"
			  >
			    {{ cancelButtonText }}
			  </view>
			  <view v-if="title" class="wan-picker__title wan-ellipsis">{{
			    title
			  }}</view>
			  <view
			    class="wan-picker__confirm"
			    hover-class="wan-picker__confirm--hover"
			    :hover-stay-time="70"
			    @tap="emitEvent('confirm')"
			  >
			    {{ confirmButtonText }}
			  </view>
			</view>
		</template>
	
	  <view v-if="loading" class="wan-picker__loading">
	    <w-loading color="#1989fa"/>
	  </view>
		<picker-view
			class="wan-picker__columns"
			:style="columnsStyle"
			:indicator-style="`height: ${ props.itemHeight }px`"
			mask-class="wan-picker__mask"
			@change="onChange"
			:value="state.pickerValues"
		>
			<picker-view-column
				class="wan-picker__column"
				v-for="(item, index) in state.columns"
				:key="index"
			>
				<view 
					v-for="(option, optIndex) in item.values" 
					:key="optIndex"
					:class="bem('picker-column__item',{ disabled: option && option.disabled })"
					:style="`height: ${ props.itemHeight }px; line-height: ${ props.itemHeight }px;`"
				>
					{{ optionText(option) }}
				</view>
			</picker-view-column>
			<view
				class="wan-picker__frame wan-hairline--top-bottom"
				:style="frameStyle"
			/>
		</picker-view>
		<template v-if="toolbarPosition === 'bottom'">
			<view v-if="showToolbar" class="wan-picker__toolbar" :class="[toolbarClass || '']">
			  <view
			    class="wan-picker__cancel"
			    hover-class="wan-picker__cancel--hover"
			    :hover-stay-time="70"
			    @tap="emitEvent('cancel')"
			  >
			    {{ cancelButtonText }}
			  </view>
			  <view v-if="title" class="wan-picker__title wan-ellipsis">{{
			    title
			  }}</view>
			  <view
			    class="wan-picker__confirm"
			    hover-class="wan-picker__confirm--hover"
			    :hover-stay-time="70"
			    @tap="emitEvent('confirm')"
			  >
			    {{ confirmButtonText }}
			  </view>
			</view>
		</template>
	</view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, PropType, reactive, ref, unref, watch } from 'vue';
import { addUnit, range, deepClone } from '../utils'
import { style } from '../utils/style'
import { bem } from '../utils/bem'
import { isObj } from '../utils/validator'
import { pickerProps } from './shared'

interface Column {
  values: any[];
  defaultIndex?: number;
}

const emit = defineEmits(['change', 'cancel', 'confirm'])
const props = defineProps({
	...pickerProps,
	valueKey: {
		type: String,
		default: 'text',
	},
	toolbarPosition: {
		type: String,
		default: 'top',
	},
	defaultIndex: {
		type: Number,
		default: 0,
	},
	columns: {
		type: Array as PropType<any>,
		default: () => [] as Column[],
	},
	activeClass: null,
	toolbarClass: null,
	columnClass: null
})

const instance = getCurrentInstance()

let _simple = null

const state = reactive({
	pickerValues: [],
	columns: [],
})

watch(() => props.columns, () => {
	updateColumns()
})

onMounted(() => {
	updateColumns()
	setDefaultValue()
})

const optionText = computed(() => {
	const { valueKey } = props
	return (option: any) => {
		return isObj(option) && option[valueKey] ? option[valueKey] : option;
	}
})

const columnsStyle = computed(() => {
	const { itemHeight, visibleItemCount } = props
	return style({
		height: addUnit(itemHeight * visibleItemCount)
	})
})

const frameStyle = computed(() => {
	const { itemHeight } = props
	return style({
		height: addUnit(itemHeight),
	})
})

function updateColumns() {
	const { columns } = props
	setColumns(columns)
}

function setDefaultValue() {
	const defaultIndexs = state.columns.map((column) => 
		column.defaultIndex > 0 ? column.defaultIndex : 0
	)
	setIndexes(defaultIndexs)
}

function setColumns(columns) {
	_simple = columns.length && !columns[0].values;
	let tempColumns = deepClone(columns);
	if (!Array.isArray(columns)) {
		tempColumns = [];
	}
	if (columns.length && !columns[0].values) {
		tempColumns = [{ values: columns }];
	}
	state.columns = tempColumns;
}

function emitEvent(type) {
	if (_simple) {
		emit(type, {
			value: getValues()[0],
			index: getIndexes()[0],
		});
	} else {
		emit(type, {
			value: getValues(),
			index: getIndexes(),
		});
	}
}

function onChange(event) {
	const { value } = event.detail
	const changeIndex = getChangeIndex(value)
	setIndexes(value).then(() => {
		const values = getValues()
		if (_simple) {
			emit('change', {
				picker: instance.exposed,
				value: values[0],
				index: changeIndex,
			});
		} else {
			emit('change', {
				picker: instance.exposed,
				value: getValues(),
				index: changeIndex,
			});
		}
	})
}

function getChangeIndex(values) {
	if (_simple) {
		return 0
	}
	if (state.pickerValues.length < 1) {
		return values.findIndex((item: number) => item > 0)
	}
	return values.findIndex((item: number, index) => {
		if (index < state.pickerValues.length) {
			return item != state.pickerValues[index]
		}
		return false
	})
}

// set options of column by index
function setColumnValues(index: number, options: any[], needReset = true) {
	if (index >= state.columns.length) {
		return Promise.reject(new Error('setColumnValues: 对应列不存在'));
	}
	
	const isSame =
		JSON.stringify(state.columns[index].values) === JSON.stringify(options);

	if (isSame) {
		return Promise.resolve();
	}
	state.columns[index].values = options;
	nextTick(() => {
		if (needReset) {
			state.pickerValues[index] = 0;
			state.pickerValues = [...state.pickerValues]
		}
	})
}

// get values of all columns
function getValues() {
	return state.pickerValues.map((curIndex, ind) => state.columns[ind].values[curIndex])
}

// set values of all columns
function setValues(values: any[]) {
	const tempIndexs = []
	values.forEach((val, index) => {
		if (index < state.columns.length) {
			let indexVal = state.columns[index].values.findIndex((item) => item === val)
			indexVal = indexVal >= 0 ? indexVal : 0
			tempIndexs.push(indexVal)
		}
	})
	setIndexes(tempIndexs)
}

// get indexes of all columns
function getIndexes() {
	return [...unref(state.pickerValues)]
}

// set indexes of all columns
function setIndexes(indexes: number[]) {
	const tempIndex = indexes.map((ind, clumnIndex) => {
		const count = state.columns[clumnIndex].values.length;
		const index = range(ind, 0, count);
		for (let i = index; i < count; i++) {
			if (!isDisabled(state.columns[clumnIndex].values[i])) return i;
		}
		for (let i = index - 1; i >= 0; i--) {
			if (!isDisabled(state.columns[clumnIndex].values[i])) return i;
		}
		return ind;
	})
	//手动出发pickerValues值变化
	state.pickerValues = []
	return nextTick(() => {
		state.pickerValues = tempIndex;
	})
}

function isDisabled(option: any) {
	return isObj(option) && option.disabled;
}

defineExpose({
	setColumns,
	setIndexes,
	getIndexes,
	getValues,
	setValues,
	setColumnValues
})
</script>

<style lang="scss">
@import './style.scss';
</style>
