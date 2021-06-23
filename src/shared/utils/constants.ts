/**
 * A list of constants which will be available for use
 * in the main and renderer processes.
 * */


// enums
/**
 * Values allowed for use with the application settings store.
 * By using an enum, we can rely on IDE autocomplete to fill in the values
 * which are passed to the store, rather than typing then by hand each time.
 * This is a big win as it reduces the likelyhood of errors.
 *  */
export const enum Settings {
	/** Should the app automatically check for and download updates? */
	AUTO_UPDATE = "autoUpdate",

	/** The custom terminal title which will overwrite the default
	 * of the current process title */
	CUSTOM_TERM_TITLE = "customTerminalTitle",

	/** The standard Mac OS "traffic lights", but blacked out */
	DARK_MAC_TRAFFIC_LIGHTS = "darkMacTrafficLights",

	/** The font size of the terminal. */
	FONT_SIZE = "fontSize",

	/** How many rows (tall) the pty/tty process and terminal will be. */
	PTY_ROWS = "ptyRows",

	/** How many columns (wide) the pty/tty process and terminal will be. */
	PTY_COLS = "ptyCols",

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

	/** The transparency percentage for the Electron window and html body */
	TERM_BG_TRANSPARENCY = "terminalBackgroundTransparency",

	/** The background color of the terminal. */
	TERM_BG_COLOR = "terminalBackgroundColor",

	/** The font style used by the terminal. */
	TERM_FONT = "terminalFont",

	/** The type of terminal session. */
	TERM_TYPE = "terminalType",

	/** The shell session spawned by node-pty. */
	SHELL_TYPE = "shellType",

	/** The background color of any selected terminal text. */
	TERM_SELECTION_COLOR = "terminalSelectionColor",

	/** The amount of vertical space between lines in the terminal. */
	TERM_LINE_HEIGHT = "terminalLineHeight",
	/** The number of lines the terminal allow for scrolling
	 * back though its text buffer. */
	TERM_SCROLLBACK = "linesOfTerminalScrollback",

	/** The amount of horizontal spacing between letters in the terminal. */
	TERM_LETTER_SPACING = "terminalLetterSpacing",

	/** Display Windows style BrowserWindow controls. */
	WINDOW_CONTROL_STYLE = "windowControlStyle",
}

/**
 * Same logic as with the AppSettings enum applies here,
 * but with names of ipc channels instead of application setting
 * */
export const enum IPCChannelNames {
	AUTO_UPDATE = "auto-update",
	/** The ipc channel to listen on for events related to
	 * clearing the terminal text buffer. */
	CLEAR_TERMINAL = "terminalClear",

	/** The ipc channel to listen on for events related to
	 * adding a new tab to the ui. */
	NEW_TAB = "addTerminal",

	/** The ipc channel to listen on for events related to
	 * removing a tab to the ui. */
	REMOVE_TAB = "removeTerminal",

	/** The ipc channel to listen on for events related to
	 * selecting the entire terminal text buffer */
	SELECT_ALL = "terminalSelectAll",

	/** The ipc channel to listen on for events related to
	 * adding a new tab to the ui. */
	SAVE_SELECTION = "saveSelection",

	/** The ipc channel to listen on for events related to
	 * setting the application background transparency. */
	SET_BACKGROUND_TRANSPARENCY = "setBackgroundTransparency",

	/** The ipc channel to listen on for events related to
	 * setting the application background color. */
	SET_BACKGROUND_COLOR = "setBackgroundColor",

	/** The ipc channel to listen on for events related to
	 * minimizing the application window. */
	MINIMIZE_WINDOW = "windowMinimize",

	/** The ipc channel to listen on for events related to
	 * maximizing the application window. */
	MAXIMIZE_WINDOW = "windowMaximize",

	/** The ipc channel to listen on for events related to
	 * closing the application window. */
	CLOSE_WINDOW = "windowClose",

	/** The ipc channel to listen on for events related to
	 * reloading the application window. */
	RESET_WINDOW = "windowReset",

	/** The ipc channel to listen on for events related to
	 * saving a selection of terminal text as a user snippet. */
	SAVE_SELECTION_TO_FILE = "saveSelectionToFile",

	/** Listen for events related to expanding the window when a new panel
	 * is added to a tab. */
	EXPAND_WINDOW = "expandWindow",

	/** Listen for events related to shrinking the window when a panel
	 * is removed from a tab. */
	SHRINK_WINDOW = "shrinkWindow"
}

