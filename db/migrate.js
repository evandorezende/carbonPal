const executeQuery = require("./db");

async function migrateDb() {
  try {
    const createFuelTableQuery = `
    CREATE TABLE IF NOT EXISTS fuel (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        emission_factor FLOAT(7,2)
    )
`;
    await executeQuery({ query: createFuelTableQuery });

    const createEquipmentTableQuery = `
    CREATE TABLE IF NOT EXISTS equipment (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        max_weight INT,
        fuel_consumption FLOAT(7,2) NOT NULL,
        fuel_id INT,
        FOREIGN KEY (fuel_id) REFERENCES fuel(id) ON DELETE SET NULL
    )
`;
    await executeQuery({ query: createEquipmentTableQuery });

    //create a offset_company table
    const createOffsetCompanyTableQuery = `
    CREATE TABLE IF NOT EXISTS offset_company (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        price_per_ton FLOAT(7,2) NOT NULL
    )
`;

    await executeQuery({ query: createOffsetCompanyTableQuery });
  } catch (error) {
    console.log(error);
  }
}

migrateDb();
