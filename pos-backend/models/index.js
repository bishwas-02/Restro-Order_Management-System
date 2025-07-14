// Load environment variables first
require("dotenv").config();

const config = require("../config/config")  // Adjust path as needed
const { Sequelize } = require("sequelize");

// Setup Sequelize connection with your config variables
const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    logging: false,
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize);
db.Table = require("./Table")(sequelize);
db.Order = require("./Order")(sequelize);
db.Payment = require("./Payment")(sequelize);

// Associations
db.Table.hasMany(db.Order, { foreignKey: "tableId", as: "orders" });
db.Order.belongsTo(db.Table, { foreignKey: "tableId", as: "table" });

db.Order.hasMany(db.Payment, { foreignKey: "orderId", as: "payments" });
db.Payment.belongsTo(db.Order, { foreignKey: "orderId", as: "order" });

module.exports = db;
