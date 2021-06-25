import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"

@Component({
	selector: "ng-xterm-top-bar",
	template: `
		<div class="container-fluid" [formGroup]="themeSettingsForm">
			<ul class="nav text-nowrap navbar-expand position-fixed sticky-top mb-2">
				<li class="nav-item">
					<a class="nav-link text-white">
						<p class="title">{{ title }}</p>
					</a>
				</li>
				<li><ng-content></ng-content></li>
			</ul>
		</div>

	`,
	styles: [ `
		.title {
			margin-left: 3.15rem;
		}
		.nav {
			-webkit-app-region: drag;
			-webkit-user-select: none;
			font-size: 13px !important;
		}
		select {
			margin-top: 1.3px;
			font-size: 13px !important;
			position: relative;
			z-index: 2;
		}
	`],
})

export class TopBarComponent implements OnInit {
	/** the current (active ui tab) */
	@Input() tabNumber: number

	/** the number of the current node-pty session */
	@Input() ptyNumber: number

	/** the OSC 2 title of the terminal. @see https://xtermjs.org/docs/api/vtfeatures/ */
	@Input() title: any

	@Output() foregroundColor = new EventEmitter<string>()

	themeSettingsForm: FormGroup
	foreground: string

	constructor() {}

	ngOnInit() {
		this.themeSettingsForm = new FormGroup({
			"foreground": new FormControl()
		})
	}

	emitForegroundColor($event) {
		this.foregroundColor.emit($event)
	}


}
