<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-submit-bar" :class="[customClass || '']">
	  <slot name="top" />
	  <view class="wan-submit-bar__tip">
	    <w-icon
	      v-if="tipIcon"
	      size="12px"
	      :name="tipIcon"
	      custom-class="wan-submit-bar__tip-icon"
	    />
	    <view v-if="state.hasTip" class="wan-submit-bar__tip-text">
	      {{ tip }}
	    </view>
	    <slot name="tip" />
	  </view>
	
	  <view class="wan-submit-bar__bar" :class="[barClass || '']">
	    <slot />
	    <view v-if="state.hasPrice" class="wan-submit-bar__text">
	      <text>{{ label || '合计：' }}</text>
	      <text class="wan-submit-bar__price" :class="priceClass || ''">
	        <text class="wan-submit-bar__currency">{{ currency }} </text>
	        <text class="wan-submit-bar__price-integer">{{ state.integerStr }}</text>
					<text>{{ state.decimalStr }}</text>
	      </text>
	      <text class="wan-submit-bar__suffix-label">{{ suffixLabel }}</text>
	    </view>
			<view class="wan-submit-bar__button">
				<w-button
				  round
				  :type="buttonType"
				  :loading="loading"
				  :disabled="disabled"
				  :custom-class="buttonClass || ''"
				  custom-style="width: 100%;"
				  @click="onSubmit"
				>
				  {{ loading ? '' : buttonText }}
				</w-button>
			</view>
	  </view>
	  <view v-if="safeAreaInsetBottom" class="wan-submit-bar__safe" />
	</view>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
const emit = defineEmits(['submit'])

const props = defineProps({
	tip: {
		type: null,
	},
	tipIcon: String,
	type: Number,
	price: {
		type: null,
	},
	label: String,
	loading: Boolean,
	disabled: Boolean,
	buttonText: String,
	currency: {
		type: String,
		default: '¥',
	},
	buttonType: {
		type: String,
		default: 'danger',
	},
	decimalLength: {
		type: Number,
		default: 2,
	},
	suffixLabel: String,
	safeAreaInsetBottom: {
		type: Boolean,
		default: true,
	},
	barClass: null,
	priceClass: null,
	buttonClass: null,
	customClass: null,
})

watch(() => props.tip, () => {
	updateTip()
})

watch(() => [props.price, props.decimalLength], () => {
	updatePrice()
}, { deep: true })

onMounted(() => {
	updateTip()
	updatePrice()
})

const state = reactive({
	hasTip: false,
	hasPrice: false,
	integerStr: '',
	decimalStr: '',
})

function updatePrice() {
	const { price, decimalLength } = props;
	const priceStrArr =
		typeof price === 'number' &&
		(price / 100).toFixed(decimalLength).split('.');
	
	state.hasPrice = typeof price === 'number';
	state.integerStr = priceStrArr && priceStrArr[0];
	state.decimalStr = decimalLength && priceStrArr ? `.${priceStrArr[1]}` : '';
}

function updateTip() {
	state.hasTip = typeof props.tip === 'string'
}

function onSubmit(event) {
	emit('submit', event);
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
