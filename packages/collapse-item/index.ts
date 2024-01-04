import {
  ComponentInternalInstance,
  computed,
  ExtractPropTypes,
  onMounted,
  reactive,
  ref,
  SetupContext
} from 'vue';
import { bem, addUnit, style, getRect } from '../common/utils';
import { useParent } from '../common/utils/relation';

export const emits = ['click'] as const;
export const props = {
  size: String,
  name: null,
  title: null,
  value: null,
  icon: String,
  label: String,
  disabled: Boolean,
  clickable: Boolean,
  border: {
    type: Boolean,
    default: true
  },
  isLink: {
    type: Boolean,
    default: true
  },
  index: {
    type: Number
  },
  customClass: null,
  titleClass: String,
  contentClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(
  this: ComponentInternalInstance,
  props: Props,
  context: Context
) {
  const { parent, index } = useParent('wanCollapse');
  const { expose } = context;
  const state = reactive({
    expanded: false
  });

  const curIndex = computed(() => {
    return props.index != null ? props.index : index;
  });

  const animationData = ref({});

  const animationStyle = reactive({
    height: '0px'
  });

  let _mounted = false;

  onMounted(() => {
    _mounted = true;
    updateExpanded();
  });

  const animation = uni.createAnimation({
    duration: 0,
    timingFunction: 'ease-in-out'
  });

  const updateAnimation = (expanded: boolean, height: number) => {
    if (expanded) {
      if (height === 0) {
        animation.height('auto').top(1).step();
        animationData.value = animation.export();
        // #ifdef WEB || APP-PLUS
        animationStyle.height = 'auto';
        // #endif
      } else {
        animation
          .height(height)
          .top(1)
          .step({
            duration: _mounted ? 300 : 1
          });
        animationData.value = animation.export();
        setTimeout(
          () => {
            animation.height('auto').step();
            animationData.value = animation.export();
            // #ifdef WEB || APP-PLUS
            animationStyle.height = 'auto';
            // #endif
          },
          _mounted ? 300 : 1
        );
      }
      return;
    }
    animation.height(height).top(0).step({
      duration: 1
    });
    animationData.value = animation.export();

    setTimeout(() => {
      animation.height(0).step({ duration: 300 });
      animationData.value = animation.export();
      // #ifdef WEB || APP-PLUS
      animationStyle.height = '0px';
      // #endif
    }, 1);
  };
  const setContextAnimate = (context, expanded: boolean) => {
    getRect(context, '.wan-collapse-item__content')
      .then((rect) => rect.height!)
      .then((height: number) => {
        updateAnimation(expanded, height);
      });
  };

  const updateExpanded = () => {
    if (!parent) return;
    const { modelValue, accordion } = parent.proxy;
    const currentName = props.name == null ? curIndex.value : props.name;

    const expanded = accordion
      ? modelValue === currentName
      : (modelValue || []).some(
          (name: string | number) => name === currentName
        );

    if (expanded !== state.expanded) {
      setContextAnimate(this, expanded);
    }

    state.expanded = expanded;
  };

  const onClick = () => {
    if (props.disabled) {
      return;
    }

    const currentName = props.name == null ? curIndex.value : props.name;

    if (parent) {
      parent.exposed.toggle(currentName, !state.expanded);
    }
  };

  expose({
    updateExpanded
  });

  return {
    bem,
    style,
    addUnit,
    state,
    curIndex,
    onClick,
    animationStyle,
    animationData
  };
}
