<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared'
		}
	}
</script>
<template>
	<w-popup
	  :show="show"
	  position="bottom"
	  :round="round"
	  :z-index="zIndex"
	  :overlay="overlay"
	  :custom-class="['wan-action-sheet', customClass || '']"
	  :safe-area-inset-bottom="safeAreaInsetBottom"
	  :close-on-click-overlay="closeOnClickOverlay"
	  @close="onClickOverlay"
	>
	  <view v-if="title" class="wan-action-sheet__header">
	    {{ title }}
	    <w-icon
	      name="cross"
	      custom-class="wan-action-sheet__close"
	      @click="onClose"
	    />
	  </view>
	  <view v-if="description" class="wan-action-sheet__description wan-hairline--bottom">
	    {{ description }}
	  </view>
	  <view v-if="actions && actions.length" class="list-class">
	    <!-- button外包一层view，防止actions动态变化，导致渲染时button被打散 -->
	    <button
	      v-for="(item, index) in actions"
	      :key="index"
	      :open-type="item.disabled || item.loading || (item.openType === 'getUserInfo') ? '' : item.openType"
	      :style="item.color ? 'color: ' + item.color : ''"
	      :class="[bem('action-sheet__item', { disabled: item.disabled || item.loading }), item.className || '']"
	      hover-class="wan-action-sheet__item--hover"
	      @tap="onSelect(item)"
	      @getuserinfo="methods.onGetUserInfo"
	      @contact="methods.onContact"
	      @getphonenumber="methods.onGetPhoneNumber"
	      @error="methods.onError"
	      @launchapp="methods.onLaunchApp"
	      @opensetting="methods.onOpenSetting"
	      :lang="lang"
	      :session-from="sessionFrom"
	      :send-message-title="sendMessageTitle"
	      :send-message-path="sendMessagePath"
	      :send-message-img="sendMessageImg"
	      :show-message-card="showMessageCard"
	      :app-parameter="appParameter"
	    >
	      <template v-if="!item.loading">
	        {{ item.name }}
	        <view v-if="item.subname" class="wan-action-sheet__subname" >{{ item.subname }}</view>
	      </template>
	      <w-loading v-else custom-class="wan-action-sheet__loading" size="22px" />
	    </button>
	  </view>
	  <slot />
	  <template v-if="cancelText">
	    <view class="van-action-sheet__gap" />
	    <view
	      class="wan-action-sheet__cancel"
	      hover-class="wan-action-sheet__cancel--hover"
	      hover-stay-time="70"
	      @tap="onCancel"
	    >
	      {{ cancelText }}
	    </view>
	  </template>
	</w-popup>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useButton, btnProps, btnEmits } from '../utils/button';
import { bem } from '../utils/bem';

const emit = defineEmits([...btnEmits, 'getuserinfo', 'cancel', 'close', 'click-overlay', 'select']);
const props = defineProps({
	...btnProps,
	show: Boolean,
	title: String,
	cancelText: String,
	description: String,
	round: {
		type: Boolean,
		default: true,
	},
	zIndex: {
		type: Number,
		default: 100,
	},
	actions: {
		type: Array as PropType<anyObj>,
		default: [],
	},
	overlay: {
		type: Boolean,
		default: true,
	},
	closeOnClickOverlay: {
		type: Boolean,
		default: true,
	},
	closeOnClickAction: {
		type: Boolean,
		default: true,
	},
	safeAreaInsetBottom: {
		type: Boolean,
		default: true,
	},
	customClass: String,
	listClass: [String, Array]
})

const { methods } = useButton({ emit });

function onSelect(item: anyObj) {
	if (item.disabled || item.loading) return;
	const { closeOnClickAction } = props;
	if (item) {
		emit('select', item);

		if (closeOnClickAction) {
			onClose();
		}

		if (item.openType === 'getUserInfo') {
			
			// #ifdef MP-WEIXIN
			uni.getUserProfile({
				desc: item.getUserProfileDesc || '  ',
				complete: (userProfile) => {
					emit('getuserinfo', userProfile);
				},
			});
			// #endif
		}
	}
}

function onCancel() {
	emit('cancel');
}

function onClose() {
	emit('close');
}

function onClickOverlay() {
	emit('click-overlay');
	onClose();
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
