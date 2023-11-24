<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-count-down">
	  <slot v-if="useSlot"/>
	  <template v-else>{{ state.formattedTime }}</template>
	</view>
</template>

<script setup lang="ts">
import { onUnmounted, reactive, watch } from 'vue';
import { isSameSecond, parseFormat, parseTimeData } from './utils';

const emit = defineEmits(['change', 'finish'])
const props = defineProps({
	useSlot: Boolean,
	millisecond: Boolean,
	time: {
		type: Number,
	},
	format: {
		type: String,
		default: 'HH:mm:ss',
	},
	autoStart: {
		type: Boolean,
		default: true,
	},
})

let _tid = null, _counting = false, _endTime = null, _remain = 0;

const state = reactive({
	timeData: parseTimeData(0),
	formattedTime: '0',
})

watch(() => props.time, () => {
	reset()
}, { immediate: true })

onUnmounted(() => {
	if (_tid) {
		clearTimeout(_tid)
		_tid = null
	}
})

// 开始
function start() {
	if (_counting) {
		return;
	}

	_counting = true;
	_endTime = Date.now() + _remain;
	tick();
}

// 暂停
function pause() {
	_counting = false;
	clearTimeout(_tid);
}

// 重置
function reset() {
	pause();
	_remain = props.time;
	setRemain(_remain);

	if (props.autoStart) {
		start();
	}
}

function tick() {
	if (props.millisecond) {
		microTick();
	} else {
		macroTick();
	}
}

function microTick() {
	_tid = simpleTick(() => {
		setRemain(getRemain());

		if (_remain !== 0) {
			microTick();
		}
	});
}

function macroTick() {
	_tid = simpleTick(() => {
		const remain = getRemain();

		if (!isSameSecond(remain, _remain) || remain === 0) {
			setRemain(remain);
		}

		if (_remain !== 0) {
			macroTick();
		}
	});
}

function getRemain() {
	return Math.max(_endTime - Date.now(), 0);
}

function setRemain(remain: any) {
	_remain = remain;
	const timeData = parseTimeData(remain);

	if (props.useSlot) {
		emit('change', timeData);
	}

	state.formattedTime = parseFormat(props.format, timeData);

	if (remain === 0) {
		pause();
		emit('finish');
	}
}

function simpleTick(fn: any) {
  return setTimeout(fn, 30);
}

defineExpose({
	start,
	pause,
	reset
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-count-down {
  color: var(--count-down-text-color, $count-down-text-color);
  font-size: var(--count-down-font-size, $count-down-font-size);
  line-height: var(--count-down-line-height, $count-down-line-height);
}
</style>
