import { Component, OnInit, Input, OnDestroy, } from "@angular/core"
import { SettingsService, ElectronService } from "@shared/services"
import { TabService } from "@tabs/tab.service"
import { SplitPanelComponent } from "@tabs/tab/split-panel.component"
import { AppSettings, IPCChannelNames } from "@shared/utils/constants"

@Component({
	selector: "ng-xterm-app-topbar",
	templateUrl: "./app-topbar.component.html",
	styleUrls: [ "./app-topbar.component.scss" ]
})

/**
 * Being a Mac OS user, I have always been a huge fan of iTerm2, namely its UI layout and
 * visual aesthetics. I chose to create a custom topbar (or navbar) for
 * NG-Xterm so I could implement some features in a similar manner to iTerm2, while
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
	 * When the user clicks on a tab in the main ui, an event is emitted which send
	 * the ID of the current tab. Here, Input() acts as a receiver to "catch"
	 * this emitted value. */
	@Input() tabID: number | string

	/** The component which will be added to the UI. */
	tabContainer: SplitPanelComponent

	/** Used to provide an ID to each tab that is added to the UI.
	 * As tabs are added, this number increments by 1.*/
	counter = 0

	/**
	 * A boolean value to indicate if the user has opted to
	 * the dark Mac OS traffic lights.
	 * */
	darkMacControls: boolean

	/**
	 * A boolean value to indicate if the user has opted to
	 * the Windows style controls.
	 * */
	windowsStyleControls: boolean

	/**
	 * A string value used to hold the preferred window control style that was
	 * retrieved from the settings store. This value is then reflected in the ui.
	 * */
	windowControlStyle: string

	/** By "declaring" the various
	 * services used by this component in the constructor, we can
	 * take advantage of Angular dependency injection to properly configure
	 * and instantiate the services.
	 * */
	constructor(
		private readonly electronService: ElectronService,
		private readonly tabService: TabService,
		private readonly settingsService: SettingsService
	) {}

	ngOnInit(){
		// assign the stored window control value
		this.windowControlStyle = this.settingsService.getItem(AppSettings.WINDOW_CONTROL_STYLE) as string

		this.toggleWindowControlStyle(this.windowControlStyle)

		// listen for an ipc event saying to remove a tab
		this.electronService.ipcRenderer.on(IPCChannelNames.REMOVE_TAB, () => {
			console.log("Removing Tab: ", +this.tabID)
			this.tabService.removeTerminal(+this.tabID)
		})
	}

	/**
	 * Use the ipcRenderer to invoke the main processes to minimize the browser window.
	 * @returns a void (empty) promise from the main processes to minimize the browser window.
	 * */
	async minimizeWindow(): Promise<void> {
		await this.electronService.ipcRenderer.invoke("window-minimize")
	}

	/**
	 * Use the ipcRenderer to invoke the main processes to maximize the browser window.
	 * @returns a void (empty) promise from the main processes to maximize the browser window.
	 * */
	async maximizeWindow(): Promise<void> {
		await this.electronService.ipcRenderer.invoke("window-maximize")
	}

	/**
	 * Use the ipcRenderer to invoke the main processes to close the browser window.
	 * @returns a promise (empty)from the main processes to close the browser window.
	 * */
	async closeWindow(): Promise<void> {
		await this.electronService.ipcRenderer.invoke("window-close")
	}

	/**
	 * When #id-tab is clicked, use the tabService to add a new terminal tab to the UI.
	 * @see ./src/tabs/tabService
	 * */
	addTab() {
		this.tabService.addTerminal(this.counter++, this.tabContainer)
	}


	/**
	 * Since we will need the ability to switch between different control styles,
	 * we can use a switch statement to provide different values for our window
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
	/** To avoid memory leaks, we need to remove any active ipcRenderer listeners. */
	ngOnDestroy(){
		this.electronService.ipcRenderer.removeAllListeners(IPCChannelNames.REMOVE_TAB)
	}

}
