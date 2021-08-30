"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = exports.Response = void 0;
var Response;
(function (Response) {
    Response[Response["Full"] = 0] = "Full";
    Response[Response["Success"] = 1] = "Success";
})(Response = exports.Response || (exports.Response = {}));
var Room = /** @class */ (function () {
    function Room(uuid, info) {
        this.uuid = uuid;
        this.users = [];
        this.open = true;
        this.active = true;
        this.name = info.name;
        this.max_users = info.max_users;
    }
    Room.prototype.addMember = function (user) {
        if (this.users.length < this.max_users) {
            this.users.push(user);
            user.socket.join(this.uuid);
            return Response.Success;
        }
        else {
            return Response.Full;
        }
    };
    Room.prototype.getPublicInfo = function () {
        return {
            users: this.users.map(function (x) { return x.publicInfo; }),
            open: this.open,
            active: this.active,
            name: this.name,
            max_users: this.max_users
        };
    };
    return Room;
}());
exports.Room = Room;