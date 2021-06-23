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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemService = void 0;
var core_1 = require("@angular/core");
var FileSystemService = /** @class */ (function () {
    /**
     * By using window.require, the modules inside in the
     * constructor body can be used in the renderer (Angular)
     * process.
     * @see ./typings.d.ts
     * */
    function FileSystemService() {
        this.fsExtra = window.require("fs-extra");
        this.readline = window.require("readline");
    }
    /**
     * Append new data to a file rather than overwriting it.
     * @param {string} filePath the path to the file which is being modified.
     * @param {string} dataToAppend the data being appended to the file.
     * */
    FileSystemService.prototype.appendToFile = function (filePath, dataToAppend) {
        this.fsExtra.writeFile(filePath, "\n" + dataToAppend, { encoding: "utf8", flag: "a" }, function (error) { return console.warn(error); });
    };
    /**
     * Create a new file and overwrite any existing data.
     * @param {string} filePath the path to the file which is being modified.
     * @param {string} dataToAppend the data being appended to the file.
     * */
    FileSystemService.prototype.writeFile = function (filePath, dataToAppend) {
        var newFile = this.fsExtra.createWriteStream(filePath, { flags: "w+" });
        newFile.write("" + dataToAppend, function (error) { return console.log(error); });
    };
    FileSystemService.prototype.openAndWrite = function (filePath, dataToAppend) {
        var _this = this;
        this.fsExtra.open(filePath, "w+", (function (err, fd) {
            if (err) {
                alert(err.message);
                return;
            }
            _this.fsExtra.writeFile(filePath, dataToAppend)
                .catch(function (reason) { return alert(reason); });
            _this.fsExtra.close(fd, function (error) {
                if (error) {
                    alert(error);
                }
            });
        }));
    };
    /**
     * Read and return the contents of a directory
     * @param {string} directoryPath the path to the directory which will be read.
     * @returns a promise containing the contents of the directory.
     * */
    FileSystemService.prototype.readDirectory = function (directoryPath) {
        return this.fsExtra.readdir(directoryPath);
    };
    FileSystemService.prototype.readFile = function (fileToRead) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var data = "";
                        var errorMessage = "";
                        var buffer = _this.fsExtra.createReadStream(fileToRead);
                        buffer.on("data", function (chunk) { return data += chunk; });
                        buffer.on("error", function (error) { return errorMessage += error; });
                        buffer.on("close", function () { return (data ? resolve(data) : reject(errorMessage)); });
                    })];
            });
        });
    };
    FileSystemService.prototype.copyFile = function (fromPath, toPath) {
        if (this.checkIfPathExists(toPath)) {
            console.log(toPath + " exists");
        }
        else {
            this.fsExtra.copy(fromPath, toPath)
                .then(function () { return console.log("copied " + fromPath + " to " + toPath); })
                .catch(function (error) { return alert(error); });
        }
    };
    FileSystemService.prototype.checkIfPathExists = function (pathToCheck) {
        return this.fsExtra.existsSync(pathToCheck);
    };
    FileSystemService = __decorate([
        core_1.Injectable({ providedIn: "root" }),
        __metadata("design:paramtypes", [])
    ], FileSystemService);
    return FileSystemService;
}());
exports.FileSystemService = FileSystemService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zeXN0ZW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGUtc3lzdGVtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTBDO0FBTTFDO0lBUUM7Ozs7O1NBS0s7SUFDTDtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUVEOzs7O1NBSUs7SUFDTCx3Q0FBWSxHQUFaLFVBQWEsUUFBZ0IsRUFBRSxZQUFvQjtRQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTSxZQUFlLEVBQ3JELEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsVUFBQyxLQUFLLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFuQixDQUFtQixDQUFDLENBQUE7SUFDbEUsQ0FBQztJQUVEOzs7O1NBSUs7SUFFTCxxQ0FBUyxHQUFULFVBQVUsUUFBZ0IsRUFBRSxZQUFvQjtRQUMvQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1FBQ3ZFLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBRyxZQUFjLEVBQUUsVUFBQyxLQUFLLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUE7SUFDaEUsQ0FBQztJQUVELHdDQUFZLEdBQVosVUFBYSxRQUFnQixFQUFFLFlBQW9CO1FBQW5E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