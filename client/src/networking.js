import { __awaiter, __generator } from "tslib";
import { io } from "socket.io-client";
var Networking = /** @class */ (function () {
    function Networking() {
        this.socket = io("http://localhost:8080");
        this.socket.on("connect", function () {
            console.log("socket connected.");
        });
    }
    Networking.prototype.getGames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.socket.emit("GetRooms");
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.socket.once("GotRooms", function (gameList) { return resolve(gameList); });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Networking.prototype.joinGame = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.socket.emit('JoinRoom', id);
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.socket.once('JoinedRoom', function (room) { return resolve(room); });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Networking.prototype.createRoom = function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.socket.emit('CreateRoom', settings);
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.socket.once('CreatedRoom', function (id) { return resolve(id); });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Networking.prototype.registerHigshcore = function (name, wpm) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.socket.emit('RegisterHighscore', name, wpm);
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.socket.once('RegisteredHighscore', function () { return resolve(); });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Networking;
}());
export default new Networking;
//# sourceMappingURL=networking.js.map