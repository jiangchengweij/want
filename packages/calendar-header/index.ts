import { ExtractPropTypes, reactive, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['click-subtitle'] as const;
export const props = {
  title: {
    type: String,
    default: '日期选择'
  },
  subtitle: String,
  showTitle: Boolean,
  showSubtitle: Boolean,
  firstDayOfWeek: {
    type: Number
  }
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(props: Props, context: Context) {
  const { emit } = context;

  const state = reactive({
    weekdays: [] as Array<string>
  });

  initWeekDay();

  function initWeekDay() {
    const defaultWeeks = ['日', '一', '二', '三', '四', '五', '六'];
    const firstDayOfWeek = props.firstDayOfWeek || 0;

    state.weekdays = [
      ...defaultWeeks.slice(firstDayOfWeek, 7),
      ...defaultWeeks.slice(0, firstDayOfWeek)
    ];
  }

  function onClickSubtitle(event) {
    emit('click-subtitle', event);
  }
  return {
    bem,
    style,
    addUnit,
    state,
    onClickSubtitle
  };
}
