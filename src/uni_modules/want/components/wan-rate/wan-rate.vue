<template>
  <view :class="[bem('rate'), customClass || '']" @touchmove="onTouchMove">
    <view
      v-for="(_, index) in state.innerCountArray"
      :key="index"
      :class="[bem('rate__item')]"
      :style="
        style({ paddingRight: index !== count - 1 ? addUnit(gutter) : null })
      "
    >
      <view
        :class="[
          bem('rate__icon', [{ disabled, full: index + 1 <= state.innerValue }])
        ]"
        :data-score="index"
        @click="onSelect({ score: index })"
      >
        <wan-icon
          :name="index + 1 <= state.innerValue ? icon : voidIcon"
          :style="style({ fontSize: addUnit(size) })"
          :custom-class="iconClass"
          :color="
            disabled
              ? disabledColor
              : index + 1 <= state.innerValue
                ? color
                : voidColor
          "
        />
      </view>
      <view
        v-if="allowHalf"
        :class="[
          bem('rate__icon', [
            'half',
            { disabled, full: index + 0.5 <= state.innerValue }
          ])
        ]"
        :data-score="index - 0.5"
        @click="onSelect({ score: index - 0.5 })"
      >
        <wan-icon
          :name="index + 0.5 <= state.innerValue ? icon : voidIcon"
          :style="style({ fontSize: addUnit(size) })"
          :custom-class="iconClass"
          :color="
            disabled
              ? disabledColor
              : index + 0.5 <= state.innerValue
                ? color
                : voidColor
          "
        />
      </view>
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
