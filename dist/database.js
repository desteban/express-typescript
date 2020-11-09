"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = void 0;
const promise_1 = require("mysql2/promise");
const keys_1 = require("./keys");
function Connect() {
    const connection = promise_1.createPool({
        host: keys_1.keys.host,
        user: keys_1.keys.user,
        database: keys_1.keys.database,
        password: "",
        connectionLimit: 10,
    });
    return connection;
}
exports.Connect = Connect;
