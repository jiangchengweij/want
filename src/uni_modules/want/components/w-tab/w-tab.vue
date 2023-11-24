<script lang="ts">
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="tab__pane-host" :class="hostClass">
		<view
			:class="[customClass, bem('tab__pane', { active: state.active, inactive: !state.active })]"
			:style="state.shouldShow ? '' : 'display: none;'"
		>
			<slot v-if="state.shouldRender" />
		</view>
	</view>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { bem } from '../utils/bem'
import { useParent } from '../utils/relation';

const props = defineProps({
	dot: {
		type: Boolean,
	},
	info: {
		type: [String, Number],
	},
	title: {
		type: String,
	},
	disabled: {
		type: Boolean,
	},
	titleStyle: {
		type: String,
	},
	name: {
		type: String,
		default: '',
	},
	index: {
		type: Number,
	},
	customClass: String,
	hostClass: null,
})

const state = reactive({
	active: false,
	shouldRender: false,
	shouldShow: false
})

const { parent, index }  = useParent('wanTabs');

let _inited = false;

onMounted(() => {
	update();
})

function getComputedName() {
	if (props.name !== '') {
		return props.name;
	}
	return getIndex();
}

function updateRender(active: boolean) {
	const { lazyRender, animated } = parent.proxy;
	_inited = _inited || active;
	state.active = active;
	state.shouldRender = _inited || !lazyRender;
	state.shouldShow = active || animated;
}

function update() {
	if (parent) {
		parent.exposed.updateTabs()
	}
}

function getIndex() {
	return props.index != null ? props.index : index
}

defineExpose({
	updateRender,
	getComputedName,
	active: state.active,
	inited: _inited,
	getIndex
})

</script>

<style lang="scss">
.tab__pane-host {
	flex-shrink: 0;
	box-sizing: border-box;
	width: 100%;
}
.wan-tab__pane {
	box-sizing: border-box;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;

	&--active {
		height: auto;
	}

	&--inactive {
		height: 0;
		overflow: visible;
	}
}
</style>
