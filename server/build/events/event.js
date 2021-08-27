"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinEvent = void 0;
var JoinEvent = /** @class */ (function () {
    function JoinEvent(sender, nickname) {
        this.sender = sender;
        this.nickname = nickname;
        this.name = JoinEvent.name;
    }
    return JoinEvent;
}());
exports.JoinEvent = JoinEvent;
