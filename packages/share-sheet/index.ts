import { computed, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['click-overlay', 'cancel', 'select', 'close'] as const;
export const props = {
  // whether to show popup
  show: Boolean,
  // overlay custom style
  overlayStyle: String,
  // z-index
  zIndex: {
    type: Number,
    default: 100
  },
  title: String,
  cancelText: {
    type: String,
    default: '取消'
  },
  description: String,
  options: {
    type: Array,
    default: []
  },
  overlay: {
    type: Boolean,
    default: true
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  duration: {
    type: null,
    default: 300
  },
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { emit } = context;

  const isMulti = computed(() => {
    const { options } = props;
    if (options == null || options[0] == null) {
      return false;
    }

    return Array.isArray(options) && Array.isArray(options[0]);
  });

  const onClickOverlay = () => {
    emit('click-overlay');
  };

  const onCancel = () => {
    onClose();
    emit('cancel');
  };

  const onSelect = (event) => {
    emit('select', event);
  };

  const onClose = () => {
    emit('close');
  };
  return {
    bem,
    style,
    addUnit,
    isMulti,
    onClickOverlay,
    onCancel,
    onSelect,
    onClose
  };
}
