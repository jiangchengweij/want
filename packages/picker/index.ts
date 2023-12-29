import {
  ComponentInternalInstance,
  computed,
  ExtractPropTypes,
  nextTick,
  onMounted,
  PropType,
  reactive,
  SetupContext,
  unref,
  watch
} from 'vue';
import { bem, addUnit, style, isObj, range, deepClone } from '../common/utils';
import { pickerProps } from '../common/mixins/picker';

interface Column {
  values: number[];
  defaultIndex: number;
}

export const emits = ['change', 'cancel', 'confirm'] as const;
export const props = {
  ...pickerProps,
  valueKey: {
    type: String,
    default: 'text'
  },
  toolbarPosition: {
    type: String,
    default: 'top'
  },
  defaultIndex: {
    type: Number,
    default: 0
  },
  columns: {
    type: Array as PropType<Column[]>,
    default: () => []
  },
  activeClass: null,
  toolbarClass: null,
  columnClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export function setup(
  this: ComponentInternalInstance,
  props: Props,
  context: Context
) {
  const { emit, expose } = context;
  let _simple = null;

  const state = reactive<{
    pickerValues: number[];
    columns: Column[];
  }>({
    pickerValues: [],
    columns: []
  });

  watch(
    () => props.columns,
    () => {
      updateColumns();
    }
  );

  onMounted(() => {
    updateColumns();
    setDefaultValue();
  });

  const optionText = computed(() => {
    const { valueKey } = props;
    return (option: AnyObject) => {
      return isObj(option) && option[valueKey] ? option[valueKey] : option;
    };
  });

  const columnsStyle = computed(() => {
    const { itemHeight, visibleItemCount } = props;
    return style({
      height: addUnit(itemHeight * visibleItemCount)
    });
  });

  const frameStyle = computed(() => {
    const { itemHeight } = props;
    return style({
      height: addUnit(itemHeight)
    });
  });

  const updateColumns = () => {
    const { columns } = props;
    setColumns(columns);
  };

  const setDefaultValue = () => {
    const defaultIndexs = state.columns.map((column) =>
      column.defaultIndex > 0 ? column.defaultIndex : 0
    );
    setIndexes(defaultIndexs);
  };

  const setColumns = (columns) => {
    _simple = columns.length && !columns[0].values;
    let tempColumns = deepClone(columns);
    if (!Array.isArray(columns)) {
      tempColumns = [];
    }
    if (columns.length && !columns[0].values) {
      tempColumns = [{ values: columns }];
    }
    state.columns = tempColumns;
  };

  const emitEvent = (type) => {
    if (_simple) {
      emit(type, {
        value: getValues()[0],
        index: getIndexes()[0]
      });
    } else {
      emit(type, {
        value: getValues(),
        index: getIndexes()
      });
    }
  };

  const onChange = (event) => {
    const { value } = event.detail;
    const changeIndex = getChangeIndex(value);
    setIndexes(value).then(() => {
      const values = getValues();
      if (_simple) {
        emit('change', {
          picker: this.exposed,
          value: values[0],
          index: changeIndex
        });
      } else {
        emit('change', {
          picker: this.exposed,
          value: getValues(),
          index: changeIndex
        });
      }
    });
  };

  const getChangeIndex = (values) => {
    if (_simple) {
      return 0;
    }
    if (state.pickerValues.length < 1) {
      return values.findIndex((item: number) => item > 0);
    }
    return values.findIndex((item: number, index) => {
      if (index < state.pickerValues.length) {
        return item != state.pickerValues[index];
      }
      return false;
    });
  };

  // set options of column by index
  const setColumnValues = (
    index: number,
    options: number[],
    needReset = true
  ) => {
    if (index >= state.columns.length) {
      return Promise.reject(new Error('setColumnValues: 对应列不存在'));
    }

    const isSame =
      JSON.stringify(state.columns[index].values) === JSON.stringify(options);

    if (isSame) {
      return Promise.resolve();
    }
    state.columns[index].values = options;
    return nextTick(() => {
      if (needReset) {
        state.pickerValues[index] = 0;
        state.pickerValues = [...state.pickerValues];
      }
    });
  };

  // get values of all columns
  const getValues = () => {
    return state.pickerValues.map(
      (curIndex, ind) => state.columns[ind].values[curIndex]
    );
  };

  // set values of all columns
  const setValues = (values: number[]) => {
    const tempIndexs: number[] = [];
    values.forEach((val, index) => {
      if (index < state.columns.length) {
        let indexVal = state.columns[index].values.findIndex(
          (item) => item === val
        );
        indexVal = indexVal >= 0 ? indexVal : 0;
        tempIndexs.push(indexVal);
      }
    });
    setIndexes(tempIndexs);
  };

  // get indexes of all columns
  const getIndexes = () => {
    return [...unref(state.pickerValues)];
  };

  // set indexes of all columns
  const setIndexes = (indexes: number[]) => {
    const tempIndexs = indexes.map((ind, clumnIndex) => {
      const count = state.columns[clumnIndex].values.length;
      const index = range(ind, 0, count);
      for (let i = index; i < count; i++) {
        if (!isDisabled(state.columns[clumnIndex].values[i])) return i;
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!isDisabled(state.columns[clumnIndex].values[i])) return i;
      }
      return ind;
    });
    //手动出发pickerValues值变化
    //state.pickerValues = [];
    return nextTick(() => {
      state.pickerValues = tempIndexs;
    });
  };

  const isDisabled = (option) => {
    return isObj(option) && option.disabled;
  };

  expose({
    setColumns,
    setIndexes,
    getIndexes,
    getValues,
    setValues,
    setColumnValues
  });
  return {
    bem,
    style,
    addUnit,
    state,
    onChange,
    optionText,
    columnsStyle,
    frameStyle,
    emitEvent
  };
}
