import { Injectable, OnDestroy } from "@angular/core"
import { Subscription } from "rxjs"
import { Terminal } from "xterm"
import { SettingsService } from "@shared/services"
import { Settings } from "@shared/utils"

@Injectable({ providedIn: "root" })

/**
 * A helper service class which gets and sets terminal
 * configuration options. Since the theme related settings
 * rely on Subscriptions, the class also handles subscribing to
 * and unsubscribing from all subscription.
 * */
export class ThemeProviderService implements OnDestroy {

	private cursorBlink: boolean
	private cursorStyle: string
	private letterSpacing: number
	private foregroundColor: string
	private font: string
	private fontSize: number
	private backgroundColor: string
	private lineHeight: number
	private cursorColor: string
	private cursorAccentColor: string
	private selectionColor: string
	private transparency: number
	private scrollBack: number
	private terminalTitle: string

	private fontSizeSubscription: Subscription
	private cursorStyleSubscription: Subscription
	private cursorBlinkSubscription: Subscription

	constructor(private readonly settingsService: SettingsService) {}

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
		this.terminalTitle = this.settingsService.getItem(Settings.CUSTOM_TERM_TITLE) as string

		// get the amount of allowable scrollback
		this.scrollBack = +this.settingsService.getItem(Settings.TERM_SCROLLBACK)

		// get the font-size from the value in the settings store.
		this.fontSize = +this.settingsService.getItem(Settings.FONT_SIZE)

		// get the font from the value in the settings store.
		this.font = this.settingsService.getItem(Settings.TERM_FONT) as string

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

		// get cursor blink from the value in the settings store.
		this.cursorBlink = this.settingsService.getItem(Settings.TERM_CURSOR_BLINK) as boolean

		// get the cursor style from the value in the settings store.
		this.cursorStyle = this.settingsService.getItem(Settings.TERM_CURSOR_STYLE) as string

		// get the font style from the value in the settings store.
		this.foregroundColor = this.settingsService.getItem(Settings.TERM_FG_COLOR) as string

		// get the background color from the value in the settings store.
		this.backgroundColor = this.settingsService.getItem(Settings.TERM_BG_COLOR) as string

		// get the cursor accent color from the value in the settings store.
		this.cursorAccentColor = this.settingsService.getItem(Settings.TERM_CURSOR_ACCENT_COLOR) as string

		// get the cursor color from the value in the settings store.
		this.cursorColor= this.settingsService.getItem(Settings.TERM_CURSOR_COLOR) as string

		// get the background transparency from the value in the settings store.
		this.transparency = +this.settingsService.getItem(Settings.TERM_BG_TRANSPARENCY)

		// get the line height (spacing between terminal lines) from the value in the settings store.
		this.lineHeight = +this.settingsService.getItem(Settings.TERM_LINE_HEIGHT)

		// get the letter spacing from the value in the settings store.
		this.letterSpacing = +this.settingsService.getItem(Settings.TERM_LETTER_SPACING)

		// get the text selection color from the value in the settings store.
		this.selectionColor = this.settingsService.getItem(Settings.TERM_SELECTION_COLOR) as string

		/**
		 * Return a key value object which maps each saved setting key to a value
		 * which can be used with terminal.setOption()
		 * */
		return {
			backgroundColor: this.backgroundColor,
			foregroundColor: this.foregroundColor,
			cursorColor: this.cursorColor,
			cursorAccentColor: this.cursorAccentColor,
			cursorBlink: this.cursorBlink,
			selectionColor: this.selectionColor,
			fontSize: this.fontSize,
			font: this.font,
			fontColor: this.foregroundColor,
			cursorStyle: this.cursorStyle,
			scrollBack: this.scrollBack,
			letterSpacing: this.letterSpacing,
			lineHeight: this.lineHeight
		}
	}

	/**
	 * Use the retrieved user theme values from the settings store
	 * to configure the overall theme and options for the terminal.
	 *
	 * @param {Terminal} terminal the terminal which the user settings will be applied to
	 * @todo possibly make the remainder of the terminal theme configurable
	 * */
	loadSavedThemeSettings(terminal: Terminal) {
		/* assign the returned values from getSavedThemeSettings()
			to a local constant so they can be used to define the theme
			of the terminal
		 */
		const savedThemeSettings = this.getSavedThemeSettings()

		// should background transparency be allowed
		terminal?.setOption("allowTransparency", true)

		// what size should the terminal font be
		terminal?.setOption("fontSize", savedThemeSettings.fontSize)

		// set the cursor style
		terminal?.setOption("cursorStyle", savedThemeSettings.cursorStyle)

		// when a user right clicks on a word in the terminal, it will be automatically highlighted.
		terminal?.setOption("rightClickSelectsWord", true)

		// what font terminal will use
		terminal?.setOption("fontFamily", savedThemeSettings.font)

		// set the amount of scrollback
		terminal?.setOption("scrollback", savedThemeSettings.scrollBack)

		// how much horizontal space is between letters.
		terminal?.setOption("letterSpacing", savedThemeSettings.letterSpacing)

		// how much vertical space is between lines of terminal text.
		terminal?.setOption("lineHeight", savedThemeSettings.lineHeight)

		// should we allow the terminal to use the its proposed api?
		terminal?.setOption("allowProposedApi", true)

		// what "weighting" should be applied to bold fonts
		terminal?.setOption("fontWeightBold", 200)

		 // configure the terminal theme using the values from the settings store.
		terminal?.setOption("theme", {
			background: savedThemeSettings.backgroundColor,
			foreground: savedThemeSettings.foregroundColor,
			cursor: savedThemeSettings.cursorColor,
			cursorAccent: savedThemeSettings.cursorAccentColor,
			selection: savedThemeSettings.selectionColor
		})
	}

	/**
	 * Subscribe to the theme related subscriptions provided by the settings
	 * store. By subscribing to these events, each time a value in the
	 * settings store is changed, the new value will be applied to the
	 * terminal in real time through the use of
	 * ```
	 * terminal?.setOption("option", setting).
	 * ```
	* @param {Terminal} terminal the terminal that will receive the values of
	 * each subscription
	*/
	handleSubscriptions(terminal: Terminal) {
		this.cursorBlinkSubscription = this.settingsService.cursorBlinkSubject
			.subscribe((shouldCursorBlink) => terminal?.setOption("cursorBlink", shouldCursorBlink))

		this.cursorStyleSubscription = this.settingsService.cursorStyleSubject
			.subscribe((cursorStyle) => terminal?.setOption("cursorStyle", cursorStyle))

		this.fontSizeSubscription = this.settingsService.terminalFontSizeSubject
			.subscribe((size) => terminal?.setOption("fontSize", size))
	}

	/** Automatically unsubscribe from all subscriptions when the terminal is destroyed */
	ngOnDestroy(){
		this.cursorBlinkSubscription.unsubscribe()
		this.cursorStyleSubscription.unsubscribe()
		this.fontSizeSubscription.unsubscribe()
	}

}
