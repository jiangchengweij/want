import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useChildren } from '../common/utils/relation';

export const emits = ['change'] as const;
export const props = {
  activeKey: {
    type: Number,
    default: 0
  },
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { expose } = context;

  let _currentActive = -1;

  const { children } = useChildren('wanSidebar', {
    onLink: () => {
      setActive(props.activeKey);
    },
    onUnLink: () => {
      setActive(props.activeKey);
    }
  });

  function setActive(activeKey: number) {
    if (!children.length) {
      return Promise.resolve();
    }

    const stack: Promise<unknown>[] = [];

    if (_currentActive !== activeKey && children[_currentActive]) {
      stack.push(children[_currentActive].exposed.setActive(false));
    }

    if (children[activeKey]) {
      stack.push(children[activeKey].exposed.setActive(true));
    }

    _currentActive = activeKey;

    return Promise.all(stack);
  }

  expose({
    setActive
  });

  return {
    bem,
    style,
    addUnit
  };
}
