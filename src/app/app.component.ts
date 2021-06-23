import { Component, OnInit } from "@angular/core"
import { SettingsService } from "@services/settings.service"
import { Settings } from "@shared/utils"
import { Subject } from "rxjs"

@Component({
	selector: "ng-xterm-root",
	template: `
		<ng-xterm-app-topbar [tabID]="idFromTab"></ng-xterm-app-topbar>
		<ng-xterm-tabs (tabID)="setID($event)"></ng-xterm-tabs>
	`
})

export class AppComponent implements OnInit {

	/** The id of the currently selected tab in the ng-xterm-tabs-component. */
	idFromTab: number | string

	/** Assigned to the tab ID which was emitted from the ng-xterm-tabs-component. */
	id: Subject<string | number>

	constructor(private readonly settingsService: SettingsService) {}

	ngOnInit(){
		/** Create a new subject so we can receive the tab id which
		 emitted from the ng-xterm-tabs-component. */
		this.id = new Subject()

		/** Set the background color of the window to match what is stored
		in the settings store. */
		document.body.style.backgroundColor = this.settingsService.getItem(Settings.TERM_BG_COLOR) as string
	}

	/** Display the active tab id in the top bar next to the terminal icon
	 * @param {number} $event the id of the currently selected tab. */
	setID($event: number) {
		// set the member variable idFromTab equal to the received tabID
		this.idFromTab = $event
		// display the ID of the active tab
		this.id.next($event)
	}
}
