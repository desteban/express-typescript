import { createPool } from "mysql2/promise";
import { keys } from "./keys";

function Connect() {
  const connection = createPool({
    host: keys.host,
    user: keys.user,
    database: keys.database,
    password: "",
    connectionLimit: 10,
  });

  return connection;
}
