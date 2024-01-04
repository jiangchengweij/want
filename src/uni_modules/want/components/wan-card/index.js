import { linkProps, linkSetup } from '../common/mixins/link';
import { onMounted, reactive, watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export const emits = ['click'];
export const props = {
  ...linkProps,
  tag: String,
  num: String,
  desc: String,
  thumb: String,
  title: String,
  price: {
    type: String,
    default: ''
  },
  centered: Boolean,
  lazyLoad: Boolean,
  thumbLink: String,
  originPrice: String,
  thumbMode: {
    type: String,
    default: 'aspectFit'
  },
  currency: {
    type: String,
    default: '¥'
  },
  customClass: null,
  numClass: null,
  descClass: null,
  thumbClass: null,
  titleClass: null,
  priceClass: null,
  originPriceClass: null
};
export function setup(props) {
  const state = reactive({
    integerStr: '',
    decimalStr: ''
  });
  const { jumpLink } = linkSetup({ props });
  watch(
    () => props.price,
    () => {
      updatePrice();
    }
  );
  onMounted(() => {
    updatePrice();
  });
  const updatePrice = () => {
    const { price } = props;
    const priceArr = price.toString().split('.');
    state.integerStr = priceArr[0];
    state.decimalStr = priceArr[1] ? `.${priceArr[1]}` : '';
  };
  const onClickThumb = () => {
    const url = props.thumbLink;
    jumpLink(url);
  };
  return {
    bem,
    style,
    addUnit,
    state,
    onClickThumb
  };
}
