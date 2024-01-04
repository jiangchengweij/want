import { computed } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export const emits = ['click'];
export const props = {
  themeVars: {
    type: Object,
    default: () => {}
  },
  customClass: null
};
export const setup = (props) => {
  const mapThemeVarsToCSSVars = computed(() => {
    const { themeVars } = props;
    const cssVars = {};
    Object.keys(themeVars).forEach((key) => {
      const cssVarsKey = '--' + kebabCase(key);
      cssVars[cssVarsKey] = themeVars[key];
    });
    return style(cssVars);
  });
  function kebabCase(word) {
    const newWord = word
      .replace(/[A-Z]/g, function (i) {
        return '-' + i;
      })
      .toLowerCase()
      .replace(/^-/, '');
    return newWord;
  }
  return {
    bem,
    style,
    addUnit,
    mapThemeVarsToCSSVars,
    kebabCase
  };
};
