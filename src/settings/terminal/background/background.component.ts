import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { ElectronService } from "@services/electron.service"
import { SettingsService } from "@services/settings.service"
import { AppSettings, IPCChannelNames } from "@utils/constants"

@Component({
	selector: "ng-xterm-background-settings",
	template: `
		<div class="form-group" [formGroup]="backgroundSettingsForm">
			<div class="row row-cols-2 justify-content-evenly">
				<div class="col">
					<i class="bi bi-window"></i>
					<i class="bi bi-palette-fill"></i>
					<input
						id="bg-color"
						ngbTooltip="Sets the application background color"
						(change)="setBackgroundColor(backgroundSettingsForm.get('color').value)"
						formControlName="color"
						[value]="backgroundColor"
						type="color"
						class="form-control form-control-color bg-transparent border-0"
					/>
				</div>
				<div class="col">
					<i class="bi bi-window"></i>
					<i class="bi bi-percent"></i>
					<input
						(select)="setBackgroundTransparency(backgroundSettingsForm.get('transparency').value)"
						formControlName="transparency"
						[value]="backgroundTransparency"
						type="number"
						step="0.05"
						max="1"
						min="0.4"
						ngbTooltip="Sets the application background transparency"
						class="form-control form-control-sm bg-dark border-secondary text-white">
				</div>
			</div>
		</div>
	`,
	styles: [`
		.bi {
			font-size: 20px !important;
			color: aliceblue;
			font-weight: bold;
			color-adjust: exact;
			color-rendering: optimizeQuality;
			margin-right: 5px;
		}
	`]
})

/** The form which modifies any settings related to the background of NG-Xterm. */
export class BackgroundComponent implements OnInit {

	/** A FormGroup variable which is used to configure the background settings form */
	backgroundSettingsForm: FormGroup

	/**
	 * A string value used to hold the preferred background color value
	 * retrieved from the settings store.
	 * */
	backgroundColor: string

	/**
	 * A number value used to hold the preferred background transparency value
	 * retrieved from the settings store.
	 * */
	backgroundTransparency: number

	/** By "declaring" the various
	 * services used by this component in the constructor, we can
	 * take advantage of Angular dependency injection to properly configure
	 * and instantiate the services.
	 * */
	constructor(
		private readonly settingsService: SettingsService,
		private readonly electronService: ElectronService
	) {}

	/**
	 * Since Electron Store returns an "unknown" value, each retrieved settings
	 * must be type cast to a specific value. Otherwise, Typescript will throw error code
	 * TS2322: Type 'unknown' is not assignable to type '[stored value]'.
	 * */
	ngOnInit() {

		// retrieve the background color from the settings store.
		this.backgroundColor = this.settingsService.getItem(AppSettings.APP_BG_COLOR) as string

		// retrieve the background transparency from the settings store.
		this.backgroundTransparency = +this.settingsService.getItem(AppSettings.APP_BG_TRANSPARENCY)

		// configure the form
		this.backgroundSettingsForm = new FormGroup({
			"color": new FormControl(this.backgroundColor),
			"transparency": new FormControl(this.backgroundTransparency)
		})
	}

	/**
	 * Set the background transparency for the application window.
	 * @param {number} transparencyLevel the new background transparency to be applied to the application window.
	 * */
	async setBackgroundTransparency(transparencyLevel: number) {
		// invoke the main process to set the background transparency.
		await this.electronService.ipcRenderer.invoke(IPCChannelNames.SET_BG_TRANSPARENCY, transparencyLevel)

		// send the new background transparency to the settings store.
		this.settingsService.setItem(AppSettings.APP_BG_TRANSPARENCY, transparencyLevel)
	}

	/**
	 * Set the background color for the application window.
	 * @param {string} backgroundColor the new background color to be applied to the application window.
	 * */
	async setBackgroundColor(backgroundColor: string) {
		// send the new background color to the settings store.
		this.settingsService.setItem(AppSettings.APP_BG_COLOR, backgroundColor)

		// invoke the main process to set the background color.
		await this.electronService.ipcRenderer.invoke(IPCChannelNames.SET_BG_COLOR, backgroundColor)
	}

}
