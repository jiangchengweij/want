<template>
  <demo-block title="基础用法">
    <wan-cell-group>
      <wan-field
        v-model="state.value"
        placeholder="请输入用户名"
        :border="false"
        clearable
      />
    </wan-cell-group>
  </demo-block>

  <demo-block title="自定义类型">
    <wan-cell-group>
      <wan-field
        v-model="state.username"
        name="test"
        label="用户名"
        placeholder="请输入用户名"
        clearable
        right-icon="question-o"
        right-icon-class="custom-icon"
        required
        @click-icon="onClickIcon"
      />
      <wan-field
        v-model="state.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :border="false"
      />
    </wan-cell-group>
  </demo-block>

  <demo-block title="禁用输入框">
    <wan-cell-group>
      <wan-field
        model-value="输入框已禁用"
        label="用户名"
        disabled
        :border="false"
      />
    </wan-cell-group>
  </demo-block>

  <demo-block title="错误提示">
    <wan-cell-group>
      <wan-field
        v-model="state.username2"
        label="用户名"
        placeholder="请输入用户名"
        error
      />
      <wan-field
        v-model="state.phone"
        label="手机号"
        placeholder="请输入手机号"
        error-message="手机号格式错误"
        :border="false"
      />
    </wan-cell-group>
  </demo-block>

  <demo-block title="内容对齐方式">
    <wan-cell-group>
      <wan-field
        v-model="state.username3"
        label="用户名"
        placeholder="请输入用户名"
        input-align="right"
      />
    </wan-cell-group>
  </demo-block>

  <demo-block title="高度自适应">
    <wan-cell-group>
      <wan-field
        v-model="state.message"
        label="留言"
        type="textarea"
        placeholder="请输入留言"
        rows="1"
        autosize
        :border="false"
      />
    </wan-cell-group>
  </demo-block>

  <demo-block title="插入按钮">
    <wan-cell-group>
      <wan-field
        v-model="state.sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        use-button-slot
        :border="false"
      >
        <template #button>
          <wan-button size="small" type="primary" custom-class="button"
            >发送验证码</wan-button
          >
        </template>
      </wan-field>
    </wan-cell-group>
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
  phone: '1365577'
});

function onClickIcon() {
  uni.showToast({
    icon: 'none',
    title: '点击图标'
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
