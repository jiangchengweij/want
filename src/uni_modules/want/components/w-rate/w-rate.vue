<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		},
		// #ifndef MP-ALIPAY
		behaviors: ['uni://form-field'],
		// #endif
	}
</script>
<template>
	<view
		:class="[bem('rate'), customClass || '']"
		@touchmove="onTouchMove"
	>
		<view
			:class="[bem('rate__item')]"
			v-for="(_, index) in state.innerCountArray"
			:key="index"
			:style="style({ paddingRight: index !== count - 1 ? addUnit(gutter) : null })"
		>
			<view :class="[bem('rate__icon', [{ disabled, full: index + 1 <= state.innerValue }])]">
				<w-icon
					:name="index + 1 <= state.innerValue ? icon : voidIcon"
					:style="style({ fontSize: addUnit(size) })"
					:custom-class="iconClass"
					:data-score="index"
					:color="disabled ? disabledColor : index + 1 <= state.innerValue ? color : voidColor"
					@click="onSelect({ score: index })"
				/>
			</view>
			<view :class="[bem('rate__icon', ['half', { disabled, full: index + 0.5 <= state.innerValue }])]">
				<w-icon
					v-if="allowHalf"
					:name="index + 0.5 <= state.innerValue ? icon : voidIcon"
					:style="style({ fontSize: addUnit(size) })"
					:custom-class="iconClass"
					:data-score="index - 0.5"
					:color="disabled ? disabledColor : index + 0.5 <= state.innerValue ? color : voidColor"
					@click="onSelect({ score: index - 0.5 })"
				/>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { getCurrentInstance, nextTick, reactive, watch } from 'vue'
import { getAllRect, addUnit } from '../utils'
import { bem } from '../utils/bem'
import { style } from '../utils/style'

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
	modelValue: {
		type: Number,
	},
	readonly: Boolean,
	disabled: Boolean,
	allowHalf: Boolean,
	size: null,
	icon: {
		type: String,
		default: 'star',
	},
	voidIcon: {
		type: String,
		default: 'star-o',
	},
	color: String,
	voidColor: String,
	disabledColor: String,
	count: {
		type: Number,
		default: 5,
	},
	gutter: null,
	touchable: {
		type: Boolean,
		default: true,
	},
	iconClass: null,
	customClass: null
})

const instance = getCurrentInstance()

const state = reactive({
	innerValue: 0,
	innerCountArray: Array.from({ length: 5 }),
})

watch(() => props.modelValue, (newVal) => {
	if (newVal !== state.innerValue) {
		state.innerValue = newVal
	}
}, { immediate: true })

watch(() => props.count, (newVal) => {
	state.innerCountArray = Array.from({ length: newVal })
}, { immediate: true })

function onSelect(event) {
	const { disabled, readonly } = props;
	const { score } = event;
	if (!disabled && !readonly) {
		state.innerValue = score + 1
		nextTick(() => {
			emit('update:modelValue', score + 1);
			emit('change', score + 1);
		});
	}
}

function onTouchMove(event: TouchEvent) {
	const { touchable } = props;
	if (!touchable) return;

	const { clientX } = event.touches[0];

	getAllRect(instance, '.wan-rate__icon').then((list) => {
		const target = list
			.sort((cur, next) => cur.dataset.score - next.dataset.score)
			.find((item) => clientX >= item.left && clientX <= item.right);
		if (target != null) {
			onSelect(target.dataset);
		}
	});
}
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-rate {
  display: inline-flex;
  user-select: none;

  &__item {
    position: relative;
    padding: 0 var(--rate-horizontal-padding, $rate-horizontal-padding);

    &:not(:last-child) {
      padding-right: var(--rate-icon-gutter, $rate-icon-gutter);
    }
  }

  &__icon {
    display: block;
    height: 100%;
    color: var(--rate-icon-void-color, $rate-icon-void-color);
    font-size: var(--rate-icon-size, $rate-icon-size);

    &--half {
      position: absolute;
      top: 0;
      width: 0.5em;
      overflow: hidden;
      left: var(--rate-horizontal-padding, $rate-horizontal-padding);
      color: var(--rate-icon-full-color, $rate-icon-full-color);
    }

    &--full {
      color: var(--rate-icon-full-color, $rate-icon-full-color);
    }

    &--disabled {
      color: var(--rate-icon-disabled-color, $rate-icon-disabled-color);
    }
  }
}
</style>
