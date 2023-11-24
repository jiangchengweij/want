<template>
	<demo-block title="单选模式">
	  <w-tree-select
	    :items="items"
	    :main-active-index="state.mainActiveIndex"
	    :active-id="state.activeId"
	    @click-item="onClickItem"
	    @click-nav="onClickNav"
	  ></w-tree-select>
	</demo-block>
	
	<demo-block title="多选模式">
	  <w-tree-select
	    :max="2"
	    :items="items"
	    :main-active-index="state.mainActiveIndexMulti"
	    :active-id="state.activeIdMulti"
	    @click-item="onClickItemMulti"
	    @click-nav="onClickNavMulti"
	  ></w-tree-select>
	</demo-block>
	
	<demo-block title="自定义内容">
	  <w-tree-select
	    :items="[{ text: '分组 1' }, { text: '分组 2' }]"
	    height="55vw"
	    :main-active-index="state.mainActiveIndex"
	    :active-id="state.activeId"
	    @click-item="onClickItem"
	    @click-nav="onClickNav"
	  >
			<!-- #ifdef WEB || APP-PLUS -->
			<template #content>
			<!-- #endif -->
				<w-image
					v-if="state.mainActiveIndex === 0"
					slot="content"
					src="https://img.yzcdn.cn/vant/apple-1.jpg"
					width="100%"
					height="100%"
				/>
				<w-image
					v-else-if="state.mainActiveIndex === 1"
					slot="content"
					src="https://img.yzcdn.cn/vant/apple-2.jpg"
					width="100%"
					height="100%"
				/>
			<!-- #ifdef WEB || APP-PLUS -->
			</template>
			<!-- #endif -->
	  </w-tree-select>
	</demo-block>
	
	<demo-block title="徽标提示">
	  <w-tree-select
	    :items="state.badgeItems"
	    :main-active-index="state.mainActiveIndex"
	    :active-id="state.activeId"
	    @click-item="onClickItem"
	    @click-nav="onClickNav"
	  ></w-tree-select>
	</demo-block>
</template>

<script setup>
import { reactive, toRaw } from 'vue';
const config = {
  pro1Name: '浙江',
  pro1: [
    {
      text: '杭州',
      id: 1,
    },
    {
      text: '温州',
      id: 2,
    },
    {
      text: '宁波',
      id: 3,
      disabled: true,
    },
    {
      text: '义乌',
      id: 4,
    },
  ],
  pro2Name: '江苏',
  pro2: [
    {
      text: '南京',
      id: 5,
    },
    {
      text: '无锡',
      id: 6,
    },
    {
      text: '徐州',
      id: 7,
    },
    {
      text: '苏州',
      id: 8,
    },
  ],
  pro3Name: '福建',
  pro3: [
    {
      text: '泉州',
      id: 9,
    },
    {
      text: '厦门',
      id: 10,
    },
  ],
};
const items = [
  {
    text: config.pro1Name,
    children: config.pro1,
  },
  {
    text: config.pro2Name,
    children: config.pro2,
  },
  {
    text: config.pro3Name,
    disabled: true,
    children: config.pro3,
  },
];

const state = reactive({
	items,
	badgeItems: items.slice(0, 2).map((item, index) => {
		if (index === 0) {
			return { ...item, dot: true };
		}
		if (index === 1) {
			return { ...item, badge: 5 };
		}

		return item;
	}),
	mainActiveIndex: 0,
	activeId: 0,
	mainActiveIndexMulti: 0,
	activeIdMulti: [],
})

function onClickNav(detail) {
	state.mainActiveIndex = detail.index || 0
}

function onClickItem(detail) {
	const activeId = state.activeId === detail.id ? null : detail.id;
	
	state.activeId = activeId
}

function onClickNavMulti(detail) {
	state.mainActiveIndexMulti = detail.index || 0;
}

function onClickItemMulti(detail) {
	const idx = state.activeIdMulti.indexOf(detail.id);
	if (idx > -1) {
		state.activeIdMulti.splice(idx, 1);
	} else {
		state.activeIdMulti.push(detail.id);
	}
}
</script>

<style>
</style>
