import { app, BrowserWindow, globalShortcut } from "electron"
import { mkdirp, existsSync, writeFile } from "fs-extra"
import { autoUpdater } from "electron-updater"
import Store from "electron-store"

/**
 * The AppHelper class was designed to
 * act as a "Swiss Army knife" for NG-Xterm, meaning it does a little bit of
 * everything. All though some may have argued for breaking  into smaller
 * utility classes, I find it easier to have everything in one place.
 * This prevents having to chase down various imports when examining or
 * refactoring the source code.
 * */
export class AppHelper {
	private readonly configDirectory =  `${process.env.HOME}/.ng-xterm`
	private readonly snippetsFile =  `${process.env.HOME}/.ng-xterm/snippets.txt`


	constructor() {
		this.setConfigurationOptions()
		this.createAppDirectoriesAndFiles()
	}

	/**
	 * Automatically check for and download new application updates.
	 * @returns a promise containing the result of the update check
	 * */
	async checkForUpdates(): Promise<void> {
		await autoUpdater.checkForUpdatesAndNotify({
			title: "New Update Available",
			body: ` A new update is available for ${ app.name }`
		})
		autoUpdater.autoInstallOnAppQuit = true
	}

	/**
	 * Create the configuration directory for NG-Xterm.
	 *
	 * This is were we can store addons,
	 * configurations file, fonts, etc.
	 * */
	private createAppDirectoriesAndFiles() {
		// Check if either the configuration directory exist, and create it if it does not exist.
		if(!this.doesPathExist(this.configDirectory)) {
			// if it does not exist, create it.
			mkdirp(this.configDirectory, (error) => console.log(error))
			console.log("Created application directory at:", this.configDirectory)
		}
			// check if the snippets file already  exists
		if(!this.doesPathExist(this.snippetsFile)) {
			// if not, create a blank file to hold the snippets
			writeFile(this.snippetsFile, "", (error) => console.log(error))
		}
	}

	/**
	 * Check if a file/directory path exists.
	 *
	 * @param {string} path the file path in question.
	 * @returns a boolean stating if the path exists or not.
	 * */
	private doesPathExist(path: string): boolean {
		return existsSync(path)
	}

	/**
	 * Register global shortcuts to hide and show the application window.
	 * @param {BrowserWindow} browserWindow the browser window instance which the shortcuts will be registered to.
	 * */
	registerShortcuts(browserWindow: BrowserWindow) {
		const windowWillShow = globalShortcut.register("CommandOrControl+1", () => {
			if(process.env.NODE_ENV === "development") {
				windowWillShow
					? console.log("Registered windowWillShow event handler")
					: console.log("Could not register windowWillShow event handler")
			}
			browserWindow?.show()
		})

		const windowWillHide = globalShortcut.register("CommandOrControl+2", () => {
			if(process.env.NODE_ENV === "development") {
				windowWillHide
					? console.log("Registered windowWillHide event handler")
					: console.log("Could not register windowWillHide event handler")
			}
			browserWindow?.hide()
		})
	}

	/**
	 * Unregister all global shortcuts when the app emits the "will-quit" event
	 * */
	unRegisterShortCuts() {
		globalShortcut.unregisterAll()
	}

	/**
	 * 1: Disable renderer process reuse. This is required since node-pty
	 * is a "non context aware module"
	 *
	 * 2: Append various commandline flags to force Chrome to use GPU rending.
	 *
	 * 3: Initialize Electron Store for use in the main and renderer process
	 * @exception app.allowRendererProcessReuse is required for node-pty
	 * to function correctly. Do not remove this flag or you will see an error
	 * which resembles "cannot find ../Debug/node-pty.node" in the developer tools.
	 * */
	setConfigurationOptions() {
		// 1: this is required for node-pty to work properly
		app.allowRendererProcessReuse = false

		// 2: GPU related commandLine flags
		/** Overrides the built-in software rendering list and enables GPU-acceleration on unsupported system configurations */
		app.commandLine.appendSwitch("--ignore-gpu-blocklist")

		/** Use the GPU to rasterize web content. */
		app.commandLine.appendSwitch("--enable-gpu-rasterization")

		/** Force use of the discrete GPU (if one exists) */
		app.commandLine.appendSwitch("--force_high_power_gpu")

		/** Raster threads write directly to GPU memory associated with tiles */
		app.commandLine.appendSwitch("--enable-zero-copy")

		/** Use Skia as the graphics API instead of OpenGL */
		app.commandLine.appendSwitch("--enable-skia-renderer")

		/** Enables the use of the GPU to perform 2d canvas rendering instead of using software rendering.  */
		app.commandLine.appendSwitch("--disable-accelerated-2d-canvas")

		/** Forces Chrome to use a specific color profile instead of the color
		 * of the window's current monitor, as specified by the operating system
		 * */
		app.commandLine.appendSwitch("--force-color-profile", "srgb")

		// 3: Initialize Electron Store for use in the main and renderer process
		Store.initRenderer()
	}
}



