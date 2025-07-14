const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Table = sequelize.define("Table", {
    tableNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "Available",
    },

    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: "tables"
  });

  return Table;
};
