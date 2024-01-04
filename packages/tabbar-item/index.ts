import { computed, ExtractPropTypes, reactive, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useParent } from '../common/utils/relation';

export const emits = ['click', 'change'] as const;
export const props = {
  info: null,
  name: null,
  icon: String,
  dot: Boolean,
  url: {
    type: String,
    default: ''
  },
  linkType: {
    type: String,
    default: 'redirectTo'
  },
  iconPrefix: {
    type: String,
    default: 'wan-icon'
  },
  index: Number,
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { expose, emit } = context;

  const state = reactive({
    active: false,
    activeColor: '',
    inactiveColor: ''
  });

  const { parent, index } = useParent('wanTabbar');

  const curIndex = computed(() => {
    return props.index != null ? props.index : index;
  });

  function onClick() {
    const { name, url, linkType } = props;

    if (parent) {
      const active = name || curIndex.value;

      if (active !== state.active) {
        parent.emit('change', active);
      }
    }

    if (url && uni[linkType]) {
      return uni[linkType]({ url });
    }

    emit('click');
  }

  function updateFromParent() {
    if (!parent) {
      return;
    }
    const { name } = props;

    const parentData = parent.proxy;

    const active = (name || index) === parentData.active;
    const patch: Record<string, unknown> = {};

    if (active !== state.active) {
      patch.active = active;
    }
    if (parentData.activeColor !== state.activeColor) {
      patch.activeColor = parentData.activeColor;
    }
    if (parentData.inactiveColor !== state.inactiveColor) {
      patch.inactiveColor = parentData.inactiveColor;
    }

    Object.keys(patch).forEach((key) => {
      state[key] = patch[key];
    });
  }

  expose({
    updateFromParent
  });

  return {
    bem,
    style,
    addUnit,
    state,
    onClick,
    updateFromParent
  };
}
