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
	  v-if="state.showWrapper"
	  :class="[bem('dropdown-item', state.direction), customClass || '']"
	  :style="state.wrapperStyle"
	>
	  <w-popup
	    :show="state.showPopup"
	    :custom-style="`position: absolute;${ popupStyle }`"
	    overlay-style="position: absolute;"
	    :overlay="state.overlay"
	    :position="state.direction === 'down' ? 'top' : 'bottom'"
	    :duration="state.transition ? state.duration : 0"
	    :safe-area-tab-bar="state.safeAreaTabBar"
	    :close-on-click-overlay="state.closeOnClickOverlay"
	    @enter="onOpen"
	    @leave="onClose"
	    @close="toggle"
	    @after-enter="onOpened"
	    @after-leave="onClosed"
	  >
	    <w-cell
	      v-for="(item) in options"
	      :key="item.value"
	      :class="[bem('dropdown-item__option', { active: item.value === modelValue } )]"
	      clickable
	      :icon="item.icon"
	      @click="onOptionTap(item)"
	    >
				<template #title>
					<view
					  class="wan-dropdown-item__title"
						:class="itemTitleClass || ''"
					  :style="item.value === modelValue  ? 'color:' + state.activeColor : ''"
					>
					  {{ item.text }}
					</view>
				</template>
	      <w-icon
	        v-if="item.value === modelValue"
	        name="success"
	        class="wan-dropdown-item__icon"
	        :color="state.activeColor"
	      />
	    </w-cell>
	
	    <slot />
	  </w-popup>
	</view>
</template>

<script setup lang="ts">
import { reactive, computed, nextTick, PropType, onMounted } from 'vue';
import { useParent } from '../utils/relation';
import { bem } from '../utils/bem';

interface Option {
  text: string;
  value: string | number;
  icon: string;
}

const emit = defineEmits(['update:modelValue', 'open', 'opened', 'close', 'closed', 'change', 'before-toggle'])
const props = defineProps({
	modelValue: {
		type: null,
	},
	title: {
		type: String,
	},
	disabled: Boolean,
	titleClass: {
		type: String,
	},
	options: {
		type: Array as PropType<anyObj>,
		default: () => [],
	},
	popupStyle: String,
	useBeforeToggle: {
		type: Boolean,
		default: false,
	},
	index: Number,
	customClass: [String, Array],
	itemTitleClass: [String, Array]
})

const state = reactive({
	transition: true,
	showPopup: false,
	showWrapper: false,
	displayTitle: '',
	direction: null,
	duration: 200,
	overlay: null,
	activeColor: null,
	closeOnClickOverlay: null,
	safeAreaTabBar: false,
	wrapperStyle: {},
})

const { parent, index } = useParent('wanDropdownItem')

onMounted(() => {
	updateDataFromParent();
})

const curIndex = computed(() => {
	return props.index != null ? props.index : index;
})

function rerender() {
	nextTick(() => {
		parent?.exposed.updateItemListData();
	});
}

function updateDataFromParent() {
	if (parent) {
		const {
			overlay,
			duration,
			activeColor,
			closeOnClickOverlay,
			direction,
			safeAreaTabBar,
		} = parent.proxy;
		state.overlay = overlay;
		state.duration = duration;
		state.activeColor = activeColor;
		state.closeOnClickOverlay = closeOnClickOverlay;
		state.direction = direction;
		state.safeAreaTabBar = safeAreaTabBar;
	}
}

function onOpen() {
	emit('open');
}

function onOpened() {
	emit('opened');
}

function onClose() {
	emit('close');
}

function onClosed() {
	emit('closed');
	state.showWrapper = false;
}

function onOptionTap(option) {
	const { value } = option as unknown as Option;

	const shouldEmitChange = props.modelValue !== value;
	state.showPopup = false;
	emit('update:modelValue', value)
	emit('close');

	rerender();

	if (shouldEmitChange) {
		emit('change', value);
	}
}

function toggle(show?: boolean, options: { immediate?: boolean } = {}) {

	if (typeof show !== 'boolean') {
		show = !state.showPopup;
	}

	if (show === state.showPopup) {
		return;
	}

	onBeforeToggle(show).then((status) => {

		if (!status) {
			return;
		}
		
		state.transition = !options.immediate
		state.showPopup = show

		if (show) {
			parent?.exposed.getChildWrapperStyle().then((wrapperStyle: string) => {
				state.wrapperStyle = wrapperStyle;
				state.showWrapper = true
				rerender();
			});
		} else {
			rerender();
		}
	});
}

function onBeforeToggle(status: boolean): Promise<boolean> {
	const { useBeforeToggle } = props;

	if (!useBeforeToggle) {
		return Promise.resolve(true);
	}

	return new Promise((resolve) => {
		emit('before-toggle', {
			status,
			callback: (value: boolean) => resolve(value),
		});
	});
}

function getData() {
	return { showPopup: state.showPopup, ...props  }
}

defineExpose({
	toggle,
	getData,
	updateDataFromParent
})
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-dropdown-item {
  position: fixed;
  right: 0;
  left: 0;
  overflow: hidden;

  &__option {
    text-align: left;

    &--active {
      .wan-dropdown-item__title,
      .wan-dropdown-item__icon {
        color: var(
          --dropdown-menu-option-active-color,
          $dropdown-menu-option-active-color
        );
      }
    }
  }

  &--up {
    top: 0;
  }

  &--down {
    bottom: 0;
  }

  &__icon {
    display: block;
    line-height: inherit;
  }
}
</style>
