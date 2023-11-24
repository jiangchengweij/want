<script lang="ts">
	/**
	 * Cascader 级联选择
	 * @description 级联选择框，用于多层级数据的选择，典型场景为省市区选择。
	 * @tutorial https://wei.jiangchengwei.io/cascader
	 * @property {String} title 顶部标题
	 * @property {String|Number} value 选中项的值
	 * @property {Array} options 可选项数据源
	 * @property {String} placeholder 未选中时的提示文案，默认 请选择
	 * @property {String} activeColor 选中状态的高亮颜色，默认 #1989fa
	 * @property {Boolean} swipeable 是否开启手势左右滑动切换，默认 false
	 * @property {Boolean} closeable 是否显示关闭图标，默认 true
	 * @property {Boolean} showHeader 是否展示标题栏，默认 true
	 * @property {String} closeIcon 关闭图标名称或图片链接，等同于 w-icon 组件的 name 属性，默认 cross
	 * @property {String} fieldNames 自定义 `options` 结构中的字段
	 * @property {String} customClass 根节点样式类
	 * @event {Function} change 选中项变化时触发
	 * @event {Function} finish 全部选项选择完成后触发
	 * @event {Function} close 点击关闭图标时触发
	 * @event {Function} clickTab 点击标签时触发
	 * @example @example <w-cascader :value="cascaderValue" title="请选择所在地区" :options="options" @close="onClose" @finish="onFinish" />
	 */
	export default {
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		}
	}
</script>
<template>
	<view class="w-cascader-host">
		<view v-if="showHeader" class="wan-cascader__header">
		  <text class="wan-cascader__title"><slot name="title"></slot>{{ title }}</text>
		  <w-icon
		    v-if="closeable"
		    :name="closeIcon"
		    class="wan-cascader__close-icon"
		    @tap="onClose"
		  />
		</view>
		
		<w-tabs
		  :active="state.activeTab"
		  custom-class="wan-cascader__tabs"
		  wrap-class="wan-cascader__tabs-wrap"
		  tab-class="wan-cascader__tab"
		  :color="activeColor"
		  :border="false"
		  :swipeable="swipeable"
		  @click="onClickTab"
		>
		  <w-tab
		    v-for="(tab, tabIndex) in state.tabs"
				:index="tabIndex"
		    :key="tabIndex"
		    :title="tab.selected ? tab.selected[state.textKey] : placeholder"
		    style="width: 100%;"
		    :title-style="!tab.selected ? 'color: #969799;font-weight:normal;' : ''"
		  >
		    <!-- 暂不支持 -->
		    <!-- <slot name="options-top"></slot> -->
		
		    <view class="wan-cascader__options">
		      <view
		        v-for="(option, index) in tab.options"
		        :key="index"
		        :class="[option.className, optionClass(tab, state.valueKey, option)]"
		        :style="optionStyle({ tab, valueKey: state.valueKey, option, activeColor })"
		        @tap="onSelect({ option, tabIndex })"
		      >
		        <text>{{ option[state.textKey] }}</text>
		        <w-icon v-if="isSelected(tab, state.valueKey, option)" name="success" size="18" />
		      </view>
		    </view>
		    <!-- 暂不支持 -->
		    <!-- <slot name="options-bottom"></slot> -->
		  </w-tab>
		</w-tabs>
	</view>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, toRaw, watch } from 'vue';
import { bem } from '../utils/bem'
import { style } from '../utils/style'
import { defaultFieldNames, ITab, FieldName } from './utils'

const emit = defineEmits(['change', 'finish', 'click-tab', 'close'])
const props = defineProps({
	title: String,
	value: {
		type: String,
	},
	placeholder: {
		type: String,
		default: '请选择',
	},
	activeColor: {
		type: String,
		default: '#1989fa',
	},
	options: {
		type: Array,
		default: [],
	},
	swipeable: {
		type: Boolean,
		default: false,
	},
	closeable: {
		type: Boolean,
		default: true,
	},
	showHeader: {
		type: Boolean,
		default: true,
	},
	closeIcon: {
		type: String,
		default: 'cross',
	},
	fieldNames: {
		type: Object,
		default: defaultFieldNames,
	},
})

const state = reactive({
	tabs: [] as ITab[],
	activeTab: 0,
	textKey: FieldName.TEXT,
	valueKey: FieldName.VALUE,
	childrenKey: FieldName.CHILDREN,
	innerValue: '',
})

watch(() => props.options, () => {
	updateTabs()
})

watch(() => props.value, () => {
	updateValue()
})

watch(() => props.fieldNames, () => {
	updateFieldNames()
}, { immediate: true })

onMounted(() => {
	updateValue()
})

function isSelected(tab, valueKey, option) {
  return tab.selected && tab.selected[valueKey] === option[valueKey]
}

