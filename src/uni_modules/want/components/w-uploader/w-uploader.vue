<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="wan-uploader">
	  <view class="wan-uploader__wrapper">
	    <!-- 预览样式 -->
	    <view
	      v-if="previewImage"
	      v-for="(item, index) in state.lists"
	      :key="index"
	      class="wan-uploader__preview"
	      @tap="onClickPreview(index)"
	    >
	      <image
	        v-if="item.isImage"
	        :mode="imageFit"
	        :src="item.thumb || item.url"
	        :alt="item.name || ('图片' + index)"
	        class="wan-uploader__preview-image"
	        :style="sizeStyle"
	        @dtap="onPreviewImage(index)"
	      />
	      <video
	        v-else-if="item.isVideo"
	        :src="item.url"
	        :title="item.name || ('视频' + index)"
	        :poster="item.thumb"
	        :autoplay="item.autoplay"
	        :object-fit="videoFit"
	        class="wan-uploader__preview-image"
	        :style="sizeStyle"
	        @tap="onPreviewVideo"
	      >
	      </video>
	      <view
	        v-else
	        class="wan-uploader__file"
	        :style="sizeStyle"
	        @tap="onPreviewFile(index)"
	      >
	        <w-icon name="description" class="wan-uploader__file-icon" />
	        <view class="wan-uploader__file-name wan-ellipsis">{{ item.name || item.url }}</view>
	      </view>
	      <view
	        v-if="item.status === 'uploading' || item.status === 'failed'"
	        class="wan-uploader__mask"
	      >
	       <w-icon v-if="item.status === 'failed'" name="close" class="wan-uploader__mask-icon" />
	       <w-loading v-else custom-class="wan-uploader__loading" />
	       <text v-if="item.message" class="wan-uploader__mask-message">{{ item.message }}</text>
	      </view>
	      <view
	        v-if="deletable && item.deletable"
	        class="wan-uploader__preview-delete"
	        @tap.stop="deleteItem(index)"
	      >
	        <w-icon name="cross" class="wan-uploader__preview-delete-icon" />
	      </view>
	    </view>
	
	    <!-- 上传样式 -->
	    <template v-if="state.isInCount">
	      <view class="wan-uploader__slot" @tap="startUpload">
	        <slot />
	      </view>
	
	      <!-- 默认上传样式 -->
	      <view
	        v-if="showUpload"
	        class="wan-uploader__upload"
					:class="[disabled ? 'wan-uploader__upload--disabled': '']"
	        :style="sizeStyle"
	        @tap="startUpload"
	      >
	        <w-icon :name="uploadIcon" class="wan-uploader__upload-icon" />
	        <text v-if="uploadText" class="wan-uploader__upload-text">{{ uploadText }}</text>
	      </view>
	    </template>
	  </view>
	</view>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, reactive, watch } from 'vue'
import { isImageFile, chooseFile, isVideoFile, File } from './utils'
import { imageProps, videoProps, mediaProps, messageFileProps } from './shared'
import { isBoolean, isPromise } from '../utils/validator'
import { style } from '../utils/style'
import { addUnit } from '../utils'

const emit = defineEmits(['error', 'before-read', 'oversize', 'after-read', 'delete', 'click-preview'])
const props = defineProps({
	disabled: Boolean,
	multiple: Boolean,
	uploadText: String,
	useBeforeRead: Boolean,
	afterRead: null,
	beforeRead: null,
	previewSize: {
		type: null,
		default: 80,
	},
	name: {
		type: null,
		default: '',
	},
	accept: {
		type: String,
		default: 'image',
	},
	fileList: {
		type: Array as PropType<any>,
		default: () => [],
	},
	maxSize: {
		type: Number,
		default: Number.MAX_VALUE,
	},
	maxCount: {
		type: Number,
		default: 100,
	},
	deletable: {
		type: Boolean,
		default: true,
	},
	showUpload: {
		type: Boolean,
		default: true,
	},
	previewImage: {
		type: Boolean,
		default: true,
	},
	previewFullImage: {
		type: Boolean,
		default: true,
	},
	videoFit: {
		type: String,
		default: 'contain',
	},
	imageFit: {
		type: String,
		default: 'scaleToFill',
	},
	uploadIcon: {
		type: String,
		default: 'photograph',
	},
	...imageProps,
	...videoProps,
	...mediaProps,
	...messageFileProps,
})

