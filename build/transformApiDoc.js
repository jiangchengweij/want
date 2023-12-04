module.exports = (frontmatter) => {
  if (!frontmatter) return '';
  const mapFun = (item) => {
    const arr = item.split(' ');
    if (arr[0] === 'property' || arr[0] === 'event') {
      return `* @property {${arr[1]}} ${arr[2]} ${arr[3]} ${
        arr[4] ? '默认:' + arr[4] : ''
      }\n`;
    }
    if (arr[0] === 'value') {
      if (!arr[1]) return '';
      const valueArr = arr[1].split(',');
      return valueArr.reduce((prev, cur) => {
        const [key, value] = cur.split('=');
        return prev + `* @value ${key} ${value ?? ''}\n`;
      }, '');
    }
    if (arr[0] === 'example') return `* @example ${arr[1]}\n`;
  };
  const docStr =
    `/**\n` +
    `* ${frontmatter.title}\n` +
    `* description ${frontmatter.description}\n` +
    (frontmatter.vueDoc ? frontmatter.vueDoc.map(mapFun).join('') : '') +
    `*/\n`;
  return docStr;
};
