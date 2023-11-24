<template>
	<demo-block title="基础用法">
	  <w-cell-group>
	    <w-field v-model="state.value" placeholder="请输入用户名" :border="false" clearable />
	  </w-cell-group>
	</demo-block>
	
	<demo-block title="自定义类型">
	  <w-cell-group>
	    <w-field
				name="test"
	      v-model="state.username"
	      label="用户名"
	      placeholder="请输入用户名"
	      clearable
	      right-icon="question-o"
	      right-icon-class="custom-icon"
	      required
	      @click-icon="onClickIcon"
	    />
	    <w-field
	      v-model="state.password"
	      type="password"
	      label="密码"
	      placeholder="请输入密码"
	      required
	      :border="false"
	    />
	  </w-cell-group>
	</demo-block>
	
	<demo-block title="禁用输入框">
	  <w-cell-group>
	    <w-field
	      modelValue="输入框已禁用"
	      label="用户名"
	      left-icon="contact"
	      disabled
	      :border="false"
	    />
	  </w-cell-group>
	</demo-block>
	
	<demo-block title="错误提示">
	  <w-cell-group>
	    <w-field
	      v-model="state.username2"
	      label="用户名"
	      placeholder="请输入用户名"
	      error
	    />
	    <w-field
	      v-model="state.phone"
	      label="手机号"
	      placeholder="请输入手机号"
	      error-message="手机号格式错误"
	      :border="false"
	    />
	  </w-cell-group>
	</demo-block>
	
	<demo-block title="内容对齐方式">
	  <w-cell-group>
	    <w-field
	      v-model="state.username3"
	      label="用户名"
	      placeholder="请输入用户名"
	      input-align="right"
	    />
	  </w-cell-group>
	</demo-block>
	
	<demo-block title="高度自适应">
	  <w-cell-group>
	    <w-field
	      v-model="state.message"
	      label="留言"
	      type="textarea"
	      placeholder="请输入留言"
	      rows="1"
	      autosize
	      :border="false"
	    />
	  </w-cell-group>
	</demo-block>
	
	<demo-block title="插入按钮">
	  <w-cell-group>
	    <w-field
	      v-model="state.sms"
	      center
	      clearable
	      label="短信验证码"
	      placeholder="请输入短信验证码"
	      use-button-slot
	      :border="false"
	    >
				<template #button>
					<w-button size="small" type="primary" custom-class="button">发送验证码</w-button>
				</template>
	    </w-field>
	  </w-cell-group>
	</demo-block>
</template>

<script setup>
import { reactive } from 'vue';
const state = reactive({
	sms: '',
	value: '',
	password: '',
	username: '',
	username2: '',
	username3: '',
	message: '',
	phone: '1365577',
})

function onClickIcon() {
	uni.showToast({
		icon: 'none',
		title: '点击图标',
	});
}

</script>

<style>
.button {
	vertical-align: middle;
}

.custom-icon {
	color: #1989fa;
}
</style>
