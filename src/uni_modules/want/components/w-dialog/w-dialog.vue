<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<w-popup
		:show="options.show"
		:z-index="options.zIndex"
		:overlay="options.overlay"
		:transition="options.transition"
		:custom-class="`wan-dialog wan-dialog--${ options.theme }${ options.className } ${customClass || ''}`"
		:custom-style="style([{ width: addUnit(options.width) }, customStyle])"
		:overlay-style="options.overlayStyle"
		:close-on-click-overlay="closeOnClickOverlay"
		@close="onClickOverlay"
	>
		<view
			v-if="options.title || useTitleSlot"
			:class="[bem('dialog__header', { isolated: !(options.message || useSlot) })]"
		>
			<slot v-if="useTitleSlot" name="title" />
			<template v-else-if="options.title">{{ options.title }}</template>
		</view>

		<slot v-if="useSlot" />
		<view
			v-else-if="options.message"
			:class="[bem('dialog__message', [options.theme,options. messageAlign, { hasTitle: options.title }])]"
		>
			<text class="wan-dialog__message-text">{{ options.message }}</text>
		</view>

		<w-action v-if="options.theme === 'round-button'" custom-class="wan-dialog__footer--round-button">
			<w-action-button
				v-if="options.showCancelButton"
				size="normal"
				:loading="options.loading.cancel"
				class="wan-dialog__button wan-hairline--right"
				:custom-class="`wan-dialog__cancel ${cancelButtonClass || ''}`"
				:custom-style="`color: ${cancelButtonColor}`"
				@click="onCancel"
			>
				{{ options.cancelButtonText }}
			</w-action-button>
			<w-action-button
				v-if="options.showConfirmButton"
				size="normal"
				class="wan-dialog__button"
				:loading="options.loading.confirm"
				:custom-class="`wan-dialog__confirm ${confirmButtonClass}`"
				:custom-style="`color: ${cancelButtonColor}`"
				:open-type="options.confirmButtonOpenType"
				:lang="lang"
				:business-id="businessId"
				:session-from="sessionFrom"
				:send-message-title="sendMessageTitle"
				:send-message-path="sendMessagePath"
				:send-message-img="sendMessageImg"
				:show-message-card="showMessageCard"
				:app-parameter="appParameter"

				@click="onConfirm"
				@getuserinfo="methods.onGetUserInfo"
				@contact="methods.onContact"
				@getphonenumber="methods.onGetPhoneNumber"
				@error="methods.onError"
				@launchapp="methods.onLaunchApp"
				@opensetting="methods.onOpenSetting"
			>
				{{ confirmButtonText }}
			</w-action-button>
		</w-action>

		<view v-else-if="options.showCancelButton || options.showConfirmButton" class="wan-hairline--top wan-dialog__footer">
			<template v-if="options.showCancelButton">
				<slot v-if="useCancelButtonSlot" name="cancel-button" />

				<w-button
					v-else
					size="large"
					:loading="options.loading.cancel"
					class="wan-dialog__button wan-hairline--right"
					:custom-class="`wan-dialog__cancel ${cancelButtonClass || ''}`"
					:custom-style="`color: ${ cancelButtonColor }`"
					@click="onCancel"
				>
					{{ options.cancelButtonText }}
				</w-button>
			</template>

			<template v-if="options.showConfirmButton">
				<slot v-if="useConfirmButtonSlot" name="confirm-button" />

				<w-button
					v-else
					size="large"
					class="wan-dialog__button"
					:loading="options.loading.confirm"
					:custom-class="`wan-dialog__confirm ${confirmButtonClass}`"
					:custom-style="`color: ${ confirmButtonColor }`"

					:open-type="options.confirmButtonOpenType"
					:lang="lang"
					:business-id="businessId"
					:session-from="sessionFrom"
					:send-message-title="sendMessageTitle"
					:send-message-path="sendMessagePath"
					:send-message-img="sendMessageImg"
					:show-message-card="showMessageCard"
					:app-parameter="appParameter"

					@click="onConfirm"
					@getuserinfo="methods.onGetUserInfo"
					@contact="methods.onContact"
					@getphonenumber="methods.onGetPhoneNumber"
					@error="methods.onError"
					@launchapp="methods.onLaunchApp"
					@opensetting="methods.onOpenSetting"
				>
					{{ options.confirmButtonText }}
				</w-button>
			</template>
		</view>
	</w-popup>
