/**
 * A list of constants which will be available for use
 * in the main and renderer processes.
 * */
import { WebglAddon } from "xterm-addon-webgl"
import { WebLinksAddon } from "xterm-addon-web-links"
import { Unicode11Addon } from "xterm-addon-unicode11"
import { LigaturesAddon } from "xterm-addon-ligatures"

/**
 * Values allowed for use with the application settings store.
 * By using an enum, we can rely on IDE autocomplete to fill in the values
 * which are passed to the store, rather than typing then by hand each time.
 * This is a big win as it reduces the likelyhood of errors.
 *  */
export const enum AppSettings {
	/** The transparency percentage for the Electron window and html body */
	APP_BG_TRANSPARENCY = "appBackgroundTransparency",

	/** The background color for the Electron window and html body  */
	APP_BG_COLOR = "appBackgroundColor",

	/** The custom terminal title which will overwrite the default
	 * of the current process title */
	CUSTOM_TERM_TITLE = "customTerminalTitle",

	/** The standard Mac OS "traffic lights", but blacked out */
	DARK_MAC_TRAFFIC_LIGHTS = "darkMacTrafficLights",

	/** The font size of the terminal. */
	FONT_SIZE = "fontSize",

	/**
	 * If the terminal support font ligatures.
	 * This feature will only work with certain power line faults.
	 * */
	SHOULD_TOOL_TIPS_SHOW = "show-tooltips",

	/** How many rows (tall) the pty/tty process and terminal will be. */
	PTY_ROWS = "ptyRows",

	/** How many columns (wide) the pty/tty process and terminal will be. */
	PTY_COLS = "ptyCols",

	/** The background color for the tabs of the UI. */
	TAB_BG_COLOR = "tabBackgroundColor",

	/** The foreground color for the tabs of the UI. */
	TAB_FG_COLOR = "tabForegroundColor",

	/** The main (body) color of the terminal cursor */
	TERM_CURSOR_COLOR = "terminalColorColor",

	/**
	 * What style of cursor will be used in the terminal.
	 * 1: "block"
	 * 2: "bar"
	 * 3: "line"
	 * */
	TERM_CURSOR_STYLE = "terminalColorStyle",

	/** The accent (outline) color used by the terminal cursor. */
	TERM_CURSOR_ACCENT_COLOR = "terminalCursorAccentColor",

	/** if the terminal cursor should blink or not blink. */
	TERM_CURSOR_BLINK = "terminalCursorBlink",

	/** The foreground (font) color of the terminal. */
	TERM_FG_COLOR = "terminalForegroundColor",

	/** The background color of the terminal. */
	TERM_BG_COLOR = "terminalBackgroundColor",

	/** The font style used by the terminal. */
	TERM_FONT = "terminalFont",

	/**
	 * The type of terminal session.
	 * 1: vt100
	 * 2: xterm-256color
	 * 3: xterm-16color
	 * 4: xterm
	 * */
	TERM_TYPE = "terminalType",

	/**
	 * The shell session spawned by node-pty.
	 * 1: zsh
	 * 2: bash
	 * 3: fish (if installed)
	 * 4: xterm
	 * */
	TERM_SHELL_TYPE = "terminalShellType",

	/** The background color of any selected terminal text. */
	TERM_SELECTION_COLOR = "terminalSelectionColor",

	/** The amount of vertical space between lines in the terminal. */
	TERM_LINE_HEIGHT = "terminalLineHeight",

	/**
	 * What HTML renderer is used by the terminal.
	 * 1: Canvas, not always available, but much faster than the DOM.
	 * 2: DOM, the automatic fallback when canvas is not available
	 * */
	TERM_RENDERER = "terminalRenderer",

	/** The number of lines the terminal allow for scrolling
	 * back though its text buffer. */
	TERM_SCROLLBACK = "linesOfTerminalScrollback",

	/** The amount of horizontal spacing between letters in the terminal. */
	TERM_LETTER_SPACING = "terminalLetterSpacing",


	WINDOWS_STYLE_CONTROLS = "windowsStyleControls",

	/** Display Windows style BrowserWindow controls. */
	WINDOW_CONTROL_STYLE = "windowControlStyle",

	ANTI_ALIAS_FONTS = "antiAliasedFonts"
}

