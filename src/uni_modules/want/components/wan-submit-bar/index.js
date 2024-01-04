import { onMounted, reactive, watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export const emits = ['submit'];
export const props = {
  tip: {
    type: null
  },
  tipIcon: String,
  type: Number,
  price: {
    type: null
  },
  label: String,
  loading: Boolean,
  disabled: Boolean,
  buttonText: String,
  currency: {
    type: String,
    default: '¥'
  },
  buttonType: {
    type: String,
    default: 'danger'
  },
  decimalLength: {
    type: Number,
    default: 2
  },
  suffixLabel: String,
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  barClass: null,
  priceClass: null,
  buttonClass: null,
  customClass: null
};
export function setup(props, context) {
  const { emit } = context;
  watch(
    () => props.tip,
    () => {
      updateTip();
    }
  );
  watch(
    () => [props.price, props.decimalLength],
    () => {
      updatePrice();
    },
    { deep: true }
  );
  onMounted(() => {
    updateTip();
    updatePrice();
  });
  const state = reactive({
    hasTip: false,
    hasPrice: false,
    integerStr: '',
    decimalStr: ''
  });
  function updatePrice() {
    const { price, decimalLength } = props;
    const priceStrArr =
      typeof price === 'number' &&
      (price / 100).toFixed(decimalLength).split('.');
    state.hasPrice = typeof price === 'number';
    state.integerStr = priceStrArr && priceStrArr[0];
    state.decimalStr = decimalLength && priceStrArr ? `.${priceStrArr[1]}` : '';
  }
  function updateTip() {
    state.hasTip = typeof props.tip === 'string';
  }
  function onSubmit(event) {
    emit('submit', event);
  }
  return {
    bem,
    style,
    addUnit,
    state,
    onSubmit
  };
}
