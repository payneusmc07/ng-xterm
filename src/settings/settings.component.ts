import { Component } from "@angular/core"

@Component({
	selector: "ng-xterm-settings",
	template:   `
		<ul class="nav text-nowrap
		navbar-expand position-absolute top-0 start-50 translate-middle-x mt-2">
			<li class="nav-item">
				<a class="nav-link" >
					<a routerLink="general" routerLinkActive="active">General</a>
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link">
					<a routerLink="advanced" routerLinkActive="active">Advanced</a>
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link">
					<a routerLink="misc" routerLinkActive="active">Misc</a>
				</a>
			</li>
		</ul>
		<router-outlet></router-outlet>
	`,
	styles: [`
		* {font-size: 14px !important;}
		.active { color: white }
		a {color: grey}
	` ],
})

/** The SettingsComponent simply acts as a container which holds
 * the other "sub" forms related to the various application settings.
 * Splitting each major setting/setting group into its own form makes managing the settings
 * and forms much easier, and they are not all crammed into one gigantic form.
 * */
export class SettingsComponent {}
