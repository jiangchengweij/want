import { ExtractPropTypes, reactive, SetupContext, watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['click'] as const;
export const props = {
  row: {
    type: Number,
    default: 0
  },
  title: Boolean,
  avatar: Boolean,
  loading: {
    type: Boolean,
    default: true
  },
  animate: {
    type: Boolean,
    default: true
  },
  avatarSize: {
    type: String,
    default: '32px'
  },
  avatarShape: {
    type: String,
    default: 'round'
  },
  titleWidth: {
    type: String,
    default: '40%'
  },
  rowWidth: {
    type: null,
    default: '100%'
  },
  avatarClass: null,
  titleClass: null,
  rowClass: null,
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props) {
  const state = reactive({
    isArray: false,
    rowArray: []
  });

  watch(
    () => props.row,
    (value) => {
      state.rowArray = Array.from({ length: value });
    },
    {
      immediate: true
    }
  );

  watch(
    () => props.rowWidth,
    (val) => {
      state.isArray = val instanceof Array;
    },
    {
      immediate: true
    }
  );
  return {
    bem,
    style,
    addUnit,
    state
  };
}
