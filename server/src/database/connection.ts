import {Pool} from 'pg';
require('dotenv').config();
const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: Number(process.env.PORT),
    database: process.env.DATABASE,
    max: 25,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 1000
})

export {pool};