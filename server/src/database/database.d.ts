export function config(): Promise<void>;
export function select(columnName: string, tableName: string, condition="true"): Promise<GorillaUser | UserFriends>;
export function getUserId(userName: string): Promise<number>;
export function makeFriends(userName: string, friendUserName: string): Promise<void>;
export function addUser(userName: string, password: string, highscore: number): Promise<void>;   
export function getHighScore(userName: string): Promise<number>; 



// module.exports = { config, select, getUserId, makeFriends, addUser }

interface GorillaUser {
    userid: string,
    username: string,
    password: string,
    highscore: number,
}

interface UserFriends{
    userid: string,
    friendid: string,
    friends_since: string,
}

enum TableNames {
    GorillaUser,
    UserFriends
}