import { Component } from "@angular/core"

@Component({
	selector: "ng-xterm-terminal-settings",
	template: `
		<div class="container-fluid row-row-cols-2">
			<label class="form-label text-white position-absolute bottom-0 start-50 translate-middle-x">*Requires A Window Reload To Take Effect</label>
			<div class="col">
				<ng-xterm-background-settings></ng-xterm-background-settings>
			</div>
			<div class="col">
				<ng-xterm-foreground-settings></ng-xterm-foreground-settings>
			</div>
		</div>
	`,
	styles: [ `.form-label {
		font-size: 13px
	}` ]
})

/** Acts as a container to hold the various "sub" forms used to configure the app. */
export class GeneralSettingsComponent {}
