import {
  ComponentInternalInstance,
  ExtractPropTypes,
  onUnmounted,
  reactive,
  SetupContext
} from 'vue';
import { bem, addUnit, style, range } from '../common/utils';
import { useTouch } from '../common/utils/touch';

export const emits = ['open', 'close', 'click'] as const;
export const props = {
  disabled: Boolean,
  leftWidth: {
    type: Number,
    default: 0
  },
  rightWidth: {
    type: Number,
    default: 0
  },
  asyncClose: Boolean,
  name: {
    type: null,
    default: ''
  },
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

const ARRAY: AnyObject = [];

const THRESHOLD = 0.3;

export function setup(
  this: ComponentInternalInstance,
  props: Props,
  context: Context
) {
  const { emit, expose } = context;
  const { touchVar, touchMove, touchStart } = useTouch();
  let _offset = 0,
    _dragging = false,
    _startOffset = 0;

  ARRAY.push(this);

  const state = reactive({
    catchMove: false,
    wrapperStyle: ''
  });

  onUnmounted(() => {
    const index = ARRAY.findIndex((item) => item === this);
    ARRAY.splice(index, 1);
  });

  const open = (position: 'left' | 'right') => {
    const { leftWidth, rightWidth, name } = props;
    const offset = position === 'left' ? leftWidth : -rightWidth;
    swipeMove(offset);

    emit('open', {
      position,
      name: name
    });
  };

  const close = () => {
    swipeMove(0);
  };

  const swipeMove = (offset = 0) => {
    const { rightWidth, leftWidth } = props;
    _offset = range(offset, -rightWidth, leftWidth);

    const transform = `translate3d(${_offset}px, 0, 0)`;
    const transition = _dragging
      ? 'none'
      : 'transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
    state.wrapperStyle = `
		-webkit-transform: ${transform};
		-webkit-transition: ${transition};
		transform: ${transform};
		transition: ${transition};
	`;
  };

  const swipeLeaveTransition = () => {
    const { leftWidth, rightWidth } = props;

    if (rightWidth > 0 && -_offset > rightWidth * THRESHOLD) {
      open('right');
    } else if (leftWidth > 0 && _offset > leftWidth * THRESHOLD) {
      open('left');
    } else {
      swipeMove(0);
    }
    state.catchMove = false;
  };

  const startDrag = (event: TouchEvent) => {
    const { disabled } = props;
    if (disabled) {
      return;
    }

    _startOffset = _offset;
    touchStart(event);
  };

  const onDrag = (event: TouchEvent) => {
    const { disabled } = props;
    if (state.catchMove && disabled) {
      return;
    }

    touchMove(event);

    if (touchVar.direction !== 'horizontal') {
      return;
    }

    _dragging = true;

    ARRAY.filter(
      (item: AnyObject) => item !== this && item.offset !== 0
    ).forEach((item: AnyObject) => item.exposed.close());

    state.catchMove = true;
    swipeMove(_startOffset + touchVar.deltaX);
  };

  const endDrag = () => {
    const { disabled } = props;
    if (disabled) {
      return;
    }

    _dragging = false;
    swipeLeaveTransition();
  };

  const onClick = (position = 'outside') => {
    const { name, asyncClose } = props;

    emit('click', position);

    if (!_offset) {
      return;
    }

    if (asyncClose) {
      emit('close', {
        position,
        target: this,
        name
      });
    } else {
      swipeMove(0);
    }
  };
  expose({
    close
  });
  return {
    bem,
    style,
    addUnit,
    state,
    startDrag,
    onDrag,
    endDrag,
    onClick
  };
}
