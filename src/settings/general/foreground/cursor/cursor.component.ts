import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { SettingsService } from "@shared/services"
import { Settings } from "@shared/utils"

@Component({
	selector: "ng-xterm-cursor-settings",
	templateUrl: "./cursor.component.html",
	styles: [ `.style-select {width: 85px !important;}` ]
})

export class CursorComponent implements OnInit {

	/** A type context referring to the type of FormGroup. */
	cursorSettingsForm: FormGroup

	/** The cursor color retrieved from the settings store. */
	cursorColor = this.settingsService.getItem(Settings.TERM_CURSOR_COLOR) as string

	/** The cursor style retrieved from the settings store. */
	cursorStyle = this.settingsService.getItem(Settings.TERM_CURSOR_STYLE) as string

	/** The preference of if the terminal cursor should blink, retrieved from the settings store. */
	cursorBlink = this.settingsService.getItem(Settings.TERM_CURSOR_BLINK) as boolean

	/** The cursor accent color retrieved from the settings store. */
	cursorAccentColor = this.settingsService.getItem(Settings.TERM_CURSOR_ACCENT_COLOR) as string

	/** The available cursor styles.*/
	cursorStyles: string[] = ["bar", "block", "underline"]

	constructor(private readonly settingsService: SettingsService) {}

	ngOnInit() {
		this.cursorSettingsForm = new FormGroup({
			"accent-color": new FormControl(this.cursorAccentColor),
			"should-blink": new FormControl(this.cursorBlink),
			"main-color": new FormControl(this.cursorColor),
			"style": new FormControl(this.cursorStyle)
		})
	}

	/**
	 * Set the color of the terminal cursor.
	 * @param {string} cursorColor the new color of the cursor.
	 * */
	setCursorColor(cursorColor: string) {
		// commit the new cursor color to the settings store.
		this.settingsService.setItem(Settings.TERM_CURSOR_COLOR, cursorColor)
	}

	/**
	 * Set the accent color of the terminal cursor.
	 * @param {string} accentColor the new accent color of the cursor.
	 * */
	setCursorAccentColor(accentColor: string) {
		// commit the new accent cursor color to the settings store.
		this.settingsService.setItem(Settings.TERM_CURSOR_ACCENT_COLOR, accentColor)
	}

	/**
	 * Set the true or false value of if the terminal cursor should blink.
	 * @param {boolean} shouldCursorBlink should the terminal cursor blink.
	 * */
	setCursorBlink(shouldCursorBlink: boolean) {
		// emit the new cursor blink value to all subscribers of the settingsService.cursorBlinkSubject subject
		this.settingsService.cursorBlinkSubject.next(shouldCursorBlink)

		// commit the true or false value to the settings store.
		this.settingsService.setItem(Settings.TERM_CURSOR_BLINK, shouldCursorBlink)
	}

	/**
	 * Set the style of the terminal cursor.
	 * @param {string} cursorStyle the new style of the cursor ["bar", "line", "block"]
	 * */
	setCursorStyle(cursorStyle: string) {
		// emit the new cursor style to all subscribers of the settingsService.cursorStyleSubject
		this.settingsService.cursorStyleSubject.next(cursorStyle)

		// commit the new cursor style to the settings store.
		this.settingsService.setItem(Settings.TERM_CURSOR_STYLE, cursorStyle)
	}
}
