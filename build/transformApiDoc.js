module.exports = (frontmatter) => {
  if (!frontmatter) return '';
  const filter = (item) => {
    const arr = item.split(' ');
    return ['property', 'event', 'class', 'value', 'example'].includes(arr[0]);
  };
  const mapFun = (item) => {
    const arr = item.split(' ');
    if (arr[0] === 'property' || arr[0] === 'event') {
      return `* @${arr[0]} {${arr[1]}} ${arr[2]} ${arr[3]} ${
        arr[4] ? '默认:' + arr[4] : ''
      }\n`;
    }
    if (arr[0] === 'class') {
      return `* @property {String} ${arr[1]} ${arr[2]}\n`;
    }
    if (arr[0] === 'value') {
      if (!arr[1]) return '';
      const valueArr = arr[1].split(',');
      return valueArr.reduce((prev, cur) => {
        const [key, value] = cur.split('=');
        return prev + `* @value ${key} ${value ?? ''}\n`;
      }, '');
    }
    if (arr[0] === 'example') return `* @${item}\n`;
  };
  const docStr =
    `/**\n` +
    `* ${frontmatter.title}\n` +
    `* description ${frontmatter.description}\n` +
    (frontmatter.vueDoc
      ? frontmatter.vueDoc.filter(filter).map(mapFun).join('')
      : '') +
    `*/\n`;
  return docStr;
};
