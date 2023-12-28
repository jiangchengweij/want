import { useChildren } from '../common/utils/relation';
import { computed, type ExtractPropTypes, type SetupContext } from 'vue';
import { bem, addUnit, style, toNumber } from '../common/utils';

export const emits = ['click'] as const;
export const props = {
  gutter: [Number, String]
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export const setup = (props: Props, context: Context) => {
  const { emit } = context;
  useChildren('wanRow');

  const rootStyle = computed(() => {
    const { gutter } = props;
    return {
      marginRight: addUnit(-toNumber(gutter) / 2),
      marginLeft: addUnit(-toNumber(gutter) / 2)
    };
  });

  function onClick(event) {
    emit('click', event);
  }
  return {
    bem,
    style,
    addUnit,
    rootStyle,
    onClick
  };
};
