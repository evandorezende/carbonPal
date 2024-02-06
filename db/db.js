const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

async function executeQuery({ query, values = [] }) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    const [result] = await db.execute(query, values);
    await db.end();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = executeQuery;
