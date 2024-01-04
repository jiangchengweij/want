import {
  ComponentInternalInstance,
  ExtractPropTypes,
  nextTick,
  PropType,
  reactive,
  SetupContext
} from 'vue';
import { bem, addUnit, style, getRect, isDef, throttle } from '../common/utils';
import { useChildren } from '../common/utils/relation';

export const emits = ['select'] as const;
export const props = {
  sticky: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
    default: 1
  },
  highlightColor: {
    type: String,
    default: '#07c160'
  },
  stickyOffsetTop: {
    type: Number,
    default: 0
  },
  indexList: {
    type: Array as PropType<AnyObject>,
    default: getIndexList()
  },
  webOffsetTop: {
    type: null,
    default: 0
  }
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

function getIndexList() {
  const indexList: string[] = [];
  const charCodeOfA = 'A'.charCodeAt(0);

  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }
  return indexList;
}

export function setup(
  this: ComponentInternalInstance & AnyObject,
  props: Props,
  context: Context
) {
  const { emit, expose } = context;
  const { children } = useChildren('index-bar', {
    onLink() {
      updateData();
    },
    onUnLink() {
      updateData();
    }
  });

  const state = reactive({
    activeAnchorIndex: null,
    showSidebar: false
  });

  let _scrollToAnchorIndex: number | null = null;
  let _scrollTop = 0;
  let _sidebar: AnyObject = {};
  let _timer: number | null = null;

  const updateData = () => {
    nextTick(() => {
      if (_timer != null) {
        clearTimeout(_timer);
        _timer = null;
      }

      _timer = setTimeout(() => {
        state.showSidebar = !!children.length;
        setRect().then(() => {
          onScroll();
        });
      }, 0);
    });
  };

  const setRect = () => {
    return Promise.all([setAnchorsRect(), setListRect(), setSiderbarRect()]);
  };

  const setAnchorsRect = () => {
    return Promise.all(
      children.map((anchor) =>
        getRect(anchor, '.wan-index-anchor-wrapper').then((rect) => {
          Object.assign(anchor, {
            height: rect.height,
            top: rect.top! + _scrollTop
          });
        })
      )
    );
  };

  const setListRect = async () => {
    return getRect(this, '.wan-index-bar').then((rect) => {
      if (!isDef(rect)) {
        return;
      }
      Object.assign(this, {
        height: rect.height,
        top: rect.top! + _scrollTop
      });
    });
  };

  const setSiderbarRect = async () => {
    return getRect(this, '.wan-index-bar__sidebar').then((res) => {
      if (!isDef(res)) {
        return;
      }
      _sidebar = {
        height: res.height,
        top: res.top
      };
    });
  };

  const setDiffData = ({ target, data }) => {
    target?.exposed?.setState(data);
  };

  const getAnchorRect = async (anchor) => {
    return getRect(anchor, '.wan-index-anchor-wrapper').then((rect) => ({
      height: rect.height,
      top: rect.top
    }));
  };

  const getActiveAnchorIndex = () => {
    const { sticky, stickyOffsetTop } = props;

    for (let i = children.length - 1; i >= 0; i--) {
      const preAnchorHeight = i > 0 ? children[i - 1].height : 0;
      const reachTop = sticky ? preAnchorHeight + stickyOffsetTop : 0;

      if (reachTop + _scrollTop >= children[i].top) {
        return i;
      }
    }

    return -1;
  };

  const onScroll = () => {
    if (!children.length) {
      return;
    }

    const { sticky, stickyOffsetTop, zIndex, highlightColor } = props;

    const active = getActiveAnchorIndex();

    setDiffData({
      target: this,
      data: {
        activeAnchorIndex: active
      }
    });

    if (sticky) {
      let isActiveAnchorSticky = false;

      if (active !== -1) {
        isActiveAnchorSticky =
          children[active].top <= stickyOffsetTop + _scrollTop;
      }

      children.forEach((item, index) => {
        if (index === active) {
          let wrapperStyle = '';
          let anchorStyle = `
            color: ${highlightColor};
          `;

          if (isActiveAnchorSticky) {
            wrapperStyle = `
              height: ${children[index].height}px;
            `;
            // #ifdef WEB
            anchorStyle = `
              position: fixed;
              top: calc(${stickyOffsetTop}px + ${addUnit(props.webOffsetTop)});
              z-index: ${zIndex};
              color: ${highlightColor};
            `;
            // #endif
            // #ifndef WEB
            anchorStyle = `
              position: fixed;
              top: ${stickyOffsetTop}px;
              z-index: ${zIndex};
              color: ${highlightColor};
            `;
            // #endif
          }

          setDiffData({
            target: item,
            data: {
              active: true,
              anchorStyle,
              wrapperStyle
            }
          });
        } else if (index === active - 1) {
          const currentAnchor = children[index];

          const currentOffsetTop = currentAnchor.top;
          const targetOffsetTop =
            index === children.length - 1 ? this.top : children[index + 1].top;

          const parentOffsetHeight = targetOffsetTop - currentOffsetTop;
          const translateY = parentOffsetHeight - currentAnchor.height;

          const anchorStyle = `
            position: relative;
            transform: translate3d(0, ${translateY}px, 0);
            z-index: ${zIndex};
            color: ${highlightColor};
          `;

          setDiffData({
            target: item,
            data: {
              active: true,
              anchorStyle
            }
          });
        } else {
          setDiffData({
            target: item,
            data: {
              active: false,
              anchorStyle: '',
              wrapperStyle: ''
            }
          });
        }
      });
    }
  };

  const onClick = (index: number) => {
    scrollToAnchor(index);
  };

  const onTouchMove = (event) => {
    const sidebarLength = children.length;
    const touch = event.touches[0];
    const itemHeight = _sidebar.height / sidebarLength;
    let index = Math.floor((touch.clientY - _sidebar.top) / itemHeight);

    if (index < 0) {
      index = 0;
    } else if (index > sidebarLength - 1) {
      index = sidebarLength - 1;
    }

    scrollToAnchor(index);
  };

  const onTouchStop = () => {
    _scrollToAnchorIndex = null;
  };

  const scrollToAnchor = (index) => {
    if (typeof index !== 'number' || _scrollToAnchorIndex === index) {
      return;
    }

    _scrollToAnchorIndex = index;

    const anchor = children.find(
      (item) => item.proxy.index === props.indexList[index]
    );

    if (anchor) {
      anchor.exposed.scrollIntoView(_scrollTop);
      emit('select', anchor.proxy.index);
    }
  };

  const onPageScroll = (event) => {
    _scrollTop = event?.scrollTop || 0;
    onScroll();
  };

  const setState = (opts: AnyObject) => {
    if (!opts) {
      return;
    }
    Object.keys(opts).forEach((key) => {
      state[key] = opts[key];
    });
  };

  expose({
    onPageScroll: throttle(onPageScroll, 100, {}),
    getAnchorRect,
    setState
  });
  return {
    bem,
    style,
    addUnit,
    state,
    onClick,
    onTouchMove,
    onTouchStop
  };
}
