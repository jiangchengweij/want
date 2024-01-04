<template>
  <view
    :class="[
      bem('search', { withaction: showAction || useActionSlot }),
      customClass || ''
    ]"
    :style="{ background: background }"
  >
    <view :class="[bem('search__content', [shape])]">
      <view v-if="label" class="wan-search__label">{{ label }}</view>
      <slot v-else name="label" />
      <view class="wan-search__field">
        <wan-field
          type="search"
          :left-icon="!useLeftIconSlot ? leftIcon : ''"
          :right-icon="!useRightIconSlot ? rightIcon : ''"
          :focus="focus"
          :error="error"
          :border="false"
          confirm-type="search"
          :class="[fieldClass]"
          :model-value="modelValue"
          :disabled="disabled"
          :readonly="readonly"
          :clearable="clearable"
          :clear-trigger="clearTrigger"
          :clear-icon="clearIcon"
          :maxlength="maxlength"
          :input-align="inputAlign"
          :input-class="inputClass || ''"
          :placeholder="placeholder"
          :placeholder-style="placeholderStyle"
          :cursor-spacing="cursorSpacing"
          custom-style="padding: 5px 10px 5px 0; background-color: transparent;"
          @blur="onBlur"
          @focus="onFocus"
          @change="onChange"
          @confirm="onSearch"
          @clear="onClear"
          @click-input="onClickInput"
          @update:model-value="onUpdateModelValue"
        >
          <template v-if="useLeftIconSlot" #left-icon>
            <slot name="left-icon" />
          </template>
          <template v-if="useRightIconSlot" #right-icon>
            <slot name="right-icon" />
          </template>
        </wan-field>
      </view>
    </view>

    <view
      v-if="showAction || useActionSlot"
      class="wan-search__action"
      hover-class="wan-search__action--hover"
      hover-stay-time="70"
    >
      <slot v-if="useActionSlot" name="action" />
      <view
        v-else
        class="wan-search__action-button"
        :class="cancelClass"
        @tap="onCancel"
        >{{ actionText }}</view
      >
    </view>
  </view>
</template>
<script>
import { getCurrentInstance } from 'vue';
import { setup, props, emits } from './index';

export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared'
  },
  // #ifndef MP-ALIPAY
  behaviors: ['uni://form-field'],
  // #endif
  props,
  emits: [...emits],
  setup(props, context) {
    const instance = getCurrentInstance();
    return setup.call(instance, props, context);
  }
};
</script>
<style lang="scss">
@import './index.scss';
</style>
