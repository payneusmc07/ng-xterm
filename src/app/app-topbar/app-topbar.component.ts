import { Component, OnInit, Input, OnDestroy, } from "@angular/core"
import { SettingsService, ElectronService } from "@shared/services"
import { TabService } from "@tabs/tab.service"
import { SplitPanelComponent } from "@tabs/tab/split-panel.component"
import { Settings, IPCChannelNames } from "@shared/utils"
import { Subscription } from "rxjs"

@Component({
	selector: "ng-xterm-app-topbar",
	templateUrl: "./app-topbar.component.html",
	styleUrls: [ "./app-topbar.component.scss" ]
})

/**
 * Being a Mac OS user, I have always been a huge fan of iTerm2, namely its UI layout and
 * overall aesthetics. I chose to create a custom topbar (or navbar) for
 * NG-Xterm so I could implement some features in a manner similar to iTerm2, while
 * being able to but my own "spin" on things and allow for some unique customizations
 * which are not possible with the standard Electron window controls
 *
 * a: Change the style of the window controls between the standard Mac OS
 *      "traffic lights", Windows style controls, and blacked out Mac OS traffic lights.
 *
 * b: Display the active tab in a way which was clearly visible, but non obtrusive.
 *
 * c: Provide dedicated buttons for adding and removing tabs if the user does
 *    not wish to use the context menu.
 *
 * */
export class AppTopbarComponent implements OnInit, OnDestroy {

	/**
	 * When the user clicks on a tab in the ng-xterm-tabs-component, an event emitter
	 * fires and sends the ID of the current tab. This Input() acts as a receiver to "catch"
	 * the emitted value. */
	@Input() tabID: number | string

	/** type context referring to the type of SplitPanelComponent   */
	splitContainer: SplitPanelComponent

	/** Used to provide an ID to each tab that is added to the UI.
	 * As tabs are added, this number increments by 1.*/
	counter = 0

	/** Has the user has opted to the dark mode style of the mac traffic lights? */
	darkMacControls = false

	/** Has the user has opted to use Windows style controls? */
	windowsStyleControls = false

	/** The preferred style of window controls retrieved from the settings store. */
	windowControlStyle = this.settingsService.getItem(Settings.WINDOW_CONTROL_STYLE) as string

	/** Subscribe to events related to switching the window control style */
	windowControlSubject: Subscription

	constructor(
		private readonly electronService: ElectronService,
		private readonly tabService: TabService,
		private readonly settingsService: SettingsService
	) {}


	ngOnInit(){
		this.toggleWindowControlStyle(this.windowControlStyle)

		this.windowControlSubject = this.settingsService.windowControlSubject
			.subscribe((value) => {
				/* switch over the value returned by the subscription
				and adjust the window controls accordingly
				 */
				switch (value) {
					case "mac":
						this.windowsStyleControls = false
						this.darkMacControls = false
						break
					case "windows":
						this.windowsStyleControls = true
						this.darkMacControls = false
						break
					case "darkMac":
						this.windowsStyleControls = false
						this.darkMacControls = true
						break
					default:
						return
				}
			})
	}

	/**
	 * Use the ipcRenderer to invoke the main processes to minimize the browser window.
	 * @returns a promise from the main processes to minimize the browser window.
	 * */
	async minimizeWindow(): Promise<void> {
		try {
			await this.electronService.rendererInvokeMainToPerformAction(IPCChannelNames.MINIMIZE_WINDOW)
		}
		catch (e) {
			alert(e)
		}
	}

	/**
	 * Use the ipcRenderer to invoke the main processes to maximize the browser window.
	 * @returns a promise from the main processes to maximize the browser window.
	 * */
	async maximizeWindow(): Promise<void> {
		try {
			await this.electronService.rendererInvokeMainToPerformAction(IPCChannelNames.MAXIMIZE_WINDOW)
		}
		catch (e) {
			alert(e)
		}
	}

	/**
	 * Use the ipcRenderer to invoke the main processes to close the browser window.
	 * @returns a promise from the main processes to close the browser window.
	 * */
	async closeWindow(): Promise<void> {
		try {
			await this.electronService.rendererInvokeMainToPerformAction(IPCChannelNames.CLOSE_WINDOW)
		}
		catch (e) {
			alert(e)
		}

	}

	/**
	 * When #id-tab is clicked, use the tabService to add a new TabsComponent
	 * to the current tab.
	 * @see ./src/tabs/tabService
	 * */
	addTab() {
		this.tabService.addTerminal(this.counter++, this.splitContainer)
	}

	/**
	 * Since we will need the ability to switch between different control styles,
	 * we can use a switch statement to provide different values for the window
	 * control variables.
	 *
	 * @param {string} controlStyle the style of window control selected by the user.
	 * */
	private toggleWindowControlStyle(controlStyle: string) {
		switch (controlStyle) {
			// if the user selects mac traffic lights
			case "mac":
				this.windowsStyleControls = false
				console.log("window controls set to", controlStyle)
				break
			// if the user selects Windows Style controls
			case "windows":
				this.windowsStyleControls = true
				console.log("window controls set to", controlStyle)
				break
			// if the user selects the blacked out mac traffic lights
			case "darkMac":
				this.darkMacControls = true
				this.windowsStyleControls = false
				console.log("window controls set to", controlStyle)
				break
			// if no selection is given, just exit the function.
			default:
				return
		}
	}
	/** Remove any active ipcRenderer listeners, and unsubscribe from the windowControl subscription.*/
	ngOnDestroy(){
		this.windowControlSubject.unsubscribe()
	}

}
