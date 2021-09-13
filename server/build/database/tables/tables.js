"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFriendsColumns = exports.GorillaUserColumns = exports.TableNames = void 0;
var TableNames;
(function (TableNames) {
    TableNames["GorillaUser"] = "gorillaUser";
    TableNames["UserFriends"] = "userFriends";
})(TableNames || (TableNames = {}));
exports.TableNames = TableNames;
var GorillaUserColumns;
(function (GorillaUserColumns) {
    GorillaUserColumns["all"] = "*";
    GorillaUserColumns["userid"] = "userId";
    GorillaUserColumns["username"] = "username";
    GorillaUserColumns["password"] = "password";
    GorillaUserColumns["highScore"] = "high_score";
})(GorillaUserColumns || (GorillaUserColumns = {}));
exports.GorillaUserColumns = GorillaUserColumns;
var UserFriendsColumns;
(function (UserFriendsColumns) {
    UserFriendsColumns["all"] = "*";
    UserFriendsColumns["userid"] = "userid";
    UserFriendsColumns["friendId"] = "friendId";
    UserFriendsColumns["friends_since"] = "friends_since";
})(UserFriendsColumns || (UserFriendsColumns = {}));
exports.UserFriendsColumns = UserFriendsColumns;
