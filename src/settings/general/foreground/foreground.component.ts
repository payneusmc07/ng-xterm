import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { FileSystemService, SettingsService } from "@shared/services"
import { Settings } from "@shared/utils"

@Component({
	selector: "ng-xterm-foreground-settings",
	templateUrl: "./foreground.component.html",
	styles: [`
		.form-control { min-width: 50px;}
		.font-select {margin-left: -5px;}
		.form-label {font-size: 12px !important;}
	`]
})

/** Customize the foreground of the terminal, and terminal tabs.*/
export class ForegroundComponent implements OnInit {

	/** A type context referring to the type of FormGroup. */
	foregroundSettingForm: FormGroup

	/** The terminal font value retrieved from the settings store. */
	fontColor = this.settingsService.getItem(Settings.TERM_FG_COLOR) as string

	/** The terminal font size retrieved from the settings store. */
	fontSize = +this.settingsService.getItem(Settings.FONT_SIZE)

	/** The terminal line height value retrieved from the settings store. */
	lineHeight = +this.settingsService.getItem(Settings.TERM_LINE_HEIGHT)

	/** The terminal letter spacing value retrieved from the settings store. */
	letterSpacing = +this.settingsService.getItem(Settings.TERM_LETTER_SPACING)

	/** The text selection color retrieved from the settings store. */
	selectionColor = this.settingsService.getItem(Settings.TERM_SELECTION_COLOR) as string

	/** The terminal font style retrieved from the settings store. */
	fontStyle = this.settingsService.getItem(Settings.TERM_FONT) as string

	/** The terminal foreground color retrieved from the settings store. */
	foregroundColor = this.settingsService.getItem(Settings.TERM_FG_COLOR) as string

	/** The fonts returned by the call to this.getFonts() */
	fonts: string[]

	constructor(
		private readonly settingsService: SettingsService,
		private readonly fileSystemService: FileSystemService
	) {}

	/** Configure the foreground settings form. */
	ngOnInit() {
		this.getFonts()

		this.foregroundSettingForm = new FormGroup({
			"font-size": new FormControl(this.fontSize),
			"font-color": new FormControl(this.fontColor),
			"line-height": new FormControl(this.lineHeight),
			"letter-spacing": new FormControl(this.letterSpacing),
			"selection-color": new FormControl(this.selectionColor),
			"font-type": new FormControl(this.fontStyle ),
		})
	}

	/**
	 * Set the terminal font size.
	 * @param {number} size the size of the terminal font.
	 * */
	setFontSize(size: number | string) {
		// commit the new font size to the settings store.
		this.settingsService.setItem(Settings.FONT_SIZE, +size)

		// emit the new font size to all subscribers of the settingsService.terminalFontSizeSubject subject
		this.settingsService.terminalFontSizeSubject.next(+size)
	}

	/**
	 * Set the terminal font color.
	 * @param {string} color the new terminal font color.
	 * */
	setFontColor(color: string) {
		// commit the new font color to the settings store.
		this.settingsService.setItem(Settings.TERM_FG_COLOR, color)
	}

	/**
	 * Set the terminal line height.
	 * @param {number} lineHeight the amount of vertical space between lines of terminal text.
	 * */
	setLineHeight(lineHeight: number) {
		// commit the new line height to the settings store.
		this.settingsService.setItem(Settings.TERM_LINE_HEIGHT, lineHeight)
	}

	/**
	 * Set the text selection color for the terminal.
	 * @param {string} selectionColor the background color which will appear when terminal text is highlighted.
	 * */
	setSelectionColor(selectionColor: string) {
		// commit the new text selection color to the settings store.
		this.settingsService.setItem(Settings.TERM_SELECTION_COLOR, selectionColor)
	}

	/**
	 * Set the amount of space between letters.
	 * @param {number} spaceBetweenLetters the amount of horizontal space between letters of the terminal buffer.
	 * */
	setLetterSpacing(spaceBetweenLetters: number) {
		// commit the new letter spacing value to the settings store.
		this.settingsService.setItem(Settings.TERM_LETTER_SPACING, spaceBetweenLetters)
	}

	/**
	 * Use the fileSystemService to read the fonts directory, return its contents,
	 * and use said contents to populate the font selector.
	 * */
	getFonts() {
		this.fileSystemService.readDirectory(`${process.env.HOME}/Library/Fonts`)
			.then((entry) => this.fonts = entry)
	}

	/**
	 * Get the font selected by the user, and save it to the settings store.
	 * @param {string} font the font value from #font-select.
	 * */
	setFontFamily(font: string) {
		this.settingsService.setItem(Settings.TERM_FONT, font)
	}

}
