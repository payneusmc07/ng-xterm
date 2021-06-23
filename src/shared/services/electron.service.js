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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronService = void 0;
var core_1 = require("@angular/core");
var ElectronService = /** @class */ (function () {
    function ElectronService() {
        /**
         * By using window.require, the modules inside in the
         * constructor body can be used in the renderer (Angular)
         * process.
         * @see ./typings.d.ts
         * */
        this.ipcRenderer = window.require("electron").ipcRenderer;
        this.shell = window.require("electron").shell;
        this.os = window.require("os");
    }
    ElectronService = __decorate([
        core_1.Injectable({ providedIn: "root" })
        /**
         * Create a service which can be injected into any component, so it can access
         * Electron and native apis.
         *
         * If you import a module but never use any of the imported values other than as TypeScript types,
         * the resulting javascript file will look as if you never imported the module at all.
         *
         * @example
         * `@Component({
            selector: "tabs-root",
            templateUrl: "./settings.tabs.component.html",
            styleUrls: ["./settings.tabs.component.scss"]
        })
         * constructor(private electronService: ElectronService)
         *
         * this.electronService.ipcRenderer.send("channel", "...args[]")`
         */
        ,
        __metadata("design:paramtypes", [])
    ], ElectronService);
    return ElectronService;
}());
exports.ElectronService = ElectronService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlY3Ryb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVsZWN0cm9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTBDO0FBdUIxQztJQVdDO1FBQ0M7Ozs7O2FBS0s7UUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBQ3pELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUE7UUFDN0MsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFyQlcsZUFBZTtRQW5CM0IsaUJBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUVuQzs7Ozs7Ozs7Ozs7Ozs7OztXQWdCRzs7O09BQ1UsZUFBZSxDQXNCM0I7SUFBRCxzQkFBQztDQUFBLEFBdEJELElBc0JDO0FBdEJZLDBDQUFlIn0=