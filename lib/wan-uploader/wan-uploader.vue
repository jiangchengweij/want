<template>
  <view class="wan-uploader" :class="customClass || ''">
    <view class="wan-uploader__wrapper">
      <template v-if="previewImage">
        <!-- 预览样式 -->
        <view
          v-for="(item, index) in state.lists"
          :key="index"
          class="wan-uploader__preview"
          @tap="onClickPreview(index)"
        >
          <image
            v-if="item.isImage"
            :mode="imageFit"
            :src="item.thumb || item.url"
            :alt="item.name || '图片' + index"
            class="wan-uploader__preview-image"
            :style="sizeStyle"
            @dtap="onPreviewImage(index)"
          />
          <video
            v-else-if="item.isVideo"
            :src="item.url"
            :title="item.name || '视频' + index"
            :poster="item.thumb"
            :autoplay="item.autoplay"
            :object-fit="videoFit"
            class="wan-uploader__preview-image"
            :style="sizeStyle"
            @tap="onPreviewVideo"
          ></video>
          <view
            v-else
            class="wan-uploader__file"
            :style="sizeStyle"
            @tap="onPreviewFile(index)"
          >
            <wan-icon
              name="description"
              custom-class="wan-uploader__file-icon"
            />
            <view class="wan-uploader__file-name wan-ellipsis">{{
              item.name || item.url
            }}</view>
          </view>
          <view
            v-if="item.status === 'uploading' || item.status === 'failed'"
            class="wan-uploader__mask"
          >
            <wan-icon
              v-if="item.status === 'failed'"
              name="close"
              custom-class="wan-uploader__mask-icon"
            />
            <wan-loading v-else custom-class="wan-uploader__loading" />
            <text v-if="item.message" class="wan-uploader__mask-message">{{
              item.message
            }}</text>
          </view>
          <view
            v-if="deletable && item.deletable"
            class="wan-uploader__preview-delete"
            @tap.stop="deleteItem(index)"
          >
            <wan-icon
              name="cross"
              custom-class="wan-uploader__preview-delete-icon"
            />
          </view>
        </view>
      </template>

      <!-- 上传样式 -->
      <template v-if="state.isInCount">
        <view class="wan-uploader__slot" @tap="startUpload">
          <slot />
        </view>

        <!-- 默认上传样式 -->
        <view
          v-if="showUpload"
          class="wan-uploader__upload"
          :class="[disabled ? 'wan-uploader__upload--disabled' : '']"
          :style="sizeStyle"
          @tap="startUpload"
        >
          <wan-icon
            :name="uploadIcon"
            custom-class="wan-uploader__upload-icon"
          />
          <text v-if="uploadText" class="wan-uploader__upload-text">{{
            uploadText
          }}</text>
        </view>
      </template>
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
