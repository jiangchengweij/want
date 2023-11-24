import type { App } from 'vue'
import { addUnit } from '../utils'
import { bem } from '../utils/bem'
import { style } from '../utils/style'

export default function install(app: App) {	
	app.config.globalProperties.$addUnit = addUnit
	app.config.globalProperties.$style = style
	app.config.globalProperties.$bem = bem
}
