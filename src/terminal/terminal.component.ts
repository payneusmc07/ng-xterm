import {
	AfterViewInit,
	Component,
	Input,
	OnDestroy,
	OnInit,
	ViewChild
} from "@angular/core"
import { NgTerminal } from "ng-terminal"
import { ElectronService, FileSystemService, SettingsService } from "@shared/services"
import { NodePtyService } from "@terminal/services/node-pty.service"
import { IPty } from "node-pty"
import { AppSettings, IPCChannelNames, locations } from "@shared/utils"
import { TaskListService } from "@task-list/task-list.service"
import { Subject } from "rxjs"
import { AddonsProviderService, ThemeProviderService } from "@terminal/services"

@Component({
	selector: "ng-xterm-terminal",
	template: `
			<ng-xterm-top-bar [title]="title">
				<ng-xterm-task-list (taskName)="write($event)"></ng-xterm-task-list>
			</ng-xterm-top-bar>

			<ng-terminal #term [id]="terminalID"
			             [dataSource]="task"
			             (focusin)="handleFocus()"
			             (focusout)="handleBlur()">
			</ng-terminal>
	`,
	styles: [ `
		* {
			-webkit-app-region: no-drag;
			-webkit-font-smoothing: antialiased;
		}
	` ],
	providers: [ NodePtyService ]
})

export class TerminalComponent implements AfterViewInit, OnDestroy, OnInit {

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
	private terminalTitle: string

	/** A boolean value to indicate if the terminal is focused or blurred */
	private isActiveTerminal = false

	backgroundColor: string

	/** A string value used to hold the user defined OSC 2 terminal title. */
	title: any

	/** An rxjs subject will will act as a receiver and "catch" the emitted
	 * snippet from the ng-xterm-task-list-component
	 * */
	task: Subject<string>

	/** A number value used to represent the current process id of a given pty process */
	ptyNumber: number

	constructor(private readonly electronService: ElectronService,
	            private readonly ptyService: NodePtyService,
	            private readonly settingsService: SettingsService,
	            private readonly taskListService: TaskListService,
	            private readonly addonsProviderService: AddonsProviderService,
	            private readonly themeProviderService: ThemeProviderService,
	            private readonly fileSystemService: FileSystemService
	) {

		// instantiate the pty service so we can use it.
		this.ptyObject = this.ptyService.createFactoryObject()

		// get the id number of the current pty session so it can be displayed in the topbar.
		this.ptyNumber = this.ptyObject?.pid
	}


	ngOnInit() {
		// create a new subject so we can write the command which was emitted from the task list component
		this.task = new Subject<string>()
		this.terminalTitle = this.settingsService.getItem(AppSettings.CUSTOM_TERM_TITLE) as string
	}

