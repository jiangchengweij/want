<template>
  <div class="van-doc-simulator">
    <!-- <iframe
      src="https://vant-contrib.gitee.io/vant/v2/mobile.html?weapp=1"
      frameborder="0"
      style="height: 640px"
    >
    </iframe> -->
  </div>
</template>
<script setup>
import { useData } from 'vitepress';
import { onMounted } from 'vue';
const { page, frontmatter } = useData();

onMounted(() => {
  console.log(page.value);
});
</script>
<style scoped>
.van-doc-simulator {
  background: #fafafa;
  border-radius: 20px;
  box-sizing: border-box;
  min-width: 360px;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 88px;
  width: 360px;
  z-index: 1;
}

.van-doc-simulator iframe {
  display: block;
  width: 100%;
}
</style>
