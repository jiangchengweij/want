<template>
  <demo-block title="默认主题">
    <wan-cell-group>
      <wan-field label="评分">
        <template #input>
          <view style="width: 100%">
            <wan-rate v-model="state.rate" @change="onChange('rate', $event)" />
          </view>
        </template>
      </wan-field>
      <wan-field label="滑块" :border="false">
        <template #input>
          <view style="width: 100%">
            <wan-slider
              v-model="state.slider"
              @change="onChange('slider', $event)"
            />
          </view>
        </template>
      </wan-field>
    </wan-cell-group>
    <view style="margin: 16px">
      <wan-button round block type="primary">提交</wan-button>
    </view>
  </demo-block>

  <demo-block title="定制主题">
    <wan-config-provider :theme-vars="state.themeVars">
      <wan-cell-group>
        <wan-field label="评分">
          <template #input>
            <view style="width: 100%">
              <wan-rate
                v-model="state.rate"
                @change="onChange('rate', $event)"
              />
            </view>
          </template>
        </wan-field>
        <wan-field label="滑块" :border="false">
          <template #input>
            <view style="width: 100%">
              <wan-slider
                v-model="state.slider"
                @change="onChange('slider', $event)"
              />
            </view>
          </template>
        </wan-field>
      </wan-cell-group>

      <view style="margin: 16px">
        <wan-button round block type="primary">提交</wan-button>
      </view>
    </wan-config-provider>
  </demo-block>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
  rate: 4,
  slider: 50,
  themeVars: {
    rateIconFullColor: '#07c160',
    sliderBarHeight: '4px',
    sliderButtonWidth: '20px',
    sliderButtonHeight: '20px',
    sliderActiveBackgroundColor: '#07c160',
    buttonPrimaryBorderColor: '#07c160',
    buttonPrimaryBackgroundColor: '#07c160'
  }
});

function onChange(key, event) {
  state[key] = event;
}
</script>

<style></style>
