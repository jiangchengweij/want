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
        <wan-tag v-if="tag" mark type="danger" custom-class="wan-card__tag">
          {{ tag }}
        </wan-tag>
        <slot v-else name="tag" />
      </view>

      <view
        class="wan-card__content"
        :class="[bem('card__content', { center: centered })]"
      >
        <view>
          <view
            v-if="title"
            class="wan-card__title"
            :class="[titleClass || '']"
            >{{ title }}</view
          >
          <slot v-else name="title" />

          <view v-if="desc" class="wan-card__desc" :class="[descClass || '']">{{
            desc
          }}</view>
          <slot v-else name="desc" />

          <slot name="tags" />
        </view>

        <view class="wan-card__bottom">
          <slot name="price-top" />
          <view
            v-if="price || price === 0"
            class="wan-card__price"
            :class="[priceClass || '']"
          >
            <text>{{ currency }}</text>
            <text class="wan-card__price-integer">{{ state.integerStr }}</text>
            <text class="wan-card__price-decimal">{{ state.decimalStr }}</text>
          </view>
          <slot v-else name="price" />
          <view
            v-if="originPrice || originPrice === 0"
            class="wan-card__origin-price"
            :class="[originPriceClass || '']"
            >{{ currency }} {{ originPrice }}</view
          >
          <slot v-else name="origin-price" />
          <view v-if="num" class="wan-card__num" :class="[numClass || '']"
            >x {{ num }}</view
          >
          <slot v-else name="num" />
          <slot name="bottom" />
        </view>
      </view>
    </view>

    <view class="wan-card__footer">
      <slot name="footer" />
    </view>
  </view>
</template>
<script lang="ts">
import { getCurrentInstance } from 'vue';
import { setup, props, emits } from './index';

export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared'
  },
  props,
  emits: [...emits],
  setup(props, context) {
    const instance = getCurrentInstance();
    return setup.call(instance, props, context);
  }
};
</script>
<style lang="scss">
@import './index.scss';
</style>
