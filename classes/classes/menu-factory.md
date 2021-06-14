# Menu Factory

```text
import { app, BrowserWindow, clipboard, Menu, TouchBar, shell } from "electron"
import { IPCChannelNames } from "../src/shared"
const { TouchBarButton } = TouchBar
import { AppHelper } from "./app-helper"

/**
 * A helper class which contains two static member methods to create a tray and context menu.
 * Leaving these methods as static allows for them to be imported and used without
 * needing to instantiate a new instance of the class
 * */
export class MenuFactory {

	constructor() {}

	/**
	 * Create the app wide context menu
	 *
	 * @returns Menu an instance of the Electron Menu class
	 * */
	static createContextMenu(browserWindow: BrowserWindow): Menu {
		const contextMenu = Menu.buildFromTemplate([
			{
				label: "Developer",
				submenu: [
					{
						label: "Open Dev Tools",
						click: () => browserWindow?.webContents.openDevTools({ mode: "undocked" })
					},
					{
						label: "Clear Clipboard",
						click: () => clipboard.clear("clipboard")
					},
					{
						label: "Reload Window",
						click: () => browserWindow?.reload()
					},
					{
						label: "Documentation",
						click: async () => await shell.openExternal("")
					}
				]
			},
			{ type: "separator" },
			{
				label: "Terminal",
				submenu: [
					{
						label: "Clear Buffer",
						click: () => browserWindow.webContents.send(IPCChannelNames.CLEAR_TERMINAL)
					},
					{
						label: "Select All",
						click: () => browserWindow.webContents.send(IPCChannelNames.SELECT_ALL)
					},
					{
						label: "Open Search Bar",
						click: () => browserWindow.webContents.send(IPCChannelNames.SHOW_SEARCH_BAR)
					},
					{type: "separator"},
					{
						label: "Open Selection as URL",
						click: () => browserWindow.webContents.send(IPCChannelNames.OPEN_SELECTION)
					},
					{
						label: "Save Selection As Snippet",
						click: () => browserWindow.webContents.send(IPCChannelNames.SAVE_SELECTION)
					},
					{
						label: "Save Current Buffer To File",
						click: () => browserWindow.webContents.send(IPCChannelNames.SAVE_SELECTION_TO_FILE)
					},

					{type: "separator"},
					{
						label: "Add Tab",
						click: () => browserWindow.webContents.send(IPCChannelNames.NEW_TAB)
					},
					{
						label: "Remove Focused Tab",
						click: () => browserWindow.webContents.send(IPCChannelNames.REMOVE_TAB)
					},
					{type: "separator"},
					{
						label: "Split Panel",
						click: () => browserWindow.webContents.send(IPCChannelNames.ADD_PANEL)
					},
					{
						label: "Restore",
						click: () => browserWindow.webContents.send(IPCChannelNames.REMOVE_FOCUSED_PANEL)
					},
				]
			},
			{ type: "separator" },
			{
				label: "Extras",
				submenu: [
					// integrations
					{
						label: "Integrations",
						submenu: [
							{
								label: "Install Shell Integrations",
								click: async () => await AppHelper.handleShellIntegrationInstallationOrRemoval(browserWindow, "install")
							},
							{
								label: "Uninstall Shell Integrations",
								click: async () => await AppHelper.handleShellIntegrationInstallationOrRemoval(browserWindow, "uninstall")
							},
						],
					},
					{type: "separator"},
					// fonts
					{
						label: "Fonts",
						submenu: [
							{
								label: "Install Powerline Fonts",
								click: () => AppHelper.handleFontInstallationOrRemoval(browserWindow,"install")
							},
							{
								label: "Uninstall Powerline Fonts",
								click: () => AppHelper.handleFontInstallationOrRemoval(browserWindow,"uninstall")
							},
						]
					}
				],
			},
			{ type: "separator" },
			{ role: "copy" },
			{ role: "paste" },
			{ role: "delete" },
			{ type: "separator" },
			{ role: "quit" }
		])
		browserWindow?.webContents.on("context-menu", () => contextMenu.popup())
		return contextMenu
	}

	/**
	 * Create the app wide TouchBar menu.
	 * @returns {TouchBar} an instance of the Electron TouchBar Class
	 * */
	createTouchBarMenu(browserWindow: BrowserWindow): TouchBar {
		const btnClearClipboard = new TouchBarButton({
			label: "Clear Clipboard",
			backgroundColor: "#0f4ae9",
			click: () => clipboard.clear("clipboard")
		})

		const btnClearTerminal = new TouchBarButton({
			label: "Clear Terminal",
			backgroundColor: "#0f4ae9",
			click: () => browserWindow?.webContents.send(IPCChannelNames.CLEAR_TERMINAL)
		})

		const btnAddTab = new TouchBarButton({
			label: "Add Tab",
			backgroundColor: "#0f4ae9",
			click: () => browserWindow?.webContents.send(IPCChannelNames.NEW_TAB)
		})

		const btnRemoveTab = new TouchBarButton({
			label: "Remove Focused Tab",
			backgroundColor: "#ffff66",
			click: () => browserWindow?.webContents.send(IPCChannelNames.REMOVE_TAB)
		})

		const btnQuit = new TouchBarButton({
			label: "Quit App",
			backgroundColor: "#ff0000",
			click: () => app.quit()
		})

		return new TouchBar({
			items: [
				btnClearClipboard,
				btnClearTerminal,
				btnAddTab,
				btnRemoveTab,
				btnQuit
			]
		})
	}


}
```

