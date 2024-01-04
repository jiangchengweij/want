import { linkProps, linkSetup } from '../common/mixins/link';
import { computed } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { useParent } from '../common/utils/relation';
export const emits = ['click'];
export const props = Object.assign(Object.assign({}, linkProps), {
  icon: String,
  iconColor: String,
  iconPrefix: {
    type: String,
    default: 'wan-icon'
  },
  dot: Boolean,
  info: String,
  badge: String,
  text: String,
  index: {
    type: Number
  },
  useSlot: Boolean,
  customClass: null,
  contentClass: null,
  iconClass: null,
  textClass: null
});
export function setup(props, context) {
  const { emit } = context;
  const linkSetupReturn = linkSetup({ props });
  const { jumpLink } = linkSetupReturn;
  const { parent, index } = useParent('wanGrid');
  const square = computed(() => (parent ? parent.proxy.square : null));
  const gutter = computed(() => (parent ? parent.proxy.gutter : null));
  const direction = computed(() => (parent ? parent.proxy.direction : null));
  const center = computed(() => (parent ? parent.proxy.center : null));
  const reverse = computed(() => (parent ? parent.proxy.reverse : null));
  const border = computed(() => (parent ? parent.proxy.border : null));
  const clickable = computed(() => (parent ? parent.proxy.clickable : null));
  const iconSize = computed(() => (parent ? parent.proxy.iconSize : null));
  const curIndex = computed(() => {
    return props.index != null ? props.index : index;
  });
  const wrapperStyle = computed(() => {
    if (!parent) return {};
    const { columnNum, square, gutter } = parent.proxy;
    const width = 100 / columnNum + '%';
    return style({
      width: width,
      'padding-top': square ? width : null,
      'padding-right': addUnit(gutter),
      'margin-top':
        curIndex.value >= columnNum && !square ? addUnit(gutter) : null
    });
  });
  const contentStyle = computed(() => {
    if (!parent) return {};
    const { square, gutter } = parent.proxy;
    return square
      ? style({
          right: addUnit(gutter),
          bottom: addUnit(gutter),
          height: 'auto'
        })
      : '';
  });
  const onClick = () => {
    emit('click');
    jumpLink();
  };
  return {
    bem,
    style,
    addUnit,
    square,
    gutter,
    direction,
    center,
    reverse,
    border,
    clickable,
    iconSize,
    wrapperStyle,
    contentStyle,
    onClick
  };
}
