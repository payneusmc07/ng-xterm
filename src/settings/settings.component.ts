import { Component } from "@angular/core"

@Component({
	selector: "ng-xterm-settings",
	template:   `
		<div class="mt-3 container-fluid">
			<label class="form-label text-white offset-2 main-label mb-3">*All Changes Will Trigger A Window Reload*</label>
			<div class="row row-cols-2">
				<div class="col"><ng-xterm-shell-settings></ng-xterm-shell-settings></div>
				<div class="col"><ng-xterm-font-finder></ng-xterm-font-finder></div>
			</div>
			<br>
			<div class="row"><div class="col"><ng-xterm-foreground-settings></ng-xterm-foreground-settings></div>
			</div>
			<br>
			<div class="row"><div class="col"><ng-xterm-cursor-settings></ng-xterm-cursor-settings></div></div>
			<br>
			<div class="row row-cols-3">
				<div class="col"><ng-xterm-tab-settings></ng-xterm-tab-settings></div>
				<div class="col"><ng-xterm-background-settings></ng-xterm-background-settings></div>
				<div class="col"><ng-xterm-window-controls></ng-xterm-window-controls></div>
			</div>
			<br>
			<div class="row"><div class="col"><ng-xterm-advanced-settings></ng-xterm-advanced-settings></div>
			</div>
		</div>
	`,
	styles: [`
		* {
			font-size: 12px !important;
		}
		.container-fluid {
			-webkit-app-region: drag;
			width: 100%;
		}

	` ],
})

/** The SettingsComponent simply acts as a container which holds
 * the other "sub" forms related to the various application settings.
 * Splitting each major setting/setting group into its own form makes managing the settings
 * and forms much easier, and they are not all crammed into one gigantic form.
 * */
export class SettingsComponent  {}
