<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view
	  class="wan-swipe-cell"
		:class="customClass || ''"
	  @tap.stop="onClick('cell')"
	  @touchstart="startDrag"
	  @touchmove.stop="onDrag"
	  @touchend="endDrag"
	  @touchcancel="endDrag"
	>
	  <view :style="state.wrapperStyle">
	    <view v-if="leftWidth" class="wan-swipe-cell__left" @tap="onClick('left')">
	      <slot name="left" />
	    </view>
	    <slot />
	    <view v-if="rightWidth" class="wan-swipe-cell__right" @tap="onClick('right')">
	      <slot name="right" />
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
import { getCurrentInstance, onUnmounted, reactive } from 'vue';
import { useTouch } from '../utils/touch'
import { ARRAY } from './items'
import { range } from '../utils';

const emit = defineEmits(['open', 'close', 'click']);
const props = defineProps({
	disabled: Boolean,
	leftWidth: {
		type: Number,
		default: 0,
	},
	rightWidth: {
		type: Number,
		default: 0,
	},
	asyncClose: Boolean,
	name: {
		type: null,
		default: '',
	},
	customClass: String,
})
const THRESHOLD = 0.3;

const { touchVar, touchMove, touchStart } = useTouch()

let _offset = 0, _dragging = false, _startOffset = 0;

const instance = getCurrentInstance();

ARRAY.push(instance)

const state = reactive({
	catchMove: false,
	wrapperStyle: '',
})

onUnmounted(() => {
	const index = ARRAY.findIndex((item) => item === instance);
	ARRAY.splice(index, 1)
})

function open(position: 'left' | 'right') {
	const { leftWidth, rightWidth, name } = props;
	const offset = position === 'left' ? leftWidth : -rightWidth;
	swipeMove(offset);

	emit('open', {
		position,
		name: name,
	});
}

function close() {
	swipeMove(0);
}

function swipeMove(offset = 0) {
	const { rightWidth, leftWidth } = props;
	_offset = range(offset, -rightWidth, leftWidth);

	const transform = `translate3d(${_offset}px, 0, 0)`;
	const transition = _dragging
		? 'none'
		: 'transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
	state.wrapperStyle = `
		-webkit-transform: ${transform};
		-webkit-transition: ${transition};
		transform: ${transform};
		transition: ${transition};
	`
}

function swipeLeaveTransition() {
	const { leftWidth, rightWidth } = props;

	if (rightWidth > 0 && -_offset > rightWidth * THRESHOLD) {
		open('right');
	} else if (leftWidth > 0 && _offset > leftWidth * THRESHOLD) {
		open('left');
	} else {
		swipeMove(0);
	}
	state.catchMove = false;
}

function startDrag(event: TouchEvent) {
	const { disabled } = props;
	if (disabled) {
		return;
	}

	_startOffset = _offset;
	touchStart(event);
}

function onDrag(event: TouchEvent) {
	const { disabled } = props;
	if (state.catchMove && disabled) {
		return;
	}

	touchMove(event);

	if (touchVar.direction !== 'horizontal') {
		return;
	}

	_dragging = true;

	ARRAY.filter(
		(item: anyObj) => item !== instance && item.offset !== 0
	).forEach((item: anyObj) => item.exposed.close());
	
	state.catchMove = true;
	swipeMove(_startOffset + touchVar.deltaX);
}

function endDrag() {
	const { disabled } = props;
	if (disabled) {
		return;
	}

	_dragging = false;
	swipeLeaveTransition()
}

function onClick(position = 'outside') {
	const { name, asyncClose } = props;
	
	emit('click', position);

	if (!_offset) {
		return;
	}

	if (asyncClose) {
		emit('close', {
			position,
			instance,
			name,
		});
	} else {
		swipeMove(0);
	}
}

defineExpose({
	close
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-swipe-cell {
  position: relative;
  overflow: hidden;

  &__left,
  &__right {
    position: absolute;
    top: 0;
    height: 100%;
  }

  &__left {
    left: 0;
    transform: translate3d(-100%, 0, 0);
  }

  &__right {
    right: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>
