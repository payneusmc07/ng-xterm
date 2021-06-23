import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import Store from "electron-store"

@Injectable({ providedIn: "root" })

/**
 * A helper class to get or set the application wide settings.
 * The store uses Subscriptions and Behavior subjects for settings
 * related to the terminal theme. The benefit of this is each time a value
 * in the store is changed, the new value will be applied to the
 * terminal in real time through the terminal?.setOption() call.
 *
 * However this only applies to "theme" related settings
 * (i.e. background, foreground, etc). Other settings such as the
 * type of session, rows, and columns used by the underlying pty/terminal
 * will require a window reload, as those cannot be properly
 * updated in real time.
 * */
export class SettingsService {

	/** Since Electron store returns an "unknown" type, to provide some
	 * level of type safety, we can use the default initialization
	 * scheme provided by ElectronStore,
	 * ```
	 * ElectronStore<{key: string, value: unknown}>
	 *```*/
	private store: Store<{
		autoUpdate: unknown
		customTerminalTitle: unknown
		darkMacTrafficLights: unknown
		fontSize: unknown
		linesOfTerminalScrollback: unknown
		ptyRows: unknown
		ptyCols: unknown
		terminalCursorColor: unknown
		terminalCursorStyle: unknown
		terminalCursorAccentColor: unknown
		terminalCursorBlink: unknown
		shellType: unknown
		terminalBackgroundTransparency: unknown
		terminalBackgroundColor: unknown
		terminalType: unknown
		terminalFontSize: unknown
		terminalLineHeight: unknown
		terminalLetterSpacing: unknown
		terminalSelectionColor: unknown
		terminalForegroundColor: unknown
		terminalFont: unknown
		windowsStyleControls: unknown
		windowControlStyle: unknown
	}>

	terminalFontSizeSubject =  new BehaviorSubject(13)
	windowControlSubject = new BehaviorSubject(null)
	cursorStyleSubject = new BehaviorSubject("block")
	cursorBlinkSubject = new BehaviorSubject(false)
	terminalLetterSpacingSubject = new BehaviorSubject(1)
	terminalLineHeightSubject = new BehaviorSubject(1.2)

	constructor() {
		// configure the terminal settings store
		this.store = new Store({
			name: "terminal-settings",
			watch: true,
			schema: {
				autoUpdate: {
					default: true
				},
				terminalBackgroundTransparency: {
					type: "number",
					default: 0.90
				},
				terminalBackgroundColor: {
					type: "string",
					default: "#18242f"
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
					default: "#47bedb"
				},
				terminalCursorStyle: {
					type: "string",
					default: "block"
				},
				terminalFont: {
					type: "string",
					default: "Hack Nerd Font"
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
				terminalSelectionColor: {
					type: "string",
					default: "#47bedb"
				},
				shellType: {
					type: "string",
					default: process.env.SHELL
				},
				windowsStyleControls: {
					type: "boolean",
					default: false
				},
				windowControlStyle: {
					type: "string",
					default:  "mac"
				}
			}
		})
	}

	/**
	 * Save a specific user preference to the settings store.
	 *
	 * Since the user may do a lot of adjusting to the theme,
	 * a timeout is set to allow for those adjustments,
	 * and reduce the number of writes to the settings store.
	 *
	 * @param {string} key the accessor which is used to access the value of a setting.
	 * @param {string | number | boolean} value the value to be used by the terminal
	 * or overall application.
	 * */
	setItem(key: string, value: string | number | boolean) {
		this.store.set(key, value)
	}

	/**
	 * Get the value of a given item and return it to the calling function.
	 * @param {string} key the key which will "point" a specific item.
	 * */
	getItem(key: string): unknown {
		return this.store.get(key)
	}
}
