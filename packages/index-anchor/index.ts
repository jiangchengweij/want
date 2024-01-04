import {
  ComponentInternalInstance,
  ExtractPropTypes,
  reactive,
  SetupContext
} from 'vue';
import { bem, addUnit, style, getRect } from '../common/utils';
import { useParent } from '../common/utils/relation';

export const emits = ['click'] as const;
export const props = {
  useSlot: Boolean,
  index: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(
  this: ComponentInternalInstance,
  props: Props,
  context: Context
) {
  const { expose } = context;
  const { parent } = useParent('index-bar');

  const state = reactive({
    active: false,
    wrapperStyle: '',
    anchorStyle: ''
  });

  const scrollIntoView = (scrollTop: number) => {
    getRect(this, '.wan-index-anchor-wrapper').then((rect) => {
      uni.pageScrollTo({
        // #ifndef MP-ALIPAY
        duration: 0,
        // #endif
        scrollTop: scrollTop + rect.top! - parent!.proxy.stickyOffsetTop
      });
    });
  };

  function setState(opts) {
    if (!opts) {
      return;
    }
    Object.keys(opts).forEach((key) => {
      state[key] = opts[key];
    });
  }
  expose({
    scrollIntoView,
    setState
  });

  return {
    bem,
    style,
    addUnit,
    state
  };
}
