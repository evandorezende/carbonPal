const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

async function createDb() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
    });
    await db.query(`CREATE DATABASE IF NOT EXISTS dev_db`);
    await db.end();
  } catch (error) {
    console.log(error);
  }
}

createDb();
