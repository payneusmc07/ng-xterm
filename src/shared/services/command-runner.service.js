"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRunnerService = void 0;
var core_1 = require("@angular/core");
var execa = __importStar(require("execa"));
var CommandRunnerService = /** @class */ (function () {
    function CommandRunnerService() {
        this.execa = window.require("execa");
        this.childProcess = window.require("child_process");
    }
    CommandRunnerService.prototype.runCommandAsUser = function (commandToRun) {
        return new Promise(function (resolve, reject) {
            var result = "";
            var error = "";
            var stdout = execa.command(commandToRun, { shell: process.env.SHELL }).stdout;
            stdout.on("data", function (chunk) { return result += chunk.toString(); });
            stdout.on("error", function (chunk) { return error += chunk.toString(); });
            stdout.on("close", function () { return (result ? resolve(result) : reject(error)); });
        });
    };
    CommandRunnerService = __decorate([
        core_1.Injectable({ providedIn: "root" }),
        __metadata("design:paramtypes", [])
    ], CommandRunnerService);
    return CommandRunnerService;
}());
exports.CommandRunnerService = CommandRunnerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1ydW5uZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmQtcnVubmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUEwQztBQUMxQywyQ0FBOEI7QUFLOUI7SUFJQztRQUNDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUVELCtDQUFnQixHQUFoQixVQUFpQixZQUFvQjtRQUNwQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDbEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQ2YsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFBO1lBRU4sSUFBQSxNQUFNLEdBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxPQUEzRCxDQUEyRDtZQUN6RSxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQTFCLENBQTBCLENBQUMsQ0FBQTtZQUNoRSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQXpCLENBQXlCLENBQUMsQ0FBQTtZQUNoRSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxjQUFNLE9BQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQTFDLENBQTBDLENBQUMsQ0FBQTtRQUNyRSxDQUFDLENBQUMsQ0FBQTtJQUVILENBQUM7SUFwQlcsb0JBQW9CO1FBRmhDLGlCQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7O09BRXRCLG9CQUFvQixDQXFCaEM7SUFBRCwyQkFBQztDQUFBLEFBckJELElBcUJDO0FBckJZLG9EQUFvQiJ9