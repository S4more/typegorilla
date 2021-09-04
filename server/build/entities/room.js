"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
var Room = /** @class */ (function () {
    function Room(id, settings) {
        this.id = id;
        this.users = [];
        this.active = true;
        this.indexes = {};
        this.settings = settings;
    }
    Room.prototype.localListener = function (user) {
        var _this = this;
        user.socket.on("Advance", function (index) { return _this.indexes[user.publicInfo.id] = index; });
    };
    Room.prototype.addMember = function (user) {
        if (this.users.length < this.settings.max_users) {
            this.users.push(user);
            user.socket.join(this.id);
            user.socket.emit("JoinedRoom", this.getPublicInfo());
        }
        else {
            user.socket.emit("FullRoom");
        }
    };
    Room.prototype.getPublicInfo = function () {
        return {
            id: this.id,
            users: this.users.map(function (x) { return x.publicInfo; }),
            settings: this.settings,
            active: this.active,
        };
    };
    Room.prototype.sendTick = function (io) {
        console.log("[Room " + this.id + "]: GameTick emmited.");
        io.to(this.id).emit("GameTick", this.indexes);
    };
    return Room;
}());
exports.Room = Room;
