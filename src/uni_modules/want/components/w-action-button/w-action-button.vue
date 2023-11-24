<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view :class="bem('action-button', [type, { first: isFirst, last: isLast, plain: plain }])">
		<w-button
			:lang="lang"
			:type="type"
			:size="size"
			:color="color"
			:plain="plain"
			:loading="loading"
			:disabled="disabled"
			:open-type="openType"
			:custom-class="`wan-action-button__inner ${customClass || ''}`"
			:business-id="businessId"
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
			@launchapp="methods.onLaunchApp">
			<text>{{ text }}</text>
			<slot />
		</w-button>
	</view>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useParent } from '../utils/relation'
import { bem } from '../utils/bem'

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
	color: String,
	size: {
		type: String,
		default: 'normal',
	},
	loading: Boolean,
	disabled: Boolean,
	plain: Boolean,
	type: {
		type: String,
		default: 'danger',
	},
	index: {
		type: Number,
	},
	customClass: null,
	hostClass: null,
})

const { methods } = useButton({ emit })
const { jumpLink } = useLink({ props })

const { index, children } = useParent('wanAction');

function onClick(event: anyObj) {
	emit('click', event)
	jumpLink()
}

const curIndex = computed(() => {
	return props.index != null ? props.index : index;
})

const isFirst = computed(() => {
	return curIndex.value === 0;
})

const isLast = computed(() => {
	return curIndex.value === children.length - 1;
})

</script>

<style lang="scss">
@import './style.scss';
</style>
