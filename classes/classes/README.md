# Classes

## File

## Index <a id="index"></a>

## Constructor <a id="constructor"></a>

##  Methods <a id="methods"></a>

<table>
  <thead>
    <tr>
      <th style="text-align:left"> <b>Async checkForUpdates</b>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"> <code>checkForUpdates()</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">
        <p>Automatically check for and download new application updates.</p>
        <p><b>Returns :</b>  <a href="https://www.typescriptlang.org/docs/handbook/basic-types.html"><code>any</code></a>
        </p>
      </td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th style="text-align:left"> <b>Private createAppDirectory</b>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"> <code>createAppDirectory()</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">
        <p>Create the configuration directory for NG-Xterm.</p>
        <p>This is were we can store addons, configurations file, fonts, etc.</p>
      </td>
    </tr>
  </tbody>
</table>

|  **Private createSnippetsFile** |
| :--- |
|  `createSnippetsFile()` |
|  |
| Create the snippets file which will store all user defined snippets. |

<table>
  <thead>
    <tr>
      <th style="text-align:left"> <b>Private Static doesPathExist</b>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"> <code>doesPathExist(path: </code><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string"><code>string</code></a><code>)</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Defined in <a href>lib/app-helper.ts:73</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">
        <p>Check if a file/directory path exists.</p>
        <p><b>Parameters :</b>
        </p>
        <p><b>Returns :</b>  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/boolean"><code>boolean</code></a>
        </p>
        <p>a boolean stating if the path exists or not.</p>
      </td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th style="text-align:left"> <b>Static handleFontInstallationOrRemoval</b>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"> <code>handleFontInstallationOrRemoval(browserWindow: BrowserWindow, installOrRemove: </code>
        <a
        href="../undefineds/InstallationOptions.html"><code>InstallationOptions</code>
          </a><code>)</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Defined in <a href>lib/app-helper.ts:82</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">
        <p><b>Parameters :</b>
        </p>
        <p><b>Returns :</b>  <a href="https://www.typescriptlang.org/docs/handbook/basic-types.html"><code>void</code></a>
        </p>
      </td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th style="text-align:left"> <b>Static Async handleShellIntegrationInstallationOrRemoval</b>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"> <code>handleShellIntegrationInstallationOrRemoval(browserWindow: BrowserWindow, installOrRemove: </code>
        <a
        href="../undefineds/InstallationOptions.html"><code>InstallationOptions</code>
          </a><code>)</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Defined in <a href>lib/app-helper.ts:107</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">
        <p><b>Parameters :</b>
        </p>
        <p><b>Returns :</b>  <a href="https://www.typescriptlang.org/docs/handbook/basic-types.html"><code>any</code></a>
        </p>
      </td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th style="text-align:left"> <b>registerShortcuts</b>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"> <code>registerShortcuts(browserWindow: BrowserWindow)</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Defined in <a href>lib/app-helper.ts:122</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">
        <p>Register global shortcuts</p>
        <p><b>Parameters :</b>
        </p>
        <p><b>Returns :</b>  <a href="https://www.typescriptlang.org/docs/handbook/basic-types.html"><code>void</code></a>
        </p>
      </td>
    </tr>
  </tbody>
</table>

|  **setConfigurationOptions** |
| :--- |
|  `setConfigurationOptions()` |
|  |
| Append various commandline flags to the tabs which will aid in adding GPU rending and allow node-pty to function properly. |

|  **unRegisterShortCuts** |
| :--- |
|  `unRegisterShortCuts()` |
|  |
| Unregister all global shortcuts when the app emits the "will-quit" event |

