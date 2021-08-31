"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(id, nickname, socket) {
        this.socket = socket;
        this.publicInfo = { id: id, nickname: nickname };
    }
    return User;
}());
exports.User = User;
