<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-tabbar-item-host">
		<view
		  :class="[bem('tabbar-item', { active: state.active }), customClass || '']"
		  :style="`color: ${ state.active ? state.activeColor : state.inactiveColor }`"
		  @tap="onClick"
		>
		  <view class="wan-tabbar-item__icon">
		    <w-icon
		      v-if="icon"
		      :name="icon"
		      :class-prefix="iconPrefix"
		      custom-class="wan-tabbar-item__icon__inner"
		    />
		    <template v-else>
		      <slot v-if="state.active" name="icon-active" />
		      <slot v-else name="icon" />
		    </template>
		    <w-info
		      :dot="dot"
		      :info="info"
		      custom-class="wan-tabbar-item__info"
		    />
		  </view>
		  <view class="wan-tabbar-item__text">
		    <slot />
		  </view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { bem } from '../utils/bem'
import { useParent } from '../utils/relation';
const emit = defineEmits(['click', 'change'])
const props = defineProps({
	info: null,
	name: null,
	icon: String,
	dot: Boolean,
	url: {
		type: String,
		default: '',
	},
	linkType: {
		type: String,
		default: 'redirectTo',
	},
	iconPrefix: {
		type: String,
		default: 'wan-icon',
	},
	index: Number,
	customClass: [String, Array]
})

const state = reactive({
	active: false,
	activeColor: '',
	inactiveColor: '',
})

const { parent, index } = useParent('wanTabbar')

const curIndex = computed(() => {
	return props.index != null ? props.index : index;
})

function onClick() {
	const { name, url, linkType } = props;

	if (parent) {
		
		const active = name || curIndex.value;

		if (active !== state.active) {
			parent.emit('change', active);
		}
	}

	if (url && uni[linkType]) {
		return uni[linkType]({ url });
	}

	emit('click');
}

function updateFromParent() {

	if (!parent) {
		return;
	}
	const { name } = props;
	
	const parentData = parent.proxy
	
	const active = (name || index) === parentData.active;
	const patch: Record<string, unknown> = {};

	if (active !== state.active) {
		patch.active = active;
	}
	if (parentData.activeColor !== state.activeColor) {
		patch.activeColor = parentData.activeColor;
	}
	if (parentData.inactiveColor !== state.inactiveColor) {
		patch.inactiveColor = parentData.inactiveColor;
	}

	Object.keys(patch).forEach((key) => {
		state[key] = patch[key]
	})
}

defineExpose({
	updateFromParent
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-tabbar-item-host {
	flex: 1;
}

.wan-tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--tabbar-item-text-color, $tabbar-item-text-color);
  font-size: var(--tabbar-item-font-size, $tabbar-item-font-size);
  line-height: var(--tabbar-item-line-height, $tabbar-item-line-height);

  &__icon {
    position: relative;
    margin-bottom: var(--tabbar-item-margin-bottom, $tabbar-item-margin-bottom);
    font-size: var(--tabbar-item-icon-size, $tabbar-item-icon-size);

    &__inner {
      display: block;
      min-width: 1em;
    }
  }

  &--active {
    color: var(--tabbar-item-active-color, $tabbar-item-active-color);
  }

  &__info {
    margin-top: 2px;
  }
}
</style>
