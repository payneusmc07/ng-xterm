import { Injectable } from "@angular/core"
import { ElectronService } from "../services/electron.service"
import { IPCChannelNames } from "../utils"
import Store from "electron-store"

@Injectable({ providedIn: "root" })

/**
 * A helper class to get or set the application wide settings.
 *
 * In order to make Typescript happy, we need to follow
 * the default initialization scheme for ElectronStore,
 *
 * ElectronStore<{key: string, value: unknown}>
 *
 * While it is annoying and tedious to do things this way,
 * It is better than setting store to "any"
 * */
export class SettingsService {
	store: Store<{
		appBackgroundTransparency: unknown
		appBackgroundColor: unknown
		antiAliasedFonts: unknown
		customTerminalTitle: unknown
		darkMacTrafficLights: unknown
		fontSize: unknown
		linesOfTerminalScrollback: unknown
		ptyRows: unknown
		ptyCols: unknown
		showTooltips: unknown
		tabBackgroundColor: unknown
		tabForegroundColor: unknown
		terminalBackgroundColor: unknown
		terminalCursorColor: unknown
		terminalCursorStyle: unknown
		terminalCursorAccentColor: unknown
		terminalCursorBlink: unknown
		terminalShellType: unknown
		terminalType: unknown
		terminalRenderer: unknown
		terminalFontSize: unknown
		terminalLineHeight: unknown
		terminalLetterSpacing: unknown
		terminalSelectionColor: unknown
		terminalForegroundColor: unknown
		terminalFont: unknown
		topbarIconSize: unknown
		topbarIconColor: unknown
		windowsStyleControls: unknown
		windowControlStyle: unknown
	}>

	constructor(private readonly electronService: ElectronService) {
		this.store = new Store({
			name: "terminal-settings",
			watch: true,
			schema: {
				appBackgroundTransparency: {
					type: "number",
					default: 0.90
				},
				appBackgroundColor: {
					type: "string",
					default: "#18242f"
				},
				antiAliasedFonts: {
					type: "boolean",
					default: false
				},
				customTerminalTitle: {
					type: "string",
					default: ""
				},
				darkMacTrafficLights: {
					type: "boolean",
					default: false
				},
				fontSize: {
					type: "number",
					default: 13
				},
				showTooltips: {
					type: "boolean",
					default: false
				},
				linesOfTerminalScrollback: {
					type: "number",
					default: 100
				},
				ptyCols: {
					type: "number",
					default: 80
				},
				ptyRows: {
					type: "number",
					default: 25
				},
				tabBackgroundColor: {
					type: "string",
					default: "#47bedb"
				},
				terminalBackgroundColor: {
					type: "string",
					default: "#18242f"
				},
				terminalCursorAccentColor: {
					type: "string",
					default: "#47bedb"
				},
				terminalCursorBlink: {
					type: "boolean",
					default: false
				},
				terminalCursorColor: {
					type: "string",
					default:"#47bedb"
				},
				terminalCursorStyle: {
					type: "string",
					default: "block"
				},
				tabForegroundColor: {
					type: "string",
					default: "#dbf4fa"
				},
				terminalFont: {
					type: "string",
					default: process.platform === "darwin" ? "Menlo" : ""
				},
				terminalForegroundColor: {
					type: "string",
					default: "#dbf4fa"
				},
				terminalFontSize: {
					type: "number",
					default: 13,
				},
				terminalLetterSpacing: {
					type: "number",
					default: 1
				},
				terminalType: {
					type: "string",
					default: "xterm-256color"
				},
				terminalLineHeight: {
					type: "number",
					default: 1
				},
				terminalRenderer: {
					type: "string",
					default: "dom"
				},
				terminalSelectionColor: {
					type: "string",
					default: "#47bedb"
				},
				terminalShellType: {
					type: "string",
					default: "zsh"
				},
				topbarIconSize: {
					type: "number",
					default: 13
				},
				topbarIconColor: {
					type: "string",
					default: "#dbf4fa"
				},
				windowsStyleControls: {
					type: "boolean",
					default: false
				},
				windowControlStyle: {
					type: "string",
					default: process.platform === "darwin" ? "mac" : "windows"
				}
			}
		})
	}

	/**
	 * Save a specific user preference.
	 * @param {string} key the accessor which is used to access the value of a setting.
	 * @param {string | number | boolean} value the value to be used by the UI/APP.
	 * */
	setItem(key: string, value: string | number | boolean) {
		/* a time out is set here to allow the user some time to correct
		any mistakes they may have made. */
		setTimeout(async () => {
			this.store.set(key, value)
			await this.electronService.ipcRenderer.invoke(IPCChannelNames.RESET_WINDOW)
		}, 1000)
	}

	/**
	 * Get the value of a given item.
	 * @param {string} key the key which will "point" a specific item.
	 * */
	getItem(key: string): unknown {
		return this.store.get(key)
	}
}
