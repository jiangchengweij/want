import { computed } from 'vue';
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
export const setup = (props) => {
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
    addUnit,
    style,
    array12,
    spinnerStyle
  };
};
