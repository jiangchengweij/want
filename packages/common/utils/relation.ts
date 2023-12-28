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
  children: AnyObject[];
  parentComponent: AnyObject;
};

export function useChildren(
  key: string,
  event: {
    onLink?: (_: AnyObject) => void;
    onUnLink?: <T = AnyObject>(_: T) => void;
  } = {}
) {
  const { onLink, onUnLink } = event;
  const children = reactive<AnyObject[]>([]);

  const parentComponent = getCurrentInstance();

  let _unmount = false;

  const link = (child: AnyObject) => {
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

export function useParent(
  key: string,
  index?: number
): {
  parent: AnyObject | null;
  index: number;
  children: AnyObject[];
} {
  const parent = inject<ParentProvide | null>(key, null);
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
