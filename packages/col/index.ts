import { useParent } from '../common/utils/relation';
import {
  computed,
  inject,
  type ExtractPropTypes,
  type SetupContext
} from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['click'] as const;
export const props = {
  span: [Number, String],
  offset: [Number, String],
  customClass: String
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export const setup = (props: Props, context: Context) => {
  const { emit } = context;
  const { parent } = useParent('wanRow');

  const rootStyle = computed(() => {
    if (!parent) {
      return '';
    }
    const { gutter } = parent.proxy;
    return {
      paddingRight: addUnit(gutter / 2),
      paddingLeft: addUnit(gutter / 2)
    };
  });

  function onClick(event) {
    emit('click', event);
  }
  return {
    bem,
    style,
    addUnit,
    onClick,
    rootStyle
  };
};
