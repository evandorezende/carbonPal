const executeQuery = require("./db");

async function dropDb() {
  try {
    const query = `DROP DATABASE IF EXISTS dev_db`;
    await executeQuery({ query });
  } catch (error) {
    console.log(error);
  }
}

dropDb();
