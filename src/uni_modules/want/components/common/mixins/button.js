import { ExtractPropTypes, SetupContext } from 'vue';
export const emits = [
  'getuserinfo',
  'contact',
  'getphonenumber',
  'getrealtimephonenumber',
  'error',
  'launchapp',
  'opensetting',
  'agreeprivacyauthorization',
  'chooseavatar'
];
export const props = {
  id: String,
  lang: String,
  businessId: Number,
  sessionFrom: String,
  sendMessageTitle: String,
  sendMessagePath: String,
  sendMessageImg: String,
  showMessageCard: Boolean,
  appParameter: String,
  ariaLabel: String,
  openType: String,
  getUserProfileDesc: String
};
export function setup(props, context) {
  const { emit } = context;
  return {
    onGetUserInfo(event) {
      emit('getuserinfo', event);
    },
    onContact(event) {
      emit('contact', event);
    },
    onGetPhoneNumber(event) {
      emit('getphonenumber', event);
    },
    onGetRealTimePhoneNumber(event) {
      emit('getrealtimephonenumber', event);
    },
    onError(event) {
      emit('error', event);
    },
    onLaunchApp(event) {
      emit('launchapp', event);
    },
    onOpenSetting(event) {
      emit('opensetting', event);
    },
    onAgreePrivacyAuthorization(event) {
      emit('agreeprivacyauthorization', event);
    },
    onChooseAvatar(event) {
      emit('chooseavatar', event);
    }
  };
}
