<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<w-popup
		round
		:show="show"
		position="bottom"
		:custom-class="['wan-share-sheet', customClass || '']"
		:overlay="overlay"
		:duration="duration"
		:z-index="zIndex"
		:overlay-style="overlayStyle"
		:close-on-click-overlay="closeOnClickOverlay"
		:safe-area-inset-bottom="safeAreaInsetBottom"
		@close="onClose"
		@click-overlay="onClickOverlay"
	>
		<view class="wan-share-sheet__header">
			<view class="wan-share-sheet__title">
				<slot name="title" />
			</view>
			<view v-if="title" class="wan-share-sheet__title">{{ title }}</view>
	
			<view class="wan-share-sheet__description">
				<slot name="description" />
			</view>
			<view v-if="description" class="wan-share-sheet__description">
				{{ description }}
			</view>
		</view>
	
		<template v-if="isMulti">
			<wan-options
				v-for="(item, index) in options"
				:show-border="index !== 0"
				:key="index"
				:options="item"
				@select="onSelect"
			/>
		</template>
	
		<wan-options v-else :options="options" @select="onSelect" />
	
		<button type="button" class="wan-share-sheet__cancel" @tap="onCancel">
			{{ cancelText }}
		</button>
	</w-popup>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import WanOptions from './wan-options';

const emit = defineEmits(['click-overlay', 'cancel', 'select', 'close'])
const props = defineProps({
	// whether to show popup
	show: Boolean,
	// overlay custom style
	overlayStyle: String,
	// z-index
	zIndex: {
		type: Number,
		default: 100,
	},
	title: String,
	cancelText: {
		type: String,
		default: '取消',
	},
	description: String,
	options: {
		type: Array,
		default: [],
	},
	overlay: {
		type: Boolean,
		default: true,
	},
	safeAreaInsetBottom: {
		type: Boolean,
		default: true,
	},
	closeOnClickOverlay: {
		type: Boolean,
		default: true,
	},
	duration: {
		type: null,
		default: 300,
	},
	customClass: null
})

const isMulti = computed(() => {
	const { options } = props;
  if (options == null || options[0] == null) {
    return false;
  }
	
	return Array.isArray(options) && Array.isArray(options[0])
})

function onClickOverlay() {
	emit('click-overlay');
}

function onCancel() {
	onClose();
	emit('cancel');
}

function onSelect(event: anyObj) {
	emit('select', event);
}

function onClose() {
	emit('close');
}
</script>

<style lang="scss">
@import '../common/style/var.scss';
@import '../common/style/mixins/hairline.scss';

.wan-share-sheet {
  &__header {
    padding: $share-sheet-header-padding;
    text-align: center;
  }

  &__title {
    margin-top: $padding-xs;
    color: $share-sheet-title-color;
    font-weight: normal;
    font-size: $share-sheet-title-font-size;
    line-height: $share-sheet-title-line-height;

    &:empty {
      display: none;
    }
  }

  &__title:not(:empty) + &__title {
    display: none;
  }

  &__description {
    display: block;
    margin-top: $padding-xs;
    color: $share-sheet-description-color;
    font-size: $share-sheet-description-font-size;
    line-height: $share-sheet-description-line-height;

    &:empty {
      display: none;
    }
  }

  &__description:not(:empty) + &__description {
    display: none;
  }

  &__cancel {
    display: block;
    box-sizing: content-box;
    width: 100%;
    height: auto;
    padding: 0;
    font-size: $share-sheet-cancel-button-font-size;
    line-height: $share-sheet-cancel-button-height;
    text-align: center;
    background: $share-sheet-cancel-button-background;
    border: none;

    &::before {
      display: block;
      height: $padding-xs;
      background-color: $background-color;
      content: ' ';
    }

    &::after {
      display: none;
    }

    &:active {
      background-color: $active-color;
    }
  }
}
</style>
