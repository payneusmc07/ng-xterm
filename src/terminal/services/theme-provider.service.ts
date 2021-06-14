import { Injectable } from "@angular/core"
import { Terminal } from "xterm"
import { ElectronService, SettingsService } from "@shared/services"
import { AppSettings, IPCChannelNames } from "@shared/utils"

@Injectable({ providedIn: "root" })

export class ThemeProviderService {

	private cursorBlink: boolean
	private cursorStyle: string
	private letterSpacing: number
	private fontColor: string
	private font: string
	private fontSize: number
	private backgroundColor: string
	private lineHeight: number
	private cursorColor: string
	private cursorAccentColor: string
	private selectionColor: string
	private transparency: number
	private rendererType: string
	private scrollBack: number
	private terminalTitle: string

	constructor(
		private readonly settingsService: SettingsService,
		private readonly electronService: ElectronService
	) {}


	/**
	 * Retrieve the user's stored theme settings.
	 *
	 * @description
	 * Since Electron Store returns "unknown", each value needs
	 * to be type casted to either a string, number or boolean in order to
	 * be properly processed.
	 * */
	private getSavedThemeSettings() {

		// check if there is a custom title
		this.terminalTitle = this.settingsService.getItem(AppSettings.CUSTOM_TERM_TITLE) as string

		// get the amount of allowable scrollback
		this.scrollBack = +this.settingsService.getItem(AppSettings.TERM_SCROLLBACK)

		// get the font-size from the value in the settings store.
		this.fontSize = +this.settingsService.getItem(AppSettings.FONT_SIZE)

		// get the font from the value in the settings store.
		this.font = this.settingsService.getItem(AppSettings.TERM_FONT ?? "Hack Nerd Font") as string

		/*
		Xterm does not render properly when the font extensions are passed into the
		font settings. So we need to check for and remove any font extensions
		before they are passed to the terminal.
		  */
		if(this.font.includes(".ttf")) {
			this.font = this.font.replace(".ttf", "")
		}
		else if (this.font.includes(".otf")) {
			this.font = this.font.replace(".otf", "")
		}

		// get the type of terminal renderer used
		this.rendererType = this.settingsService.getItem(AppSettings.TERM_RENDERER) as string

		// get cursor blink from the value in the settings store.
		this.cursorBlink = this.settingsService.getItem(AppSettings.TERM_CURSOR_BLINK) as boolean

		// get the cursor style from the value in the settings store.
		this.cursorStyle = this.settingsService.getItem(AppSettings.TERM_CURSOR_STYLE) as string

		// get the font style from the value in the settings store.
		this.fontColor = this.settingsService.getItem(AppSettings.TERM_FG_COLOR) as string

		// get the background color from the value in the settings store.
		this.backgroundColor = this.settingsService.getItem(AppSettings.APP_BG_COLOR) as string

		// get the cursor accent color from the value in the settings store.
		this.cursorAccentColor = this.settingsService.getItem(AppSettings.TERM_CURSOR_ACCENT_COLOR) as string

		// get the cursor color from the value in the settings store.
		this.cursorColor= this.settingsService.getItem(AppSettings.TERM_CURSOR_COLOR) as string

		// get the background transparency from the value in the settings store.
		this.transparency = +this.settingsService.getItem(AppSettings.APP_BG_TRANSPARENCY)

		// get the line height (spacing between terminal lines) from the value in the settings store.
		this.lineHeight = +this.settingsService.getItem(AppSettings.TERM_LINE_HEIGHT)

		// get the letter spacing from the value in the settings store.
		this.letterSpacing = +this.settingsService.getItem(AppSettings.TERM_LETTER_SPACING)

		// get the text selection color from the value in the settings store.
		this.selectionColor = this.settingsService.getItem(AppSettings.TERM_SELECTION_COLOR) as string

		/**
		 * Return a key value object which maps each saved setting key to a value
		 * which can be used with terminal.setOption()
		 * */
		return {
			backgroundColor: this.backgroundColor,
			foregroundColor: this.fontColor,
			cursorColor: this.cursorColor,
			cursorAccentColor: this.cursorAccentColor,
			cursorBlink: this.cursorBlink,
			selectionColor: this.selectionColor,
			fontSize: this.fontSize,
			font: this.font,
			fontColor: this.fontColor,
			cursorStyle: this.cursorStyle,
			scrollBack: this.scrollBack,
			letterSpacing: this.letterSpacing,
			rendererType: this.rendererType,
			lineHeight: this.lineHeight
		}
	}

	/**
	 * Use the retrieved user theme values to configure the
	 * overall theme and options for the terminal
	 * @param {Terminal} terminal the terminal which the user settings will be applied to
	 * @todo possibly make the remainder of the terminal theme configurable
	 * */
	loadSavedThemeSettings(terminal: Terminal) {
		const savedThemeSettings = this.getSavedThemeSettings()

		this.settingsService.store.onDidChange("appBackgroundColor", async (newColor) => {
			this.backgroundColor = newColor as string
			await this.electronService.ipcRenderer.invoke(IPCChannelNames.RESET_WINDOW)

		})

		// should background transparency be allowed
		terminal?.setOption("allowTransparency", true)

		// set the name of the terminal
		terminal?.setOption("termName", "ng-xterm")

		// what size should the terminal font be
		terminal?.setOption("fontSize", savedThemeSettings.fontSize)

		// set the cursor style
		terminal?.setOption("cursorStyle", savedThemeSettings.cursorStyle)

		// should the terminal cursor blink
		terminal?.setOption("cursorBlink", savedThemeSettings.cursorBlink)

		// when a user right clicks on a word in the terminal, it will be automatically highlighted.
		terminal?.setOption("rightClickSelectsWord", true)

		// what font terminal will use
		terminal?.setOption("fontFamily", savedThemeSettings.font ?? "Menlo")

		// set the amount of scrollback
		terminal?.setOption("scrollback", savedThemeSettings.scrollBack)

		// how much horizontal space is between letters.
		terminal?.setOption("letterSpacing", savedThemeSettings.letterSpacing)

		// what type of renderer should the terminal use
		terminal?.setOption("rendererType", savedThemeSettings.rendererType)

		// how much vertical space is between lines of terminal text.
		terminal?.setOption("lineHeight", savedThemeSettings.lineHeight)

		// should we allow the terminal to use the its proposed api?
		terminal?.setOption("allowProposedApi", true)

		// what "weighting" should be applied to bold fonts
		terminal?.setOption("fontWeightBold", 200)

		// what the overall "theme" of the terminal will be
		terminal?.setOption("theme", {
			background: savedThemeSettings.backgroundColor,
			foreground: savedThemeSettings.foregroundColor,
			cursor: savedThemeSettings.cursorColor,
			cursorAccent: savedThemeSettings.cursorAccentColor,
			selection: savedThemeSettings.selectionColor,
		})
	}
}
