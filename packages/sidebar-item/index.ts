import { computed, ExtractPropTypes, reactive, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useParent } from '../common/utils/relation';

export const emits = ['click', 'change'] as const;
export const props = {
  dot: Boolean,
  badge: null,
  info: null,
  title: String,
  disabled: Boolean,
  index: Number,
  customClass: null,
  activeClass: null,
  disabledClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { emit, expose } = context;
  const state = reactive({
    selected: false
  });

  const { parent, index } = useParent('wanSidebar');

  const curIndex = computed(() => {
    return props.index != null ? props.index : index;
  });

  function onClick() {
    if (!parent || props.disabled) {
      return;
    }

    parent.exposed.setActive(curIndex.value).then(() => {
      emit('click', curIndex.value);
      parent.emit('change', curIndex.value);
    });
  }

  function setActive(selected: boolean) {
    state.selected = selected;
  }

  expose({
    setActive
  });

  return {
    bem,
    style,
    addUnit,
    state,
    onClick
  };
}
