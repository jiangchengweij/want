import type { SetupContext, EmitsOptions, SlotsType } from 'vue';

declare global {
  type Setup<P = object, E = EmitsOptions, S extends SlotsType = object> = (
    props: P,
    context: SetupContext<E, S>
  ) => void;

  type CanWrite<T> = {
    -readonly [K in keyof T]: T[K];
  };
}
