<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view :class="[bem('share-sheet__options', { border: showBorder })]">
		<view
			v-for="(item, index) in options"
			:key="index"
			class="wan-share-sheet__option"
			@tap="onSelect(index)"
		>
			<button class="wan-share-sheet__button" :open-type="item.openType">
				<image :src="getIconURL(item.icon)" class="wan-share-sheet__icon" /> 
				<view v-if="item.name" class="wan-share-sheet__name">{{ item.name }}</view>
				<view v-if="item.description" class="wan-share-sheet__option-description">
					{{ item.description }}
				</view>
			</button>
		</view>
	</view>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { bem } from '../utils/bem';

const emit = defineEmits(['select'])
const props = defineProps({
	options: {
		type: Array as PropType<anyObj>,
		default: () => []
	},
	showBorder: Boolean,
})
var PRESET_ICONS = ['qq', 'link', 'weibo', 'wechat', 'poster', 'qrcode', 'weapp-qrcode', 'wechat-moments'];

function getIconURL(icon: string) {
	if (PRESET_ICONS.indexOf(icon) !== -1) {
		return 'https://img.yzcdn.cn/vant/share-sheet-' + icon + '.png';
	}
	return icon;
}

function onSelect(index: number) {
	const option: anyObj = props.options[index];
	emit('select', { ...option, index });
}
</script>

<style lang="scss">
@import '../common/style/var.scss';
@import '../common/style/mixins/hairline.scss';

.wan-share-sheet {
  &__options {
    position: relative;
    display: flex;
    padding: $padding-md 0 $padding-md $padding-xs;
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;

    &--border::before {
      @include hairline-top($cell-border-color, $padding-md);
    }

    &::-webkit-scrollbar {
      height: 0;
    }
  }

  &__option {
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;

    &:active {
      opacity: $active-opacity;
    }
  }

  &__button {
    height: auto;
    padding: 0;
    line-height: inherit;
    background-color: transparent;
    border: 0;

    &::after {
      border: 0;
    }
  }

  &__icon {
    width: $share-sheet-icon-size;
    height: $share-sheet-icon-size;
    margin: 0 $padding-md;
  }

  &__name {
    margin-top: $padding-xs;
    padding: 0 $padding-base;
    color: $share-sheet-option-name-color;
    font-size: $share-sheet-option-name-font-size;
  }

  &__option-description {
    padding: 0 $padding-base;
    color: $share-sheet-option-description-color;
    font-size: $share-sheet-option-description-font-size;
  }
}
</style>

