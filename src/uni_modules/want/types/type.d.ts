export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $bem: (name: string, conf?: any) => string,
		$addUnit: (unit: string) => string,
		$style: (style: any) => string
  }
}

declare global {
	type UseFnOptions = {
		props?: Record<string, any>,
		emit?: (event: string, ...args: any[]) => void 
	}
	
	type ToMutable<T> = {
		-readonly [Key in keyof T]: T[Key]
	}
	
	interface anyObj {
	  [key: string]: any
	}
}


