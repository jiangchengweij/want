<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view
	  :class="[customClass || '', bem('grid-item', { square: square })]"
	  :style="wrapperStyle"
	  @tap="onClick"
	>
	  <view
	    :class="[contentClass || '', bem('grid-item__content', [ direction, 
				{ center: center, square: square, reverse: reverse, clickable: clickable, 
					surround: border && gutter }]), border ? 'wan-hairline--surround' : '']"
	    :style="contentStyle"
	  >
	    <template v-if="useSlot">
	      <slot />
	    </template>
	    <template v-else>
	      <view class="wan-grid-item__icon" :class="[iconClass || '']">
	        <w-icon v-if="icon" :name="icon" :color="iconColor" :class-prefix="iconPrefix" :dot="dot" :info="badge || info" :size="iconSize" />
	        <slot v-else name="icon"></slot>
	      </view>
	      <view class="wan-grid-item__text" :class="[textClass || '']">
	        <text v-if="text">{{ text }}</text>
	        <slot v-else name="text"></slot>
	      </view>
	    </template>
	  </view>
	</view>
</template>

<script setup lang="ts">
import { computed, inject} from 'vue';
import { addUnit } from '../utils';
import { style } from '../utils/style';
import { bem } from '../utils/bem'
import {
	useLink,
	linkProps,
} from '../utils/link'
import { useParent } from '../utils/relation';

const emit = defineEmits(['click']);

const props = defineProps({
	...linkProps,
	icon: String,
	iconColor: String,
	iconPrefix: {
		type: String,
		default: 'wan-icon',
	},
	dot: Boolean,
	info: String,
	badge: String,
	text: String,
	index: {
		type: Number,
	},
	useSlot: Boolean,
	customClass: String,
	contentClass: String,
	iconClass: String,
	textClass: String
})

const { jumpLink } = useLink({ props });

const { parent, index } = useParent('wanGrid');

const square = computed(() => parent ? parent.proxy.square : null)
const gutter = computed(() => parent ? parent.proxy.gutter : null)
const direction = computed(() => parent ? parent.proxy.direction : null)
const center = computed(() => parent ? parent.proxy.center : null)
const reverse = computed(() => parent ? parent.proxy.reverse : null)
const border = computed(() => parent ? parent.proxy.border : null)
const clickable = computed(() => parent ? parent.proxy.clickable : null)
const iconSize = computed(() => parent ? parent.proxy.iconSize : null)

const curIndex = computed(() => {
	return props.index != null ? props.index : index;
})

const wrapperStyle = computed(() => {
	if(!parent) return {};

	const { columnNum, square, gutter } = parent.proxy;
  var width = 100 / columnNum + '%';

  return style({
    width: width,
    'padding-top': square ? width : null,
    'padding-right': addUnit(gutter),
    'margin-top':
      curIndex.value >= columnNum && !square
        ? addUnit(gutter)
        : null,
  });
})

const contentStyle = computed(() => {
	if(!parent) return {};
	const { square, gutter } = parent.proxy; 
  return square
    ? style({
        right: addUnit(gutter),
        bottom: addUnit(gutter),
        height: 'auto',
      })
    : '';
})

function onClick() {
	emit('click');
	jumpLink();
}

</script>

<style lang="scss">
@import './style.scss';
</style>
