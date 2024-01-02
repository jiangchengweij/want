import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['select'] as const;
export const props = {
  options: {
    type: Array,
    default: () => []
  },
  showBorder: Boolean
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { emit } = context;
  const PRESET_ICONS = [
    'qq',
    'link',
    'weibo',
    'wechat',
    'poster',
    'qrcode',
    'weapp-qrcode',
    'wechat-moments'
  ];

  const getIconURL = (icon: string) => {
    if (PRESET_ICONS.indexOf(icon) !== -1) {
      return 'https://img.yzcdn.cn/vant/share-sheet-' + icon + '.png';
    }
    return icon;
  };

  const onSelect = (index: number) => {
    const option = props.options[index] as AnyObject;
    emit('select', { ...option, index });
  };
  return {
    bem,
    style,
    addUnit,
    getIconURL,
    onSelect
  };
}
