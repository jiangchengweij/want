import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = [
  'update:modelValue',
  'change',
  'cancel',
  'search',
  'focus',
  'blur',
  'clear',
  'click-input'
] as const;

export const props = {
  modelValue: {
    type: String,
    default: ''
  },
  label: String,
  focus: Boolean,
  error: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  inputAlign: String,
  showAction: Boolean,
  useActionSlot: Boolean,
  useLeftIconSlot: Boolean,
  useRightIconSlot: Boolean,
  leftIcon: {
    type: String,
    default: 'search'
  },
  rightIcon: String,
  placeholder: String,
  placeholderStyle: String,
  actionText: {
    type: String,
    default: '取消'
  },
  background: {
    type: String,
    default: '#ffffff'
  },
  maxlength: {
    type: Number,
    default: -1
  },
  shape: {
    type: String,
    default: 'square'
  },
  clearable: {
    type: Boolean,
    default: true
  },
  clearTrigger: {
    type: String,
    default: 'focus'
  },
  clearIcon: {
    type: String,
    default: 'clear'
  },
  cursorSpacing: {
    type: Number,
    default: 0
  },
  customClass: null,
  fieldClass: null,
  inputClass: null,
  cancelClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { emit } = context;

  const onChange = (event: string) => {
    emit('change', event);
  };

  const onCancel = () => {
    /**
     * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
     * https://github.com/youzan/vant-weapp/issues/1768
     */
    setTimeout(() => {
      emit('update:modelValue', '');
      emit('cancel');
      emit('change', '');
    }, 200);
  };

  const onUpdateModelValue = (event) => {
    emit('update:modelValue', event);
  };

  const onSearch = (event) => {
    emit('search', event);
  };

  const onFocus = (event) => {
    emit('focus', event);
  };

  const onBlur = (event) => {
    emit('blur', event);
  };

  const onClear = (event) => {
    emit('clear', event);
  };

  const onClickInput = (event) => {
    emit('click-input', event);
  };

  return {
    bem,
    style,
    addUnit,
    onChange,
    onCancel,
    onUpdateModelValue,
    onSearch,
    onFocus,
    onBlur,
    onClear,
    onClickInput
  };
}
