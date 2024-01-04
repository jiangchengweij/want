import { computed } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export const emits = ['close', 'click'];
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
export function setup(props, context) {
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
