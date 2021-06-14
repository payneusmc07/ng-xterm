import { Injectable } from "@angular/core"
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

	/** type context for the Electron.ipcRenderer module */
	ipcRenderer: typeof ipcRenderer

	/** type context for the os module */
	os: typeof os

	/** type context for the Electron.shell module */
	shell: typeof shell

	constructor() {
		/**
		 * By using window.require, the modules inside in the
		 * constructor body can be used in the renderer (Angular)
		 * process.
		 * @see ./typings.d.ts
		 * */
		this.ipcRenderer = window.require("electron").ipcRenderer
		this.shell = window.require("electron").shell
		this.os = window.require("os")
	}
}
