import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { SettingsService } from "@services//settings.service"
import { AppSettings } from "@utils/constants"

@Component({
	selector: "ng-xterm-cursor-settings",
	templateUrl: "./cursor.component.html",
	styles: [ `
		.bi {
			font-size: 20px !important;
			color: aliceblue;
			font-weight: bold;
			color-adjust: exact;
			color-rendering: optimizeQuality;
			margin-right: 5px;
		}
	` ]
})


/** Customize the color(s) and style of the terminal cursor.*/
export class CursorComponent implements OnInit {

	/** A FormGroup variable which is used to configure the cursor settings form */
	cursorSettingsForm: FormGroup

	/**
	 * A string value used to hold the preferred cursor color
	 * retrieved from the settings store.
	 * */
	cursorColor: string

	/**
	 * A string value used to hold the preferred cursor style
	 * retrieved from the settings store.
	 * */
	cursorStyle: string

	/**
	 * A boolean value used to hold the preference of
	 * if the terminal cursor should blink.
	 * */
	cursorBlink: boolean

	/**
	 * A string value used to hold the preferred cursor accent color
	 * retrieved from the settings store.
	 * */
	cursorAccentColor: string

	/**
	 * A string array value used to hold available cursor styles.
	 * */
	cursorStyles = ["bar", "block", "line"]

	constructor(private readonly settingsService: SettingsService) {}

	ngOnInit() {
		// get the cursor color from the settings store.
		this.cursorColor = this.settingsService.getItem(AppSettings.TERM_CURSOR_COLOR) as string

		// get the cursor accent color from the settings store.
		this.cursorAccentColor = this.settingsService.getItem(AppSettings.TERM_CURSOR_ACCENT_COLOR) as string

		// get the cursor blink value from the settings store.
		this.cursorBlink = this.settingsService.getItem(AppSettings.TERM_CURSOR_BLINK) as boolean

		// get the cursor style from the settings store.
		this.cursorStyle = this.settingsService.getItem(AppSettings.TERM_CURSOR_STYLE) as string

		// configure the form group which will handle the cursor settings
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
		// if the new value is equal to the current value, do not commit the changes.
		if(this.cursorColor == cursorColor) {
			return
		}
		// commit the new cursor color to the settings store.
		this.settingsService.setItem(AppSettings.TERM_CURSOR_COLOR, cursorColor)
	}

	/**
	 * Set the accent color of the terminal cursor.
	 * @param {string} accentColor the new accent color of the cursor.
	 * */
	setCursorAccentColor(accentColor: string) {
		// if the new value is equal to the current value, do not commit the changes.
		if(this.cursorAccentColor == accentColor) {
			return
		}
		// commit the new accent cursor color to the settings store.
		this.settingsService.setItem(AppSettings.TERM_CURSOR_ACCENT_COLOR, accentColor)
	}

	/**
	 * Set the true or false value of if the terminal cursor should blink.
	 * @param {boolean} shouldCursorBlink should the terminal cursor blink.
	 * */
	setCursorBlink(shouldCursorBlink: boolean) {
		// if the new value is equal to the current value, do not commit the changes.
		if(this.cursorBlink == shouldCursorBlink) {
			return
		}
		// commit the true or false value to the settings store.
		this.settingsService.setItem(AppSettings.TERM_CURSOR_BLINK, shouldCursorBlink)
	}

	/**
	 * Set the style of the terminal cursor..
	 * @param {string} cursorStyle the new style of the cursor ["bar", "line", "block"]
	 * */
	setCursorStyle(cursorStyle: string) {
		// if the new value is equal to the current value, do not commit the changes.
		if(this.cursorStyle == cursorStyle) {
			return
		}
		// commit the new cursor style to the settings store.
		this.settingsService.setItem(AppSettings.TERM_CURSOR_STYLE, cursorStyle)
	}
}
