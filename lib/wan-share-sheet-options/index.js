import { bem, addUnit, style } from '../common/utils';
export const emits = ['select'];
export const props = {
  options: {
    type: Array,
    default: () => []
  },
  showBorder: Boolean
};
export function setup(props, context) {
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
  const getIconURL = (icon) => {
    if (PRESET_ICONS.indexOf(icon) !== -1) {
      return 'https://img.yzcdn.cn/vant/share-sheet-' + icon + '.png';
    }
    return icon;
  };
  const onSelect = (index) => {
    const option = props.options[index];
    emit('select', Object.assign(Object.assign({}, option), { index }));
  };
  return {
    bem,
    style,
    addUnit,
    getIconURL,
    onSelect
  };
}
