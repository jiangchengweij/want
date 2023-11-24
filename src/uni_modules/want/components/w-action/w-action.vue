<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view :class="[customClass || '', bem('action', { safe: safeAreaInsetBottom })]">
		<slot />
	</view>
</template>

<script setup lang="ts">
import { useChildren } from '../utils/relation'
import { bem } from '../utils/bem'

defineProps({
	safeAreaInsetBottom: {
		type: Boolean,
		default: true,
	},
	customClass: String
})
useChildren('wanAction');
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-action {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  box-sizing: content-box;
  height: var(--goods-action-height, $goods-action-height);
  background-color: var(
    --goods-action-background-color,
    $goods-action-background-color
  );

  &--safe {
    padding-bottom: var(--window-bottom);
  }
}
</style>
