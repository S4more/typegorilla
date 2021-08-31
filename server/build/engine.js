"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.engine = exports.Engine = void 0;
var room_1 = require("./entities/room");
var user_1 = require("./entities/user");
var Engine = /** @class */ (function () {
    function Engine() {
        this.rooms = [];
        this.connected_sockets = {};
    }
    Engine.prototype.findUserBySocketId = function (socket) {
        return this.connected_sockets[socket.id];
    };
    Engine.prototype.generateID = function () {
        return Math.floor(Math.random() * 10000).toString();
    };
    Engine.prototype.joinRoom = function (socket, name) {
        var room = this.rooms.find(function (x) { return x.settings.name == name; });
        if (room != undefined) {
            var user = new user_1.User(this.generateID(), "default", socket);
            room.addMember(user);
        }
        else {
            socket.emit("NotFoundRoom");
        }
    };
    Engine.prototype.createRoom = function (socket, settings) {
        var room = new room_1.Room(this.generateID(), settings);
        this.rooms.push(room);
        socket.emit("CreatedRoom", room.getPublicInfo());
    };
    Engine.prototype.getRooms = function (socket) {
        socket.emit("GotRooms", this.rooms.map(function (x) { return x.getPublicInfo(); }));
    };
    return Engine;
}());
exports.Engine = Engine;
var engine = new Engine();
exports.engine = engine;
