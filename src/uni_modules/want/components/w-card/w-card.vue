<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared'
		}
	}
</script>
<template>
	<view class="wan-card" :class="[customClass || '']">
		<view :class="bem('card__header', { center: centered })">
			<view class="wan-card__thumb" @tap="onClickThumb">
				<image
					v-if="thumb"
					:src="thumb"
					:mode="thumbMode"
					lazy-load="lazyLoad"
					class="wan-card__img"
					:class="[thumbClass || '']"
				/>
				<slot v-else name="thumb" />
				<w-tag
					v-if="tag"
					mark
					type="danger"
					custom-class="wan-card__tag"
				>
					{{ tag }}
				</w-tag>
				<slot v-else name="tag" />
			</view>

			<view class="wan-card__content" :class="[bem('card__content', { center: centered })]">
				<view>
					<view v-if="title" class="wan-card__title" :class="[titleClass || '']">{{ title }}</view>
					<slotv-else name="title" />

					<view v-if="desc" class="wan-card__desc" :class="[descClass || '']">{{ desc }}</view>
					<slot v-else name="desc" />

					<slot name="tags" />
				</view>

				<view class="wan-card__bottom">
					<slot name="price-top" />
					<view v-if="price || price === 0" class="wan-card__price" :class="[priceClass || '']">
						<text>{{ currency }}</text>
						<text class="wan-card__price-integer">{{ state.integerStr }}</text>
						<text class="wan-card__price-decimal">{{ state.decimalStr }}</text>
					</view>
					<slot v-else name="price" />
					<view v-if="originPrice || originPrice === 0" class="wan-card__origin-price" :class="[originPriceClass || '']">{{ currency }} {{ originPrice }}</view>
					<slot v-else name="origin-price" />
					<view v-if="num" class="wan-card__num" :class="[numClass || '']">x {{ num }}</view>
					<slot v-else  name="num" />
					<slot name="bottom" />
				</view>
			</view>
		</view>

		<view class="wan-card__footer">
			<slot name="footer" />
		</view>
	</view>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import { useLink, linkProps } from '../utils/link'
import { bem } from '../utils/bem'

const props = defineProps({
	...linkProps,
	tag: String,
	num: String,
	desc: String,
	thumb: String,
	title: String,
	price: {
		type: [String, Number],
	},
	centered: Boolean,
	lazyLoad: Boolean,
	thumbLink: String,
	originPrice: [String, Number],
	thumbMode: {
		type: String,
		default: 'aspectFit',
	},
	currency: {
		type: String,
		default: '¥',
	},
	customClass: null,
	numClass: null,
	descClass: null,
	thumbClass: null,
	titleClass: null,
	priceClass: null,
	originPriceClass: null
})
const state = reactive({
	integerStr: '',
	decimalStr: ''
})
const { jumpLink } = useLink({ props })

watch(() => props.price, () => {
	updatePrice()
})

onMounted(() => {
	updatePrice()
})

function updatePrice() {
	const { price } = props;
	const priceArr = `${price}`.toString().split('.');
	state.integerStr = priceArr[0]
	state.decimalStr = priceArr[1] ? `.${priceArr[1]}` : ''
}

function onClickThumb() {
	const url = props.thumbLink
	jumpLink(url);
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
