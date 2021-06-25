/** SystemJS module definition */
declare const nodeModule: NodeModule

interface NodeModule {
	id: string
}

/**
 * By providing the Window interface,
 * we are able to use window.require to load modules
 * into the renderer (Angular) process.
 * */
interface Window {
	process: any
	require: any
}

declare const enum Settings {
	/** The transparency percentage for the Electron window and html body */
	APP_BG_TRANSPARENCY = "appBackgroundTransparency",

	/** The background color for the Electron window and html body  */
	APP_BG_COLOR = "appBackgroundColor",

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

	/** Display Windows style BrowserWindow controls. */
	WINDOW_CONTROL_STYLE = "windowControlStyle",
}

declare type AppSettings = Readonly<Settings>
