import { computed, reactive } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useParent } from '../common/utils/relation';
export const emits = ['click', 'change'];
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
export function setup(props, context) {
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
  function setActive(selected) {
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
