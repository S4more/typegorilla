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
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = require("../connection");
var tables_1 = require("../tables/tables");
// does a basic select statment in a table
function select(columnName, table, condition) {
    if (condition === void 0) { condition = 'true'; }
    return __awaiter(this, void 0, void 0, function () {
        var rows, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, connection_1.pool.query("select " + columnName + " from " + table + " where " + condition + ";")];
                case 1:
                    rows = (_a.sent()).rows;
                    if (table = tables_1.TableNames.GorillaUser) {
                        return [2 /*return*/, fillGorillaI(rows)];
                    }
                    if (table = tables_1.TableNames.UserFriends) {
                        return [2 /*return*/, fillUserFriendsI(rows)];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log("Somthing wrong happened... \n______\n" + e_1.message + "\n______\n");
                    return [3 /*break*/, 3];
                case 3: throw new Error('The result of the select may be empty');
            }
        });
    });
}
// Fills a userFriends table interface by using the output from a query
function fillUserFriendsI(rows) {
    var fArray = [];
    rows.forEach(function (row) {
        var fInterface = {};
        if (row.userid) {
            fInterface.userid = row.userid;
        }
        if (row.friendid) {
            fInterface.friendid = row.friendid;
        }
        if (row.friends_since) {
            fInterface.friends_since = row.friends_since;
        }
        fArray.push(fInterface);
    });
    return fArray;
}
// Fills an gorillauser table interface using the output from a query
function fillGorillaI(rows) {
    var gArray = [];
    rows.forEach(function (row) {
        var gInterface = {};
        if (row.userid) {
            gInterface.userid = row.userid;
        }
        if (row.username) {
            gInterface.username = row.username;
        }
        if (row.password) {
            gInterface.password = row.password;
        }
        if (row.high_score) {
            gInterface.highScore = row.high_score;
        }
        gArray.push(gInterface);
    });
    return gArray;
}
// adds a user to the gorillaUser table
function addUser(userName, password, highScore) {
    return __awaiter(this, void 0, void 0, function () {
        var client, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection_1.pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, 8, 9]);
                    return [4 /*yield*/, client.query("BEGIN")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, client.query("insert into gorillaUser (username, password, high_score) values (\n            '" + userName + "', \n            '" + password + "', \n            " + highScore + ");")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, client.query("COMMIT")];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 6:
                    e_2 = _a.sent();
                    return [4 /*yield*/, client.query("ROLLBACK")];
                case 7:
                    _a.sent();
                    console.log(e_2);
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
        var res, client, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (userId == friendId) {
                        throw new Error("userId and friendId must be different");
                    }
                    return [4 /*yield*/, select(tables_1.GorillaUserColumns.userid, tables_1.TableNames.GorillaUser, tables_1.GorillaUserColumns.userid + "=" + userId + "\n     or " + tables_1.GorillaUserColumns.userid + "=" + friendId + ";")];
                case 1:
                    res = _a.sent();
                    if (res.length == 0) {
                    }
                    return [4 /*yield*/, connection_1.pool.connect()];
                case 2:
                    client = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 4, 6, 7]);
                    client.query("BEGIN");
                    client.query("insert into " + tables_1.TableNames.UserFriends + " (userId, friendId) values(\n        " + userId + ",\n        " + friendId + "\n        );");
                    client.query("COMMIT");
                    return [3 /*break*/, 7];
                case 4:
                    e_3 = _a.sent();
                    return [4 /*yield*/, client.query("ROLLBACK")];
                case 5:
                    _a.sent();
                    console.log(e_3);
                    return [3 /*break*/, 7];
                case 6:
                    client.release();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Method getting the userId using a username
function getUserId(username) {
    return __awaiter(this, void 0, void 0, function () {
        var rowArray, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, select(tables_1.GorillaUserColumns.userid, tables_1.TableNames.GorillaUser, "username='" + username + "'")];
                case 1:
                    rowArray = _a.sent();
                    return [2 /*return*/, Number(rowArray[0].userid)];
                case 2:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [3 /*break*/, 3];
                case 3: throw new Error('The user may not exist');
            }
        });
    });
}
// creates friends in the database using userId's
function makeFriends(username, friendUserName) {
    return __awaiter(this, void 0, void 0, function () {
        var id1, id2, userIdArray, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    id1 = getUserId(username);
                    id2 = getUserId(friendUserName);
                    return [4 /*yield*/, Promise.all([id1, id2])];
                case 1:
                    userIdArray = _a.sent();
                    return [4 /*yield*/, addFriend(userIdArray[0], userIdArray[1])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, addFriend(userIdArray[1], userIdArray[0])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, select(tables_1.UserFriendsColumns.all, tables_1.TableNames.UserFriends)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_5 = _a.sent();
                    console.log(e_5);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// gets the high score from a user using the username
function getHighScore(username) {
    return __awaiter(this, void 0, void 0, function () {
        var result, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, select(tables_1.GorillaUserColumns.highScore, tables_1.TableNames.GorillaUser, tables_1.GorillaUserColumns.username + "='" + username + "'")];
                case 1:
                    result = _a.sent();
                    if (result[0].highScore) {
                        return [2 /*return*/, result[0].highScore];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _a.sent();
                    console.log(e_6);
                    return [3 /*break*/, 3];
                case 3: throw new Error('The high score might be bull or undefined');
            }
        });
    });
}
function removeUser(username) {
    return __awaiter(this, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, select(tables_1.GorillaUserColumns.username, tables_1.TableNames.GorillaUser, tables_1.GorillaUserColumns.username + "='" + username + "';")];
                case 1:
                    res = _a.sent();
                    if (res.length == 0) {
                        throw new Error('The user you are trying to remove does not exist');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getFriends(username) {
    return __awaiter(this, void 0, void 0, function () {
        var res, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, select(tables_1.GorillaUserColumns.userid, tables_1.TableNames.GorillaUser, tables_1.GorillaUserColumns.username + "='" + username + "'")];
                case 1:
                    res = _a.sent();
                    if (res.length == 0) {
                        throw new Error('The user you are trying get friends does not exist');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: throw new Error('The friend you are trying to get may not exist');
            }
        });
    });
}
select(tables_1.GorillaUserColumns.all, tables_1.TableNames.GorillaUser).then(console.table);
