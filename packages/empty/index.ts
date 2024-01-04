import { computed, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['click'] as const;
export const props = {
  description: String,
  image: {
    type: String,
    default: 'default'
  },
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props) {
  const PRESETS = ['error', 'search', 'default', 'network'];

  const imageUrl = computed(() => {
    const { image } = props;
    if (PRESETS.indexOf(image) !== -1) {
      return 'https://img.yzcdn.cn/vant/empty-image-' + image + '.png';
    }

    return image;
  });

  return {
    bem,
    style,
    addUnit,
    imageUrl
  };
}
