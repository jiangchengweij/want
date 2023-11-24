import { ComponentInternalInstance, nextTick } from "vue";

let queue: anyObj[] = [];
export type Action = 'confirm' | 'cancel' | 'overlay';

interface DialogOptions {
  lang?: string;
  show?: boolean;
  title?: string;
  width?: string | number | null;
  zIndex?: number;
  theme?: string;
  ref?: anyObj;
  message?: string;
  overlay?: boolean;
  selector?: string;
  ariaLabel?: string;
  /**
   * @deprecated use custom-class instead
   */
  className?: string;
  customStyle?: string;
  transition?: string;
  /**
   * @deprecated use beforeClose instead
   */
  asyncClose?: boolean;
  beforeClose?: null | ((action: Action) => Promise<void | boolean> | void);
  businessId?: number;
  sessionFrom?: string;
  overlayStyle?: string;
  appParameter?: string;
  messageAlign?: string;
  sendMessageImg?: string;
  showMessageCard?: boolean;
  sendMessagePath?: string;
  sendMessageTitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  closeOnClickOverlay?: boolean;
  confirmButtonOpenType?: string;
}

const defaultOptions: DialogOptions = {
  show: false,
  title: '',
  width: null,
  theme: 'default',
  message: '',
  zIndex: 100,
  overlay: true,
  selector: '#van-dialog',
  className: '',
  asyncClose: false,
  beforeClose: null,
  transition: 'scale',
  customStyle: '',
  messageAlign: '',
  overlayStyle: '',
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickOverlay: false,
  confirmButtonOpenType: '',
};

let currentOptions: DialogOptions = { ...defaultOptions };

const Dialog = (options: DialogOptions) => {
  options = {
    ...currentOptions,
    ...options,
  };

  return new Promise<anyObj>(
    (resolve, reject) => {
      const dialog = options.ref ? options.ref : null;

      delete options.ref;

      if (dialog) {
				dialog.setOptions({
					callback: (
					  action: Action,
					  instance: ComponentInternalInstance
					) => {
					  action === 'confirm' ? resolve(instance) : reject(instance);
					},
					...options,
				})

        nextTick(() => {
					dialog.setOptions({ show: true })
        });

        queue.push(dialog);
      } else {
        console.warn(
          '未找到 w-dialog 节点，请确认 ref 是否引用正确'
        );
      }
    }
  );
};

Dialog.alert = (options: DialogOptions) => Dialog(options);

Dialog.confirm = (options: DialogOptions) =>
  Dialog({
    showCancelButton: true,
    ...options,
  });

Dialog.close = () => {
  queue.forEach((dialog) => {
    dialog.close();
  });
  queue = [];
};

Dialog.stopLoading = () => {
  queue.forEach((dialog) => {
    dialog.stopLoading();
  });
};

Dialog.currentOptions = currentOptions;
Dialog.defaultOptions = defaultOptions;

Dialog.setDefaultOptions = (options: DialogOptions) => {
  currentOptions = { ...currentOptions, ...options };
  Dialog.currentOptions = currentOptions;
};

Dialog.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
  Dialog.currentOptions = currentOptions;
};

Dialog.resetDefaultOptions();

export default Dialog;
