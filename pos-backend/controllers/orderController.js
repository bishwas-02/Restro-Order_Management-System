const createHttpError = require("http-errors");
const db = require("../models");
const Order = db.Order;
const Table = db.Table;

// Add a new order
const addOrder = async (req, res, next) => {
  try {
    const {
      customerName,
      customerPhone,
      customerGuests,
      orderStatus,
      billTotal,
      billTax,
      billTotalWithTax,
      items,
      tableId,
      paymentMethod,
    } = req.body;

    if (
      !customerName || !customerPhone || !customerGuests ||
      billTotal == null || billTax == null || billTotalWithTax == null
    ) {
      return next(createHttpError(400, "Missing required order fields!"));
    }

    const newOrder = await Order.create({
      customerName,
      customerPhone,
      customerGuests,
      orderStatus: orderStatus || "Pending",
      billTotal,
      billTax,
      billTotalWithTax,
      items,
      tableId,
      paymentMethod,
    });

    res.status(201).json({ success: true, message: "Order created!", data: newOrder });
  } catch (error) {
    next(error);
  }
};


// Get order by ID
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      const error = createHttpError(404, "Invalid id!");
      return next(error);
    }

    const order = await Order.findByPk(id, {
      include: [{ model: Table, as: "table" }],
    });
    if (!order) {
      const error = createHttpError(404, "Order not found!");
      return next(error);
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// Get all orders (with populated table)
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Table, as: "table" }],
    });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// Update order status by ID
const updateOrder = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      const error = createHttpError(404, "Invalid id!");
      return next(error);
    }

    const order = await Order.findByPk(id);
    if (!order) {
      const error = createHttpError(404, "Order not found!");
      return next(error);
    }

    order.orderStatus = orderStatus !== undefined ? orderStatus : order.orderStatus;
    await order.save();

    res.status(200).json({ success: true, message: "Order updated", data: order });
  } catch (error) {
    next(error);
  }
};

module.exports = { addOrder, getOrderById, getOrders, updateOrder };
