import {
  ComponentInternalInstance,
  ComponentPublicInstance,
  InjectionKey,
  getCurrentInstance,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  onUnmounted,
  provide,
  reactive
} from 'vue';

type ParentProvide = {
  link(
    child: ComponentInternalInstance
  ): (instance: ComponentInternalInstance) => void;
  unlink(child: ComponentInternalInstance): void;
  children: ComponentPublicInstance[];
  parentComponent: ComponentPublicInstance;
};

export function useChildren(
  key: string,
  event: {
    onLink?: () => void;
    onUnLink?: <T = ComponentInternalInstance>(_: T) => void;
  } = {}
) {
  const { onLink, onUnLink } = event;
  const children = reactive<unknown[]>([]);

  const parentComponent = getCurrentInstance();

  let _unmount = false;

  const link = (child: ComponentInternalInstance) => {
    children.push(child);
    if (onLink) {
      return onLink;
    }
  };

  onBeforeUnmount(() => {
    _unmount = true;
  });

  const unlink = (child: ComponentInternalInstance) => {
    if (!children || !children.length) return;
    const index = children.indexOf(child);
    if (index > -1) {
      children.splice(index, 1);
      if (onUnLink && !_unmount) {
        onUnLink(child);
      }
    }
  };

  provide(key, {
    link,
    unlink,
    children,
    parentComponent
  });

  return {
    children
  };
}

export function useParent(key: InjectionKey<ParentProvide>, index?: number) {
  const parent = inject(key, null);
  const instance = getCurrentInstance()!;

  if (parent) {
    const { link, unlink, parentComponent, children } = parent;
    if (index == null) {
      index = children.length;
    }
    const onLink = link(instance);
    onBeforeMount(() => {
      if (onLink) onLink(instance);
    });
    onUnmounted(() => {
      unlink(instance);
    });
    return { parent: parentComponent, index, children };
  }

  return { parent: null, index: -1, children: [] };
}
