
const { Sequelize } = require("sequelize");
const config = require("./config"); // Make sure this file exists and is correct

// Initialize Sequelize instance
const sequelize = new Sequelize(
  config.db.name,     // Database name
  config.db.user,     // MySQL user
  config.db.password, // MySQL password
  {
    host: config.db.host,      // e.g., 'localhost'
    port: config.db.port,      // usually 3306
    dialect: config.db.dialect, // 'mysql'
    logging: false             // set to true to see raw SQL queries
  }
);
const db = require("../models");

// Function to test and establish connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected Successfully");

    // Sync models (alter existing tables to match models)
    await sequelize.sync({ alter: true });
    console.log("🛠️ All Models Synced Successfully");

  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};


module.exports = { sequelize, connectDB };
