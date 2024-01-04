import { computed, onMounted, reactive, ref, watch } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { pickerProps } from '../common/mixins/picker';
export const emits = ['cancel', 'confirm', 'change'];
export const props = Object.assign(Object.assign({}, pickerProps), {
  showToolbar: {
    type: Boolean,
    default: true
  },
  value: {
    type: String
  },
  areaList: {
    type: Object,
    default: () => {}
  },
  columnsNum: {
    type: null,
    default: 3
  },
  columnsPlaceholder: {
    type: Array,
    default: () => []
  },
  customClass: null,
  activeClass: null,
  toolbarClass: null,
  columnClass: null
});
const EMPTY_CODE = '000000';
export function setup(props, context) {
  const { emit, expose } = context;
  const state = reactive({
    columns: [{ values: [] }, { values: [] }, { values: [] }],
    typeToColumnsPlaceholder: {}
  });
  const pickerRef = ref(null);
  const codeValue = ref('');
  onMounted(() => {
    updatePlaceholder();
    requestAnimationFrame(() => {
      setValues();
    });
  });
  watch(
    () => props.value,
    (val) => {
      codeValue.value = val || '';
      setValues();
    }
  );
  watch(
    () => props.areaList,
    () => {
      setValues();
    }
  );
  watch(
    () => props.columnsPlaceholder,
    () => {
      updatePlaceholder();
    }
  );
  const displayColumns = computed(() => {
    return state.columns.slice(0, +props.columnsNum);
  });
  const updatePlaceholder = () => {
    const { columnsPlaceholder } = props;
    if (columnsPlaceholder && columnsPlaceholder.length >= 3) {
      state.typeToColumnsPlaceholder = {
        province: columnsPlaceholder[0] || '',
        city: columnsPlaceholder[1] || '',
        county: columnsPlaceholder[2] || ''
      };
    }
  };
  const onCancel = (event) => {
    emitEvent('cancel', event);
  };
  const onConfirm = (event) => {
    const { index } = event;
    let { value } = event;
    value = parseValues(value);
    emitEvent('confirm', { value, index });
  };
  const onChange = (event) => {
    const { index, picker, value } = event;
    if (value[index]) {
      codeValue.value = value[index].code;
      setValues().then(() => {
        emit('change', {
          picker: picker,
          values: parseValues(pickerRef.value.getValues())
        });
      });
    }
  };
  const emitEvent = (type, detail) => {
    detail.values = detail.value;
    delete detail.value;
    emit(type, detail);
  };
  const parseValues = (values) => {
    const { columnsPlaceholder } = props;
    return values.map((value, index) => {
      if (value && (!value.code || value.name === columnsPlaceholder[index])) {
        return Object.assign(Object.assign({}, value), { code: '', name: '' });
      }
      return value;
    });
  };
  const getConfig = (type) => {
    const { areaList } = props;
    return areaList && areaList[`${type}_list`];
  };
  const getList = (type, code) => {
    if (type !== 'province' && !code) {
      return [];
    }
    const { typeToColumnsPlaceholder } = state;
    const list = getConfig(type);
    let result = Object.keys(list).map((code) => ({
      code,
      name: list[code]
    }));
    if (code != null) {
      // oversea code
      if (code[0] === '9' && type === 'city') {
        code = '9';
      }
      result = result.filter((item) => item.code.indexOf(code) === 0);
    }
    if (typeToColumnsPlaceholder[type] && result.length) {
      // set columns placeholder
      const codeFill =
        type === 'province'
          ? ''
          : type === 'city'
            ? EMPTY_CODE.slice(2, 4)
            : EMPTY_CODE.slice(4, 6);
      result.unshift({
        code: `${code}${codeFill}`,
        name: typeToColumnsPlaceholder[type]
      });
    }
    return result;
  };
  const getIndex = (type, code) => {
    let compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
    const list = getList(type, code.slice(0, compareNum - 2));
    // oversea code
    if (code[0] === '9' && type === 'province') {
      compareNum = 1;
    }
    code = code.slice(0, compareNum);
    for (let i = 0; i < list.length; i++) {
      if (list[i].code.slice(0, compareNum) === code) {
        return i;
      }
    }
    return 0;
  };
  const setValues = () => {
    let code = codeValue.value || getDefaultCode();
    const provinceList = getList('province');
    const cityList = getList('city', code.slice(0, 2));
    const stack = [];
    const indexes = [];
    const { columnsNum } = props;
    if (columnsNum >= 1) {
      stack.push(pickerRef.value.setColumnValues(0, provinceList, false));
      indexes.push(getIndex('province', code));
    }
    if (columnsNum >= 2) {
      stack.push(pickerRef.value.setColumnValues(1, cityList, false));
      indexes.push(getIndex('city', code));
      if (cityList.length && code.slice(2, 4) === '00') {
        [{ code }] = cityList;
      }
    }
    if (columnsNum === 3) {
      stack.push(
        pickerRef.value.setColumnValues(
          2,
          getList('county', code.slice(0, 4)),
          false
        )
      );
      indexes.push(getIndex('county', code));
    }
    return Promise.all(stack)
      .catch(() => {})
      .then(() => pickerRef.value.setIndexes(indexes))
      .catch(() => {});
  };
  const getDefaultCode = () => {
    const { columnsPlaceholder } = props;
    if (columnsPlaceholder && columnsPlaceholder.length) {
      return EMPTY_CODE;
    }
    const countyCodes = Object.keys(getConfig('county'));
    if (countyCodes[0]) {
      return countyCodes[0];
    }
    const cityCodes = Object.keys(getConfig('city'));
    if (cityCodes[0]) {
      return cityCodes[0];
    }
    return '';
  };
  const getValues = () => {
    return parseValues(pickerRef.value.getValues().filter((value) => !!value));
  };
  const getDetail = () => {
    const values = getValues();
    const area = {
      code: '',
      country: '',
      province: '',
      city: '',
      county: ''
    };
    if (!values.length) {
      return area;
    }
    const names = values.map((item) => item.name);
    area.code = values[values.length - 1].code;
    if (area.code[0] === '9') {
      area.country = names[1] || '';
      area.province = names[2] || '';
    } else {
      area.province = names[0] || '';
      area.city = names[1] || '';
      area.county = names[2] || '';
    }
    return area;
  };
  const reset = (code) => {
    codeValue.value = code || '';
    return setValues();
  };
  expose({
    reset,
    getDetail
  });
  return {
    bem,
    style,
    addUnit,
    state,
    displayColumns,
    pickerRef,
    onCancel,
    onConfirm,
    onChange
  };
}
