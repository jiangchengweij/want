<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view
	  v-if="loading"
	  :class="[customClass || '', bem('skeleton', [{animate}])]"
	>
	  <view
	    v-if="avatar"
	    :class="[avatarClass || '', bem('skeleton__avatar', [avatarShape])]"
	    :style="'width:' + avatarSize + ';height:' + avatarSize"
	  />
	  <view :class="[bem('skeleton__content')]">
	    <view
	      v-if="title"
	      :class="[titleClass || '', bem('skeleton__title')]"
	      :style="'width:' + titleWidth"
	    />
	    <view
	      v-for="(_, index) in state.rowArray"
	      :key="index"
	      :class="[rowClass || '', bem('skeleton__row')]"
	      :style="'width:' + (state.isArray ? rowWidth[index] : rowWidth)"
	    />
	  </view>
	</view>
	<view v-else :class="[bem('skeleton__content')]">
	  <slot />
	</view>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { bem } from '../utils/bem'

const props = defineProps({
	row: {
		type: Number,
		default: 0,
	},
	title: Boolean,
	avatar: Boolean,
	loading: {
		type: Boolean,
		default: true,
	},
	animate: {
		type: Boolean,
		default: true,
	},
	avatarSize: {
		type: String,
		default: '32px',
	},
	avatarShape: {
		type: String,
		default: 'round',
	},
	titleWidth: {
		type: String,
		default: '40%',
	},
	rowWidth: {
		type: null,
		default: '100%',
	},
	avatarClass: String,
	titleClass: String,
	rowClass: String,
	customClass: String
})

const state = reactive({
	isArray: false,
	rowArray: []
})

watch(() => props.row, (value) => {
	state.rowArray = Array.from({ length: value })
}, {
	immediate: true
})

watch(() => props.rowWidth, (val) => {
	state.isArray = val instanceof Array
}, {
	immediate: true
})

</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-skeleton {
	display: flex;
	box-sizing: border-box;
	width: 100%;
	padding: var(--skeleton-padding, $skeleton-padding);

	&__avatar {
		flex-shrink: 0;
		margin-right: var(--padding-md, $padding-md);
		background-color: var(
			--skeleton-avatar-background-color,
			$skeleton-avatar-background-color
		);

		&--round {
			border-radius: 100%;
		}
	}

	&__content {
		flex: 1;
	}

	&__avatar + &__content {
		padding-top: var(--padding-xs, $padding-xs);
	}

	&__row,
	&__title {
		height: var(--skeleton-row-height, $skeleton-row-height);
		background-color: var(
			--skeleton-row-background-color,
			$skeleton-row-background-color
		);
	}

	&__title {
		margin: 0;
	}

	&__row {
		&:not(:first-child) {
			margin-top: var(--skeleton-row-margin-top, $skeleton-row-margin-top);
		}
	}

	&__title + &__row {
		margin-top: 20px;
	}

	&--animate {
		animation: wan-skeleton-blink $skeleton-animation-duration ease-in-out
			infinite;
	}
}

@keyframes wan-skeleton-blink {
	50% {
		opacity: 0.6;
	}
}
</style>