	ngAfterViewInit() {
		this.handleBlur()
		this.handleFocus()
		this.handleDragAndDrop()

		this.settingsService.store.onDidChange("appBackgroundColor", (newValue) => {
			console.log(newValue)
			this.backgroundColor = newValue as string
		})

		// load the user's saved theme preferences using the theme provider service
		this.themeProviderService.loadSavedThemeSettings(this.child.underlying)

		// use the addonsProviderService to load the terminal add ons.
		this.addonsProviderService.loadAddons(this.child.underlying)

		// this line required to allow for proper terminal resizing.
		this.child.setStyle({
			"height": "80vh"
		})

		try {
			// utilize the node-pty service to configure communication between node-pty and the underlying terminal.
			this.ptyService.initialize(this.child.underlying)

			// set the OSC 2 title of the underlying terminal.
			this.child.underlying.onTitleChange((value ) => {
				// if no user defined title exists, use the default process title
				if(this.terminalTitle.length == 0 || "") {
					this.title = `pty ${this.ptyNumber} -- ${value}`
				}
				else {
					// if a custom title does exist, overwrite the default process title
					this.title = `pty ${this.ptyNumber} -- ${this.terminalTitle}`
				}
			})

			// listen for an ipc event to select the entirety of the terminal text area.
			this.electronService.ipcRenderer.on(IPCChannelNames.SELECT_ALL, () => this.child.underlying.selectAll())

			// listen for an ipc event telling the task list service to save any text the user selected as a command snippet
			this.electronService.ipcRenderer.on(IPCChannelNames.SAVE_SELECTION, () => {
				const selection = this.child.underlying.getSelection()
				this.taskListService.addTask(selection)
			})

			// listen for the ipc event to save the terminal buffer to an external file
			this.electronService.ipcRenderer.on(IPCChannelNames.SAVE_SELECTION_TO_FILE, () => {
				const textBuffer = this.child.underlying.getSelection()
				this.fileSystemService.writeFile(locations.TERMINAL_OUTPUT_FILE, `${textBuffer}`)
			})
		} catch {
			// if something goes wrong, throw an error saying what happened.
			this.ptyService?.destroyFactoryObject()
		}

		// clear the focused terminal
		this.electronService.ipcRenderer.on(IPCChannelNames.CLEAR_TERMINAL, () => {
			if(this.isActiveTerminal) {
				this.child.underlying.clear()
			}
		})
	}
	private handleDragAndDrop() {
		window.addEventListener("dragenter", (e) => {
			console.log("drag enter")
			e.preventDefault()
			e.stopPropagation()
		})
		// add a listener for the "drop" event and prevent the default behavior.
		window.addEventListener("drop", (e) => {
			e.preventDefault()
			e.stopPropagation()

			/* Loop through the file(s) which were dropped onto the terminal,
			 * and use the pty to write their values to the underlying terminal.
			 *
			 * ts-ignore is used because Typescript throws error code
			 * TS2495: Type 'FileList' is not an array type or a string type.
			 * even though the file names are read and written by pty
			 * without any issues. If anyone knows how to fix this, please feel
			 * free to let me know how.
			 */
			//@ts-ignore
			for (const f of e.dataTransfer.files) {
				this.ptyObject?.write(f.path)
			}
		})
		// add a listener for the "dragover" event and prevent the default behavior.
		window.addEventListener("dragover", (e) => {
			e.preventDefault()
			e.stopPropagation()
		})

	}
	/**
	 * When the terminal is blurred, isActiveTerminal becomes false.
	 * If isActiveTerminal = false, the terminal WILL NOT be cleared
	 * when the terminal-clear ipc event is received
	 * */
	handleBlur() {
		this.isActiveTerminal = false
		this.child.underlying.blur()
	}

	/**
	 * When the terminal is focused, isActiveTerminal becomes true.
	 * If isActiveTerminal is true, the terminal WILL be cleared
	 * when the terminal-clear ipc event is received
	 * */
	handleFocus() {
		this.isActiveTerminal = true
		this.child.underlying.focus()
	}

	/**
	 * Receive or "catch" the snippet emitted from the task list component via @Input() taskFromList.
	 * Upon receipt of the snippet,have the ptyObject (node-pty) write the value to the terminal
	 * and execute the command (when the user hits enter).
	 *
	 * Do not use this.child.underlying to write the value. If you do and
	 * the user hits enter, the command is not processed by node-pty, therefore
	 * the command is not executed.
	 *
	 * @param {string} $event the emitted value received
	 * from the task list component.
	 * */
	write($event: string) {
		this.ptyObject.write($event)
	}

	/**
	 * Perform some "cleanup work" by deallocating resources which were
	 * used for the terminal, its addons, and interactions with the ipcRenderer.
	 * */
	ngOnDestroy() {
		// destroy the loaded add ons
		this.addonsProviderService.destroyAddons()

		// destroy the underlying terminal.
		this.child.underlying.dispose()

		// remove all ipcRenderer event listeners.
		this.electronService.ipcRenderer.removeAllListeners(IPCChannelNames.CLEAR_TERMINAL)
		this.electronService.ipcRenderer.removeAllListeners(IPCChannelNames.SELECT_ALL)
		this.electronService.ipcRenderer.removeAllListeners(IPCChannelNames.SAVE_SELECTION)
	}
}
