import {pool} from '../connection';

// Configures the database tables
async function config() {
    try {
        await createGorillaUserTable();
        await createUserFriendsTable();
    } catch (error) {
        console.log(error);
    }
}

// Creates the user table inside the database
async function createGorillaUserTable(){
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(`create table gorillaUser (
            userId BIGSERIAL primary key,
            username varchar(50) unique not null,
            password varchar(50) not null,
            high_score int
        );`)
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(error);
    }finally{
        client.release();
    }
}

// Creates the userFriends table inside the database
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

export {config};