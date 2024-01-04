import { bem, addUnit, style } from '../common/utils';
import { useChildren } from '../common/utils/relation';
export const emits = ['change'];
export const props = {
  activeKey: {
    type: Number,
    default: 0
  },
  customClass: null
};
export function setup(props, context) {
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
  function setActive(activeKey) {
    if (!children.length) {
      return Promise.resolve();
    }
    const stack = [];
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