function optionClass(tab, valueKey, option) {
  return bem('cascader__option', { selected: isSelected(tab, valueKey, option), disabled: option.disabled })
}

function optionStyle(data) {
  var color = data.option.color || (isSelected(data.tab, data.valueKey, data.option) ? data.activeColor : undefined);
  return style({
    color
  });	
}

function updateValue() {
	const val = props.value;
	if (val !== undefined) {
		const values = state.tabs.map(
			(tab: ITab) => tab.selected && tab.selected[state.valueKey]
		);
		if (values.indexOf(val) > -1) {
			return;
		}
	}

	state.innerValue = val;

	updateTabs();
}

function updateFieldNames() {
	const {
		text = 'text',
		value = 'value',
		children = 'children',
	} = props.fieldNames || defaultFieldNames;
	state.textKey = text
	state.valueKey = value
	state.childrenKey = children
}

function getSelectedOptionsByValue(options, value) {
	for (let i = 0; i < options.length; i++) {
		const option = options[i];

		if (option[state.valueKey] === value) {
			return [option];
		}

		if (option[state.childrenKey]) {
			const selectedOptions = getSelectedOptionsByValue(
				option[state.childrenKey],
				value
			);
			if (selectedOptions) {
				return [option, ...selectedOptions];
			}
		}
	}
}

function updateTabs() {
	const { options } = props;

	if (!options.length) {
		return;
	}

	if (state.innerValue !== undefined) {
		const selectedOptions = getSelectedOptionsByValue(
			options,
			state.innerValue
		);

		if (selectedOptions) {
			let optionsCursor = options;

			const tabs = selectedOptions.map((option) => {
				const tab = {
					options: optionsCursor,
					selected: option,
				};

				const next = optionsCursor.find(
					(item) => item[state.valueKey] === option[state.valueKey]
				);
				if (next) {
					optionsCursor = next[state.childrenKey];
				}

				return tab;
			});

			if (optionsCursor) {
				tabs.push({
					options: optionsCursor,
					selected: null,
				});
			}
			
			state.tabs = tabs

			nextTick(() => {
				state.activeTab = tabs.length - 1
			});

			return;
		}
	}

	state.tabs = [{ options, selected: null }]
}

function onClose() {
	emit('close');
}

function onClickTab(e) {
	const { index: tabIndex, title } = e;
	emit('click-tab', { title, tabIndex });
	state.activeTab = tabIndex;
}

function onSelect(e) {
	const { option, tabIndex } = e;

	if (option && option.disabled) {
		return;
	}

	const { valueKey, childrenKey } = toRaw(state);
	let { tabs } = toRaw(state);

	tabs[tabIndex].selected = option;

	if (tabs.length > tabIndex + 1) {
		tabs = tabs.slice(0, tabIndex + 1);
	}

	if (option[childrenKey]) {
		const nextTab = {
			options: option[childrenKey],
			selected: null,
		};

		if (tabs[tabIndex + 1]) {
			tabs[tabIndex + 1] = nextTab;
		} else {
			tabs.push(nextTab);
		}
		
		nextTick(() => {
			state.activeTab = tabIndex + 1
		})
	}
	
	state.tabs = tabs

	const selectedOptions = tabs.map((tab) => tab.selected).filter(Boolean);

	const value = option[valueKey];

	const params = {
		value,
		tabIndex,
		selectedOptions,
	};

	state.innerValue = value;

	emit('change', params);

	if (!option[childrenKey]) {
		emit('finish', params);
	}
}
</script>

<style lang="scss">
@import '../common/style/var.scss';

.wan-cascader {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $cascader-header-height;
    padding: $cascader-header-padding;
  }

  &__title {
    font-weight: 600;
    font-size: $cascader-title-font-size;
    line-height: $cascader-title-line-height;
  }

  &__close-icon {
    color: $cascader-close-icon-color;
    font-size: $cascader-close-icon-size;
    height: 22px;
  }

  &__tabs {
    ::v-deep &-wrap {
      padding: 0 8px;
      height: $cascader-tabs-height !important;
    }
  }

  ::v-deep &__tab {
    flex: none !important;
    padding: 0 8px !important;
    color: $cascader-tab-color !important;
    font-weight: 600 !important;

    &--unselected {
      color: $cascader-unselected-tab-color !important;
      font-weight: normal !important;
    }
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;

    &:active {
      background-color: #f2f3f5;
    }

    &--selected {
      color: $cascader-active-color;
      font-weight: 600;
    }

    &--disabled {
      color: $cascader-option-disabled-color;
      cursor: not-allowed;

      &:active {
        background-color: transparent;
      }
    }
  }

  &__options {
    box-sizing: border-box;
    height: $cascader-options-height;
    padding-top: 6px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
