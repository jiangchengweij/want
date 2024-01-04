var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { useChildren } from '../common/utils/relation';
import { onUnmounted, reactive, watch } from 'vue';
import {
  bem,
  addUnit,
  style,
  getSystemInfoSync,
  getRect
} from '../common/utils';
export const emits = ['click'];
export const props = {
  activeColor: {
    type: String
  },
  overlay: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
    default: 10
  },
  duration: {
    type: Number,
    default: 200
  },
  direction: {
    type: String,
    default: 'down'
  },
  safeAreaTabBar: {
    type: Boolean,
    default: false
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true
  },
  webOffsetTop: {
    type: null,
    default: 0
  },
  customClass: null,
  titleClass: null
};
const ARRAY = [];
export function setup(props, context) {
  const { expose } = context;
  watch(
    () => [
      props.activeColor,
      props.overlay,
      props.direction,
      props.direction,
      props.closeOnClickOverlay
    ],
    () => {
      updateChildrenData();
    },
    { deep: true }
  );
  const state = reactive({
    itemListData: []
  });
  const { children } = useChildren('wanDropdownItem', {
    onLink() {
      updateItemListData();
    },
    onUnLink() {
      updateItemListData();
    }
  });
  ARRAY.push(this);
  const { windowHeight } = getSystemInfoSync();
  onUnmounted(() => {
    const index = ARRAY.findIndex((item) => item === this);
    ARRAY.splice(index, 1);
  });
  function updateItemListData() {
    state.itemListData = children.map((child) => child.exposed.getData());
  }
  function updateChildrenData() {
    children.forEach((child) => {
      child.exposed.updateDataFromParent();
    });
  }
  function displayTitle(item) {
    if (item.title) {
      return item.title;
    }
    const match = item.options.filter(function (option) {
      return option.value === item.modelValue;
    });
    const displayTitle = match.length ? match[0].text : '';
    return displayTitle;
  }
  function toggleItem(active) {
    children.forEach((item, index) => {
      const { showPopup } = item.exposed.getData();
      if (index === active) {
        item.exposed.toggle();
      } else if (showPopup) {
        item.exposed.toggle(false, { immediate: true });
      }
    });
  }
  function close() {
    children.forEach((child) => {
      child.exposed.toggle(false, { immediate: true });
    });
  }
  const getChildWrapperStyle = () =>
    __awaiter(this, void 0, void 0, function* () {
      const { zIndex, direction, webOffsetTop } = props;
      return getRect(this, '.wan-dropdown-menu').then((rect) => {
        const { top = 0, bottom = 0 } = rect;
        const offset = direction === 'down' ? bottom : windowHeight - top;
        let wrapperStyle = `z-index: ${zIndex};`;
        if (direction === 'down') {
          // #ifdef WEB
          wrapperStyle += `top: calc(${addUnit(offset)} + ${addUnit(
            webOffsetTop
          )});`;
          // #endif
          // #ifndef WEB
          wrapperStyle += `top: ${addUnit(offset)};`;
          // #endif
        } else {
          // #ifdef WEB
          wrapperStyle += `bottom: calc(${addUnit(offset)} - ${addUnit(
            webOffsetTop
          )});`;
          // #endif
          // #ifndef WEB
          wrapperStyle += `bottom: ${addUnit(offset)};`;
          // #endif
        }
        return wrapperStyle;
      });
    });
  const onTitleTap = (index) => {
    const childData = children[index].exposed.getData();
    if (!childData.disabled) {
      ARRAY.forEach((menuItem) => {
        if (
          menuItem &&
          menuItem.proxy.closeOnClickOutside &&
          menuItem !== this
        ) {
          menuItem.exposed.close();
        }
      });
      toggleItem(index);
    }
  };
  expose({
    updateItemListData,
    getChildWrapperStyle,
    close
  });
  return {
    bem,
    style,
    addUnit,
    state,
    onTitleTap,
    displayTitle
  };
}
