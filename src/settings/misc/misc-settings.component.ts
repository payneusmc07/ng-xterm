import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import {
	CommandRunnerService,
	ElectronService,
	FileSystemService,
	SettingsService
} from "@shared/services"
import { IPCChannelNames, locations } from "@shared/utils"

@Component({
	selector: "ng-xterm-misc-settings",
	templateUrl: "./misc-settings.component.html"
})

export class MiscSettingsComponent implements OnInit {
	/** Type context referring to the type FormGroup. */
	miscSettingsForm: FormGroup

	installFontsButtonLabel: string

	/** The value of if automatic updating is active retrieved from the setting store. */
	autoUpdateEnabled = this.settingsService.getItem(Settings.AUTO_UPDATE) as boolean

	/** Does the fonts directory exist?  */
	doesFontsDirectoryExist = this.fileSystemService.checkIfPathExists(locations.FONTS_DIRECTORY)

	constructor(
		private readonly settingsService: SettingsService,
		private readonly commandRunnerService: CommandRunnerService,
		private readonly fileSystemService: FileSystemService,
		private readonly electronService: ElectronService
	) {}

	ngOnInit() {
		// set the install fonts button text based on if the powerline
		// fonts collection is installed or not.
		!this.doesFontsDirectoryExist
			? this.installFontsButtonLabel = "Install"
			: this.installFontsButtonLabel = "Uninstall"

		this.miscSettingsForm = new FormGroup({
			"auto-update": new FormControl(this.autoUpdateEnabled)
		})
	}

	/**
	 * @param {boolean} shouldAutoUpdate if new updates should be automatically
	 * downloaded and installed.
	 * @returns {Promise<void>} a promise by the main process to update the appSettings store,
	 */
	async setAutoUpdate(shouldAutoUpdate: boolean): Promise<void> {
		try {
			await this.electronService.rendererInvokeMainToPerformAction(IPCChannelNames.AUTO_UPDATE, shouldAutoUpdate)
			this.settingsService.setItem(Settings.AUTO_UPDATE, shouldAutoUpdate as boolean)
		}
		catch (e) {
			alert(e)
		}

	}

	/**
	 * Install or remove the Powerline font collection based
	 * on if they are already installed
	 * */
	async handleFontInstallationOrRemoval() {
		// if the fonts are not installed
		if(!this.doesFontsDirectoryExist) {
			try {
				await this.commandRunnerService.runCommandAsUser(`cd ${ locations.FONTS_DIRECTORY } && git clone https://github.com/powerline/fonts.git --depth=1 && bash ./install.sh`)
				// update the button text to reflect the new status
				this.installFontsButtonLabel = "Uninstall"
			}
			catch (e) {
				alert(e)
			}
		}
		// if the fonts are installed
		else {
			try {
				await this.commandRunnerService.runCommandAsUser(`cd ${ locations.FONTS_DIRECTORY } && git clone https://github.com/powerline/fonts.git --depth=1 && bash ./uninstall.sh`)
				// update the button text to reflect the new status
				this.installFontsButtonLabel = "Install"
			}
			catch (e) {
				alert(e)
			}
		}
}

}
