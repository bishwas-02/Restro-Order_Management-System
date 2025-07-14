const createHttpError = require("http-errors");
const db = require("../models");
const Table = db.Table;
const Order = db.Order;
const { Op } = require("sequelize");

// Add new table
const addTable = async (req, res, next) => {
  try {
    const { tableNo, seats } = req.body;

    if (!tableNo) {
      return next(createHttpError(400, "Please provide table No!"));
    }

    const isTablePresent = await Table.findOne({ where: { tableNo } });
    if (isTablePresent) {
      return res.status(400).json({ success: false, message: "Table already exists!" });
    }

    const newTable = await Table.create({ tableNo, seats });
    res.status(201).json({ success: true, message: "Table added!", data: newTable });
  } catch (error) {
    next(error);
  }
};

// Get all tables with populated currentOrder's customerDetails
const getTables = async (req, res, next) => {
  try {
    const tables = await Table.findAll({
      include: [
        {
          model: Order,
          as: "orders", // should match your association alias
          attributes: ["id", "customerName", "customerPhone", "customerGuests"], // flatten your customerDetails fields here in your Order model
        },
      ],
    });
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    next(error);
  }
};

// Update table status and currentOrder (orderId)
const updateTable = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      const error = createHttpError(404, "Invalid id!");
      return next(error);
    }

    const table = await Table.findByPk(id);
    if (!table) {
      const error = createHttpError(404, "Table not found!");
      return next(error);
    }

    // Update fields
    table.status = status !== undefined ? status : table.status;
    table.currentOrder = orderId !== undefined ? orderId : table.currentOrder;

    await table.save();

    res.status(200).json({ success: true, message: "Table updated!", data: table });
  } catch (error) {
    next(error);
  }
};

module.exports = { addTable, getTables, updateTable };
