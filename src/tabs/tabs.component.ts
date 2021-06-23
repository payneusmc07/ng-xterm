import {
	Component,
	OnDestroy,
	OnInit,
	Output,
	EventEmitter
} from "@angular/core"
import { TabService } from "@tabs/tab.service"
import { Observable } from "rxjs"
import { SplitPanelComponent } from "@tabs/tab/split-panel.component"
import { IPCChannelNames, Tab  } from "@shared/utils"
import { ElectronService } from "@shared/services"

@Component({
	selector: "ng-xterm-tabs",
	templateUrl: "./tabs.component.html",
	styleUrls: [ "./tabs.component.scss" ],
})

export class TabsComponent implements OnInit, OnDestroy {
	/**	Used to emit the id of the active tab to the ng-xterm-topbar-component
	 * so it can be displayed.  */
	@Output() tabID: EventEmitter<string | number> = new EventEmitter<number | string>()

	/** Required by ng-bootstrap to mark the active tab */
	active

	/** Represents the content of each tab. */
	tabContainer: SplitPanelComponent

	/** Represents the array of TabsComponents received from the tabService. */
	tabComponents: Tab[]

	/** Used as the iterator by *ngFor when lopping through the returned tabs.  */
	tabContent$: Observable<Tab[]>

	/** Each time a new tab is added, this number is incremented by 1 and is
	 * used to assign each new tab a unique id .*/
	counter = 0

	/** Represents the tab to be removed from the ui. */
	tabToRemove: number

	constructor(
		private readonly tabService: TabService,
		private readonly electronService: ElectronService
	) {}

	ngOnInit() {
		// get the initial amount of tabs to display.
		this.tabContent$ = this.tabService.getTabs()

		// listen for an ipc event to add a new tab
		this.electronService.ipcRenderer.on(IPCChannelNames.NEW_TAB, () => {
			this.tabService.addTerminal(this.counter++, this.tabContainer)
		})
	}

	/**
	 * Use the tabService to remove a terminal tab
	* @param { number } tab the tab to be removed
	* @returns
	*/
	removeTab(tab: number) {
		this.tabToRemove = tab
		this.tabService.removeTerminal(tab)
	}

	/**
	 * When the user clicks on a tab, emit its id to the ng-xterm-topbar-component
	 * so it can be displayed.
	 * @param {number | string} id the tab id to be emitted to the ng-xterm-topbar-component
	 * */
	emitTabID(id: number | string) {
		this.tabID.emit(id)
	}

	/** Remove any active ipcRenderer listeners */
	ngOnDestroy(){
		this.electronService.ipcRenderer.removeAllListeners(IPCChannelNames.NEW_TAB)
	}
}
