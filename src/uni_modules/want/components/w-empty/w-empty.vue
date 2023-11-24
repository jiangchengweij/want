<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-empty" :class="[customClass]">
		<view class="wan-empty__image">
			<slot name="image"></slot>
		</view>
		<view class="wan-empty__image">
			<image v-if="image" class="wan-empty__image__img" :src="imageUrl" />
		</view>
		<view class="wan-empty__description">
			<slot name="description"></slot>
		</view>
		<view class="wan-empty__description">
			{{ description }}
		</view>
		<view class="wan-empty__bottom">
			<slot></slot>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
	description: String,
	image: {
		type: String,
		default: 'default',
	},
	customClass: String,
})

const PRESETS = ['error', 'search', 'default', 'network'];

const imageUrl = computed(() => {
	const { image } = props;
	if (PRESETS.indexOf(image) !== -1) {
		return 'https://img.yzcdn.cn/vant/empty-image-' + image + '.png';
	}

	return image;
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: $empty-padding;

  &__image {
    width: $empty-image-size;
    height: $empty-image-size;

    &:empty {
      display: none;
    }

    &__img {
      width: 100%;
      height: 100%;
    }
  }

  &__image:not(:empty) + &__image {
    display: none;
  }

  &__description {
    margin-top: $empty-description-margin-top;
    padding: $empty-description-padding;
    color: $empty-description-color;
    font-size: $empty-description-font-size;
    line-height: $empty-description-line-height;

    &:empty {
      display: none;
    }
  }

  &__description:not(:empty) + &__description {
    display: none;
  }

  &__bottom {
    margin-top: $empty-bottom-margin-top;
  }
}
</style>
