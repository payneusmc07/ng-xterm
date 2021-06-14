import { app, BrowserWindow, ipcMain } from "electron"
import serve from "electron-serve"
import {
	createContextMenu,
	createWindow,
	appSettingsStore,
	AppHelper
} from "./lib"
import { AppSettings, IPCChannelNames } from "./src/shared"

/**
 * A "global" reference to the mainWindow object.
 * This is used to prevent the window from randomly being destroyed
 * by JS/TS garbage collector .
 */
let mainWindow: BrowserWindow = null

/**
 * Configure the directory where electron-serve will look for
 * the static index.html file to serve when the app is
 * built for production.
 */
const loadURL = serve({ directory: "dist" })

// instantiate a new instance of the AppHelper class
const appHelper = new AppHelper()

appHelper.setConfigurationOptions()

app.on("ready", async(): Promise<BrowserWindow> => {
	/**
	 * Configure the mainWindow instance and set the background
	 * color and opacity to the values retrieved from
	 * the app settings store.
	 * @see src/lib/window-factory.ts for the remaining BrowserWindow configurations
	 */
	mainWindow = createWindow("ng-xterm", {
		backgroundColor: appSettingsStore.get("backgroundColor") as string,
		opacity: +appSettingsStore.get("backgroundTransparency")
	})

	// Based on the environment, either load the dev url environment variable,
	// or use electron-serve to load the static index html file
	process.env.NODE_ENV === "development"
		? await mainWindow.loadURL(process.env.DEV_URL)
		: await loadURL(mainWindow)

	//  show the window
	mainWindow.on("ready-to-show", () => mainWindow.show())

	// dispose of any active ipcMain event listeners so we don't cause memory leaks
	mainWindow.on("closed", () => {
		ipcMain.removeAllListeners(IPCChannelNames.SET_BG_TRANSPARENCY)
		ipcMain.removeAllListeners(IPCChannelNames.SET_BG_COLOR)
		ipcMain.removeAllListeners(IPCChannelNames.RESET_WINDOW)
		ipcMain.removeAllListeners(IPCChannelNames.MINIMIZE_WINDOW)
		ipcMain.removeAllListeners(IPCChannelNames.MAXIMIZE_WINDOW)
		ipcMain.removeAllListeners(IPCChannelNames.CLOSE_WINDOW)
		mainWindow = null
	})

	// create the application context menu
	createContextMenu(mainWindow)

	// check for application updates
	await appHelper.checkForUpdates()

	// register global application shortcuts
	appHelper.registerShortcuts(mainWindow)

	return mainWindow
})
app.on("will-quit", () => appHelper.unRegisterShortCuts())
app.on("quit", () => app.quit())

/** IPC */
// handle ipcRenderer invocation to set the app background transparency
ipcMain.handle(IPCChannelNames.SET_BG_TRANSPARENCY, async (event, args) => {
	console.log("transparency set to: ", args)
	appSettingsStore.set(AppSettings.APP_BG_TRANSPARENCY, args)
	mainWindow.setOpacity(args)
})

// handle ipcRenderer invocation to set the app background background color
ipcMain.handle(IPCChannelNames.SET_BG_COLOR, (event, args) => {
	console.log("background color set to: ", args)
	appSettingsStore.set(AppSettings.APP_BG_COLOR, args)
	mainWindow.setBackgroundColor(String(args))
})

// handle ipcRenderer invocation to set the app background transparency
ipcMain.handle(IPCChannelNames.RESET_WINDOW, () => mainWindow.reload())

// handle ipcRenderer invocation to minimize the app window
ipcMain.handle(IPCChannelNames.MINIMIZE_WINDOW, () => mainWindow.minimize())

// handle ipcRenderer invocation to maximize the app window
ipcMain.handle(IPCChannelNames.MAXIMIZE_WINDOW, () => mainWindow.isFullScreen() ? mainWindow.setFullScreen(false) : mainWindow.setFullScreen(true))

// handle ipcRenderer invocation to quit the app
ipcMain.handle(IPCChannelNames.CLOSE_WINDOW, () => app.quit())

