require('dotenv').config()
const {Pool} = require('pg')
const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    max: 25,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 1000
})


// does  a basic select statement from a table
async function select(columnName, tableName, condition="true"){
    try{
        const {rows} = await pool.query(`select ${columnName} from ${tableName} where ${condition};`)
        return rows
    }
    catch (e){
        console.log(`Somthing wrong happened... \n______\n${e.message}\n______\n`);
    }
}

// adds a user to the gorillaUser table
async function addUser(userName, password, highScore){
    
    if(!userName || !password){
        throw new Error("userName and password cannot be undefined or empty")
    }
    
    highScore = highScore || null;
    const client = await pool.connect();
    try{
        await client.query("BEGIN")
        await client.query(`insert into gorillaUser (username, password, high_score) values (
            '${userName}', 
            '${password}', 
            ${highScore});`)
        await client.query("COMMIT")
    } catch(e){
        await client.query("ROLLBACK")
        console.log(e);
    }
    finally{
        client.release()
        await select("*", "gorillaUser")
    }
}

// configures the basic tables in the database
async function config(){
    try {
        await createGorillaUserTable()
        await createUserFriendsTable()
    } catch (e) {
        console.log(e);
    }
    
}

// Private method for creating the gorillaUser table
async function createGorillaUserTable(){
    const client = await pool.connect()
    try{
        client.query('BEGIN')
        client.query(`create table gorillaUser (
            userId BIGSERIAL primary key,
            username varchar(50) unique not null,
            password varchar(50) not null,
            high_score int
        );`)
        client.query('COMMIT')
    } catch(e){
        await client.query("ROLLBACK")
        console.log(e);
    } finally {
        client.release()
    }
}

// private method creating the userFreinds table
async function createUserFriendsTable(){
    const client = await pool.connect()
    try{
        await client.query("BEGIN")
        await client.query(`create table userFriends (
                            userID int references gorillaUser (userId),
                            friendId int references gorillaUser (userId),
                            friends_since timestamp with time zone default current_timestamp,
                            primary key (userId, friendId));`)
        await client.query("COMMIT")
    } catch(e){
        await client.query("ROLLBACK")
        console.log(e);
    }
    finally{
        client.release()
    }
}

// private method creating friends in the database using their userId's
async function addFriend(userId, friendId){
    if(userId == friendId){
        throw new Error("userId and friendId must be different")
    }
    if(userId == null || friendId == null){
        throw new Error("The userId and the friendId must not be null")
    }
    const client = await pool.connect()
    try {
        client.query("BEGIN")
        client.query(`insert into userFriends (userId, friendId) values(
        ${userId},
        ${friendId}
        );`)
        client.query("COMMIT")
    } catch (e) {
        await client.query("ROLLBACK")
        console.log(e);
    } finally {
        client.release()
    }
}



// Method getting the userId using a username
async function getUserId(username){
    const rowArray = await select("userId", "gorillaUser", `username='${username}'`)
    return Number(rowArray[0].userid)
}

// creates friends in the database using userId's
async function makeFriends(username, friendUserName){
    try {
        const id1 = getUserId(username)
        const id2 = getUserId(friendUserName)
        const userIdArray = await Promise.all([id1, id2])
        await addFriend(userIdArray[0], userIdArray[1])
        console.table(await select("*", "userFriends"));
    } catch (e) {
        console.log(e);
    }
}
module.exports = { config, select, getUserId, makeFriends, addUser }
// addUser("me", "pyself", 12314)
// select("*", "gorillaUser").then((row)=> console.log(row))
