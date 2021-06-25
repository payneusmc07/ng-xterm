import Store from "electron-store"
import * as yaml from "js-yaml"

/**
 * This store will act as the settings store for the main process.
 * Yaml is used instead of JSON since a hex number is used for the
 * window background, and I encountered a large number of issues during
 * the par
 * */
export const appSettingsStore = new Store({
	name: "app-settings",
	watch: true,
	fileExtension: "yaml",
	serialize: yaml.dump,
	deserialize: yaml.load,
	schema: {
		autoUpdate: {
			default: true
		},
		backgroundTransparency: {
			type: "number",
			default: 0.90
		},
		backgroundColor: {
			default: "#263137"
		}
	}
})
