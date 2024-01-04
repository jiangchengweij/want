import {
  ComponentInternalInstance,
  ExtractPropTypes,
  nextTick,
  reactive,
  SetupContext,
  watch
} from 'vue';
import { bem, addUnit, style, getRect } from '../common/utils';
import { useChildren } from '../common/utils/relation';

export const emits = ['change'] as const;
export const props = {
  active: {
    type: null
  },
  activeColor: {
    type: String
  },
  inactiveColor: {
    type: String
  },
  fixed: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: Boolean
  },
  border: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
    default: 1
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(
  this: ComponentInternalInstance,
  props: Props,
  context: Context
) {
  const { expose } = context;
  const state = reactive({
    height: 50
  });

  const { children } = useChildren('wanTabbar', {
    onLink: () => updateChildren(),
    onUnLink: () => updateChildren()
  });

  watch(
    () => [props.active, props.activeColor, props.inactiveColor],
    () => {
      updateChildren();
    },
    {
      deep: true
    }
  );

  watch(
    () => [props.fixed, props.placeholder],
    () => {
      setHeight();
    },
    {
      deep: true
    }
  );

  const updateChildren = () => {
    if (!Array.isArray(children) || !children.length) {
      return;
    }

    children.forEach((child) => child.exposed.updateFromParent());
  };

  const setHeight = () => {
    const { fixed, placeholder } = props;

    if (!fixed || !placeholder) {
      return;
    }

    nextTick(() => {
      getRect(this, '.wan-tabbar').then((res) => {
        state.height = res.height!;
      });
    });
  };

  expose({
    updateChildren
  });
  return {
    bem,
    style,
    addUnit,
    state
  };
}
