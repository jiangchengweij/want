export const linkProps = {
  url: String,
  linkType: {
    type: String,
    default: 'navigateTo'
  }
};
export function linkSetup({ props }) {
  const jumpLink = (url) => {
    url = url ? url : props.url;
    if (url) {
      if (props.linkType === 'navigateTo' && getCurrentPages().length > 9) {
        uni.redirectTo({ url });
      } else {
        uni[props.linkType]({ url });
      }
    }
  };
  return { jumpLink };
}
