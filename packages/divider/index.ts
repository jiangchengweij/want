import { computed, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['click'] as const;
export const props = {
  dashed: Boolean,
  hairline: Boolean,
  contentPosition: String,
  fontSize: String,
  borderColor: String,
  textColor: String,
  customStyle: null,
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props) {
  const rootStyle = computed(() => {
    const { borderColor, textColor, fontSize, customStyle } = props;
    return style([
      {
        'border-color': borderColor,
        color: textColor,
        'font-size': addUnit(fontSize)
      },
      customStyle
    ]);
  });
  return {
    bem,
    style,
    addUnit,
    rootStyle
  };
}
