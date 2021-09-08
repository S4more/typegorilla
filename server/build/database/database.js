"use strict";
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
require('dotenv').config();
var Pool = require('pg').Pool;
var pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    max: 25,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 1000
});
// does  a basic select statement from a table
function select(columnName, tableName, condition) {
    if (condition === void 0) { condition = "true"; }
    return __awaiter(this, void 0, void 0, function () {
        var rows, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, pool.query("select " + columnName + " from " + tableName + " where " + condition + ";")];
                case 1:
                    rows = (_a.sent()).rows;
                    return [2 /*return*/, rows];
                case 2:
                    e_1 = _a.sent();
                    console.log("Somthing wrong happened... \n______\n" + e_1.message + "\n______\n");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// adds a user to the gorillaUser table
function addUser(userName, password, highScore) {
    return __awaiter(this, void 0, void 0, function () {
        var client, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!userName || !password) {
                        throw new Error("userName and password cannot be undefined or empty");
                    }
                    highScore = highScore || null;
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, 8, 10]);
                    return [4 /*yield*/, client.query("BEGIN")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, client.query("insert into gorillaUser (username, password, high_score) values (\n            '" + userName + "', \n            '" + password + "', \n            " + highScore + ");")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, client.query("COMMIT")];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 6:
                    e_2 = _a.sent();
                    return [4 /*yield*/, client.query("ROLLBACK")];
                case 7:
                    _a.sent();
                    console.log(e_2);
                    return [3 /*break*/, 10];
                case 8:
                    client.release();
                    return [4 /*yield*/, select("*", "gorillaUser")];
                case 9:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
// configures the basic tables in the database
function config() {
    return __awaiter(this, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, createGorillaUserTable()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, createUserFriendsTable()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.log(e_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Private method for creating the gorillaUser table
function createGorillaUserTable() {
    return __awaiter(this, void 0, void 0, function () {
        var client, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 3, 5, 6]);
                    client.query('BEGIN');
                    client.query("create table gorillaUser (\n            userId BIGSERIAL primary key,\n            username varchar(50) unique not null,\n            password varchar(50) not null,\n            high_score int\n        );");
                    client.query('COMMIT');
                    return [3 /*break*/, 6];
                case 3:
                    e_4 = _a.sent();
                    return [4 /*yield*/, client.query("ROLLBACK")];
                case 4:
                    _a.sent();
                    console.log(e_4);
                    return [3 /*break*/, 6];
                case 5:
                    client.release();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// private method creating the userFreinds table
function createUserFriendsTable() {
    return __awaiter(this, void 0, void 0, function () {
        var client, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, 8, 9]);
                    return [4 /*yield*/, client.query("BEGIN")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, client.query("create table userFriends (\n                            userID int references gorillaUser (userId),\n                            friendId int references gorillaUser (userId),\n                            friends_since timestamp with time zone default current_timestamp,\n                            primary key (userId, friendId));")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, client.query("COMMIT")];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 6:
                    e_5 = _a.sent();
                    return [4 /*yield*/, client.query("ROLLBACK")];
                case 7:
                    _a.sent();
                    console.log(e_5);
                    return [3 /*break*/, 9];
                case 8:
                    client.release();
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
// private method creating friends in the database using their userId's
function addFriend(userId, friendId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (userId == friendId) {
                        throw new Error("userId and friendId must be different");
                    }
                    if (userId == null || friendId == null) {
                        throw new Error("The userId and the friendId must not be null");
                    }
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 3, 5, 6]);
                    client.query("BEGIN");
                    client.query("insert into userFriends (userId, friendId) values(\n        " + userId + ",\n        " + friendId + "\n        );");
                    client.query("COMMIT");
                    return [3 /*break*/, 6];
                case 3:
                    e_6 = _a.sent();
                    return [4 /*yield*/, client.query("ROLLBACK")];
                case 4:
                    _a.sent();
                    console.log(e_6);
                    return [3 /*break*/, 6];
                case 5:
                    client.release();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Method getting the userId using a username
function getUserId(username) {
    return __awaiter(this, void 0, void 0, function () {
        var rowArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, select("userId", "gorillaUser", "username='" + username + "'")];
                case 1:
                    rowArray = _a.sent();
                    return [2 /*return*/, Number(rowArray[0].userid)];
            }
        });
    });
}
// creates friends in the database using userId's
function makeFriends(username, friendUserName) {
    return __awaiter(this, void 0, void 0, function () {
        var id1, id2, userIdArray, _a, _b, e_7;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    id1 = getUserId(username);
                    id2 = getUserId(friendUserName);
                    return [4 /*yield*/, Promise.all([id1, id2])];
                case 1:
                    userIdArray = _c.sent();
                    return [4 /*yield*/, addFriend(userIdArray[0], userIdArray[1])];
                case 2:
                    _c.sent();
                    _b = (_a = console).table;
                    return [4 /*yield*/, select("*", "userFriends")];
                case 3:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 5];
                case 4:
                    e_7 = _c.sent();
                    console.log(e_7);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
module.exports = { config: config, select: select, getUserId: getUserId, makeFriends: makeFriends, addUser: addUser };
// addUser("me", "pyself", 12314)
// select("*", "gorillaUser").then((row)=> console.log(row))
