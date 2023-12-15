import { computed, type ExtractPropTypes, type SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { linkProps, linkSetup } from '../common/mixins/link';

export const emits = ['click'] as const;
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

type Props = ExtractPropTypes<typeof props>;

type Context = SetupContext<CanWrite<typeof emits>>;

export const setup = (props: Props, context: Context) => {
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

  function onClick(event: TouchEvent) {
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
