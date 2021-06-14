import Store from "electron-store"
import * as yaml from "js-yaml"

export const appSettingsStore = new Store({
	name: "app-settings",
	watch: true,
	fileExtension: "yaml",
	serialize: yaml.dump,
	deserialize: yaml.load,
	schema: {
		backgroundTransparency: {
			type: "number",
			default: 0.90
		},
		backgroundColor: {
			default: "#263137"
		}
	}
})