</template>

<script setup lang="ts">
import { reactive, nextTick, getCurrentInstance, watch } from 'vue';
import { GRAY, RED } from '../common/color';
import { btnProps, useButton, btnEmits } from '../utils/button';
import { addUnit, toPromise } from '../utils';
import { style } from '../utils/style';
import { bem } from '../utils/bem';

const instance = getCurrentInstance();

const emit = defineEmits([...btnEmits, 'click', 'close', 'confirm', 'cancel'])

const props = defineProps({
	...btnProps,
	show: {
		type: Boolean,
	},
	title: String,
	message: String,
	theme: {
		type: String,
		default: 'default',
	},
	className: String,
	customStyle: [String, Object],
	asyncClose: Boolean,
	messageAlign: String,
	beforeClose: null,
	overlayStyle: String,
	useSlot: Boolean,
	useTitleSlot: Boolean,
	useConfirmButtonSlot: Boolean,
	useCancelButtonSlot: Boolean,
	showCancelButton: Boolean,
	closeOnClickOverlay: Boolean,
	confirmButtonOpenType: String,
	width: null,
	zIndex: {
		type: Number,
		default: 2000,
	},
	confirmButtonText: {
		type: String,
		default: '确认',
	},
	cancelButtonText: {
		type: String,
		default: '取消',
	},
	confirmButtonColor: {
		type: String,
		default: RED,
	},
	cancelButtonColor: {
		type: String,
		default: GRAY,
	},
	showConfirmButton: {
		type: Boolean,
		default: true,
	},
	overlay: {
		type: Boolean,
		default: true,
	},
	transition: {
		type: String,
		default: 'scale',
	},
	customClass: String,
	cancelButtonClass: String,
	confirmButtonClass: String,
})

const { methods } = useButton({ emit })

const options = reactive({
	show: props.show,
	title: props.title,
	width: props.width,
	theme: props.theme,
	message: props.message,
	zIndex: props.zIndex,
	overlay: props.overlay,
	className: props.className,
	asyncClose: props.asyncClose,
	beforeClose: props.beforeClose,
	transition: props.transition,
	customStyle: props.customStyle,
	messageAlign: props.messageAlign,
	overlayStyle: props.overlayStyle,
	confirmButtonText: props.confirmButtonText,
	cancelButtonText: props.cancelButtonText,
	showConfirmButton: props.showConfirmButton,
	showCancelButton: props.showCancelButton,
	closeOnClickOverlay: props.closeOnClickOverlay,
	confirmButtonOpenType: props.confirmButtonOpenType,
	loading: {
		confirm: false,
		cancel: false,
	},
	callback: (() => {}) as unknown as (
		action: string,
		ref: anyObj
	) => void,
})

watch(() => props, 
	(newOptions) => {
	setOptions(newOptions)
}, {
	deep: true,
})

watch(() => options.show, () => {
	if(!options.show) {
		stopLoading();
	}
})

function onConfirm() {
	handleAction('confirm');
}

function onCancel() {
	handleAction('cancel');
}

function onClickOverlay() {
	close('overlay');
}

function close(action) {
	options.show = false;
	nextTick(() => {
		emit('close', action);
		if (options.callback) {
			options.callback(action, instance);
		}
	});
}


function stopLoading() {
	options.loading.confirm = false;
	options.loading.cancel = false;
}

function handleAction(action) {
	
	emit(action, { dialog: instance });

	const { asyncClose, beforeClose } = options;

	if (!asyncClose && !beforeClose) {
		close(action);
		return;
	}
	
	options.loading[action] = true;

	if (beforeClose) {
		
		toPromise(beforeClose(action)).then((value) => {
			if (value) {
				close(action);
			} else {
				stopLoading();
			}
		});
	}
}

function setOptions(opts: anyObj) {
	if (!opts) { return }
	Object.keys(opts).forEach((key) => {
		options[key] = opts[key]
	})
}

defineExpose({
	setOptions,
	stopLoading,
	close,
})

</script>

<style lang="scss">
@import "./style.scss";
</style>
