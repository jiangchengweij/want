import { computed, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useChildren } from '../common/utils/relation';

export const emits = ['click'] as const;
export const props = {
  square: {
    type: Boolean
  },
  gutter: {
    type: [Number, String],
    default: 0
  },
  clickable: {
    type: Boolean
  },
  columnNum: {
    type: [Number, String],
    default: 4
  },
  center: {
    type: Boolean,
    default: true
  },
  border: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String
  },
  iconSize: {
    type: String
  },
  reverse: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String
  }
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  useChildren('wanGrid');

  const rootStyle = computed(() => {
    return style({
      'padding-left': addUnit(props.gutter)
    });
  });

  return {
    bem,
    style,
    addUnit,
    rootStyle
  };
}
