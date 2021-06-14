import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { SettingsService } from "@shared/services"
import { AppSettings } from "@shared/utils"

@Component({
	selector: "ng-xterm-tab-settings",
	template: `
		<div class="form-group mb-3" [formGroup]="tabSettingsForm">
			<div class="row row-cols-2 justify-content-evenly">
				<div class="col">
					<i class="bi bi-segmented-nav"></i>
					<i class="bi bi-palette-fill"></i>
					<input (change)="setTabBackgroundColor(tabSettingsForm.get('tab-background').value)"
					       [value]="tabBackgroundColor"
					       ngbTooltip="Sets the background color of the terminal tabs"
					       formControlName="tab-background"
					       type="color"
					       class="form-control form-control-color bg-transparent border-0"
					/>
				</div>
				<div class="col">
					<i class="bi bi-segmented-nav"></i>
					<i class="bi bi-palette2"></i>
					<input (change)="setTabForegroundColor(tabSettingsForm.get('tab-foreground').value)"
					       [value]="tabForegroundColor"
					       formControlName="tab-foreground"
					       type="color"
					       ngbTooltip="Sets the foreground color of the terminal tabs"
					       class="form-control form-control-color bg-transparent border-0"
					/>
				</div>
			</div>
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
		.form-control {
			min-width: 50px;
		}
	` ]
})

/** The form which modifies any settings related to the ng-xterm-tabs component */
export class TabSettingsComponent implements OnInit {

	/** A FormGroup variable which is used to configure the tab settings form */
	tabSettingsForm: FormGroup

	/**
	 * A string value used to hold the preferred foreground (font)
	 * color for the ng-xterm-tabs component.
	 * */
	tabBackgroundColor: string

	/**
	 * A string value used to hold the preferred background
	 * color for the ng-xterm-tabs component.
	 * */
	tabForegroundColor: string

	/** By "declaring" the various
	 * services used by this component in the constructor, we can
	 * take advantage of Angular dependency injection to properly configure
	 * and instantiate the services.
	 * */
	constructor(private readonly settingsService: SettingsService) {}

	ngOnInit() {
		// retrieve the background color from the settings store.
		this.tabBackgroundColor = this.settingsService.getItem( AppSettings.TAB_BG_COLOR) as string

		// retrieve the foreground color from the settings store.
		this.tabForegroundColor = this.settingsService.getItem(AppSettings.TAB_FG_COLOR) as string

		// configure the form
		this.tabSettingsForm = new FormGroup({
			"tab-background": new FormControl(this.tabBackgroundColor),
			"tab-foreground": new FormControl(this.tabForegroundColor),
		})
	}

	/**
	 * Set the background color of the application tabs.
	 * @param {string} backgroundColor the new background color of the application tabs.
	 * */
	setTabBackgroundColor(backgroundColor: string) {
		// if the selected value is the same as the current value, do not commit the changes.
		if(this.tabBackgroundColor == backgroundColor) {
			return
		}
		 // send the new background color to the settings store.
		this.settingsService.setItem(AppSettings.TAB_BG_COLOR, backgroundColor)

	}

	/**
	 * Set the foreground color of the application tabs.
	 * @param {string} foregroundColor the new foreground color of the application tabs.
	 * */
	setTabForegroundColor(foregroundColor: string) {
		// if the selected value is the same as the current value, do not commit the changes.
		if(this.tabForegroundColor == foregroundColor) {
			return
		}
		// send the new foreground color to the settings store.
		this.settingsService.setItem(AppSettings.TAB_FG_COLOR, foregroundColor)
	}
}
