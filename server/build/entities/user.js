"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(uuid, nickname, socket) {
        this.socket = socket;
        this.publicInfo = { uuid: uuid, nickname: nickname };
    }
    return User;
}());
exports.User = User;
