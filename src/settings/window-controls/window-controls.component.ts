import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { SettingsService } from "@shared/services"
import { AppSettings } from "@shared/utils"

@Component({
	selector: "ng-xterm-window-controls",
	template: `
		<div class="form-group" [formGroup]="windowControlSettingsForm">
			<i class="bi bi-window"></i>
			<i class="bi bi-border-style"></i>
			<select class="form-control form-control-sm border-secondary text-white"
			        [value]="windowControlStyles"
			        formControlName="window-control-style"
			        ngbTooltip="Sets the style of the application window controls"
			        (change)="setWindowControlStyle(windowControlSettingsForm.get('window-control-style').value)"
			>
				<option *ngFor="let controlStyle of windowControlStyles"
				        [ngValue]="controlStyle"
				>{{ controlStyle }}</option>
			</select>
		</div>
	`,
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

/**
 * Allow the user to chose between 3 different types of window controls.
 * 1: Standard Mac OS traffic lights (the default).
 * 2: Blacked out Mac OS traffic lights.
 * 3: Windows style controls.
 * */
export class WindowControlsComponent implements OnInit {

	/** A FormGroup variable which is used to configure the window control settings form */
	windowControlSettingsForm: FormGroup

	/**
	* A string array value used to hold the types of available window controls
	* */
	windowControlStyles: string[] = ["Mac Style", "Dark Mac Style", "Windows Style"]

	/**
	 * A string value used to hold the preferred window control style that was
	 * retrieved from the settings store.
	 * */
	windowControlStyle: string

	constructor(private readonly settingsService: SettingsService) {}

	ngOnInit() {
		// the user preference retrieved from the settings store
		this.windowControlStyle = this.settingsService.getItem(AppSettings.WINDOW_CONTROL_STYLE) as string

		// set the value to be displayed in the form as the current value
		this.setWindowControlDisplayValue(this.windowControlStyle)

		// configure the form
		this.windowControlSettingsForm = new FormGroup({
			"window-control-style": new FormControl(this.windowControlStyle),
		})
	}

	/**
	 * Set the style of the app window controls based off the
	 * value chosen from the "window-control-style" FormControl
	 *
	 * @param {string} controlStyle the styling of the application window controls
	 * */
	setWindowControlStyle(controlStyle: string) {
		switch (controlStyle) {
			// if the user chooses Mac OS traffic lights
			case "Mac Style":
				this.settingsService.setItem(AppSettings.WINDOW_CONTROL_STYLE, "mac")
				break
			// if the user chooses Dark Mac OS traffic lights
			case "Dark Mac Style":
				this.settingsService.setItem(AppSettings.WINDOW_CONTROL_STYLE, "darkMac")
				break
			// if the user chooses Windows style controls.
			case "Windows Style":
				this.settingsService.setItem(AppSettings.WINDOW_CONTROL_STYLE, "windows")
				break
			// if no valid selection made, exit the function
			default:
				return
		}
	}

	/**
	 * Translate the window control setting text received from the setting
	 * store into something more "visually" appealing to display in the
	 * "window-control-style" FormControl.
	 *
	 * @example
	 * mac = Mac Style
	 * macDark = Dark Mac Style
	 * windows = Windows Style
	 * */
	private setWindowControlDisplayValue(controlStyle: string) {
		switch (controlStyle) {
			case "mac":
				// if the user chooses Mac OS traffic lights
				this.windowControlStyle = this.windowControlStyles[0]
				break
			// if the user chooses Dark Mac OS traffic lights
			case "darkMac":
				this.windowControlStyle = this.windowControlStyles[1]
				break
			// if the user chooses Windows style controls.
			case "windows":
				this.windowControlStyle = this.windowControlStyles[2]
				break
			// if no valid selection made, exit the function
			default:
				return
		}
	}
}