```text
import { app, BrowserWindow, dialog, globalShortcut } from "electron"
import { mkdirp, existsSync, writeFile } from "fs-extra"
import { autoUpdater } from "electron-updater"
import Store from "electron-store"
import { exec } from "child_process"
import { IPCChannelNames, locations, InstallationOptions } from "../src/shared"

export class AppHelper {

	constructor() {
		this.setConfigurationOptions()
		this.createAppDirectory()
		this.createSnippetsFile()
	}

	/**
	 * Automatically check for and download new application updates.
	 * */
	async checkForUpdates() {
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
	private createAppDirectory() {
		// check if the directory already exists
		if(!AppHelper.doesPathExist(locations.CONFIG_DIRECTORY)) {
			try {
				// if not, create the directory
				mkdirp(locations.CONFIG_DIRECTORY, (error) => console.log(error))
				console.log("Created configuration directory")
			} catch (e) {
				// show an error dialog and tell the user what happened
				dialog.showErrorBox("Error", e)
			}
		} else {
			console.log("the configuration directory already exists.")
		}
	}

	/**
	 * Create the snippets file which will store all user defined snippets.
	 * */
	private createSnippetsFile() {
		// check if the file already  exists
		if(!AppHelper.doesPathExist(locations.SNIPPETS_FILE)) {
			try {
				// if not, create a blank file to hold the snippets
				writeFile(locations.SNIPPETS_FILE, "", (error) => console.log(error))
			} catch (e) {
				// show an error dialog and tell the user what happened
				dialog.showErrorBox("Error", e)
			}
		} else {
			console.log("The snippets file already exists.")
		}
	}

	/**
	 * Check if a file/directory path exists.
	 *
	 * @param {string} path the file path in question.
	 * @returns a boolean stating if the path exists or not.
	 * */
	private static doesPathExist(path: string): boolean {
		return existsSync(path)
	}

	/**
	 * @static
	 * @private
	 * Install or remove the Powerline font collection for use with the terminal.
	 * */
	static handleFontInstallationOrRemoval(browserWindow: BrowserWindow, installOrRemove: InstallationOptions) {
		// check if the fonts are already installed
		if(!this.doesPathExist(locations.FONTS_DIRECTORY)) {
			// if not, download them to the configuration directory
			exec(`cd ${ locations.CONFIG_DIRECTORY } && git clone https://github.com/powerline/fonts.git --depth=1`, (error, stdout) => {
				if(error) {
					dialog.showErrorBox("Error", `${ error }`)
				} else {
					dialog.showMessageBox(browserWindow, {
						title: "Installing fonts",
						message: stdout
					}).catch((error) => dialog.showErrorBox("Error", `${ error }`))
				}
			})
		}
		else {
			// if they are installed, inform the user
			dialog.showMessageBox(browserWindow, {
				title: "Fonts Installation",
				message: "The powerline fonts collection is already installed"
			}).catch((reason) => dialog.showErrorBox("Error", `${reason}`))
		}

	}

	static async handleShellIntegrationInstallationOrRemoval(browserWindow: BrowserWindow, installOrRemove: InstallationOptions) {
		await dialog.showMessageBox(browserWindow, {
			title: "Installing Shell Integrations",
			message: "Shell Integrations were installed",
			buttons: [ "Ok", "Cancel" ],
			type: "info",
			cancelId: 1,
			defaultId: 0
		})
	}

	/**
	 * Register global shortcuts
	 * @param {BrowserWindow} browserWindow the browser window instance which the shortcuts will be registered to.
	 * */
	registerShortcuts(browserWindow: BrowserWindow) {
		const windowWillShow = globalShortcut.register("CommandOrControl+1", () => {
			windowWillShow
				? console.log("Registered windowWillShow event handler")
				: console.log("Could not register windowWillShow event handler")

			browserWindow?.show()
		})

		const windowWillHide = globalShortcut.register("CommandOrControl+2", () => {
			windowWillHide
				? console.log("Registered windowWillHide event handler")
				: console.log("Could not register windowWillHide event handler")
			browserWindow?.hide()
		})

		const showTerminalSearchBar = globalShortcut.register("CommandOrControl+3", () => {
			showTerminalSearchBar
				? console.log("Registered showTerminalSearchBox event handler")
				: console.log("Could not register showTerminalSearchBox event handler")
			browserWindow?.webContents.send(IPCChannelNames.SHOW_SEARCH_BAR)
		})
	}

	/**
	 * Unregister all global shortcuts when the app emits the "will-quit" event
	 * */
	unRegisterShortCuts() {
		globalShortcut.unregisterAll()
	}

	/**
	 * Append various commandline flags to the tabs which will aid in adding
	 * GPU rending and allow node-pty to function properly.
	 *
	 * @exception app.allowRendererProcessReuse is required for node-pty
	 * to function correctly. Do not remove this flag or you will see an error
	 * which resembles "cannot find ../Debug/node-pty.node" in the developer tools.
	 * */
	setConfigurationOptions() {
		// this is required for node-pty to work properly
		app.allowRendererProcessReuse = false

		// ignore the chromium gpu blacklist
		app.commandLine.appendSwitch("--ignore-gpu-blacklist")

		// enable the chromium skia (GPU) renderer
		app.commandLine.appendSwitch("--ignore-gpu-blacklist")

		// enable srgb color profile
		app.commandLine.appendSwitch("--force-color-profile=srgb")

		// initialize Electron Store for use in the main and renderer process
		Store.initRenderer()
	}
}



```

