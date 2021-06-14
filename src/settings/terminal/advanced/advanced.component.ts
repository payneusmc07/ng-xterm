import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { SettingsService } from "@shared/services"
import { AppSettings } from "@shared/utils"

@Component({
	selector: "ng-xterm-advanced-settings",
	templateUrl: "./advanced.component.html",
	styles: [ `
		.bi {
			font-size: 20px !important;
			color: aliceblue;
			font-weight: bold;
			margin-right: 5px;
		}
		.terminal-type { width: 250px}
		.form-check-input { margin-left: 10px}
	` ]
})

/**
 * The form which modifies any settings related to the "advanced" settings of the
 * underlying terminal and pty/tty. These settings are defined as "advanced"
 * because the average user will likely not change the defaults. But I wanted
 * to make NG-Xterm as customizable as possible, so I at least wanted to
 * provide the option to tweak "all" levels of settings.
 * */

export class AdvancedComponent implements OnInit {

	/** A FormGroup variable which is used to configure the advance settings form */
	advancedTerminalControlsForm: FormGroup

	/** Number of columns used by the underlying terminal and pty/tty */
	ptyColumns: number

	/** Number of rows used by the underlying terminal and pty/tty */
	ptyRows: number

	/** The number of lines the terminal will allow for scrolling back through its text buffer. */
	linesOfScrollback: number

	/** The custom terminal title which will overwrite the default
	 * of the current process title */
	customWindowTitle: string

	/**
	 * What HTML renderer is used by the terminal.
	 * 1: Canvas, not always available, but much faster than the DOM.
	 * 2: DOM, the automatic fallback when canvas is not available
	 * */
	rendererTypes = ["dom", "canvas"]

	/**
	 * A string value used to hold the preferred terminal renderer
	 * value which was retrieved from the settings store.
	 * */
	rendererType: string

	/** What types of terminal sessions are supported by Mac OS */
	terminalTypes = ["xterm", "xterm-256color", "xterm-new", "vt100", "xterm-16color", "asni"]

	/**
	 * The type of terminal session.
	 * 1: vt100
	 * 2: xterm-256color
	 * 3: xterm-16color
	 * 4: xterm
	 * */
	terminalType: string

	/** A boolean value used to determine if tooltips should be shown
	 * when the user hovers over a setting */
	showTooltips: boolean

	/** A boolean value used to determine if the application fonts
	 * should be antiAliased */
	useAntiAliasedFonts: boolean

	constructor(private readonly settingsService: SettingsService) {}


	ngOnInit() {
		// retrieve the renderer type from the settings store.
		this.rendererType = this.settingsService.getItem(AppSettings.TERM_RENDERER) as string

		// retrieve the custom window title from the settings store.
		this.customWindowTitle = this.settingsService.getItem(AppSettings.CUSTOM_TERM_TITLE) as string

		// retrieve the terminal session type from the settings store.
		this.terminalType = this.settingsService.getItem(AppSettings.TERM_TYPE) as string

		// retrieve the pty/terminal columns value from the settings store.
		this.ptyColumns = +this.settingsService.getItem(AppSettings.PTY_COLS)

		// retrieve the pty/terminal rows value from the settings store.
		this.ptyRows =  +this.settingsService.getItem(AppSettings.PTY_ROWS)

		// retrieve the allowed lines of scrollback from the settings store.
		this.linesOfScrollback = +this.settingsService.getItem(AppSettings.TERM_SCROLLBACK)

		// retrieve the value for using or not using anti aliased fonts
		this.useAntiAliasedFonts = this.settingsService.getItem(AppSettings.ANTI_ALIAS_FONTS) as boolean

		// retrieve the value for showing or not showing tooltips
		this.showTooltips = this.settingsService.getItem(AppSettings.SHOULD_TOOL_TIPS_SHOW) as boolean

		if(this.useAntiAliasedFonts === true) {
			document.body.style.setProperty("-webkit-font-smoothing", "subpixel-antialiased")
		}

		// configure the settings form
		this.advancedTerminalControlsForm = new FormGroup({
			// an html select containing the different terminal types
			"terminal-type": new FormControl(this.terminalType),

			// an html select containing the  terminal renderers
			"renderer-type": new FormControl(this.rendererType),

			// an html number input used to configure the terminal scrollback
			"lines-of-scrollback": new FormControl(this.linesOfScrollback),

			// an html text input used to configure the custom window title
			"custom-title": new FormControl(this.customWindowTitle),

			// an html number input used to configure the number of pty/terminal columns
			"pty-rows": new FormControl(this.ptyRows),

			// an html number input used to configure the number of pty/terminal rows
			"pty-cols": new FormControl(this.ptyColumns),

			"anti-alias": new FormControl(this.useAntiAliasedFonts),
		})
	}

	/**
	 * Set the type of terminal session.
	* @param {string} terminalType what terminal session will be used.
	*/
	setTerminalType(terminalType: string) {
		this.settingsService.setItem(AppSettings.TERM_TYPE, terminalType)
	}

	/**
	 * Set the terminal renderer.
	 * @param {string} rendererType what terminal renderer will being used.
	 */
	setTerminalRenderer(rendererType: string) {
		this.settingsService.setItem(AppSettings.TERM_RENDERER, rendererType)
	}

	/**
	 * Set the amount of allowed terminal scrollback
	 * @param {number} linesOfScrollback the amount of allowed terminal scrollback.
	 */
	setLinesOfScrollback(linesOfScrollback: number) {
		this.settingsService.setItem(AppSettings.TERM_SCROLLBACK, linesOfScrollback)
	}

	/**
	 * Override the default terminal title (the title of the current process).
	 * @param {string} customTitle the custom title to be displayed instead
	 * of the terminal session default
	 */
	setCustomTitle(customTitle: string) {
		this.settingsService.setItem(AppSettings.CUSTOM_TERM_TITLE, customTitle)
	}

	/**
	 * Set the number of rows used by the pty session
	 * @param {number} rowsUsedByPty the number of rows used by the pty session
	 */
	setPTYRows(rowsUsedByPty: number) {
		this.settingsService.setItem(AppSettings.PTY_ROWS, rowsUsedByPty)
	}

	/**
	 * Set the number of columns used by the pty session
	 * @param {number} colsUsedByPty the number of cols used by the pty session
	 */
	setPTYCols(colsUsedByPty: number) {
		this.settingsService.setItem(AppSettings.PTY_COLS, colsUsedByPty)
	}


	setAntiAlias(shouldAntiAliasFonts: boolean) {
		this.settingsService.setItem(AppSettings.ANTI_ALIAS_FONTS, shouldAntiAliasFonts)
		if(shouldAntiAliasFonts == true) {
			document.body.style.setProperty("-webkit-font-smoothing", "subpixel-antialiased")
		}
	}



}
