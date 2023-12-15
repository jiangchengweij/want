import { computed, type ExtractPropTypes, type SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';

export const emits = ['click'] as const;
export const props = {
  themeVars: {
    type: Object,
    default: () => {}
  },
  customClass: null
};

export type Props = ExtractPropTypes<typeof props>;

export type Context = SetupContext<CanWrite<typeof emits>>;

export const setup = (props: Props) => {
  const mapThemeVarsToCSSVars = computed(() => {
    const { themeVars } = props;
    const cssVars = {};
    Object.keys(themeVars).forEach((key) => {
      const cssVarsKey = '--' + kebabCase(key);
      cssVars[cssVarsKey] = themeVars[key];
    });
    return style(cssVars);
  });

  function kebabCase(word: string) {
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
