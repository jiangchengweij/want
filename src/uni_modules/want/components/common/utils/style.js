export function style(styles) {
    const styleObj = {};
    if (!styles)
        return {};
    if (typeof styles === 'string') {
        const arrStyle = styles.split(';');
        arrStyle.forEach((item) => {
            const [key, val] = item.split(':');
            if (key && val) {
                styleObj[kebabCase(key.trim())] = val.trim();
            }
        });
    }
    else if (Array.isArray(styles)) {
        styles
            .filter((item) => {
            return item;
        })
            .forEach((item) => {
            Object.assign(styleObj, style(item));
        });
    }
    else if (styles instanceof Object) {
        Object.keys(styles)
            .filter((key) => {
            return styles[key] && styles[key] !== '';
        })
            .forEach((key) => {
            styleObj[kebabCase(key)] = styles[key];
        });
    }
    return styleObj;
}
function kebabCase(word) {
    const newWord = word.replace(/\\_(\w)/g, (_, letter) => {
        return letter.toUpperCase();
    });
    return newWord;
}