/**
 * Same logic as with the AppSettings enum applies here,
 * but with names of ipc channels instead of application setting
 * */
export const enum IPCChannelNames {
	/** The ipc channel to listen on for events related to
	 * clearing the terminal text buffer. */
	CLEAR_TERMINAL = "terminal-clear",

	/** The ipc channel to listen on for events related to
	 * adding a new tab to the ui. */
	NEW_TAB = "add-terminal",

	/** The ipc channel to listen on for events related to
	 * removing a tab to the ui. */
	REMOVE_TAB = "remove-terminal",

	/** The ipc channel to listen on for events related to
	 * selecting the entire terminal text buffer */
	SELECT_ALL = "terminal-select-all",

	/** The ipc channel to listen on for events related to
	 * adding a new tab to the ui. */
	SAVE_SELECTION = "save-selection",

	/** The ipc channel to listen on for events related to
	 * adding a new tab to the ui. */
	OPEN_SELECTION = "open-selection",

	/** The ipc channel to listen on for events related to
	 * installing terminal fonts. */
	INSTALL_FONTS = "install-fonts",

	/** The ipc channel to listen on for events related to
	 * setting the application background transparency. */
	SET_BG_TRANSPARENCY = "set-bg-transparency",

	/** The ipc channel to listen on for events related to
	 * setting the application background color. */
	SET_BG_COLOR = "set-bg-color",

	/** The ipc channel to listen on for events related to
	 * minimizing the application window. */
	MINIMIZE_WINDOW = "window-minimize",

	/** The ipc channel to listen on for events related to
	 * maximizing the application window. */
	MAXIMIZE_WINDOW = "window-maximize",

	/** The ipc channel to listen on for events related to
	 * closing the application window. */
	CLOSE_WINDOW = "window-close",

	/** The ipc channel to listen on for events related to
	 * reloading the application window. */
	RESET_WINDOW = "window-reset",

	/** The ipc channel to listen on for events related to
	 * splitting a terminal tab and appending a new inner terminal
	 * to the given tab. */
	ADD_PANEL = "split-tab",

	/** The ipc channel to listen on for events related to
	 * removing the focused terminal panel. */
	REMOVE_FOCUSED_PANEL = "restore-tab",

	/** The ipc channel to listen on for events related to
	 * saving a selection of terminal text as a user snippet. */
	SAVE_SELECTION_TO_FILE = "save-selection-to-file"
}


/** globally defined constants which point to various locations in the app. */
export const locations = {
	/** path to the configuration directory */
	CONFIG_DIRECTORY: `${process.env.HOME}/.ng-xterm`,

	/** path to the snippets file */
	SNIPPETS_FILE: `${process.env.HOME}/.ng-xterm/snippets.txt`,

	/** path to the fonts directory */
	FONTS_DIRECTORY: `${process.env.HOME}/.ng-xterm/fonts`,

	HOME_DIRECTORY: process.env.HOME,

	TERMINAL_OUTPUT_FILE: `${process.env.HOME}/saved-terminal-buffer.txt`
}


/** globally defined constants which define the hosting operating system */
export const operatingSystems = {
	IS_MAC: process.platform === "darwin",
	IS_WINDOWS: process.platform === "win32",
	IS_LINUX: process.platform === "linux"
}
/**
 * Define what addons can be used for the terminal.
 * */
export type Addon =
	WebglAddon |
	WebLinksAddon |
	Unicode11Addon |
	LigaturesAddon

export type InstallationOptions = "install" | "uninstall"
