import { computed, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import {
  props as buttonProps,
  emits as buttonEmits,
  setup as buttonSetup
} from '../common/mixins/button';
import { linkProps, linkSetup } from '../common/mixins/link';
import { useParent } from '../common/utils/relation';

export const emits = ['click', ...buttonEmits] as const;
export const props = {
  ...buttonProps,
  ...linkProps,
  text: String,
  color: String,
  size: {
    type: String,
    default: 'normal'
  },
  loading: Boolean,
  disabled: Boolean,
  plain: Boolean,
  type: {
    type: String,
    default: 'danger'
  },
  index: {
    type: Number
  },
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { emit } = context;
  const buttonSetupReturn = buttonSetup<Props, Context>(props, context);
  const { jumpLink } = linkSetup({ props });

  const { index, children } = useParent('wanAction');

  const onClick = (event) => {
    emit('click', event);
    jumpLink();
  };

  const curIndex = computed(() => {
    return props.index != null ? props.index : index;
  });

  const isFirst = computed(() => {
    return curIndex.value === 0;
  });

  const isLast = computed(() => {
    return curIndex.value === children.length - 1;
  });
  return {
    bem,
    style,
    addUnit,
    ...buttonSetupReturn,
    onClick,
    isFirst,
    isLast
  };
}
