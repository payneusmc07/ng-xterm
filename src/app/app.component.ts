import { Component, OnInit } from "@angular/core"
import { SettingsService } from "@services/settings.service"
import { AppSettings } from "@shared/utils/constants"
import { Subject } from "rxjs"

@Component({
	selector: "app-root",
	template: `
		<ng-xterm-app-topbar [tabID]="idFromTab"></ng-xterm-app-topbar>
		<ng-xterm-tabs (tabID)="setID($event)"></ng-xterm-tabs>
	`
})

export class AppComponent implements OnInit {

	/** The id of the currently selected tab in the tabs component. */
	idFromTab: number | string

	/** Assigned to the tab ID which was emitted from the tabs component. */
	id: Subject<string | number>

	/** By "declaring" the various
	 * services used by this component in the constructor, we can
	 * take advantage of Angular dependency injection to properly configure
	 * and instantiate the services.
	 * */
	constructor(private readonly settingsService: SettingsService) {}

	ngOnInit(){
		/** Create a new subject so we can receive the tab id which
		 was emitted from the tabs component. */
		this.id = new Subject()

		/** Set the background color of the window to match what is stored
		in the application settings store. */
		document.body.style.backgroundColor = this.settingsService.getItem(AppSettings.APP_BG_COLOR) as string
	}

	/**
	 * @param {number} $event the id of the currently selected tab in the tabs component.
	 * */
	setID($event: number) {
		// set the member variable idFromTab equal to the received tabID
		this.idFromTab = $event
		// display the ID of the active tab
		this.id.next($event)
	}
}
