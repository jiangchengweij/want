import { computed, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['close', 'click'] as const;
export const props = {
  size: String,
  mark: Boolean,
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  type: {
    type: String,
    default: 'default'
  },
  closeable: Boolean,
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { emit } = context;
  const rootStyle = computed(() => {
    const { plain, color, textColor } = props;
    return style({
      'background-color': plain ? '' : color,
      color: textColor || plain ? textColor || color : ''
    });
  });

  function onClose() {
    emit('close');
  }

  function onClick() {
    emit('click');
  }
  return {
    bem,
    style,
    addUnit,
    rootStyle,
    onClose,
    onClick
  };
}
