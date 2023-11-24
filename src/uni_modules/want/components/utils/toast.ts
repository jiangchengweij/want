type ToastMessage = string | number;

interface ToastOptions {
  show?: boolean;
  type?: string;
  mask?: boolean;
  zIndex?: number;
  ref?: Vue.Component & any;
  position?: string;
  duration?: number;
  selector?: string;
  forbidClick?: boolean;
  loadingType?: string;
  message?: ToastMessage;
  onClose?: () => void;
}

const defaultOptions = {
  type: 'text',
  mask: false,
  message: '',
  show: true,
  zIndex: 1000,
  duration: 2000,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular',
};

let queue: anyObj[] = [];
let currentOptions: ToastOptions = { ...defaultOptions };

function Toast(toastOptions: ToastOptions) {
	const options = {
		...currentOptions,
		...toastOptions,
	} as ToastOptions;
	
	const toast = options.ref ? options.ref : null;
	
	if (!toast) {
		console.warn('未找到 w-toast 节点，请确认 ref 是否引用正确');
		return;
	}
	
	delete options.ref;
	
	toast.clear = () => {
		toast.setOptions({ show: false })
		if (options.onClose) {
			options.onClose();
		}
	}
	
	queue.push(toast);
	toast.setOptions(options);
	clearTimeout(toast.timer);
	
	if (options.duration != null && options.duration > 0) {
		toast.timer = setTimeout(() => {
			toast.clear();
			queue = queue.filter((item) => item !== toast);
		}, options.duration);
	}
	
	return toast;
}

const createMethod = (type: string) => (options: ToastOptions) =>
  Toast({
    type,
    ...options,
  });

Toast.loading = createMethod('loading');
Toast.success = createMethod('success');
Toast.fail = createMethod('fail');

Toast.clear = () => {
  queue.forEach((toast) => {
    toast.clear();
  });
  queue = [];
};

Toast.setDefaultOptions = (options: ToastOptions) => {
  Object.assign(currentOptions, options);
};

Toast.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
};

export default Toast
