import { bem, addUnit, style } from '../common/utils';
import {
  props as buttonProps,
  emits as buttonEmits,
  setup as buttonSetup
} from '../common/mixins/button';
export const emits = [
  ...buttonEmits,
  'getuserinfo',
  'cancel',
  'close',
  'click-overlay',
  'select'
];
export const props = Object.assign(Object.assign({}, buttonProps), {
  show: Boolean,
  title: String,
  cancelText: String,
  description: String,
  round: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
    default: 100
  },
  actions: {
    type: Array,
    default: []
  },
  overlay: {
    type: Boolean,
    default: true
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  closeOnClickAction: {
    type: Boolean,
    default: true
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  customClass: String,
  listClass: [String, Array]
});
export function setup(props, context) {
  const buttonSetupReturn = buttonSetup(props, context);
  const { emit } = context;
  function onSelect(item) {
    if (item.disabled || item.loading) return;
    const { closeOnClickAction } = props;
    if (item) {
      emit('select', item);
      if (closeOnClickAction) {
        onClose();
      }
      if (item.openType === 'getUserInfo') {
        // #ifdef MP-WEIXIN
        uni.getUserProfile({
          desc: item.getUserProfileDesc || '  ',
          complete: (userProfile) => {
            emit('getuserinfo', userProfile);
          }
        });
        // #endif
      }
    }
  }
  function onCancel() {
    emit('cancel');
  }
  function onClose() {
    emit('close');
  }
  function onClickOverlay() {
    emit('click-overlay');
    onClose();
  }
  return Object.assign(
    Object.assign({ bem, style, addUnit }, buttonSetupReturn),
    { onSelect, onCancel, onClose, onClickOverlay }
  );
}
