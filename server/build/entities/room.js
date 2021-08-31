"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = exports.Response = void 0;
var Response;
(function (Response) {
    Response[Response["Full"] = 0] = "Full";
    Response[Response["Success"] = 1] = "Success";
})(Response = exports.Response || (exports.Response = {}));
var Room = /** @class */ (function () {
    function Room(id, settings) {
        this.id = id;
        this.users = [];
        this.active = false;
        this.settings = settings;
    }
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
    return Room;
}());
exports.Room = Room;
