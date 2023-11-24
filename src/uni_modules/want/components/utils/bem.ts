const PREFIX = 'wan-'

type Conf = Record<string, any> | (Record<string, any>|string)[] | string | number

export function bem(name: string, conf?: Conf) {
	let mods: string[] = []
	traversing(mods, conf)
	return join(name, mods)
}

function join(name: string, mods: string[]) {
	name = PREFIX + name
	mods = mods.map((mod) => {
		return name + '--' + mod
	})
	mods.unshift(name)
	return mods.join(' ')
}

function traversing(mods: string[], conf: Conf) {
	if (!conf) {
		return
	}
	
	if (typeof conf === 'string' || typeof conf === 'number') {
		mods.push(conf as string)
	} else if (Array.isArray(conf)) {
		conf.forEach((item) => {
			traversing(mods, item)
		})
	} else if (typeof conf === 'object') {
		Object.keys(conf).forEach((key) => {
			conf[key] && mods.push(key)
		})
	}
}