export const enum GlobalShortcuts {
	SHOW_WINDOW = "CommandOrControl+1",
	HIDE_WINDOW = "CommandOrControl+2",
}

// constants
/** Globally defined constants which point to various locations in host file system. */
export const locations = {
	/** Path to the application configuration directory */
	CONFIG_DIRECTORY: `${process.env.HOME}/.ng-xterm`,

	/** Path to the snippets file */
	SNIPPETS_FILE: `${process.env.HOME}/.ng-xterm/snippets.txt`,

	/** Path to the fonts directory. */
	FONTS_DIRECTORY: `${process.env.HOME}/.ng-xterm/fonts`,

	/** The user's home directory. */
	HOME_DIRECTORY: process.env.HOME,

	/** Where saved terminal buffers will be written. */
	TERMINAL_OUTPUT_FILE: `${process.env.HOME}/saved-terminal-buffer.txt`,

	/** The directory which will store any user created scripts. */
	SCRIPTS_DIRECTORY: `${process.env.HOME}/.ng-xterm/scripts`,

	/** The directory which will store any user created plugins, */
	PLUGINS_DIRECTORY: `${process.env.HOME}/.ng-xterm/plugins`,

}

/** Globally defined constants to define the hosting operating system */
export const operatingSystems = {
	/** The host system is Mac OS. */
	IS_MAC: process.platform === "darwin",

	/** The host system is Windows. */
	IS_WINDOWS: process.platform === "win32",

	/** The host system is Linux. */
	IS_LINUX: process.platform === "linux"
}

// types
import { WebglAddon } from "xterm-addon-webgl"
import { WebLinksAddon } from "xterm-addon-web-links"
import { Unicode11Addon } from "xterm-addon-unicode11"
/** What addons can be used by the terminal. */
export type Addon =
	WebglAddon |
	WebLinksAddon |
	Unicode11Addon


// interfaces
/**
 * This split panel will reside inside of the ng-xterm-tab
 * component. By having a separate model and service for a split panel, the user will be able
 * to split a tab into upto 3 different "sub" panels, each of which will have its own
 * terminal.
 *
 * Using unknown as the type assignment for the component value may be looked down
 * on those who value absolute "type safety and correctness." But using unknown was
 * the only way I could achieve the desired outcome (multiple, and independent
 * tabs which can be easily added or removed from the ui). And on the plus side,
 * unknown is at least more "type safe" than simply using any or letting
 * the TS compiler deduce its type.
 * */
export interface SplitPanel {
	id: number
	component: unknown
}

/**
 * This tab will reside inside of the ng-xterm-tabs-component.
 * By having a separate model and service for adding and removing tabs, the user will be able
 * to have multiple terminal tabs, each with its own independent terminal.
 *
 * Using unknown as the type assignment for the component value may be looked down
 * on those who value absolute "type safety and correctness." But using unknown was
 * the only way I could achieve the desired outcome (multiple, and independent
 * tabs which can be easily added or removed from the ui). And on the plus side,
 * unknown is at least more "type safe" than simply using any or letting
 * the TS compiler deduce its type.
 *
 * */
export interface Tab {
	id: number
	component: unknown
}

/** Define the structure of a snippet for use with the snippets-component.
 * @see ./src/task-list/task-list.component
 * */
export interface Snippet {
	id: number
	name: string
}

