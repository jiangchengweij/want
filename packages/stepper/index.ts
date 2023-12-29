import {
  computed,
  ExtractPropTypes,
  onMounted,
  reactive,
  SetupContext,
  watch
} from 'vue';
import { bem, addUnit, style, isDef } from '../common/utils';

export const emits = [
  'change',
  'blur',
  'focus',
  'overlimit',
  'update:modelValue',
  'plus',
  'minus'
] as const;

export const props = {
  modelValue: {
    type: null
  },
  integer: {
    type: Boolean
  },
  disabled: Boolean,
  inputWidth: String,
  buttonSize: String,
  asyncChange: Boolean,
  disableInput: Boolean,
  decimalLength: {
    type: Number,
    default: null as unknown as number
  },
  min: {
    type: null,
    default: 1
  },
  max: {
    type: null,
    default: Number.MAX_SAFE_INTEGER
  },
  step: {
    type: null,
    default: 1
  },
  showPlus: {
    type: Boolean,
    default: true
  },
  showMinus: {
    type: Boolean,
    default: true
  },
  disablePlus: Boolean,
  disableMinus: Boolean,
  longPress: {
    type: Boolean,
    default: true
  },
  focus: Boolean,
  theme: String,
  alwaysEmbed: Boolean,
  inputClass: null,
  plusClass: null,
  minusClass: null,
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

type EmitType = (typeof emits)[number];

const LONG_PRESS_START_TIME = 600;
const LONG_PRESS_INTERVAL = 200;

export function setup(props: Props, context: Context) {
  const { emit } = context;
  const state = reactive({
    innterValue: ''
  });

  let _type: EmitType = 'change',
    _longPressTimer = 0;

  watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal !== state.innterValue) {
        state.innterValue = format(newVal);
      }
    }
  );

  watch(
    () => [props.integer, props.decimalLength, props.min, props.max],
    () => {
      check();
    },
    { deep: true }
  );

  onMounted(() => {
    state.innterValue = format(props.modelValue);
    check();
  });

  const buttonStyle = computed(() => {
    return style({
      width: addUnit(props.buttonSize),
      height: addUnit(props.buttonSize)
    });
  });

  const inputStyle = computed(() => {
    return style({
      width: addUnit(props.inputWidth),
      height: addUnit(props.buttonSize)
    });
  });

  // add num and avoid float number
  const add = (num1: number, num2: number) => {
    const cardinal = 10 ** 10;
    return Math.round((num1 + num2) * cardinal) / cardinal;
  };

  const equal = (value1: number | string, value2: number | string) => {
    return String(value1) === String(value2);
  };

  const check = () => {
    const val = format(state.innterValue);
    if (!equal(val, state.innterValue!)) {
      state.innterValue = val;
    }
  };

  const isDisabled = (type: string) => {
    const { disabled, disablePlus, disableMinus, max, min } = props;

    if (type === 'plus') {
      return disabled || disablePlus || +state.innterValue! >= +max;
    }

    return disabled || disableMinus || +state.innterValue! <= +min;
  };

  const onFocus = (event) => {
    emit('focus', event.detail);
  };

  const onBlur = (event) => {
    const value = format(event.detail.value);

    state.innterValue = value;

    emitChange(value);

    emit('blur', {
      ...event.detail,
      value
    });
  };

  // filter illegal characters
  const filter = (value) => {
    value = String(value).replace(/[^0-9.-]/g, '');

    if (props.integer && value.indexOf('.') !== -1) {
      value = value.split('.')[0];
    }

    return value;
  };

  // limit value range
  const format = (value) => {
    value = filter(value);

    // format range
    value = value === '' ? 0 : +value;
    value = Math.max(Math.min(props.max, value), props.min);

    // format decimal
    if (isDef(props.decimalLength)) {
      value = value.toFixed(props.decimalLength);
    }

    return value;
  };

  const onInput = (event) => {
    const { value = '' } = event.detail || {};

    // allow input to be empty
    if (value === '') {
      return;
    }

    let formatted = filter(value);

    // limit max decimal length
    if (isDef(props.decimalLength) && formatted.indexOf('.') !== -1) {
      const pair = formatted.split('.');
      formatted = `${pair[0]}.${pair[1].slice(0, props.decimalLength)}`;
    }

    emitChange(formatted);
  };

  const emitChange = (value: string) => {
    if (!props.asyncChange) {
      state.innterValue = value;
    }
    emit('update:modelValue', value);
    emit('change', value);
  };

  const onChange = () => {
    if (isDisabled(_type)) {
      emit('overlimit', _type);
      return;
    }

    const diff = _type === 'minus' ? -props.step : +props.step;

    const value = format(add(+state.innterValue, diff));

    emitChange(value);
    emit(_type);
  };

  const longPressStep = () => {
    _longPressTimer = setTimeout(() => {
      onChange();
      longPressStep();
    }, LONG_PRESS_INTERVAL);
  };

  const onTap = (type: EmitType) => {
    _type = type;
    onChange();
  };

  const onTouchStart = (type: EmitType) => {
    if (!props.longPress) {
      return;
    }
    clearTimeout(_longPressTimer);

    _type = type;

    _longPressTimer = setTimeout(() => {
      onChange();
      longPressStep();
    }, LONG_PRESS_START_TIME);
  };

  const onTouchEnd = () => {
    if (!props.longPress) {
      return;
    }

    clearTimeout(_longPressTimer);
  };
  return {
    bem,
    style,
    addUnit,
    state,
    buttonStyle,
    inputStyle,
    onFocus,
    onBlur,
    onInput,
    onTap,
    onTouchStart,
    onTouchEnd
  };
}
