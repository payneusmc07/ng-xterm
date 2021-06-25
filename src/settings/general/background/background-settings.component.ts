import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { ElectronService, SettingsService } from "@shared/services"
import { IPCChannelNames, Settings } from "@shared/utils"

@Component({
	selector: "ng-xterm-background-settings",
	templateUrl: "./background-settings.component.html"
})

/** The form which modifies any settings related to the background of NG-Xterm. */
export class BackgroundSettingsComponent implements OnInit {

	/** Type context referring to the type of FormGroup. */
	backgroundSettingsForm: FormGroup

	/** The background color value retrieved from the settings store. */
	backgroundColor = this.settingsService.getItem(Settings.TERM_BG_COLOR) as string

	/** The background transparency value retrieved from the settings store. */
	backgroundTransparency = +this.settingsService.getItem(Settings.TERM_BG_TRANSPARENCY)

	/** The available window control choices. */
	windowControlStyles: string[] = ["Mac Style", "Dark Mac Style", "Windows Style"]

	/** The window control style retrieved from the settings store. */
	windowControlStyle = this.settingsService.getItem(Settings.WINDOW_CONTROL_STYLE) as string

	constructor(
		private readonly settingsService: SettingsService,
		private readonly electronService: ElectronService
	) {}

	/** Configure the background settings form */
	ngOnInit() {
		this.backgroundSettingsForm = new FormGroup({
			"color": new FormControl(this.backgroundColor),
			"transparency": new FormControl(this.backgroundTransparency),
			"window-control-style": new FormControl(this.windowControlStyle),
		})
	}

	/**
	 * Set the background transparency for the application window.
	 * @param {number} transparencyLevel the new background transparency to be applied to the application window.
	 * @returns {Promise<void>} a promise by the main process to set the background color of the window.
	 * */
	async setBackgroundTransparency(transparencyLevel: number): Promise<void> {
		// invoke the main process to set the background transparency.
		try {
			await this.electronService.rendererInvokeMainToPerformAction(IPCChannelNames.SET_BACKGROUND_TRANSPARENCY, transparencyLevel)
		}
		catch (e) {
			alert(e)
		}
	}

	/**
	 * Set the background color for the application window.
	 * @param {string} backgroundColor the new background color to be applied to the application window.
	 * @returns {Promise<void>} a promise by the main process to set the transparency of the window.
	 * */
	async setBackgroundColor(backgroundColor: string): Promise<void> {
		try {
			await this.electronService.rendererInvokeMainToPerformAction(IPCChannelNames.SET_BACKGROUND_COLOR, backgroundColor)
			// send the new background color to the settings store.
			this.settingsService.setItem(Settings.TERM_BG_COLOR, backgroundColor)
		}
		catch (e) {
			alert(e)
		}
	}

	/**
	 * Set the window control control style based off the
	 * value chosen from the "window-control-style" FormControl
	 *
	 * @param {string} controlStyle the styling of the application window controls
	 * */
	setWindowControlStyle(controlStyle: string) {
		switch (controlStyle) {
			// if the user chooses Mac OS traffic lights
			case "Mac Style":
				// emit the new window control style to all subscribers of the settingsService.windowControlStyleSubject
				this.settingsService.windowControlSubject.next("mac")
				this.settingsService.setItem(Settings.WINDOW_CONTROL_STYLE, "mac") // commit the changes to the settings store.


				break
			// if the user chooses Dark Mac OS traffic lights
			case "Dark Mac Style":
				// emit the new window control style to all subscribers of the settingsService.windowControlStyleSubject
				this.settingsService.windowControlSubject.next("darkMac")
				this.settingsService.setItem(Settings.WINDOW_CONTROL_STYLE, "darkMac") // commit the changes to the settings store.
				break
			// if the user chooses Windows style controls.
			case "Windows Style":
				// emit the new window control style to all subscribers of the settingsService.windowControlStyleSubject
				this.settingsService.windowControlSubject.next("windows")
				this.settingsService.setItem(Settings.WINDOW_CONTROL_STYLE, "windows") // commit the changes to the settings store.
				break
			// if no valid selection made, exit the function
			default:
				return
		}
	}
}
