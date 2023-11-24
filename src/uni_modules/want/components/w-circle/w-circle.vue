<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared'
		}
	}
</script>
<template>
	<view class="wan-circle">
		<!-- #ifndef MP-ALIPAY || MP-WEIXIN -->
		<canvas class="wan-circle__canvas" :hidpi="hidpi" :type="type" 
			:style="`width: ${ addUnit(size) };height:${ addUnit(size) }`"
			:canvas-id="id"
		/>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<canvas class="wan-circle__canvas"
			:style="`width: ${ addUnit(size) };height:${ addUnit(size) }`"
			:canvas-id="id"
		/>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<canvas class="wan-circle__canvas"
			:type="type" 
			:style="`width: ${ addUnit(size) };height:${ addUnit(size) }`"
			@ready="onCanvasReady"
			:id="id"
		/>
		<!-- #endif -->
	  <view v-if="!text" class="wan-circle__text">
	    <slot></slot>
	  </view>
	  <cover-view v-else class="wan-circle__text">{{ text }}</cover-view>
	</view>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, onUnmounted, PropType, watch } from 'vue'
import { BLUE, WHITE } from '../common/color'
import { addUnit, uuid } from '../utils'
import { isObj } from '../utils/validator';
import { format, PERIMETER, BEGIN_ANGLE, STEP } from './utils'

const props = defineProps({
	text: String,
	lineCap: {
		type: String as PropType<'butt' | 'round' | 'square'>,
		default: 'round',
	},
	value: {
		type: Number,
		default: 0,
	},
	speed: {
		type: Number,
		default: 50,
	},
	size: {
		type: Number,
		default: 100,
	},
	fill: String,
	layerColor: {
		type: String,
		default: WHITE,
	},
	color: {
		type: null,
		default: BLUE,
	},
	type: {
		type: String,
		default: '2d',
	},
	strokeWidth: {
		type: Number,
		default: 4,
	},
	clockwise: {
		type: Boolean,
		default: true,
	},
	hidpi: {
		type: Boolean,
		default: true,
	},
	id: {
		type: String,
		default: uuid()
	}
})

const instance = getCurrentInstance()

let _currentValue = null, _interval = null, _hoverColor = null;

let _ctx: UniApp.CanvasContext = null;

watch(() => props.value, () => {
	reRender()
})

watch(() => props.size, () => {
	drawCircle(_currentValue)
})

watch(() => props.color, () => {
	setHoverColor()
	drawCircle(_currentValue)
})

onMounted(() => {
	_currentValue = props.value
	_ctx = uni.createCanvasContext(props.id, instance)
	setHoverColor()
	drawCircle(_currentValue)
})

function presetCanvas(strokeStyle: string, beginAngle: number, endAngle: number, fill?: string) {

	const { strokeWidth, lineCap, clockwise, size }: { lineCap: 'butt' | 'round' | 'square' } & any = props
	const position = size / 2;
	const radius = position - strokeWidth / 2;
	
	_ctx.strokeStyle = strokeStyle;
	_ctx.lineWidth = strokeWidth;
	_ctx.lineCap = lineCap;
	
	_ctx.beginPath();
	_ctx.arc(position, position, radius, beginAngle, endAngle, !clockwise);
	_ctx.stroke();

	if (fill) {
		_ctx.setFillStyle(fill);
		_ctx.fill();
	}
}

function renderLayerCircle() {
	const { layerColor, fill } = props
	presetCanvas(layerColor, 0, PERIMETER, fill)
}

function renderHoverCircle(formatValue: number) {
	const { clockwise } = props;
	// 结束角度
	const progress = PERIMETER * (formatValue / 100);
	const endAngle = clockwise
		? BEGIN_ANGLE + progress
		: 3 * Math.PI - (BEGIN_ANGLE + progress);
	presetCanvas(_hoverColor, BEGIN_ANGLE, endAngle)
}

function drawCircle(currentValue: number) {
	const { size } = props
	if (!_ctx) return
	_ctx.clearRect(0, 0, size, size)
	renderLayerCircle()
	
	const formatValue = format(currentValue)
	if (formatValue !== 0) {
		renderHoverCircle(formatValue)
	}
	// #ifndef MP-ALIPAY
	_ctx.draw()
	// #endif
}

function reRender() {
	// tofector 动画暂时没有想到好的解决方案
	const { value, speed } = props;
	
	if (speed <= 0 || speed > 1000) {
		drawCircle(value)
		return
	}
	
	clearMockInterval()
	
	_currentValue = _currentValue || 0
	
	const run = () => {
		_interval = setTimeout(() => {
			if (_currentValue !== value) {
				if (Math.abs(_currentValue - value) < STEP) {
					_currentValue = value
				} else if (_currentValue < value) {
					_currentValue += STEP
				} else {
					_currentValue -= STEP
				}
				drawCircle(_currentValue)
				run()
			} else {
				clearMockInterval()
			}
		}, 1000 / speed)
	}
	run()
}

function setHoverColor() {
	const { color, size } = props
	if (isObj(color)) {
		if (!_ctx) return;
		const LinearColor = _ctx.createLinearGradient(size, 0, 0, 0)
		Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b))
			.map((key) => {
				return LinearColor.addColorStop(parseFloat(key)/100, color[key] as string)
			})
		_hoverColor = LinearColor	
		return;
	}
	
	_hoverColor = color
}

function clearMockInterval() {
	if (_interval) {
		clearTimeout(_interval)
		_interval = null
	}
}

function onCanvasReady() {
	setTimeout(() => {
		uni.createSelectorQuery().select('#'+props.id).node((res) => {
			if (res && res.node){
				const canvas = res.node
				_ctx = canvas.getContext('2d')
				setHoverColor()
				drawCircle(_currentValue)
			}
		}).exec()
	}, 100)
}

onUnmounted(() => {
	clearMockInterval()
})

</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-circle {
  position: relative;
  display: inline-block;
  text-align: center;

  &__text {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    color: var(--circle-text-color, $circle-text-color);
		background-color: transparent;
  }
}
</style>
