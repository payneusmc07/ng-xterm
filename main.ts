import { app, BrowserWindow, ipcMain } from "electron"
import serve from "electron-serve"
import {
	createContextMenu,
	createWindow,
	appSettingsStore,
	AppHelper
} from "./main-lib"
import { IPCChannelNames, Settings } from "./src/shared/utils"

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
const loadURL = serve({ directory: "dist", scheme: "ng-xterm" })

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
		opacity: +appSettingsStore.get("backgroundTransparency"),
		tabbingIdentifier: "mainWindow"
	})

	// Based on the environment, either load the dev url environment variable,
	// or use electron-serve to load the static index html file
	process.env.NODE_ENV === "development"
		? await mainWindow.loadURL(process.env.DEV_URL)
		: await loadURL(mainWindow)

	// show the window on the "ready-to-show" event
	mainWindow.on("ready-to-show", () => mainWindow.show())

	// dispose of any active ipcMain event listeners
	// and unregister any app wide shortcuts so we don't cause memory leaks
	mainWindow.on("closed", () => {
		appHelper.unRegisterShortCuts()
		mainWindow = null
	})

	// create the application context menu
	createContextMenu(mainWindow)

	// if automatic updates are enabled, check for updates
	if(appSettingsStore.get(Settings.AUTO_UPDATE) === true) {
		await appHelper.checkForUpdates()
	}

	// register global application shortcuts
	appHelper.registerShortcuts(mainWindow)

	return mainWindow
})

// when the "quit" event is emitted, quit the app
app.on("quit", () => app.quit())

ipcMain.handle(IPCChannelNames.AUTO_UPDATE, (event,  args: boolean) => {
	if(process.env.NODE_ENV === "development") {
		console.log("auto updates set to: ", args)
		appSettingsStore.set(Settings.AUTO_UPDATE, args as boolean)
	}
})

ipcMain.handle(IPCChannelNames.SET_BACKGROUND_TRANSPARENCY, async (event, args) => {
	if(process.env.NODE_ENV === "development") {
		console.log("transparency set to: ", args)
	}
	appSettingsStore.set(Settings.TERM_BG_TRANSPARENCY, args)
	mainWindow.setOpacity(+args)
})

ipcMain.handle(IPCChannelNames.SET_BACKGROUND_COLOR, (event, args) => {
	if(process.env.NODE_ENV === "development") {
		console.log("background color set to: ", args)
	}
	appSettingsStore.set(Settings.TERM_BG_COLOR, args)
	mainWindow.setBackgroundColor(String(args))
})

ipcMain.handle(IPCChannelNames.CLOSE_WINDOW, () => app.quit() )
ipcMain.handle(IPCChannelNames.MINIMIZE_WINDOW, () => mainWindow.minimize())

ipcMain.handle(IPCChannelNames.MAXIMIZE_WINDOW, () => {
	mainWindow.isFullScreen()
		? mainWindow.setFullScreen(false)
		: mainWindow.setFullScreen(true)
})


