var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { nextTick, reactive } from 'vue';
import { bem, addUnit, style, getRect, isDef, throttle } from '../common/utils';
import { useChildren } from '../common/utils/relation';
export const emits = ['select'];
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
    type: Array,
    default: getIndexList()
  },
  webOffsetTop: {
    type: null,
    default: 0
  }
};
function getIndexList() {
  const indexList = [];
  const charCodeOfA = 'A'.charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }
  return indexList;
}
export function setup(props, context) {
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
  let _scrollToAnchorIndex = null;
  let _scrollTop = 0;
  let _sidebar = {};
  let _timer = null;
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
            top: rect.top + _scrollTop
          });
        })
      )
    );
  };
  const setListRect = () =>
    __awaiter(this, void 0, void 0, function* () {
      return getRect(this, '.wan-index-bar').then((rect) => {
        if (!isDef(rect)) {
          return;
        }
        Object.assign(this, {
          height: rect.height,
          top: rect.top + _scrollTop
        });
      });
    });
  const setSiderbarRect = () =>
    __awaiter(this, void 0, void 0, function* () {
      return getRect(this, '.wan-index-bar__sidebar').then((res) => {
        if (!isDef(res)) {
          return;
        }
        _sidebar = {
          height: res.height,
          top: res.top
        };
      });
    });
  const setDiffData = ({ target, data }) => {
    var _a;
    (_a = target === null || target === void 0 ? void 0 : target.exposed) ===
      null || _a === void 0
      ? void 0
      : _a.setState(data);
  };
  const getAnchorRect = (anchor) =>
    __awaiter(this, void 0, void 0, function* () {
      return getRect(anchor, '.wan-index-anchor-wrapper').then((rect) => ({
        height: rect.height,
        top: rect.top
      }));
    });
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
  const onClick = (index) => {
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
    _scrollTop =
      (event === null || event === void 0 ? void 0 : event.scrollTop) || 0;
    onScroll();
  };
  const setState = (opts) => {
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
