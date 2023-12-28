<template>
  <wan-cell
    :size="size"
    :icon="leftIcon"
    :center="center"
    :border="border"
    :is-link="isLink"
    :required="required"
    :clickable="clickable"
    :title-width="titleWidth"
    title-style="margin-right: 12px;"
    :custom-style="customStyle"
    :arrow-direction="arrowDirection"
    :custom-class="(customClass || '') + ' wan-field'"
    @click="onClick"
  >
    <template #icon>
      <slot name="left-icon" />
    </template>
    <template v-if="label || $slots.label" #title>
      <label
        v-if="label"
        :for="name"
        :class="[labelClass || '', bem('field__label', { disabled })]"
      >
        {{ label }}
      </label>
      <slot v-else name="label"></slot>
    </template>
    <view :class="[bem('field__body', [type])]">
      <view
        :class="[bem('field__control', [inputAlign, 'custom'])]"
        @tap="onClickInput"
      >
        <slot name="input" />
      </view>

      <textarea
        v-if="type === 'textarea'"
        :id="name"
        :class="[
          bem('field__control', [
            inputAlign,
            type,
            { disabled, readonly, error }
          ]),
          inputClass || ''
        ]"
        :fixed="fixed"
        :focus="focus"
        :cursor="cursor"
        :value="state.innerValue"
        :auto-focus="autoFocus"
        :disabled="disabled || readonly"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :placeholder-class="bem('field__placeholder', { error, disabled })"
        :auto-height="!!autosize"
        :style="inputStyle"
        :cursor-spacing="cursorSpacing"
        :adjust-position="adjustPosition"
        :show-confirm-bar="showConfirmBar"
        :hold-keyboard="holdKeyboard"
        :selection-end="selectionEnd"
        :selection-start="selectionStart"
        :disable-default-padding="disableDefaultPadding"
        @input="onInput"
        @tap="onClickInput"
        @blur="onBlur"
        @focus="onFocus"
        @confirm="onConfirm"
        @linechange="onLineChange"
        @keyboardheightchange="onKeyboardHeightChange"
      />
      <input
        v-else
        :id="name"
        :class="[
          bem('field__control', [inputAlign, { disabled, readonly, error }]),
          inputClass || ''
        ]"
        :type="type"
        :focus="focus"
        :cursor="cursor"
        :value="state.innerValue"
        :auto-focus="autoFocus"
        :disabled="disabled || readonly"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :placeholder-class="bem('field__placeholder', { error })"
        :confirm-type="confirmType"
        :confirm-hold="confirmHold"
        :hold-keyboard="holdKeyboard"
        :cursor-spacing="cursorSpacing"
        :adjust-position="adjustPosition"
        :selection-end="selectionEnd"
        :selection-start="selectionStart"
        :always-embed="alwaysEmbed"
        :password="password || type === 'password'"
        @input="onInput"
        @tap="onClickInput"
        @blur="onBlur"
        @focus="onFocus"
        @confirm="onConfirm"
        @keyboardheightchange="onKeyboardHeightChange"
      />
      <view
        v-if="state.showClear"
        class="wan-field__clear-root wan-field__icon-root"
      >
        <view @touchstart.stop="onClear">
          <wan-icon :name="clearIcon" />
        </view>
      </view>
      <view class="wan-field__icon-container" @tap="onClickIcon">
        <view
          v-if="rightIcon || icon"
          class="wan-field__icon-root"
          :class="[iconClass]"
        >
          <wan-icon :name="rightIcon || icon" :custom-class="rightIconClass" />
        </view>
        <slot name="right-icon" />
        <slot name="icon" />
      </view>
      <view class="wan-field__button">
        <slot name="button" />
      </view>
    </view>
    <label
      v-if="showWordLimit && maxlength"
      :for="name"
      class="wan-field__word-limit"
    >
      <view
        :class="[
          bem('field__word-num', {
            full: state.innerValue.length >= maxlength
          })
        ]"
        >{{
          state.innerValue.length >= maxlength
            ? maxlength
            : state.innerValue.length
        }}</view
      >/{{ maxlength }}
    </label>
    <label
      v-if="errorMessage"
      :for="name"
      :class="[
        bem('field__error-message', [errorMessageAlign, { disabled, error }])
      ]"
    >
      {{ errorMessage }}
    </label>
  </wan-cell>
</template>
<script>
import { getCurrentInstance } from 'vue';
import { setup, props, emits } from './index';

export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared'
  },
  props,
  emits: [...emits],
  // #ifndef MP-ALIPAY
  behaviors: ['uni://form-field'],
  // #endif
  setup(props, context) {
    const instance = getCurrentInstance();
    return setup.call(instance, props, context);
  }
};
</script>
<style lang="scss">
@import './index.scss';
</style>
