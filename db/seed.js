const executeQuery = require("./db");

async function seedDb() {
  try {
    // Insert fuels
    const fuelQuery = `INSERT INTO fuel (type, emission_factor) VALUES (?, ?)`;
    const fuelValues = ["diesel", 2.68];
    await executeQuery({ query: fuelQuery, values: fuelValues });

    // Insert equipment
    const equipmentQuery = `
      INSERT INTO equipment (name, slug, max_weight, fuel_consumption, fuel_id) VALUES(?, ?, ?, ?, ?)
    `;

    await executeQuery({
      query: equipmentQuery,
      values: ["Semi 90", "semi-90", 25000, 1.6, 1],
    });

    await executeQuery({
      query: equipmentQuery,
      values: ["Truck 55", "truck-55", 10000, 3.15, 1],
    });

    //Insert offset companies
    const offsetCompanyQuery = `
      INSERT INTO offset_company (name, slug, price_per_ton) VALUES(?, ?, ?)
    `;
    await executeQuery({
      query: offsetCompanyQuery,
      values: ["GreenTrees", "green-trees", 15.0],
    });

    await executeQuery({
      query: offsetCompanyQuery,
      values: ["CarbonCredit", "carbon-credit", 10.0],
    });

    await executeQuery({
      query: offsetCompanyQuery,
      values: ["Terrapass", "terrapass", 20.0],
    });
  } catch (error) {
    console.log(error);
  }
}

seedDb();
