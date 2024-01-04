import { ExtractPropTypes, SetupContext, watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useChildren } from '../common/utils/relation';

export const emits = ['update:modelValue', 'open', 'close', 'change'] as const;
export const props = {
  modelValue: {
    type: null,
    required: true
  },
  accordion: {
    type: Boolean
  },
  border: {
    type: Boolean,
    default: true
  },
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { emit, expose } = context;
  const { children } = useChildren('wanCollapse');

  function updateExpanded() {
    children.forEach((child) => {
      child.exposed.updateExpanded();
    });
  }

  function toggle(name: string | number, expanded: boolean) {
    const { accordion, modelValue } = props;
    const changeItem = name;
    if (!accordion) {
      name = expanded
        ? (modelValue || []).concat(name)
        : (modelValue || []).filter(
            (activeName: string | number) => activeName !== name
          );
    } else {
      name = expanded ? name : '';
    }

    if (expanded) {
      emit('open', changeItem);
    } else {
      emit('close', changeItem);
    }

    emit('change', name);
    emit('update:modelValue', name);
  }

  watch(
    () => props.modelValue,
    () => {
      updateExpanded();
    }
  );

  watch(
    () => props.accordion,
    () => {
      updateExpanded();
    }
  );

  expose({
    toggle
  });

  return {
    bem,
    style,
    addUnit
  };
}
