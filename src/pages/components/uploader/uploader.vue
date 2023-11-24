<template>
	<demo-block title="基础用法" padding>
	  <w-uploader
	    name="1"
	    :file-list="state.fileList1"
	    @after-read="afterRead"
	    @delete="deleteFile"
	    @click-preview="clickPreview"
	  />
	</demo-block>
	
	<demo-block title="上传视频" padding>
	  <w-uploader
	    name="7"
	    accept="video"
	    :file-list="state.fileList7"
	    @after-read="afterRead"
	    @delete="deleteFile"
	  />
	</demo-block>
	
	<demo-block title="文件预览" padding>
	  <w-uploader
	    name="2"
	    :file-list="state.fileList2"
	    multiple
	    @after-read="afterRead"
	    @delete="deleteFile"
	    @click-preview="clickPreview"
	  />
	</demo-block>
	
	<demo-block title="隐藏上传按钮" padding>
	  <w-uploader
	    name="2"
	    :file-list="state.fileList2"
	    multiple
	    :show-upload="false"
	    @after-read="afterRead"
	    @delete="deleteFile"
	    @click-preview="clickPreview"
	  />
	</demo-block>
	
	<demo-block title="上传状态" padding>
	  <w-uploader
	    name="8"
	    :file-list="state.fileList8"
	    multiple
	    :max-count="2"
	    @after-read="afterRead"
	    @delete="deleteFile"
	    @click-preview="clickPreview"
	  />
	</demo-block>
	
	<demo-block title="限制上传数量" padding>
	  <w-uploader
	    name="3"
	    :file-list="state.fileList3"
	    multiple
	    :max-count="2"
	    @after-read="afterRead"
	    @delete="deleteFile"
	    @click-preview="clickPreview"
	  />
	</demo-block>
	
	<demo-block title="自定义上传样式" padding>
	  <w-uploader
	    name="4"
	    :file-list="state.fileList4"
	    :max-count="2"
	    @after-read="afterRead"
	    @delete="deleteFile"
	    @click-preview="clickPreview"
	    use-slot="true"
	  >
	    <w-button icon="photo" type="primary">上传图片</w-button>
	  </w-uploader>
	</demo-block>
	
	<demo-block title="上传前校验" padding>
	  <w-uploader
	    name="5"
	    :file-list="state.fileList5"
	    @before-read="beforeRead"
	    @after-read="afterRead"
	    @delete="deleteFile"
	    @click-preview="clickPreview"
	    :use-before-read="true"
	  />
	</demo-block>
	
	<demo-block title="云存储上传" padding>
	  <w-uploader
	    name="6"
	    :file-list="state.fileList6"
	    @before-read="beforeRead"
	    @after-read="afterRead"
	    @delete="deleteFile"
	    @click-preview="clickPreview"
	    :use-before-read="true"
	  />
	  <view class="demo-margin-bottom">
	    <w-button type="primary" @click="uploadToCloud">上传至云存储</w-button>
	  </view>
	</demo-block>
</template>

<script setup>
import { reactive, toRaw } from 'vue';
const state = reactive({
	fileList1: [],
	fileList2: [
		{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
		{ url: 'https://img.yzcdn.cn/vant/tree.jpg' },
	],
	fileList3: [{ url: 'https://img.yzcdn.cn/vant/sand.jpg' }],
	fileList4: [],
	fileList5: [],
	fileList6: [],
	cloudPath: [],
	fileList7: [],
	fileList8: [
		{
			url: 'https://img.yzcdn.cn/vant/leaf.jpg',
			status: 'uploading',
			message: '上传中',
		},
		{
			url: 'https://img.yzcdn.cn/vant/tree.jpg',
			status: 'failed',
			message: '上传失败',
		},
	],
})

function beforeRead(event) {
	const { file, callback = () => {} } = event;
	if (file.url.indexOf('jpeg') < 0) {
		uni.showToast({ title: '请选择jpg图片上传', icon: 'none' });
		callback(false);
		return;
	}
	callback(true);
}

function afterRead(event) {
	const { file, name } = event;
	console.log(JSON.stringify(file, null, 2));
	const fileList = state[`fileList${name}`];
	
	state[`fileList${name}`] = fileList.concat(file)
}

function oversize() {
	uni.showToast({ title: '文件超出大小限制', icon: 'none' });
}

function deleteFile(event) {
	const { index, name } = event;
	const fileList = state[`fileList${name}`];
	fileList.splice(index, 1);
	console.log(fileList);
	state[`fileList${name}`] = fileList
}

function clickPreview() {
	
}

function uploadToCloud() {
	const { fileList6: fileList = [] } = toRaw(state);
	if (!fileList.length) {
		uni.showToast({ title: '请选择图片', icon: 'none' });
	} else {
		const uploadTasks = fileList.map((file, index) =>
			uploadFilePromise(`my-photo${index}.png`, file)
		);
		Promise.all(uploadTasks)
			.then((data) => {
				uni.showToast({ title: '上传成功', icon: 'none' });
				const fileList = data.map((item) => ({ url: item.fileID }));
				state.cloudPath = data;
				state.fileList6 = fileList;
			})
			.catch((e) => {
				uni.showToast({ title: '上传失败', icon: 'none' });
				console.log(e);
			});
	}
}

function uploadFilePromise(fileName, chooseResult) {
	return uniCloud.uploadFile({
		cloudPath: fileName,
		filePath: chooseResult.path,
	});
}
</script>

<style>
page {
	background-color: #fff;
}
</style>
