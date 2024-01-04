import { linkProps, linkSetup } from '../common/mixins/link';
import {
  ExtractPropTypes,
  onMounted,
  reactive,
  SetupContext,
  watch
} from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['click'] as const;
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

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props) {
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
