import { createPool } from "mysql2/promise";

function Connect() {
  const connection = createPool({
    host: "localhost",
    user: "root",
    database: "",
    connectionLimit: 10,
  });

  return connection;
}
