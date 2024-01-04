import { reactive } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export const emits = ['click-subtitle'];
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
export function setup(props, context) {
  const { emit } = context;
  const state = reactive({
    weekdays: []
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
