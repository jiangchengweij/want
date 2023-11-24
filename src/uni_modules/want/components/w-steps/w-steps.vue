<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view :class="[customClass || '', bem('steps', [direction])]">
		<view class="wan-step__wrapper">
			<view
				v-for="(item, index) in steps"
				:key="index"
				@tap="onClick"
				class="wan-hairline"
				:class="[bem('step', [direction, get(index, active)])]"
				:style="get(index, active) === 'inactive' ? 'color: ' + inactiveColor: ''"
			>
				<view class="wan-step__title" :style="index === active ? 'color: ' + activeColor : ''">
					<view>{{ item.text }}</view>
					<view :class="descClass || ''">{{ item.desc }}</view>
				</view>
				<view class="wan-step__circle-container">
					<template v-if="index !== active">
						<view v-if="item.inactiveIcon || inactiveIcon"
							class="wan-step__icon">
							<w-icon
								:color="get(index, active) === 'inactive' ? inactiveColor: activeColor"
								:name="item.inactiveIcon || inactiveIcon"
							/>
						</view>
						<view
							v-else
							class="wan-step__circle"
							:style="'background-color: ' + (index < active ? activeColor : inactiveColor)"
						/>
					</template>
					<view v-else class="wan-step__icon">
						<w-icon :name="item.activeIcon || activeIcon" :color="activeColor" />
					</view>
				</view>
				<view
					v-if="index !== steps.length - 1"
					class="wan-step__line" :style="'background-color: ' + (index < active ? activeColor : inactiveColor)"
				/>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { GREEN, GRAY_DARK } from '../common/color';
import { bem } from '../utils/bem';

const emit = defineEmits(['click-step'])

defineProps({
	icon: String,
	steps: {
		type: Array as PropType<anyObj>,
		default: () => []
	},
	active: Number,
	direction: {
		type: String,
		default: 'horizontal',
	},
	activeColor: {
		type: String,
		default: GREEN,
	},
	inactiveColor: {
		type: String,
		default: GRAY_DARK,
	},
	activeIcon: {
		type: String,
		default: 'checked',
	},
	inactiveIcon: String,
	descClass: [String, Array],
	customClass: [String, Array]
})

function onClick(index: number) {
	emit('click-step', index);
}

function get(index: number, active: number) {
	if (index < active) {
		return 'finish';
	} else if (index === active) {
		return 'process';
	}

	return 'inactive';
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
