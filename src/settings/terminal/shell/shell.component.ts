import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { SettingsService } from "@services/settings.service"
import { AppSettings } from "@utils/constants"

@Component({
	selector: "ng-xterm-shell-settings",
	template: `
		<div class="form-group d-inline-flex" [formGroup]="shellSettingsForm">
			<i class="bi bi-terminal-fill"></i>
				<select class="form-control form-control-sm text-white border-secondary"
				        formControlName="shell-type"
				        (change)="setShell(shellSettingsForm.get('shell-type').value)"
				        [value]="shells"
				        ngbTooltip="Sets the type of shell to be spawned by the underlying pty/tty">
				<option *ngFor="let shell of shells"
				       [ngValue]="shell">{{ shell }}</option>
				</select>
		</div>
	`,
	styles: [ `
		.bi {
			font-size: 20px !important;
			color: aliceblue;
			font-weight: bold;
			color-adjust: exact;
			margin-right: 5px;
		}
		select {
			width: 150px;
		}
	` ]
})

/** Configure the type of shell spawned by node-pty */
export class ShellComponent implements OnInit {

	/** A FormGroup variable which is used to configure the shell settings form */
	shellSettingsForm: FormGroup
	shells: string[] = ["zsh", "bash", "ksh", "tcsh", "fish"]
	shellTypes: any
	shellType: string

	constructor(private readonly settingsService: SettingsService) {}

	ngOnInit() {
		this.shellType = this.settingsService.getItem(AppSettings.TERM_SHELL_TYPE) as string

 		// configure the form group which will handle getting/setting the shell spawned by node-pty.
		this.shellSettingsForm = new FormGroup({
			"shell-type": new FormControl(this.shellType)
		})
	}

	/**
	 * Set the shell session which will be spawned by node-pty.
	 * @param {string} shell the type of shell spawned by node-pty
	 * */
	setShell(shell: string) {
		this.settingsService.setItem(AppSettings.TERM_SHELL_TYPE, shell)
	}

}
