<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<w-button
		square
		size="large"
		:lang="lang"
		:loading="loading"
		:disabled="disabled"
		:open-type="openType"
		:business-id="businessId"
		custom-class="wan-action-icon"
		:session-from="sessionFrom"
		:app-parameter="appParameter"
		:send-message-img="sendMessageImg"
		:send-message-path="sendMessagePath"
		:show-message-card="showMessageCard"
		:send-message-title="sendMessageTitle"
		@click="onClick"
		@error="methods.onError"
		@contact="methods.onContact"
		@opensetting="methods.onOpenSetting"
		@getuserinfo="methods.onGetUserInfo"
		@getphonenumber="methods.onGetPhoneNumber"
		@launchapp="methods.onLaunchApp"
	>
		<view v-if="icon" class="wan-action-icon__icon">
			<w-icon
				:name="icon"
				:dot="dot"
				:info="info"
				:size="size"
				:color="color"
				:class-prefix="classPrefix"
				class="wan-action-icon__icon"
				:custom-class="iconClass || ''"
				:info-class="infoClass || ''"
			/>
		</view>
		<view v-else>
			<slot name="icon" />
		</view>
		<text :class="textClass || ''">{{ text }}</text>
	</w-button>
</template>

<script setup lang="ts">
import {
	btnProps,
	useButton,
	btnEmits
} from '../utils/button'
import {
	useLink,
	linkProps,
} from '../utils/link'

const emit = defineEmits([...btnEmits, 'click'])
const props = defineProps({
	...btnProps,
	...linkProps,
	text: String,
	dot: Boolean,
	info: String,
	icon: String,
	size: {
		type: String,
	},
	color: String,
	classPrefix: {
		type: String,
		default: 'wan-icon',
	},
	disabled: Boolean,
	loading: Boolean,
	customClass: String,
	iconClass: String,
	infoClass: String,
	textClass: String,
	wrapClass: [String, Array]
})

const { methods } = useButton({ emit })
const { jumpLink } = useLink({ props })

function onClick(event: anyObj) {
	emit('click', event)
	jumpLink()
}
</script>

<style lang="scss">
@import '../common/style/var.scss';

:deep(.wan-action-icon) {
	width: auto;
	display: flex !important;
	flex-direction: column;
	justify-content: center !important;
	line-height: 1 !important;
	border: none !important;
	font-size: var(
		--goods-action-icon-font-size,
		$goods-action-icon-font-size
	) !important;
	color: var(
		--goods-action-icon-text-color,
		$goods-action-icon-text-color
	) !important;
	min-width: var(--goods-action-icon-width, $goods-action-icon-width);
	height: var(--goods-action-icon-height, $goods-action-icon-height) !important;
}
:deep(.wan-action-icon__icon) {
	display: flex;
	margin: 0 auto 5px;
	color: var(--goods-action-icon-color, $goods-action-icon-color);
	font-size: var(--goods-action-icon-size, $goods-action-icon-size);
}
</style>
