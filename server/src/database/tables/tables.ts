enum TableNames {
    GorillaUser = 'gorillaUser',
    UserFriends = 'userFriends'
}

interface GorillaUser {
    userid?: string,
    username?: string,
    password?: string,
    highScore?: number,
}

enum GorillaUserColumns{
    all = "*",
    userid = 'userId',
    username = 'username',
    password = 'password',
    highScore = 'high_score'
}

interface UserFriends{
    userid?: string,
    friendid?: string,
    friends_since?: object,
}

enum UserFriendsColumns{
    all = '*',
    userid = 'userid',
    friendId = 'friendId',
    friends_since = 'friends_since',
}

export {TableNames, GorillaUser, UserFriends, GorillaUserColumns, UserFriendsColumns};

