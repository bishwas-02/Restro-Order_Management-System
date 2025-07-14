const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Payment = sequelize.define("Payment", {
    paymentId: {
      type: DataTypes.STRING,
    },

    orderId: {
      type: DataTypes.STRING, // you can change this to INTEGER and associate if it's a foreign key
    },

    amount: {
      type: DataTypes.FLOAT,
    },

    currency: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.STRING,
    },

    method: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
    },

    contact: {
      type: DataTypes.STRING,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false, 
    tableName: "payments",
  });

  return Payment;
};