watch(() => props.fileList, () => {
	formatFileList()
}, { deep: true })

onMounted(() => {
	formatFileList()
})

const state = reactive({
	lists: [] as any[],
	isInCount: true,
})

const sizeStyle = computed(() => {
	return Array.isArray(props.previewSize) ? style({
		width: addUnit(props.previewSize[0]),
		height: addUnit(props.previewSize[1]),
	}) : style({
		width: addUnit(props.previewSize[0]),
		height: addUnit(props.previewSize[1]),
	})
})

function formatFileList() {
	const { fileList = [], maxCount } = props;
	const lists = fileList.map((item) => ({
		...item,
		isImage: isImageFile(item),
		isVideo: isVideoFile(item),
		deletable: isBoolean(item.deletable) ? item.deletable : true,
	}));
	state.lists = lists
	state.isInCount = lists.length < maxCount
}

function getDetail(index?: number) {
	return {
		name: props.name,
		index: index == null ? props.fileList.length : index,
	};
}

function startUpload() {
	const { maxCount, multiple, disabled } = props;

	if (disabled) return;

	chooseFile({ 
		...props,
		maxCount: maxCount - state.lists.length,
	})
		.then((res) => {
			onBeforeRead(multiple ? res : res[0]);
		})
		.catch((error) => {
			emit('error', error);
		});
}

function onBeforeRead(file: File) {
	const { beforeRead, useBeforeRead } = props;
	let res: boolean | Promise<void> = true;

	if (typeof beforeRead === 'function') {
		res = beforeRead(file, getDetail());
	}

	if (useBeforeRead) {
		res = new Promise<void>((resolve, reject) => {
			emit('before-read', {
				file,
				...getDetail(),
				callback: (ok: boolean) => {
					ok ? resolve() : reject();
				},
			});
		});
	}

	if (!res) {
		return;
	}

	if (isPromise(res)) {
		res.then((data: any) => onAfterRead(data || file));
	} else {
		onAfterRead(file);
	}
}

function onAfterRead(file) {
	const { maxSize, afterRead } = props;
	const oversize = Array.isArray(file)
		? file.some((item) => item.size > maxSize)
		: file.size > maxSize;

	if (oversize) {
		emit('oversize', { file, ...getDetail() });
		return;
	}

	if (typeof afterRead === 'function') {
		afterRead(file, getDetail());
	}

	emit('after-read', { file, ...getDetail() });
}

function deleteItem(index: number) {

	emit('delete', {
		...getDetail(index),
		file: props.fileList[index],
	});
}

function onPreviewImage(index: number) {
	if (!props.previewFullImage) return;

	const { showmenu } = props;
	const item = state.lists[index];

	uni.previewImage({
		urls: state.lists.filter((item) => isImageFile(item)).map((item) => item.url),
		current: item.url,
		showmenu,
		fail() {
			wx.showToast({ title: '预览图片失败', icon: 'none' });
		},
	});
}

function onPreviewVideo(index: number) {
	if (!props.previewFullImage) return;

	const sources: any[] = [];

	const current = state.lists.reduce((sum, cur, curIndex) => {
		if (!isVideoFile(cur)) {
			return sum;
		}

		sources.push({ ...cur, type: 'video' });

		if (curIndex < index) {
			sum++;
		}

		return sum;
	}, 0);

	uni.previewMedia({
		sources,
		current,
		fail() {
			uni.showToast({ title: '预览视频失败', icon: 'none' });
		},
	});
}

function onPreviewFile(index: number) {
	uni.openDocument({
		filePath: state.lists[index].url,
		showMenu: true,
	});
}

function onClickPreview(index: number) {
	const item: File = state.lists[index];

	emit('click-preview', {
		...item,
		...getDetail(index),
	});
}

</script>

<style lang="scss">
@import './style.scss';
</style>
