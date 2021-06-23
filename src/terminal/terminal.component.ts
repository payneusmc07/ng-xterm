import {
	AfterViewInit,
	Component,
	Input,
	OnDestroy,
	ViewChild
} from "@angular/core"
import { ElectronService, FileSystemService, SettingsService } from "@shared/services"
import { Settings, IPCChannelNames, locations} from "@shared/utils"
import { AddonsProviderService, ThemeProviderService } from "@terminal/services"
import { NodePtyService } from "@terminal/services/node-pty.service"
import { NgTerminal } from "ng-terminal"
import { IPty } from "node-pty"
import { Subject } from "rxjs"
import { SnippetsService } from "@snippets/snippets.service"


@Component({
	selector: "ng-xterm-terminal",
	template: `
		<ng-xterm-top-bar [title]="title">
			<ng-xterm-snippets (taskName)="writeSnippet($event)"></ng-xterm-snippets>
		</ng-xterm-top-bar>
		<ng-terminal #term
		             [id]="terminalID"
		             [dataSource]="snippetsSubject"
		             (focusin)="handleFocus()"
		             (focusout)="handleBlur()">
		</ng-terminal>
	`,
	styles: [ `* {-webkit-app-region: no-drag;}` ],
	providers: [ NodePtyService, SettingsService ]
})

export class TerminalComponent implements AfterViewInit, OnDestroy {

	/** Allow access to the underlying HTML element, aka the underlying "xterm" */
	@ViewChild("term", { static: false }) child: NgTerminal

	/**
	 * Allow the terminal element to be assigned an id which is received from other components
	 * by providing a property which is externally bindable.
	 * */
	@Input() terminalID: number

	/** Represents an instance of the IPty interface which we will use to instantiate the node-pty service*/
	private ptyObject: IPty

	/**
	 * A string value used to receive the OSC 2 terminal title.
	 * @see https://xtermjs.org/docs/api/vtfeatures/
	 * */
	private terminalTitle = this.settingsService.getItem(Settings.CUSTOM_TERM_TITLE) as string

	/** A boolean value to indicate if the terminal is focused or blurred */
	private isActiveTerminal = false

	/** A string value used to hold the user defined OSC 2 terminal title. */
	title: string

	private addOnMap = new Map<string, any>()

	/** A number value used to represent the current process id of a given pty process */
	ptyNumber: number

	snippetsSubject: Subject<string> = new Subject<string>()


	constructor(private readonly electronService: ElectronService,
	            private readonly ptyService: NodePtyService,
	            private readonly settingsService: SettingsService,
	            private readonly taskListService: SnippetsService,
	            private readonly addonsProviderService: AddonsProviderService,
	            private readonly themeProviderService: ThemeProviderService,
	            private readonly fileSystemService: FileSystemService
	) {

		// instantiate the pty service so we can use it.
		this.ptyObject = this.ptyService.createFactoryObject()

		// get the id number of the current pty session so it can be displayed in the topbar.
		this.ptyNumber = this.ptyObject?.pid
	}

	ngAfterViewInit() {
		this.handleBlur()
		this.handleFocus()

		// load the user's saved theme preferences using the theme provider service
		this.themeProviderService.loadSavedThemeSettings(this.child.underlying)

		this.themeProviderService.handleSubscriptions(this.child.underlying)

		// use the addonsProviderService to load the terminal add ons.
		this.addonsProviderService.loadAddons(this.child.underlying)

		this.ptyService.handleDragAndDrop()

		// this line required to allow for proper terminal resizing.
		this.child.setStyle({ "height": "80vh"})

		try {
			// utilize the node-pty service to configure communication
			// between node-pty and the underlying terminal.
			this.ptyService.initialize(this.child.underlying)

			// set the OSC 2 title of the underlying terminal.
			this.child.underlying.onTitleChange((value ) => {
				// if no user defined title exists, use the default process title
				if(this.terminalTitle.length == 0 || "") {
					this.title = `pty ${this.ptyNumber}: ${value}`
				}
				else {
					// if a custom title does exist, overwrite the default process title
					this.title = `pty ${this.ptyNumber}: ${this.terminalTitle}`
				}
			})

			// listen for an ipc event to select the entirety of the terminal text area.
			this.electronService.ipcRenderer.on(IPCChannelNames.SELECT_ALL, () => this.child.underlying.selectAll())

			// listen for an ipc event telling the task list service
			// to save any text the user selected as a command snippet
			this.electronService.ipcRenderer.on(IPCChannelNames.SAVE_SELECTION, () => {
				const selection = this.child.underlying.getSelection()
				this.taskListService.addTask(selection)
			})

			// listen for the ipc event to save the terminal buffer to an external file
			this.electronService.ipcRenderer.on(IPCChannelNames.SAVE_SELECTION_TO_FILE, () => {
				const textBuffer = this.child.underlying.getSelection()
				this.fileSystemService.writeFile(locations.TERMINAL_OUTPUT_FILE, `${textBuffer}`)
			})

			// listen for the ipc event to clear the focused terminal
			this.electronService.ipcRenderer.on(IPCChannelNames.CLEAR_TERMINAL, () => {
				if(this.isActiveTerminal) {
					this.child.underlying.clear()
				}
			})

		} catch {
			// if something goes wrong, throw an error saying what happened.
			this.ptyService?.destroyFactoryObject()
		}
	}

	/**
	 * When the terminal is blurred, its text buffer WILL NOT be cleared
	 * when the terminal-clear ipc event is received
	 * */
	handleBlur() {
		this.isActiveTerminal = false
		this.child.underlying.blur()
	}

	/**
	 * When the terminal is focused, its text buffer WILL be cleared
	 * when the terminal-clear ipc event is received
	 * */
	handleFocus() {
		this.isActiveTerminal = true
		this.child.underlying.focus()
	}

	/**
	 * Receive or "catch" the snippet emitted from the task list component via
	 * ```
	 * task: Subject<string>
	 * this.task = new Subject<string>()
	 * ```
	 * Upon receiving the snippet, we need to use the underlying pty write
	 * to write the snippet to the terminal
	 * and execute the command (when the user hits enter).
	 *
	 * Do not use the terminal, aka
	 * ```
	 * this.child.underlying
	 * ```
	 * to write the snippet. If you do and the user hits enter,
	 * the command is not processed by node-pty, therefore
	 * the command is not executed.
	 *
	 * @param {string} $event the emitted value received
	 * from the task list component.
	 * */
	writeSnippet($event: string) {
		this.ptyObject.write($event)
	}

	/**
	 * Perform some "cleanup work" by disposing of the underlying terminal.
	 * and removing any active ipcRenderer listeners.
	 * */
	ngOnDestroy() {
		// destroy the underlying terminal.
		this.child.underlying.dispose()
		//this.customAddonService.destroyCustomAddOns()
		// remove all ipcRenderer event listeners.
		this.electronService.ipcRenderer.removeAllListeners(IPCChannelNames.CLEAR_TERMINAL)
		this.electronService.ipcRenderer.removeAllListeners(IPCChannelNames.SELECT_ALL)
		this.electronService.ipcRenderer.removeAllListeners(IPCChannelNames.SAVE_SELECTION)
	}
}
