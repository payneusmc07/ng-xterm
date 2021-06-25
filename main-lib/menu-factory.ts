import { IPCChannelNames } from "../src/shared/utils"
import { BrowserWindow, clipboard, Menu, shell } from "electron"

/**
 * Create the application context menu. This menu will act as the main "control center"
 * for NG-Xterm.
 *
 * @param { BrowserWindow} browserWindow the browser window which will display the context menu
 * @returns {Menu} an instance of the Electron.Menu class
 * */
export const createContextMenu = (browserWindow: BrowserWindow): Menu => {
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
					label: "Zoom In",
					role: "zoomIn"
				},
				{
					label: "Zoom Out",
					role: "zoomOut"
				},
				{
					label: "Documentation",
					click: async () => await shell.openExternal("https://payneusmc07.github.io/ng-xterm/")
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
					label: "Save Selection As Snippet",
					click: () => browserWindow.webContents.send(IPCChannelNames.SAVE_SELECTION)
				},
				{
					label: "Save Selection To File",
					click: () => browserWindow.webContents.send(IPCChannelNames.SAVE_SELECTION_TO_FILE)
				}
			]
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

