import { computed, nextTick, reactive, watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { commonProps, inputProps, textareaProps } from '../common/mixins/input';
export const emits = [
  'update:modelValue',
  'input',
  'change',
  'linechange',
  'keyboardheightchange',
  'focus',
  'blur',
  'click-icon',
  'click-input',
  'clear',
  'confirm',
  'click'
];
export const props = Object.assign(
  Object.assign(
    Object.assign(Object.assign({}, commonProps), inputProps),
    textareaProps
  ),
  {
    size: String,
    icon: String,
    label: String,
    error: Boolean,
    center: Boolean,
    isLink: Boolean,
    leftIcon: String,
    rightIcon: String,
    autosize: null,
    required: Boolean,
    iconClass: String,
    clickable: Boolean,
    inputAlign: String,
    customStyle: String,
    errorMessage: String,
    arrowDirection: String,
    showWordLimit: Boolean,
    errorMessageAlign: String,
    readonly: {
      type: Boolean
    },
    clearable: {
      type: Boolean
    },
    clearTrigger: {
      type: String,
      default: 'focus'
    },
    border: {
      type: Boolean,
      default: true
    },
    titleWidth: {
      type: String,
      default: '6.2em'
    },
    clearIcon: {
      type: String,
      default: 'clear'
    },
    extraEventParams: {
      type: Boolean,
      default: false
    },
    customClass: String,
    inputClass: String,
    rightIconClass: String,
    labelClass: String
  }
);
export function setup(props, context) {
  const { emit, expose } = context;
  let _value = '',
    _focused = false;
  const state = reactive({
    focused: false,
    innerValue: props.modelValue,
    showClear: false
  });
  const inputStyle = computed(() => {
    const { autosize } = props;
    if (autosize && typeof autosize === 'object') {
      return style({
        'min-height': addUnit(autosize.minHeight),
        'max-height': addUnit(autosize.maxHeight)
      });
    }
    return '';
  });
  watch(
    () => [props.readonly, props.clearable],
    () => {
      setShowClear();
    }
  );
  watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal !== state.innerValue) {
        state.innerValue = newVal;
      }
    },
    { immediate: true }
  );
  const getFormatValue = (value) => {
    const { maxlength } = props;
    if (maxlength !== -1 && value.length > maxlength) {
      return value.slice(0, maxlength);
    }
    return value;
  };
  const onInput = (event) => {
    const { value = '' } = event.detail || {};
    const formatValue = getFormatValue(value);
    _value = formatValue;
    setShowClear();
    emitChange(
      Object.assign(Object.assign({}, event.detail), { value: formatValue })
    );
  };
  const onFocus = (event) => {
    _focused = true;
    setShowClear();
    emit('focus', event.detail);
  };
  const onBlur = (event) => {
    _focused = false;
    setShowClear();
    emit('blur', event.detail);
  };
  const onClickIcon = () => {
    emit('click-icon');
  };
  const onClickInput = (event) => {
    emit('click-input', event);
  };
  const onClick = (event) => {
    emit('click', event);
  };
  const onClear = () => {
    state.innerValue = '';
    _value = '';
    setShowClear();
    nextTick(() => {
      emitChange({ value: '' });
      emit('clear', '');
    });
  };
  const onConfirm = (event) => {
    const { value = '' } = event.detail;
    _value = value;
    setShowClear();
    emit('confirm', value);
  };
  const onLineChange = (event) => {
    emit('linechange', event.detail);
  };
  const onKeyboardHeightChange = (event) => {
    emit('keyboardheightchange', event.detail);
  };
  const setShowClear = () => {
    const { clearable, readonly, clearTrigger } = props;
    let showClear = false;
    if (clearable && !readonly) {
      const hasValue = !!_value;
      const tigger =
        clearTrigger === 'always' || (clearTrigger === 'focus' && _focused);
      showClear = hasValue && tigger;
    }
    state.showClear = showClear;
  };
  const emitChange = (detail) => {
    const { extraEventParams } = props;
    let result;
    emit('update:modelValue', detail.value);
    const data = extraEventParams
      ? Object.assign(Object.assign({}, detail), {
          callback: (data) => {
            result = data;
          }
        })
      : detail.value;
    emit('input', data);
    emit('change', data);
    return result;
  };
  const setValue = (value) => {
    _value = value;
    setShowClear();
    if (value === '') {
      state.innerValue = '';
    }
    emitChange({ value });
  };
  expose({
    setValue
  });
  return {
    bem,
    style,
    addUnit,
    state,
    inputStyle,
    onInput,
    onFocus,
    onBlur,
    onClickIcon,
    onClickInput,
    onClick,
    onClear,
    onConfirm,
    onLineChange,
    onKeyboardHeightChange
  };
}
