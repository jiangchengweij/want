<template>
  <view
    class="wan-config-provider"
    :class="[customClass || '']"
    :style="mapThemeVarsToCSSVars"
  >
    <slot />
  </view>
</template>
<script>
import { getCurrentInstance } from 'vue';
import { setup, props, emits } from './index';

/**
* ConfigProvider 全局配置
* description 用于配置 WeiUniApp 组件的主题样式
* @property {Object} themeVars 自定义主题变量 
* @property {String} customClass 根节点样式类
*/
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared'
  },
  props,
  emits: [...emits],
  setup(props, context) {
    const instance = getCurrentInstance();
    return setup.call(instance, props, context);
  }
};
</script>
<style lang="scss">
.wan-config-provider {
  /* #ifdef MP-ALIPAY */
  display: block;
  width: 100%;
  /* #endif */
}
</style>
