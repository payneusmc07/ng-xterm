import { Component, Input} from "@angular/core"

@Component({
	selector: "ng-xterm-top-bar",
	template: `
		<ul class="nav text-nowrap navbar-expand">
			<li class="nav-item">
				<a class="nav-link">
					<p class="title">{{ title }}</p>
				</a>
			</li>
			<li><ng-content></ng-content></li>
		</ul>
	`,
	styles: [ `
		.title {
			color: aliceblue !important;
			margin-left: 3.15rem;
		}
		.nav {
			font-family: "Hack Nerd Font", sans-serif;
			-webkit-app-region: drag;
			font-size: 14px !important;
		}
	`],
})

export class TopBarComponent {
	/** the current (active ui tab) */
	@Input() tabNumber: number

	/** the number of the current node-pty session */
	@Input() ptyNumber: number

	/** the OSC 2 title of the terminal. @see https://xtermjs.org/docs/api/vtfeatures/ */
	@Input() title: any

	constructor() {}


}
