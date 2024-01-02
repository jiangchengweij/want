import { nextTick, onMounted, reactive, toRaw, watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export var FieldName;
(function (FieldName) {
  FieldName['TEXT'] = 'text';
  FieldName['VALUE'] = 'value';
  FieldName['CHILDREN'] = 'children';
})(FieldName || (FieldName = {}));
const defaultFieldNames = {
  text: FieldName.TEXT,
  value: FieldName.VALUE,
  children: FieldName.CHILDREN
};
export const emits = ['change', 'finish', 'click-tab', 'close'];
export const props = {
  title: String,
  value: {
    type: String
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  activeColor: {
    type: String,
    default: '#1989fa'
  },
  options: {
    type: Array,
    default: () => []
  },
  swipeable: {
    type: Boolean,
    default: false
  },
  closeable: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  closeIcon: {
    type: String,
    default: 'cross'
  },
  fieldNames: {
    type: Object,
    default: defaultFieldNames
  },
  customClass: null
};
export function setup(props, context) {
  const { emit } = context;
  const state = reactive({
    tabs: [],
    activeTab: 0,
    textKey: FieldName.TEXT,
    valueKey: FieldName.VALUE,
    childrenKey: FieldName.CHILDREN,
    innerValue: ''
  });
  watch(
    () => props.options,
    () => {
      updateTabs();
    }
  );
  watch(
    () => props.value,
    () => {
      updateValue();
    }
  );
  watch(
    () => props.fieldNames,
    () => {
      updateFieldNames();
    }
  );
  onMounted(() => {
    updateFieldNames();
    updateValue();
  });
  function isSelected(tab, valueKey, option) {
    return tab.selected && tab.selected[valueKey] === option[valueKey];
  }
  function optionClass(tab, valueKey, option) {
    return bem('cascader__option', {
      selected: isSelected(tab, valueKey, option),
      disabled: option.disabled
    });
  }
  const optionStyle = (data) => {
    const color =
      data.option.color ||
      (isSelected(data.tab, data.valueKey, data.option)
        ? data.activeColor
        : undefined);
    return style({
      color
    });
  };
  const updateValue = () => {
    const val = props.value;
    if (val !== undefined) {
      const values = state.tabs.map(
        (tab) => tab.selected && tab.selected[state.valueKey]
      );
      if (values.indexOf(val) > -1) {
        return;
      }
    }
    state.innerValue = val ?? '';
    updateTabs();
  };
  const updateFieldNames = () => {
    const {
      text = 'text',
      value = 'value',
      children = 'children'
    } = props.fieldNames || defaultFieldNames;
    state.textKey = text;
    state.valueKey = value;
    state.childrenKey = children;
  };
  const getSelectedOptionsByValue = (options, value) => {
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option[state.valueKey] === value) {
        return [option];
      }
      if (option[state.childrenKey]) {
        const selectedOptions = getSelectedOptionsByValue(
          option[state.childrenKey],
          value
        );
        if (selectedOptions) {
          return [option, ...selectedOptions];
        }
      }
    }
  };
  const updateTabs = () => {
    const { options } = props;
    if (!options.length) {
      return;
    }
    if (state.innerValue !== undefined) {
      const selectedOptions = getSelectedOptionsByValue(
        options,
        state.innerValue
      );
      if (selectedOptions) {
        let optionsCursor = options;
        const tabs = selectedOptions.map((option) => {
          const tab = {
            options: optionsCursor,
            selected: option
          };
          const next = optionsCursor.find(
            (item) => item[state.valueKey] === option[state.valueKey]
          );
          if (next) {
            optionsCursor = next[state.childrenKey];
          }
          return tab;
        });
        if (optionsCursor) {
          tabs.push({
            options: optionsCursor,
            selected: null
          });
        }
        state.tabs = tabs;
        nextTick(() => {
          state.activeTab = tabs.length - 1;
        });
        return;
      }
    }
    state.tabs = [{ options, selected: null }];
  };
  const onClose = () => {
    emit('close');
  };
  const onClickTab = (e) => {
    const { index: tabIndex, title } = e;
    emit('click-tab', { title, tabIndex });
    state.activeTab = tabIndex;
  };
  const onSelect = (e) => {
    const { option, tabIndex } = e;
    if (option && option.disabled) {
      return;
    }
    const { valueKey, childrenKey } = toRaw(state);
    let { tabs } = toRaw(state);
    tabs[tabIndex].selected = option;
    if (tabs.length > tabIndex + 1) {
      tabs = tabs.slice(0, tabIndex + 1);
    }
    if (option[childrenKey]) {
      const nextTab = {
        options: option[childrenKey],
        selected: null
      };
      if (tabs[tabIndex + 1]) {
        tabs[tabIndex + 1] = nextTab;
      } else {
        tabs.push(nextTab);
      }
      nextTick(() => {
        state.activeTab = tabIndex + 1;
      });
    }
    state.tabs = tabs;
    const selectedOptions = tabs.map((tab) => tab.selected).filter(Boolean);
    const value = option[valueKey];
    const params = {
      value,
      tabIndex,
      selectedOptions
    };
    state.innerValue = value;
    emit('change', params);
    if (!option[childrenKey]) {
      emit('finish', params);
    }
  };
  return {
    bem,
    style,
    addUnit,
    state,
    isSelected,
    optionClass,
    optionStyle,
    onClose,
    onClickTab,
    onSelect
  };
}
