import { computed } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export const emits = ['click'];
export const props = {
  description: String,
  image: {
    type: String,
    default: 'default'
  },
  customClass: null
};
export function setup(props) {
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
