import { onMounted, reactive, ref } from "vue";
import { getRect } from "../utils";

export function useAnimation() {
	const animationData = ref({});
	
	const animationStyle = reactive({
		height: '0px'
	})
	
	let _mounted = false;
	
	onMounted(() => {
		_mounted = true;
	})
	
	const animation = uni.createAnimation({
		duration: 0,
		timingFunction: 'ease-in-out',
	})
	function updateAnimation(expanded: boolean, height: number) {
		if (expanded) {
			if (height === 0) {
				animation.height('auto').top(1).step();
				animationData.value = animation.export();
				// #ifdef WEB || APP-PLUS
				animationStyle.height = 'auto';
				// #endif
			} else {
				animation.height(height).top(1).step({
					duration: _mounted ? 300 : 1
				})
				animationData.value = animation.export();
				setTimeout(() => {
					animation.height('auto').step();
					animationData.value = animation.export();
					// #ifdef WEB || APP-PLUS
					animationStyle.height = 'auto';
					// #endif
				}, _mounted ? 300 : 1)
			}
			return;
		}
		animation.height(height).top(0).step({
			duration: 1,
		})
		animationData.value = animation.export();
		
		setTimeout(() => {
			animation.height(0).step({ duration: 300 })
			animationData.value = animation.export();
			// #ifdef WEB || APP-PLUS
			animationStyle.height = '0px';
			// #endif
		}, 1)
	}
	function setContextAnimate(context: anyObj, expanded: boolean) {
		getRect(context, '.wan-collapse-item__content')
			.then((rect) => rect.height)
			.then((height: number) => {
				updateAnimation(expanded, height);
			})
	}
	
	return { animationData: animationData, setContextAnimate, animationStyle }
}
