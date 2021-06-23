"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var electron_store_1 = __importDefault(require("electron-store"));
var SettingsService = /** @class */ (function () {
    function SettingsService() {
        this.terminalSelectionColorSubject = new rxjs_1.BehaviorSubject("#734bdc");
        this.terminalLineHeightSubject = new rxjs_1.BehaviorSubject(1.2);
        this.terminalLetterSpacingSubject = new rxjs_1.BehaviorSubject(1);
        this.terminalFontSizeSubject = new rxjs_1.BehaviorSubject(13);
        this.terminalFontFamilySubject = new rxjs_1.BehaviorSubject("Hack Nerd Font");
        this.terminalBackgroundSubject = new rxjs_1.BehaviorSubject("#18242f");
        this.terminalForegroundSubject = new rxjs_1.BehaviorSubject("#dbf4fa");
        this.windowControlSubject = new rxjs_1.BehaviorSubject("mac");
        this.cursorColorSubject = new rxjs_1.BehaviorSubject("#734bdc");
        this.cursorAccentColorSubject = new rxjs_1.BehaviorSubject("#734bdc");
        this.cursorStyleSubject = new rxjs_1.BehaviorSubject("block");
        this.cursorBlinkSubject = new rxjs_1.BehaviorSubject(false);
        // configure the terminal settings store
        this.store = new electron_store_1.default({
            name: "terminal-settings",
            watch: true,
            schema: {
                appBackgroundTransparency: {
                    type: "number",
                    default: 0.90
                },
                appBackgroundColor: {
                    type: "string",
                    default: "#18242f"
                },
                customTerminalTitle: {
                    type: "string",
                    default: ""
                },
                darkMacTrafficLights: {
                    type: "boolean",
                    default: false
                },
                fontSize: {
                    type: "number",
                    default: 13
                },
                linesOfTerminalScrollback: {
                    type: "number",
                    default: 100
                },
                ptyCols: {
                    type: "number",
                    default: 80
                },
                ptyRows: {
                    type: "number",
                    default: 25
                },
                terminalCursorAccentColor: {
                    type: "string",
                    default: "#47bedb"
                },
                terminalCursorBlink: {
                    type: "boolean",
                    default: false
                },
                terminalCursorColor: {
                    type: "string",
                    default: "#47bedb"
                },
                terminalCursorStyle: {
                    type: "string",
                    default: "block"
                },
                terminalFont: {
                    type: "string",
                    default: "Hack Nerd Font"
                },
                terminalForegroundColor: {
                    type: "string",
                    default: "#dbf4fa"
                },
                terminalFontSize: {
                    type: "number",
                    default: 13,
                },
                terminalLetterSpacing: {
                    type: "number",
                    default: 1
                },
                terminalType: {
                    type: "string",
                    default: "xterm-256color"
                },
                terminalLineHeight: {
                    type: "number",
                    default: 1
                },
                terminalSelectionColor: {
                    type: "string",
                    default: "#47bedb"
                },
                terminalShellType: {
                    type: "string",
                    default: process.env.SHELL
                },
                windowsStyleControls: {
                    type: "boolean",
                    default: false
                },
                windowControlStyle: {
                    type: "string",
                    default: process.platform === "darwin" ? "mac" : "windows"
                }
            }
        });
    }
    /**
     * Save a specific user preference to the settings store.
     *
     * Since the user may do a lot of adjusting to the theme,
     * a timeout is set to allow for those adjustments,
     * and reduce the number of writes to the settings store.
     *
     * @param {string} key the accessor which is used to access the value of a setting.
     * @param {string | number | boolean} value the value to be used by the terminal
     * or overall application.
     * */
    SettingsService.prototype.setItem = function (key, value) {
        //		setTimeout(() => {
        //			this.store.set(key, value)
        //		}, 1000)
        this.store.set(key, value);
    };
    /**
     * Get the value of a given item and return it to the calling function.
     * @param {string} key the key which will "point" a specific item.
     * */
    SettingsService.prototype.getItem = function (key) {
        return this.store.get(key);
    };
    SettingsService = __decorate([
        core_1.Injectable({ providedIn: "root" })
        /**
         * A helper class to get or set the application wide settings.
         * The store uses Subscriptions and Behavior subjects for settings
         * related to the terminal theme. The benefit of this is each time a value
         * in the store is changed, the new value will be applied to the
         * terminal in real time through the terminal?.setOption() call.
         *
         * However this only applies to "theme" related settings
         * (i.e. background, foreground, etc). Other settings such as the
         * type of session, rows, and columns used by the underlying pty/terminal
         * will require a window reload, as those cannot be properly
         * updated in real time.
         * */
        ,
        __metadata("design:paramtypes", [])
    ], SettingsService);
    return SettingsService;
}());
exports.SettingsService = SettingsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHRpbmdzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTBDO0FBQzFDLDZCQUFzQztBQUN0QyxrRUFBa0M7QUFpQmxDO0lBbURDO1FBbEJBLGtDQUE2QixHQUE0QixJQUFJLHNCQUFlLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDdkYsOEJBQXlCLEdBQTJCLElBQUksc0JBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM1RSxpQ0FBNEIsR0FBNEIsSUFBSSxzQkFBZSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRTlFLDRCQUF1QixHQUEyQixJQUFJLHNCQUFlLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDekUsOEJBQXlCLEdBQTRCLElBQUksc0JBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBRTFGLDhCQUF5QixHQUE0QixJQUFJLHNCQUFlLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDbkYsOEJBQXlCLEdBQTRCLElBQUksc0JBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUVuRix5QkFBb0IsR0FBNEIsSUFBSSxzQkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRTFFLHVCQUFrQixHQUE0QixJQUFJLHNCQUFlLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDNUUsNkJBQXdCLEdBQTRCLElBQUksc0JBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNsRix1QkFBa0IsR0FBNEIsSUFBSSxzQkFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzFFLHVCQUFrQixHQUE2QixJQUFJLHNCQUFlLENBQUMsS0FBSyxDQUFDLENBQUE7UUFJeEUsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx3QkFBSyxDQUFDO1lBQ3RCLElBQUksRUFBRSxtQkFBbUI7WUFDekIsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUU7Z0JBQ1AseUJBQXlCLEVBQUU7b0JBQzFCLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNiO2dCQUNELGtCQUFrQixFQUFFO29CQUNuQixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsU0FBUztpQkFDbEI7Z0JBQ0QsbUJBQW1CLEVBQUU7b0JBQ3BCLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxFQUFFO2lCQUNYO2dCQUNELG9CQUFvQixFQUFFO29CQUNyQixJQUFJLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsS0FBSztpQkFDZDtnQkFDRCxRQUFRLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLEVBQUU7aUJBQ1g7Z0JBQ0QseUJBQXlCLEVBQUU7b0JBQzFCLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxHQUFHO2lCQUNaO2dCQUNELE9BQU8sRUFBRTtvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsRUFBRTtpQkFDWDtnQkFDRCxPQUFPLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLEVBQUU7aUJBQ1g7Z0JBQ0QseUJBQXlCLEVBQUU7b0JBQzFCLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxTQUFTO2lCQUNsQjtnQkFDRCxtQkFBbUIsRUFBRTtvQkFDcEIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLEtBQUs7aUJBQ2Q7Z0JBQ0QsbUJBQW1CLEVBQUU7b0JBQ3BCLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxTQUFTO2lCQUNsQjtnQkFDRCxtQkFBbUIsRUFBRTtvQkFDcEIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLE9BQU87aUJBQ2hCO2dCQUNELFlBQVksRUFBRTtvQkFDYixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsZ0JBQWdCO2lCQUN6QjtnQkFDRCx1QkFBdUIsRUFBRTtvQkFDeEIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLFNBQVM7aUJBQ2xCO2dCQUNELGdCQUFnQixFQUFFO29CQUNqQixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsRUFBRTtpQkFDWDtnQkFDRCxxQkFBcUIsRUFBRTtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLENBQUM7aUJBQ1Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNiLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxnQkFBZ0I7aUJBQ3pCO2dCQUNELGtCQUFrQixFQUFFO29CQUNuQixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsQ0FBQztpQkFDVjtnQkFDRCxzQkFBc0IsRUFBRTtvQkFDdkIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLFNBQVM7aUJBQ2xCO2dCQUNELGlCQUFpQixFQUFFO29CQUNsQixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLO2lCQUMxQjtnQkFDRCxvQkFBb0IsRUFBRTtvQkFDckIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLEtBQUs7aUJBQ2Q7Z0JBQ0Qsa0JBQWtCLEVBQUU7b0JBQ25CLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTO2lCQUMxRDthQUNEO1NBQ0QsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7Ozs7O1NBVUs7SUFDTCxpQ0FBTyxHQUFQLFVBQVEsR0FBVyxFQUFFLEtBQWdDO1FBQ3RELHNCQUFzQjtRQUN0QiwrQkFBK0I7UUFDL0IsWUFBWTtRQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBRUQ7OztTQUdLO0lBQ0wsaUNBQU8sR0FBUCxVQUFRLEdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBN0tXLGVBQWU7UUFmM0IsaUJBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUVuQzs7Ozs7Ozs7Ozs7O2FBWUs7OztPQUNRLGVBQWUsQ0E4SzNCO0lBQUQsc0JBQUM7Q0FBQSxBQTlLRCxJQThLQztBQTlLWSwwQ0FBZSJ9