import { useParent } from '../common/utils/relation';
import { ExtractPropTypes, onMounted, reactive, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['click'] as const;
export const props = {
  dot: {
    type: Boolean
  },
  info: {
    type: [String, Number]
  },
  title: {
    type: String
  },
  disabled: {
    type: Boolean
  },
  titleStyle: {
    type: String
  },
  name: {
    type: String,
    default: ''
  },
  index: {
    type: Number
  },
  customClass: String
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { expose } = context;
  const state = reactive({
    active: false,
    shouldRender: false,
    shouldShow: false
  });

  const { parent, index } = useParent('wanTabs');

  let _inited = false;

  onMounted(() => {
    update();
  });

  function getComputedName() {
    if (props.name !== '') {
      return props.name;
    }
    return getIndex();
  }

  function updateRender(active: boolean) {
    const { lazyRender, animated } = parent!.proxy;
    _inited = _inited || active;
    state.active = active;
    state.shouldRender = _inited || !lazyRender;
    state.shouldShow = active || animated;
  }

  function update() {
    if (parent) {
      parent.exposed.updateTabs();
    }
  }

  function getIndex() {
    return props.index != null ? props.index : index;
  }

  expose({
    updateRender,
    getComputedName,
    active: state.active,
    inited: _inited,
    getIndex
  });

  return {
    bem,
    style,
    addUnit,
    getComputedName,
    updateRender,
    state
  };
}
