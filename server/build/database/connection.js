"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
require('dotenv').config();
var pool = new pg_1.Pool({
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: Number(process.env.PORT),
    database: process.env.DATABASE,
    max: 25,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 1000
});
exports.pool = pool;
