import type { ExtractPropTypes, SetupContext } from "vue";

export const btnProps = {
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
}

export type BtnProps = ExtractPropTypes<typeof btnProps> 

export const btnEmits = ['getuserinfo', 'contact', 'getphonenumber', 'getrealtimephonenumber', 'error', 'launchapp', 'opensetting', 'agreeprivacyauthorization', 'chooseavatar'] as const

export type BtnEmits = ToMutable<typeof btnEmits>

export function useButton({ emit }: {
	emit: SetupContext<BtnEmits>['emit']
}) {

	const methods = {
		onGetUserInfo(event: any) {
			emit('getuserinfo', event);
		},
		
		onContact(event: any) {
			emit('contact', event);
		},
		
		onGetPhoneNumber(event: any) {
			emit('getphonenumber', event);
		},
		
		onGetRealTimePhoneNumber(event: any) {
			emit('getrealtimephonenumber', event);
		},
		
		onError(event: any) {
			emit('error', event);
		},
		
		onLaunchApp(event: any) {
			emit('launchapp', event);
		},
		
		onOpenSetting(event: any) {
			emit('opensetting', event);
		},
		
		onAgreePrivacyAuthorization(event: any) {
			emit('agreeprivacyauthorization', event);
		},
		
		onChooseAvatar(
			event: any
		) {
			emit('chooseavatar', event);
		},
	}
	return { methods }
}
