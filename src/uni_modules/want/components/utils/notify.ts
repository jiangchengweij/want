import { WHITE } from '../common/color';

interface NotifyOptions {
  type?: 'primary' | 'success' | 'danger' | 'warning';
  color?: string;
  zIndex?: number;
  top?: number;
  message: string;
  ref?: any;
  duration?: number;
  selector?: string;
  background?: string;
  safeAreaInsetTop?: boolean;
  onClick?: () => void;
  onOpened?: () => void;
  onClose?: () => void;
}

const defaultOptions: NotifyOptions = {
  selector: '#wan-notify',
  type: 'danger',
  message: '',
  background: '',
  duration: 3000,
  zIndex: 110,
  top: 0,
  color: WHITE,
  safeAreaInsetTop: false,
  onClick: () => {},
  onOpened: () => {},
  onClose: () => {},
};

let currentOptions: NotifyOptions = { ...defaultOptions };

export default function Notify(options: NotifyOptions) {
	options = { ...currentOptions, ...options };
	const notify = options.ref ? options.ref : null;

	delete options.ref;

	if (notify) {
		notify.setOptions(options);
		notify.show();
		return notify;
	}

	console.warn('未找到 wan-notify 节点，请确认 ref 组件应用配置 是否正确');
}

Notify.clear = function (options?: NotifyOptions) {
  options = { ...defaultOptions, ...options };

  const notify = options.ref ? options.ref : null;

  if (notify) {
    notify.hide();
  }
};

Notify.setDefaultOptions = (options: NotifyOptions) => {
  Object.assign(currentOptions, options);
};

Notify.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
};
