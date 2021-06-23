import { Injectable } from "@angular/core"
import { IPCChannelNames } from "@shared/utils"
import { ipcRenderer, shell } from "electron"
import * as os from "os"

@Injectable({ providedIn: "root" })

/**
 * Create a service which can be injected into any component, so it can access
 * Electron and native apis.
 *
 * If you import a module but never use any of the imported values other than as TypeScript types,
 * the resulting javascript file will look as if you never imported the module at all.
 *
 * @example
 * `@Component({
	selector: "tabs-root",
	templateUrl: "./settings.tabs.component.html",
	styleUrls: ["./settings.tabs.component.scss"]
})
 * constructor(private electronService: ElectronService)
 *
 * this.electronService.ipcRenderer.send("channel", "...args[]")`
 */
export class ElectronService {

	/** Type context for the Electron.ipcRenderer module. */
	ipcRenderer: typeof ipcRenderer

	/** Type context for the os module. */
	os: typeof os

	/** Type context for the Electron.shell module. */
	shell: typeof shell

	/**
	 * By using window.require, the modules inside in the
	 * constructor body can be used in the renderer (Angular)
	 * process.
	 * @see ./typings.d.ts
	 * */
	constructor() {
		this.ipcRenderer = window.require("electron").ipcRenderer
		this.shell = window.require("electron").shell
		this.os = window.require("os")
	}

	/**
	 * Invoke the main processes to perform an action on the renderer processes behalf
	* @param {IPCChannelNames} channel the channel name which the main process will listen for the invocation.
	* @param {string} args any arguments to be sent and processed by the main process.
	* @returns {Promise}: a promise by the main processes to perform the requested action
	*/
	async rendererInvokeMainToPerformAction(channel: IPCChannelNames, ...args: any[]): Promise<void> {
		try {
			await this.ipcRenderer.invoke(channel, args)
		}
		catch (e) {
			alert(e)
		}
	}

	/**
	 * Use a specific channel to send an ipc message to the main process.
	 * @param{IPCChannelNames} channel the channel name which the main process will listen for message.
	 * @param {string} args any arguments to be sent and processed by the main process.
	 * @returns
	*/
	rendererSendMessageToMain(channel: IPCChannelNames, args?: string) {
		this.ipcRenderer.send(channel, args)
	}
}
