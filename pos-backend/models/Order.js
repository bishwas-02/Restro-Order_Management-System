const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define("Order", {
    // Flattened customerDetails with DB column mapping
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "phone",
    },
    customerGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "guests",
    },

    orderStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "orderStatus",
    },

    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "orderDate",
    },

    // Flattened bills with DB column mapping
    billTotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "total",
    },
    billTax: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "tax",
    },
    billTotalWithTax: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "totalWithTax",
    },

    // JSON column for items array
    items: {
      type: DataTypes.JSON,
      defaultValue: [],
      field: "items",
    },

    // Foreign key for table (optional: associate it)
    tableId: {
      type: DataTypes.INTEGER,
      references: {
        model: "tables",
        key: "id",
      },
      field: "tableId",
    },

    paymentMethod: {
      type: DataTypes.STRING,
      field: "paymentMethod",
    },

    // Flattened paymentData with DB column mapping
    razorpayOrderId: {
      type: DataTypes.STRING,
      field: "razorpay_order_id",
    },
    razorpayPaymentId: {
      type: DataTypes.STRING,
      field: "razorpay_payment_id",
    },

  }, {
    timestamps: true,
    tableName: "orders",
  });

  return Order;
};
