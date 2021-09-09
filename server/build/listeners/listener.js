"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDefaultEvents = void 0;
var engine_1 = require("../engine");
var database_1 = require("../database/database");
/**
 * Observes all the default events from
 * the sockets registered here.
 */
function registerDefaultEvents(socket) {
    socket.onAny(function (a) { return console.log(a); });
    socket.on("JoinRoom", function (data) { return engine_1.engine.joinRoom(socket, data); });
    socket.on("CreateRoom", function (data) { return engine_1.engine.createRoom(socket, data); });
    socket.on("GetRooms", function () { return engine_1.engine.getRooms(socket); });
    socket.on("RegisterHighscore", function (name, wpm) {
        console.log(name);
        console.log(wpm);
        var new_wpm = wpm;
        (0, database_1.getUserId)(name).then(function (id) {
            if (id == -1) {
                (0, database_1.addUser)(name, "password", new_wpm);
            }
            else {
                (0, database_1.getHighScore)(name).then(function (score) {
                    if (!score || score < new_wpm) {
                        (0, database_1.addUser)(name, "password", new_wpm);
                    }
                });
            }
        });
        socket.emit("RegisteredHighscore");
    });
}
exports.registerDefaultEvents = registerDefaultEvents;
