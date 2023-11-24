import type { ComputedRef, InjectionKey } from 'vue'

export const wanRowKey = Symbol() as InjectionKey<{ gutter: ComputedRef<number> }>
