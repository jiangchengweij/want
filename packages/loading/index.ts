import { computed, type ExtractPropTypes } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const props = {
  color: String,
  vertical: Boolean,
  type: {
    type: String,
    default: 'circular'
  },
  size: String,
  textSize: String,
  customClass: String
};

type Props = ExtractPropTypes<typeof props>;

export const setup = (props: Props) => {
  const array12 = Array.from({ length: 12 });

  const spinnerStyle = computed(() => {
    const { color, size } = props;
    return style({
      color,
      width: addUnit(size),
      height: addUnit(size)
    });
  });

  return {
    bem,
    array12,
    style,
    spinnerStyle
  };
};
