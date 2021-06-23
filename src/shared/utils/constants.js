"use strict";
/**
 * A list of constants which will be available for use
 * in the main and renderer processes.
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.operatingSystems = exports.locations = exports.GlobalShortcuts = exports.IPCChannelNames = exports.Settings = void 0;
// enums
/**
 * Values allowed for use with the application settings store.
 * By using an enum, we can rely on IDE autocomplete to fill in the values
 * which are passed to the store, rather than typing then by hand each time.
 * This is a big win as it reduces the likelyhood of errors.
 *  */
var Settings;
(function (Settings) {
    /** Should the app automatically check for and download updates? */
    Settings["AUTO_UPDATE"] = "autoUpdate";
    /** The custom terminal title which will overwrite the default
     * of the current process title */
    Settings["CUSTOM_TERM_TITLE"] = "customTerminalTitle";
    /** The standard Mac OS "traffic lights", but blacked out */
    Settings["DARK_MAC_TRAFFIC_LIGHTS"] = "darkMacTrafficLights";
    /** The font size of the terminal. */
    Settings["FONT_SIZE"] = "fontSize";
    /** How many rows (tall) the pty/tty process and terminal will be. */
    Settings["PTY_ROWS"] = "ptyRows";
    /** How many columns (wide) the pty/tty process and terminal will be. */
    Settings["PTY_COLS"] = "ptyCols";
    /** The main (body) color of the terminal cursor */
    Settings["TERM_CURSOR_COLOR"] = "terminalColorColor";
    /**
     * What style of cursor will be used in the terminal.
     * 1: "block"
     * 2: "bar"
     * 3: "line"
     * */
    Settings["TERM_CURSOR_STYLE"] = "terminalColorStyle";
    /** The accent (outline) color used by the terminal cursor. */
    Settings["TERM_CURSOR_ACCENT_COLOR"] = "terminalCursorAccentColor";
    /** if the terminal cursor should blink or not blink. */
    Settings["TERM_CURSOR_BLINK"] = "terminalCursorBlink";
    /** The foreground (font) color of the terminal. */
    Settings["TERM_FG_COLOR"] = "terminalForegroundColor";
    /** The transparency percentage for the Electron window and html body */
    Settings["TERM_BG_TRANSPARENCY"] = "terminalBackgroundTransparency";
    /** The background color of the terminal. */
    Settings["TERM_BG_COLOR"] = "terminalBackgroundColor";
    /** The font style used by the terminal. */
    Settings["TERM_FONT"] = "terminalFont";
    /** The type of terminal session. */
    Settings["TERM_TYPE"] = "terminalType";
    /** The shell session spawned by node-pty. */
    Settings["SHELL_TYPE"] = "shellType";
    /** The background color of any selected terminal text. */
    Settings["TERM_SELECTION_COLOR"] = "terminalSelectionColor";
    /** The amount of vertical space between lines in the terminal. */
    Settings["TERM_LINE_HEIGHT"] = "terminalLineHeight";
    /** The number of lines the terminal allow for scrolling
     * back though its text buffer. */
    Settings["TERM_SCROLLBACK"] = "linesOfTerminalScrollback";
    /** The amount of horizontal spacing between letters in the terminal. */
    Settings["TERM_LETTER_SPACING"] = "terminalLetterSpacing";
    /** Display Windows style BrowserWindow controls. */
    Settings["WINDOW_CONTROL_STYLE"] = "windowControlStyle";
})(Settings = exports.Settings || (exports.Settings = {}));
/**
 * Same logic as with the AppSettings enum applies here,
 * but with names of ipc channels instead of application setting
 * */
