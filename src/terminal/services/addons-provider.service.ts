import { Injectable, OnDestroy } from "@angular/core"
import { WebglAddon } from "xterm-addon-webgl"
import { WebLinksAddon } from "xterm-addon-web-links"
import { Unicode11Addon } from "xterm-addon-unicode11"
import { Terminal } from "xterm"
import { ElectronService, FileSystemService } from "@shared/services"
import { Addon } from "@shared/utils"

@Injectable({ providedIn: "root" })

/**
 * A helper service class to load, configure, and dispose of
 * any xterm addons used by the terminal.
 *
 * During the course of development, I noticed
 * Angular complained about the use of CommonJS modules due
 * to their impact on performance. In light of this,
 * the following addons have been omitted from NG-Xterm:
 * ```
 * font-ligatures-addon
 * search-addon
 * searchbar-addon
 * ```
 * */
export class AddonsProviderService implements OnDestroy {
	/** the Xterm WebGL Addon */
	private readonly wegGlAddon: WebglAddon

	/** the Xterm WebLinks Addon */
	private readonly webLinksAddon: WebLinksAddon

	/** the Xterm Unicode11 Addon */
	private readonly unicode11Addon: Unicode11Addon

	/** @see src/shared/utils/constants.ts */
	private addOns: Addon[] = []

	constructor(private readonly electronService: ElectronService) {
		// create a new unicode 11 add on
		this.unicode11Addon = new Unicode11Addon()

		// create a new webgl addon instance
		this.wegGlAddon = new WebglAddon(false)

		// create a new weblinks addon instance
		this.webLinksAddon = new WebLinksAddon(async ($event, url) => {
			$event.preventDefault()
			await this.electronService.shell.openExternal(url)
		})

		// push the addons to the addons array.
		this.addOns.push(
			this.unicode11Addon,
			this.wegGlAddon,
			this.webLinksAddon
		)
	}

	/**
	 * Since NgTerminal relies on @ViewChild to open and load its self into the Angular DOM,
	 * its configuration occurs during the ngAfterViewInit() lifecycle event. If we tried to pass an NgTerminal
	 * rather than a "standard" xterm terminal, we would receive an error stating
	 * ```
	 * child is undefined
	 * ```
	 * This makes sense since the addons service is injected into
	 * the constructor of the terminal component, and the constructor is
	 * executed before any lifecycle hooks, thus "child" (the selector of the underlying xterm)
	 * is undefined because it has not been created yet (remember, that happens
	 * during the ngAfterViewInit() lifecycle event.
	 *
	 * To avoid this issue, we can pass a standard"xterm terminal (since "under the hood", NgTerminal
	 * is an xterm terminal with a lot of added Angular functionality), because terminal does not
	 * rely on any lifecycle methods to mount and render.
	 *
	 * @param {Terminal} terminal the terminal which will load and use the addons.
	 * */
	loadAddons(terminal: Terminal) {
		// loop through the addons array and load them into the terminal.
		this.addOns.forEach((addOn:Addon) => {
			if(addOn) {
				terminal?.loadAddon(addOn)
			}
		})
		// set the active unicode version
		terminal.unicode.activeVersion = "11"
	}

	/** Dispose of the loaded addons once the terminal is destroyed. */
	ngOnDestroy(){
		this.addOns.forEach((addOn:Addon) => {
			if(addOn) {
				addOn.dispose()
			}
		})
	}

}
