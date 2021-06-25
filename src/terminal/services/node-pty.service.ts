import { Injectable, OnDestroy } from "@angular/core"
import { IPty } from "node-pty"
import * as pty from "node-pty"
import { SettingsService } from "@shared/services"
import { Settings } from "@shared/utils"
import { Terminal } from "xterm"

/** Provide node-pty as a service */
@Injectable({ providedIn: "root" })

export class NodePtyService implements OnDestroy {

	/** A type context to refer to the type of a pty from the node-pty module   */
	private readonly pty: typeof pty

	/** An interface representing a pseudoterminal, on Windows this is emulated via the winpty library. */
	private ptyProcess: IPty

	constructor(private readonly settingsService: SettingsService) {
		this.pty = window.require("node-pty")
	}

	/**
	 * An error describing why the pty process could not be created.
	 * @returns an error providing possible reasons the node-pty process could not be created.
	 * */
	createFactoryObjectError(): Error {
		throw new Error("The node-pty process could not be created. This usually means one of two things, the pty instance or one of " +
			"its values was undefined, or node-pty needs to be rebuild. To do rebuild, please run the rebuild:pty script in package.json")
	}

	/**
	 * Configure the pty service instance.
	 * @returns IPty an instance of the node-pty module.
	 * */
	createFactoryObject(): IPty {
		try {
			//const isWindows = operatingSystems.IS_WINDOWS ? "powershell.exe" : this.settingsService.getItem(AppSettings.TERM_SHELL_TYPE) as string
			this.ptyProcess = this.pty.spawn(this.settingsService.getItem(Settings.SHELL_TYPE) as string, ["--login"], {

				// get the type of terminal session from the settings store.
				name: this.settingsService.getItem(Settings.TERM_TYPE) as string,

				// set the working directory for the pty process
				cwd: process.env.HOME,

				// get the number of rows the pty should be from the settings store.
				rows: +this.settingsService.getItem(Settings.PTY_ROWS),

				// get the number of columns the pty should be from the settings store.
				cols: +this.settingsService.getItem(Settings.PTY_COLS),

				env: process.env,

				// allow the pty to handle control flow
				handleFlowControl: true,

				// use the conpty back end if we are running on Windows.
				useConpty: process.platform === "win32"
			})
			// display the process id of the current pty process
			console.log("Creating pty process", this.ptyProcess?.pid)
			return this.ptyProcess
		} catch {
			// return an error telling the user what happened
			this.createFactoryObjectError()
		}
	}

	/**
	 * Kill the pty process once the component it is injected into
	 * is removed from the DOM via ngOnDestroy.
	 * */
	destroyFactoryObject() {
		try {
			this.ptyProcess.kill()
			console.log("Destroying pty process", this.ptyProcess?.pid)
		} catch {
			this.destroyFactoryObjectError()
			return
		}
	}

	/**
	 * @returns {Error} An error describing possible reasons the pty process could not be killed.
	 * */
	destroyFactoryObjectError(): Error {
		throw new Error("The node-pty instance could not be destroyed. This usually means the underlying pty instance or one of its values was undefined")
	}

	/**
	 * When a file or files are dropped on the terminal,
	 * we loop through the file(s) which were dropped, and use the
	 * underlying pty to write their values. By using the pty
	 * instead of the terminal, we can then perform standard
	 * terminal actions on the file, such as "cat", "ls", etc.
	 *
	 * If the terminal is used rather than the pty, when the user
	 * hits enter, no commands can be applied to the file path
	 * as the terminal relies on the underlying pty for command
	 * execution.
	 *
	 *@todo figure out a way to prevent the dropped files from being displayed on ALL terminals.
	 * */
	handleDragAndDrop() {
		// add a listener for the "dragenter" event and prevent the default behavior.
		document.addEventListener("dragenter", (e) => {
			e.preventDefault()
			e.stopPropagation()
		})
		// add a listener for the "drop" event and prevent the default behavior.
		document.addEventListener("drop", (e) => {
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
			for(const f of e.dataTransfer.files) {
				this.ptyProcess?.write(f.path)
			}
		})
		// add a listener for the "dragover" event and prevent the default behavior.
		document.addEventListener("dragover", (e) => {
			e.preventDefault()
			e.stopPropagation()
		})
	}


	/**
	 * Configure and initialize communication and resize events between the pty session,
	 * and the underlying terminal
	 *
	 * @param {Terminal} terminal the terminal to be associated with the pty service instance.
	 * */
	initialize(terminal: Terminal) {
		// configure pty/terminal communication.
		this.ptyProcess?.onData((chunk) => terminal?.write(`${ chunk }`))
		terminal?.onData((data) => this.ptyProcess?.write(`${ data }`))

		// handle resize events.
		terminal.onResize((data) => {
			this.ptyProcess?.resize(
				Math.max(data ? data.cols : terminal.cols, 1),
				Math.max(data ? data.rows : terminal.rows, 1)
			)
		})
	}

	/** Destroy the pty service instance when the component this service is provided to is unmounted/destroyed. */
	ngOnDestroy() {
		this.destroyFactoryObject()
	}

}
