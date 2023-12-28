import { computed } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { linkProps, linkSetup } from '../common/mixins/link';
export const emits = ['click'];
export const props = {
  ...linkProps,
  title: String,
  value: [String, Object, Number],
  icon: String,
  size: String,
  label: String,
  center: Boolean,
  isLink: Boolean,
  required: Boolean,
  clickable: Boolean,
  titleWidth: String,
  customStyle: String,
  arrowDirection: String,
  useLabelSlot: Boolean,
  border: {
    type: Boolean,
    default: true
  },
  titleStyle: String,
  titleClass: [String, Array],
  labelClass: [String, Array],
  valueClass: [String, Array],
  rightIconClass: [String, Array],
  hoverClass: [String, Array],
  customClass: null
};
export const setup = (props, context) => {
  const { emit } = context;
  const linkSetupReturn = linkSetup({ props });
  const { jumpLink } = linkSetupReturn;
  const getTitleStyle = computed(() => {
    const { titleStyle, titleWidth } = props;
    return style([
      {
        maxWidth: addUnit(titleWidth),
        minWidth: addUnit(titleWidth)
      },
      titleStyle
    ]);
  });
  function onClick(event) {
    emit('click', event);
    jumpLink();
  }
  return {
    bem,
    style,
    addUnit,
    ...linkSetupReturn,
    getTitleStyle,
    onClick
  };
};
