<template>
	<demo-block title="基础用法">
	  <w-rate
	    custom-class="rate-position"
	    v-model="state.value1"
	  />
	</demo-block>
	
	<demo-block title="自定义图标">
	  <w-rate
	    custom-class="rate-position"
	    icon="like"
	    void-icon="like-o"
			v-model="state.value2"
	  />
	</demo-block>
	
	<demo-block title="自定义样式">
	  <w-rate
	    custom-class="rate-position"
			v-model="state.value3"
	    :size="25"
	    color="#ffd21e"
	    void-icon="star"
	    void-color="#eee"
	  />
	</demo-block>
	
	<demo-block title="半星">
	  <w-rate
	    custom-class="rate-position"
			v-model="state.value4"
	    allow-half
	    void-icon="star"
	    void-color="#eee"
	  />
	</demo-block>
	
	<demo-block title="自定义数量">
	  <w-rate
	    custom-class="rate-position"
			v-model="state.value5"
	    :count="6"
	  />
	</demo-block>
	
	<demo-block title="禁用状态">
	  <w-rate
	    custom-class="rate-position"
			v-model="state.value6"
	    disabled
	  />
	</demo-block>
	
	<demo-block title="只读状态">
	  <w-rate
	    custom-class="rate-position"
			v-model="state.value6"
	    readonly
	  />
	</demo-block>
	
	<demo-block title="监听 change 事件">
	  <w-rate
	    custom-class="rate-position"
			v-model="state.value8"
	    @change="onChange"
	  />
	</demo-block>
	
	<w-toast ref="toastRef" />
</template>

<script setup>
import { reactive, ref } from 'vue'
import Toast from '@/uni_modules/want/components/utils/toast'

const state = reactive({
	value1: 3,
	value2: 3,
	value3: 3,
	value4: 2.5,
	value5: 4,
	value6: 3,
	value8: 2,
})
const toastRef = ref(null)

function onChange(event) {
	Toast({
		ref: toastRef.value,
		message: '当前值：' + event,
	});
}

</script>

<style>
.rate-position {
  margin-left: 15px;
}
</style>
