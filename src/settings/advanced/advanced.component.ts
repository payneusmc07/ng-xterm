import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { FileSystemService, SettingsService } from "@shared/services"
import { Settings } from "@shared/utils"

@Component({
	selector: "ng-xterm-advanced-settings",
	templateUrl: "./advanced.component.html",
	styles: [ `select {width: 150px;}` ]
})

/**
 * The form which modifies any settings related to the "advanced" settings of the
 * underlying terminal and pty/tty. These settings are defined as "advanced"
 * because the average user will likely not change the defaults. But I wanted
 * to make NG-Xterm as customizable as possible, so I at least wanted to
 * provide the option to tweak "all" levels of settings.
 * */
export class AdvancedComponent implements OnInit {

	/** A type context referring to the type of FormGroup. */
	advancedTerminalControlsForm: FormGroup

	/** The number of columns used by the underlying terminal and pty/tty. */
	ptyColumns = +this.settingsService.getItem(Settings.PTY_COLS)

	/** The number of rows used by the underlying terminal and pty/tty. */
	ptyRows = +this.settingsService.getItem(Settings.PTY_ROWS)

	/** The number of lines the terminal will allow for scrolling back through its text buffer. */
	linesOfScrollback = +this.settingsService.getItem(Settings.TERM_SCROLLBACK)

	/** The custom terminal title which will overwrite the default
	 * of the current process title. */
	customWindowTitle = this.settingsService.getItem(Settings.CUSTOM_TERM_TITLE) as string

	/** The preferred terminal type retrieved from the settings store */
	storedTerminalType = this.settingsService.getItem(Settings.TERM_TYPE) as string

	/** The preferred shell type retrieved from the settings store */
	storedShelType = this.settingsService.getItem(Settings.SHELL_TYPE) as string

	/** The available terminal shells on Mac OS */
	unixShells = ["zsh", "bash", "ksh", "tcsh"]

	/** What terminal sessions are supported by Mac OS */
	unixTerminals = ["xterm", "xterm-256color", "xterm-new", "vt100", "xterm-16color", "asni"]

	constructor(private readonly settingsService: SettingsService) {}

	/** Configure the advanced settings form */
	ngOnInit() {
		this.advancedTerminalControlsForm = new FormGroup({
			"terminal-type": new FormControl(this.storedTerminalType),
			"lines-of-scrollback": new FormControl(this.linesOfScrollback),
			"custom-title": new FormControl(this.customWindowTitle),
			"pty-rows": new FormControl(this.ptyRows),
			"pty-cols": new FormControl(this.ptyColumns),
			"shell-type": new FormControl(this.storedShelType)
		})
	}

	/**
	 * Set the type of terminal session.
	* @param {string} terminalType what terminal session will be used.
	*/
	setTerminalType(terminalType: string) {
		// commit the changes to the settings store.
		this.settingsService.setItem(Settings.TERM_TYPE, terminalType)
	}

	/**
	 * Set the amount of allowed terminal scrollback
	 * @param {number} linesOfScrollback the amount of allowed terminal scrollback.
	 */
	setLinesOfScrollback(linesOfScrollback: number) {
		this.settingsService.setItem(Settings.TERM_SCROLLBACK, linesOfScrollback)
	}

	/**
	 * Override the default terminal title (the title of the current process).
	 * @param {string} customTitle the custom title to be displayed instead
	 * of the terminal session default
	 */
	setCustomTerminalTitle(customTitle: string) {
		this.settingsService.setItem(Settings.CUSTOM_TERM_TITLE, customTitle)
	}

	/**
	 * Set the number of rows used by the pty session
	 * @param {number} rowsUsedByPty the number of rows used by the pty session
	 */
	setPTYRows(rowsUsedByPty: number) {
		this.settingsService.setItem(Settings.PTY_ROWS, rowsUsedByPty)
	}

	/**
	 * Set the number of columns used by the pty session
	 * @param {number} colsUsedByPty the number of cols used by the pty session
	 */
	setPTYCols(colsUsedByPty: number) {
		this.settingsService.setItem(Settings.PTY_COLS, colsUsedByPty)
	}

	/**
	 * Set the type of shell session used by the terminal.
	 * @param {string} shell the type of shell session used by the terminal
	 * */
	setShellType(shell: string) {
		this.settingsService.setItem(Settings.SHELL_TYPE, shell)
	}

}
