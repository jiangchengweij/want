import { onBeforeMount, onMounted, onUnmounted, reactive, watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { isSameSecond, parseFormat, parseTimeData } from '../common/utils/time';
export const emits = ['change', 'finish'];
export const props = {
  useSlot: Boolean,
  millisecond: Boolean,
  time: {
    type: Number,
    default: 0
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  autoStart: {
    type: Boolean,
    default: true
  }
};
export function setup(props, context) {
  const { emit, expose } = context;
  let _tid = null,
    _counting = false,
    _endTime = 0,
    _remain = 0;
  const state = reactive({
    timeData: parseTimeData(0),
    formattedTime: '0'
  });
  watch(
    () => props.time,
    () => {
      reset();
    }
  );
  onMounted(() => {
    reset();
  });
  onUnmounted(() => {
    if (_tid) {
      clearTimeout(_tid);
      _tid = null;
    }
  });
  // 开始
  const start = () => {
    if (_counting) {
      return;
    }
    _counting = true;
    _endTime = Date.now() + _remain;
    tick();
  };
  // 暂停
  const pause = () => {
    _counting = false;
    clearTimeout(_tid);
  };
  // 重置
  const reset = () => {
    pause();
    _remain = props.time;
    setRemain(_remain);
    if (props.autoStart) {
      start();
    }
  };
  const tick = () => {
    if (props.millisecond) {
      microTick();
    } else {
      macroTick();
    }
  };
  const microTick = () => {
    _tid = simpleTick(() => {
      setRemain(getRemain());
      if (_remain !== 0) {
        microTick();
      }
    });
  };
  const macroTick = () => {
    _tid = simpleTick(() => {
      const remain = getRemain();
      if (!isSameSecond(remain, _remain) || remain === 0) {
        setRemain(remain);
      }
      if (_remain !== 0) {
        macroTick();
      }
    });
  };
  const getRemain = () => {
    return Math.max(_endTime - Date.now(), 0);
  };
  const setRemain = (remain) => {
    _remain = remain;
    const timeData = parseTimeData(remain);
    if (props.useSlot) {
      emit('change', timeData);
    }
    state.formattedTime = parseFormat(props.format, timeData);
    if (remain === 0) {
      pause();
      emit('finish');
    }
  };
  const simpleTick = (fn) => {
    return setTimeout(fn, 30);
  };
  expose({
    start,
    pause,
    reset
  });
  return {
    bem,
    style,
    addUnit,
    state
  };
}
