<template>
	<demo-block title="基础用法">
	  <w-cell title="展示弹出层" is-link @click="showBasic" />
	  <w-popup
	    :show="state.basic"
	    custom-style="padding: 30px 50px"
	    @close="hideBasic"
	  >
	    内容
	  </w-popup>
	</demo-block>
	
	<demo-block title="弹出位置">
	  <w-cell title="顶部弹出" is-link @click="showTop" />
	  <w-cell title="底部弹出" is-link @click="showBottom" />
	  <w-cell title="左侧弹出" is-link @click="showLeft" />
	  <w-cell title="右侧弹出" is-link @click="showRight" />
	
	  <w-popup
	    :show="state.top"
	    position="top"
	    custom-style="height: 20%"
	    @close="hideTop"
	  />
	  <w-popup
	    :show="state.bottom"
	    position="bottom"
	    custom-style="height: 20%"
	    @close="hideBottom"
	  />
	  <w-popup
	    :show="state.left"
	    position="left"
	    custom-style="width: 20%; height: 100%;"
	    @close="hideLeft"
	  />
	  <w-popup
	    :show="state.right"
	    position="right"
	    custom-style="width: 20%; height: 100%;"
	    @close="hideRight"
	  />
	</demo-block>
	
	<demo-block title="关闭图标">
	  <w-cell title="关闭图标" is-link @click="showCloseIcon" />
	  <w-cell title="自定义图标" is-link @click="showCustomCloseIcon" />
	  <w-cell title="图标位置" is-link @click="showCustomIconPosition" />
	
	  <w-popup
	    :show="state.closeIcon"
	    closeable
	    position="bottom"
	    custom-style="height: 20%"
	    @close="hideCloseIcon"
	  />
	
	  <w-popup
	    :show="state.customCloseIcon"
	    closeable
	    close-icon="close"
	    position="bottom"
	    custom-style="height: 20%"
	    @close="hideCustomCloseIcon"
	  />
	
	  <w-popup
	    :show="state.customIconPosition"
	    closeable
	    close-icon-position="top-left"
	    position="bottom"
	    custom-style="height: 20%"
	    @close="hideCustomIconPosition"
	  />
	</demo-block>
	
	<demo-block title="圆角弹窗">
	  <w-cell title="圆角弹窗" is-link @click="showRound" />
	
	  <w-popup
	    :show="state.round"
	    round
	    position="bottom"
	    custom-style="height: 20%"
	    @close="hideRound"
	  />
	</demo-block>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
	basic: false,
	top: false,
	bottom: false,
	left: false,
	right: false,
	round: false,
	closeIcon: false,
	customCloseIcon: false,
	customIconPosition: false,
})

function toggle(type, show) {
	state[type] = show
}

function showBasic() {
	toggle('basic', true);
}

function hideBasic() {
	toggle('basic', false);
}

function showTop() {
	toggle('top', true);
}

function hideTop() {
	toggle('top', false);
}

function showLeft() {
	toggle('left', true);
}

function hideLeft() {
	toggle('left', false);
}

function showRight() {
	toggle('right', true);
}

function hideRight() {
	toggle('right', false);
}

function showBottom() {
	toggle('bottom', true);
}

function hideBottom() {
	toggle('bottom', false);
}

function showRound() {
	toggle('round', true);
}

function hideRound() {
	toggle('round', false);
}

function showCloseIcon() {
	toggle('closeIcon', true);
}

function hideCloseIcon() {
	toggle('closeIcon', false);
}

function showCustomCloseIcon() {
	toggle('customCloseIcon', true);
}

function hideCustomCloseIcon() {
	toggle('customCloseIcon', false);
}

function showCustomIconPosition() {
	toggle('customIconPosition', true);
}

function hideCustomIconPosition() {
	toggle('customIconPosition', false);
}
</script>
