import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { SettingsService } from "@services/settings.service"
import { AppSettings } from "@shared/utils/constants"

@Component({
	selector: "ng-xterm-foreground-settings",
	templateUrl: "./foreground.component.html",
	styles: [`
		.bi {
			font-size: 20px !important;
			color: aliceblue;
			font-weight: bold;
			color-adjust: exact;
			color-rendering: optimizeQuality;
			margin-right: 5px;
		}

		.form-control {
			min-width: 50px;
		}

	`]
})

/** Customize the foreground of the terminal, and terminal tabs.*/
export class ForegroundComponent implements OnInit {

	/** A FormGroup variable which is used to configure the font settings form */
	foregroundSettingForm: FormGroup

	/**
	 * A string value used to hold the preferred terminal font value
	 * retrieved from the settings store.
	 * */
	fontColor: string

	/**
	 * A number value used to hold the preferred terminal font size value
	 * retrieved from the settings store.
	 * */
	fontSize: number

	/**
	 * A number value used to hold the preferred terminal line height value
	 * retrieved from the settings store.
	 * */
	lineHeight: number

	/**
	 * A number value used to hold the preferred terminal letter spacing value
	 * retrieved from the settings store.
	 * */
	letterSpacing: number

	/**
	 * A number value used to hold the preferred text selection color
	 * retrieved from the settings store.
	 * */
	selectionColor: string

	/**
	 * A number value used to hold the preferred terminal font style
	 * retrieved from the settings store.
	 * */
	fontStyle

	constructor(private readonly settingsService: SettingsService) {}

	ngOnInit() {
		// get the font color from the settings store.
		this.fontColor = this.settingsService.getItem(AppSettings.TERM_FG_COLOR) as string

		// get the font size from the settings store.
		this.fontSize = +this.settingsService.getItem(AppSettings.FONT_SIZE)

		// get the terminal selection color from the settings store.
		this.selectionColor = this.settingsService.getItem(AppSettings.TERM_SELECTION_COLOR) as string

		// get the letter spacing value from the settings store.
		this.letterSpacing = +this.settingsService.getItem(AppSettings.TERM_LETTER_SPACING)

		// get the line height (space between lines of text in the terminal) value from the settings store.
		this.lineHeight = +this.settingsService.getItem(AppSettings.TERM_LINE_HEIGHT)

		// configure the form
		this.foregroundSettingForm = new FormGroup({
			"font-size": new FormControl(this.fontSize),
			"font-color": new FormControl(this.fontColor),
			"line-height": new FormControl(this.lineHeight),
			"letter-spacing": new FormControl(this.letterSpacing),
			"selection-color": new FormControl(this.selectionColor),
			"font-selector": new FormControl("")
		})
	}

	/**
	 * Set the terminal font size.
	 * @param {number} size the size of the terminal font.
	 * */
	setFontSize(size: number | string) {
		// if the current value is equal to the stored value, do not commit the changes.
		if(this.fontSize == size) {
			return
		}
		// commit the new font size to the settings store.
		this.settingsService.setItem(AppSettings.FONT_SIZE, +size)
	}

	/**
	 * Set the terminal font color.
	 * @param {string} color the new terminal font color.
	 * */
	setFontColor(color: string) {
		// if the current value is equal to the stored value, do not commit the changes.
		if(this.fontColor === color) {
			return
		}
		document.body.style.color = color
		// commit the new font color to the settings store.
		this.settingsService.setItem(AppSettings.TERM_FG_COLOR, color)
	}

	/**
	 * Set the terminal line height.
	 * @param {number} lineHeight the amount of vertical space between lines of terminal text.
	 * */
	setLineHeight(lineHeight: number) {
		// if the current value is equal to the stored value, do not commit the changes.
		if(this.lineHeight == lineHeight) {
			return
		}
		// commit the new line height to the settings store.
		this.settingsService.setItem(AppSettings.TERM_LINE_HEIGHT, lineHeight)
	}

	/**
	 * Set the text selection color for the terminal.
	 * @param {string} selectionColor the background color which will appear when terminal text is highlighted.
	 * */
	setSelectionColor(selectionColor: string) {
		// if the current value is equal to the stored value, do not commit the changes.
		if(this.selectionColor == selectionColor) {
			return
		}
		// commit the new text selection color to the settings store.
		this.settingsService.setItem(AppSettings.TERM_SELECTION_COLOR, selectionColor)
	}

	/**
	 * Set the amount of space between letters.
	 * @param {number} spaceBetweenLetters the amount of horizontal space between letters of the terminal buffer.
	 * */
	setLetterSpacing(spaceBetweenLetters: number) {
		// if the current value is equal to the stored value, do not commit the changes.
		if(this.letterSpacing == spaceBetweenLetters) {
			return
		}
		// commit the new letter spacing value to the settings store.
		this.settingsService.setItem(AppSettings.TERM_LETTER_SPACING, spaceBetweenLetters)
	}

}
