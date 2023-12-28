import { computed } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export const emits = ['click'];
export const props = {
  dot: Boolean,
  info: String,
  size: [String, Number],
  color: String,
  customStyle: null,
  classPrefix: {
    type: String,
    default: 'wan-icon'
  },
  name: String,
  customClass: String,
  infoClass: String,
  hostClass: [String, Array]
};
export const setup = (props, context) => {
  const { emit } = context;
  function isImage(name) {
    return name && name.indexOf('/') !== -1;
  }
  const rootClass = computed(() => {
    const { classPrefix, name, customClass } = props;
    const classes = [customClass];
    if (classPrefix !== 'wan-icon') {
      classes.push('wan-icon--custom');
    }
    if (classPrefix != null) {
      classes.push(classPrefix);
    }
    if (isImage(name)) {
      classes.push('wan-icon--image');
    } else if (classPrefix != null) {
      classes.push(classPrefix + '-' + name);
    }
    return classes.join(' ');
  });
  const rootStyle = computed(() => {
    const { color, size, customStyle } = props;
    return style([
      {
        color: color,
        fontSize: addUnit(size)
      },
      customStyle
    ]);
  });
  function onClick() {
    emit('click');
  }
  return {
    bem,
    style,
    addUnit,
    rootClass,
    rootStyle,
    isImage,
    onClick
  };
};
