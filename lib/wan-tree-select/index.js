import { computed, onMounted, reactive, watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export const emits = ['click-item', 'click-nav'];
export const props = {
  items: {
    type: Array,
    default: () => []
  },
  activeId: null,
  mainActiveIndex: {
    type: Number,
    default: 0
  },
  height: {
    type: null,
    default: 300
  },
  max: {
    type: Number,
    default: 1000
  },
  selectedIcon: {
    type: String,
    default: 'success'
  },
  mainItemClass: null,
  contentItemClass: null,
  mainActiveClass: null,
  contentActiveClass: null,
  mainDisabledClass: null,
  contentDisabledClass: null
};
export function setup(props, context) {
  const { emit } = context;
  const state = reactive({
    subItems: []
  });
  watch(
    () => props.items,
    () => {
      updateSubItems();
    }
  );
  watch(
    () => props.mainActiveIndex,
    () => {
      updateSubItems();
    }
  );
  onMounted(() => {
    updateSubItems();
  });
  const isActive = computed(() => {
    const { activeId } = props;
    return (itemId) => {
      if (Array.isArray(activeId)) {
        return activeId.indexOf(itemId) > -1;
      }
      return activeId === itemId;
    };
  });
  // 当一个子项被选择时
  const onSelectItem = (item) => {
    const isArray = Array.isArray(props.activeId);
    // 判断有没有超出右侧选择的最大数
    const isOverMax = isArray && props.activeId.length >= props.max;
    // 判断该项有没有被选中, 如果有被选中，则忽视是否超出的条件
    const isSelected = isArray
      ? props.activeId.indexOf(item.id) > -1
      : props.activeId === item.id;
    if (!item.disabled && (!isOverMax || isSelected)) {
      emit('click-item', item);
    }
  };
  // 当一个导航被点击时
  const onClickNav = (event) => {
    const index = event;
    const item = props.items[index];
    if (!item.disabled) {
      emit('click-nav', { index });
    }
  };
  // 更新子项列表
  const updateSubItems = () => {
    const { items, mainActiveIndex } = props;
    const { children = [] } = items[mainActiveIndex] || {};
    state.subItems = children;
  };
  return {
    bem,
    style,
    addUnit,
    state,
    isActive,
    onSelectItem,
    onClickNav
  };
}
