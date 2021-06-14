import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { ElectronService } from "@services/electron.service"
import { FileSystemService } from "@services/file-system.service"
import { SettingsService } from "@services/settings.service"
import { AppSettings } from "@utils/constants"

@Component({
	selector: "ng-xterm-font-finder",
	template: `
		<div class="form-group d-flex" [formGroup]="fontSettingsForm">
			<i class="bi bi-fonts"></i>
			<select class="form-control text-white border-secondary form-control-sm font-select w-75"
			        formControlName="font-type"
			        id="font-select"
			        [value]="fonts"
			        ngbTooltip="Sets the font of the terminal"
			        (change)="getFontValue(fontSettingsForm.get('font-type').value)"
			>
				<option *ngFor="let font of fonts"
				        [ngValue]="font"
				>{{ font }}</option>
			</select>
		</div>
	`,
	styles: [ `
		.bi {
			font-size: 20px !important;
			color: aliceblue;
			font-weight: bold;
			margin-right: 5px;
		}
		.font-select {
			margin-left: -5px;
		}
	` ]
})

/** Control and configure the terminal related font settings */
export class FontComponent implements OnInit {

	/** A FormGroup variable which is used to configure the font settings form */
	fontSettingsForm: FormGroup
	/** The fonts returned by the call to this.getFonts() */
	fonts: string[]

	constructor(
		private readonly fileSystemService: FileSystemService,
		private readonly electronService: ElectronService,
		private readonly settingsService: SettingsService
	) {}

	ngOnInit() {
		// get the available system fonts
		this.getFonts()

		// configure the form group
		this.fontSettingsForm = new FormGroup({
			"font-type": new FormControl(this.settingsService.getItem(AppSettings.TERM_FONT) as string),
		})
	}

	/**
	 * Use the fileSystemService to read the fonts directory and use its contents to populate the font form select.
	 * */
	getFonts() {
		this.fileSystemService.readDirectory(`${process.env.HOME}/Library/Fonts`)
			.then((entry) => {
				this.fonts = entry
			})
	}

	/**
	 * Get the font selected by the user, and save it to the settings store.
	 * @param {string} font the font value from #font-select.
	 * */
	getFontValue(font: string) {
		this.settingsService.setItem(AppSettings.TERM_FONT, font)
	}

}
