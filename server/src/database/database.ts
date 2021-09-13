import {pool} from './connection'
import {TableNames, GorillaUserColumns, GorillaUser, UserFriendsColumns, UserFriends} from './tables/tables'

// does a basic select statment in a table
async function select(columnName:GorillaUserColumns | UserFriendsColumns, table: TableNames, condition='true'): Promise<GorillaUser[] | UserFriends[]> {
    try{
        const {rows} = await pool.query(`select ${columnName} from ${table} where ${condition};`)
        if(table = TableNames.GorillaUser){
            return fillGorillaI(rows);
        }
        if(table = TableNames.UserFriends){
            return fillUserFriendsI(rows);
        }
    }
    catch (e: any){
        console.log(`Somthing wrong happened... \n______\n${e.message}\n______\n`);
    }
    throw new Error('The result of the select may be empty');
}

// Fills a userFriends table interface by using the output from a query
function fillUserFriendsI(rows: any[]): UserFriends[]{
    let fArray: UserFriends[] = [];
    rows.forEach(row => {
        let fInterface: UserFriends = {};
        if(row.userid){ fInterface.userid = row.userid }
        if(row.friendid){ fInterface.friendid = row.friendid }
        if(row.friends_since){ fInterface.friends_since = row.friends_since }
        
        fArray.push(fInterface);
    });
    return fArray;
}

// Fills an gorillauser table interface using the output from a query
function fillGorillaI(rows: any[]): GorillaUser[]{
    let gArray: GorillaUser[] = [];
    rows.forEach(row => {
        let gInterface: GorillaUser = {};
        if(row.userid){ gInterface.userid = row.userid }
        if(row.username){ gInterface.username = row.username }
        if(row.password){ gInterface.password = row.password }
        if(row.high_score){ gInterface.highScore = row.high_score }
        gArray.push(gInterface);
    });
    return gArray;
}

// adds a user to the gorillaUser table
async function addUser(userName: string, password: string, highScore: number){
    const client = await pool.connect();
    try{
        await client.query("BEGIN");
        await client.query(`insert into gorillaUser (username, password, high_score) values (
            '${userName}', 
            '${password}', 
            ${highScore});`);
        await client.query("COMMIT");
    } catch(e: any){
        await client.query("ROLLBACK");
        console.log(e);
    }
    finally{
        client.release();
    }
}


// private method creating friends in the database using their userId's
async function addFriend(userId: number, friendId: number){
    if(userId == friendId){
        throw new Error("userId and friendId must be different");
    }
    const res = await select(GorillaUserColumns.userid, TableNames.GorillaUser, `${GorillaUserColumns.userid}=${userId}
     or ${GorillaUserColumns.userid}=${friendId};`)
    if(res.length == 0){

    }
    const client = await pool.connect();
    try {
        client.query("BEGIN");
        client.query(`insert into ${TableNames.UserFriends} (userId, friendId) values(
        ${userId},
        ${friendId}
        );`);
        client.query("COMMIT");
    } catch (e) {
        await client.query("ROLLBACK");
        console.log(e);
    } finally {
        client.release();
    }
}

// Method getting the userId using a username
async function getUserId(username: string){
    try {
        const rowArray = await select(GorillaUserColumns.userid, TableNames.GorillaUser, `username='${username}'`)        
        if(!rowArray[0]){
            return -1;
        }
        return Number(rowArray[0].userid)
    } catch (e){
        console.log(e);
    }
    return -1;
}

// creates friends in the database using userId's
async function makeFriends(username: string, friendUserName: string){
    try {
        const id1 = getUserId(username)
        const id2 = getUserId(friendUserName)
        const userIdArray = await Promise.all([id1, id2])
        await addFriend(userIdArray[0], userIdArray[1])
        await addFriend(userIdArray[1], userIdArray[0]);
        await select(UserFriendsColumns.all, TableNames.UserFriends);
    } catch (e) {
        console.log(e);
    }
}

// gets the high score from a user using the username
async function getHighScore(username: string){
    try{
        const result = await select(GorillaUserColumns.highScore, TableNames.GorillaUser, `${GorillaUserColumns.username}='${username}'`);        
        if((<GorillaUser[]>result)[0].highScore){
            return (<GorillaUser[]>result)[0].highScore
        }
    } catch(e) {
        console.log(e);
    }
    throw new Error('The high score might be bull or undefined')
}

async function removeUser(username:string) {
    try {
        const res = await select(GorillaUserColumns.username, TableNames.GorillaUser, `${GorillaUserColumns.username}='${username}';`);
        if(res.length == 0){
            throw new Error('The user you are trying to remove does not exist');
        }
    } catch (error) {
        console.log(error);
    }
}
async function getFriends(username:string): Promise<number[]> {
    try {
        const res = await select(GorillaUserColumns.userid, TableNames.GorillaUser, `${GorillaUserColumns.username}='${username}'`);
        if(res.length == 0){
            throw new Error('The user you are trying get friends does not exist');
        }

    } catch (error) {
        console.log(error);
        
    }
    throw new Error('The friend you are trying to get may not exist');
}
export {select, getUserId, makeFriends, addUser, getHighScore}