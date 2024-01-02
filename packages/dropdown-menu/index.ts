import { useChildren } from '../common/utils/relation';
import {
  ComponentInternalInstance,
  ExtractPropTypes,
  onUnmounted,
  reactive,
  SetupContext,
  watch
} from 'vue';
import {
  bem,
  addUnit,
  style,
  getSystemInfoSync,
  getRect
} from '../common/utils';

export const emits = ['click'] as const;
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

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

const ARRAY: AnyObject = [];

export function setup(
  this: ComponentInternalInstance,
  props: Props,
  context: Context
) {
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
    itemListData: [] as Record<string, unknown>[]
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

  function toggleItem(active: number) {
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

  const getChildWrapperStyle = async () => {
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
  };

  const onTitleTap = (index: number) => {
    const childData = children[index].exposed.getData();

    if (!childData.disabled) {
      ARRAY.forEach((menuItem: AnyObject) => {
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