var IPCChannelNames;
(function (IPCChannelNames) {
    IPCChannelNames["AUTO_UPDATE"] = "auto-update";
    /** The ipc channel to listen on for events related to
     * clearing the terminal text buffer. */
    IPCChannelNames["CLEAR_TERMINAL"] = "terminalClear";
    /** The ipc channel to listen on for events related to
     * adding a new tab to the ui. */
    IPCChannelNames["NEW_TAB"] = "addTerminal";
    /** The ipc channel to listen on for events related to
     * removing a tab to the ui. */
    IPCChannelNames["REMOVE_TAB"] = "removeTerminal";
    /** The ipc channel to listen on for events related to
     * selecting the entire terminal text buffer */
    IPCChannelNames["SELECT_ALL"] = "terminalSelectAll";
    /** The ipc channel to listen on for events related to
     * adding a new tab to the ui. */
    IPCChannelNames["SAVE_SELECTION"] = "saveSelection";
    /** The ipc channel to listen on for events related to
     * setting the application background transparency. */
    IPCChannelNames["SET_BACKGROUND_TRANSPARENCY"] = "setBackgroundTransparency";
    /** The ipc channel to listen on for events related to
     * setting the application background color. */
    IPCChannelNames["SET_BACKGROUND_COLOR"] = "setBackgroundColor";
    /** The ipc channel to listen on for events related to
     * minimizing the application window. */
    IPCChannelNames["MINIMIZE_WINDOW"] = "windowMinimize";
    /** The ipc channel to listen on for events related to
     * maximizing the application window. */
    IPCChannelNames["MAXIMIZE_WINDOW"] = "windowMaximize";
    /** The ipc channel to listen on for events related to
     * closing the application window. */
    IPCChannelNames["CLOSE_WINDOW"] = "windowClose";
    /** The ipc channel to listen on for events related to
     * reloading the application window. */
    IPCChannelNames["RESET_WINDOW"] = "windowReset";
    /** The ipc channel to listen on for events related to
     * saving a selection of terminal text as a user snippet. */
    IPCChannelNames["SAVE_SELECTION_TO_FILE"] = "saveSelectionToFile";
    /** Listen for events related to expanding the window when a new panel
     * is added to a tab. */
    IPCChannelNames["EXPAND_WINDOW"] = "expandWindow";
    /** Listen for events related to shrinking the window when a panel
     * is removed from a tab. */
    IPCChannelNames["SHRINK_WINDOW"] = "shrinkWindow";
})(IPCChannelNames = exports.IPCChannelNames || (exports.IPCChannelNames = {}));
var GlobalShortcuts;
(function (GlobalShortcuts) {
    GlobalShortcuts["SHOW_WINDOW"] = "CommandOrControl+1";
    GlobalShortcuts["HIDE_WINDOW"] = "CommandOrControl+2";
})(GlobalShortcuts = exports.GlobalShortcuts || (exports.GlobalShortcuts = {}));
// constants
/** Globally defined constants which point to various locations in host file system. */
exports.locations = {
    /** Path to the application configuration directory */
    CONFIG_DIRECTORY: process.env.HOME + "/.ng-xterm",
    /** Path to the snippets file */
    SNIPPETS_FILE: process.env.HOME + "/.ng-xterm/snippets.txt",
    /** Path to the fonts directory. */
    FONTS_DIRECTORY: process.env.HOME + "/.ng-xterm/fonts",
    /** The user's home directory. */
    HOME_DIRECTORY: process.env.HOME,
    /** Where saved terminal buffers will be written. */
    TERMINAL_OUTPUT_FILE: process.env.HOME + "/saved-terminal-buffer.txt",
    /** The directory which will store any user created scripts. */
    SCRIPTS_DIRECTORY: process.env.HOME + "/.ng-xterm/scripts",
    /** The directory which will store any user created plugins, */
    PLUGINS_DIRECTORY: process.env.HOME + "/.ng-xterm/plugins",
};
/** Globally defined constants to define the hosting operating system */
exports.operatingSystems = {
    /** The host system is Mac OS. */
    IS_MAC: process.platform === "darwin",
    /** The host system is Windows. */
    IS_WINDOWS: process.platform === "win32",
    /** The host system is Linux. */
    IS_LINUX: process.platform === "linux"
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0tBR0s7OztBQUdMLFFBQVE7QUFDUjs7Ozs7TUFLTTtBQUNOLElBQWtCLFFBcUVqQjtBQXJFRCxXQUFrQixRQUFRO0lBQ3pCLG1FQUFtRTtJQUNuRSxzQ0FBMEIsQ0FBQTtJQUUxQjtzQ0FDa0M7SUFDbEMscURBQXlDLENBQUE7SUFFekMsNERBQTREO0lBQzVELDREQUFnRCxDQUFBO0lBRWhELHFDQUFxQztJQUNyQyxrQ0FBc0IsQ0FBQTtJQUV0QixxRUFBcUU7SUFDckUsZ0NBQW9CLENBQUE7SUFFcEIsd0VBQXdFO0lBQ3hFLGdDQUFvQixDQUFBO0lBRXBCLG1EQUFtRDtJQUNuRCxvREFBd0MsQ0FBQTtJQUV4Qzs7Ozs7U0FLSztJQUNMLG9EQUF3QyxDQUFBO0lBRXhDLDhEQUE4RDtJQUM5RCxrRUFBc0QsQ0FBQTtJQUV0RCx3REFBd0Q7SUFDeEQscURBQXlDLENBQUE7SUFFekMsbURBQW1EO0lBQ25ELHFEQUF5QyxDQUFBO0lBRXpDLHdFQUF3RTtJQUN4RSxtRUFBdUQsQ0FBQTtJQUV2RCw0Q0FBNEM7SUFDNUMscURBQXlDLENBQUE7SUFFekMsMkNBQTJDO0lBQzNDLHNDQUEwQixDQUFBO0lBRTFCLG9DQUFvQztJQUNwQyxzQ0FBMEIsQ0FBQTtJQUUxQiw2Q0FBNkM7SUFDN0Msb0NBQXdCLENBQUE7SUFFeEIsMERBQTBEO0lBQzFELDJEQUErQyxDQUFBO0lBRS9DLGtFQUFrRTtJQUNsRSxtREFBdUMsQ0FBQTtJQUN2QztzQ0FDa0M7SUFDbEMseURBQTZDLENBQUE7SUFFN0Msd0VBQXdFO0lBQ3hFLHlEQUE2QyxDQUFBO0lBRTdDLG9EQUFvRDtJQUNwRCx1REFBMkMsQ0FBQTtBQUM1QyxDQUFDLEVBckVpQixRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQXFFekI7QUFFRDs7O0tBR0s7QUFDTCxJQUFrQixlQXlEakI7QUF6REQsV0FBa0IsZUFBZTtJQUNoQyw4Q0FBMkIsQ0FBQTtJQUMzQjs0Q0FDd0M7SUFDeEMsbURBQWdDLENBQUE7SUFFaEM7cUNBQ2lDO0lBQ2pDLDBDQUF1QixDQUFBO0lBRXZCO21DQUMrQjtJQUMvQixnREFBNkIsQ0FBQTtJQUU3QjttREFDK0M7SUFDL0MsbURBQWdDLENBQUE7SUFFaEM7cUNBQ2lDO0lBQ2pDLG1EQUFnQyxDQUFBO0lBRWhDOzBEQUNzRDtJQUN0RCw0RUFBeUQsQ0FBQTtJQUV6RDttREFDK0M7SUFDL0MsOERBQTJDLENBQUE7SUFFM0M7NENBQ3dDO0lBQ3hDLHFEQUFrQyxDQUFBO0lBRWxDOzRDQUN3QztJQUN4QyxxREFBa0MsQ0FBQTtJQUVsQzt5Q0FDcUM7SUFDckMsK0NBQTRCLENBQUE7SUFFNUI7MkNBQ3VDO0lBQ3ZDLCtDQUE0QixDQUFBO0lBRTVCO2dFQUM0RDtJQUM1RCxpRUFBOEMsQ0FBQTtJQUU5Qzs0QkFDd0I7SUFDeEIsaURBQThCLENBQUE7SUFFOUI7Z0NBQzRCO0lBQzVCLGlEQUE4QixDQUFBO0FBQy9CLENBQUMsRUF6RGlCLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBeURoQztBQUVELElBQWtCLGVBR2pCO0FBSEQsV0FBa0IsZUFBZTtJQUNoQyxxREFBa0MsQ0FBQTtJQUNsQyxxREFBa0MsQ0FBQTtBQUNuQyxDQUFDLEVBSGlCLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBR2hDO0FBRUQsWUFBWTtBQUNaLHVGQUF1RjtBQUMxRSxRQUFBLFNBQVMsR0FBRztJQUN4QixzREFBc0Q7SUFDdEQsZ0JBQWdCLEVBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLGVBQVk7SUFFakQsZ0NBQWdDO0lBQ2hDLGFBQWEsRUFBSyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksNEJBQXlCO0lBRTNELG1DQUFtQztJQUNuQyxlQUFlLEVBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLHFCQUFrQjtJQUV0RCxpQ0FBaUM7SUFDakMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSTtJQUVoQyxvREFBb0Q7SUFDcEQsb0JBQW9CLEVBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLCtCQUE0QjtJQUVyRSwrREFBK0Q7SUFDL0QsaUJBQWlCLEVBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLHVCQUFvQjtJQUUxRCwrREFBK0Q7SUFDL0QsaUJBQWlCLEVBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLHVCQUFvQjtDQUUxRCxDQUFBO0FBRUQsd0VBQXdFO0FBQzNELFFBQUEsZ0JBQWdCLEdBQUc7SUFDL0IsaUNBQWlDO0lBQ2pDLE1BQU0sRUFBRSxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVE7SUFFckMsa0NBQWtDO0lBQ2xDLFVBQVUsRUFBRSxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU87SUFFeEMsZ0NBQWdDO0lBQ2hDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU87Q0FDdEMsQ0FBQSJ9