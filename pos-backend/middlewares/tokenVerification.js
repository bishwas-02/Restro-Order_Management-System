const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const db = require("../models");
const User = db.User;

const isVerifiedUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      const error = createHttpError(401, "Please provide token!");
      return next(error);
    }

    // Verify JWT token
    const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);

    // Find user by primary key (id)
    const user = await User.findByPk(decodeToken.id);

    if (!user) {
      const error = createHttpError(401, "User does not exist!");
      return next(error);
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    const err = createHttpError(401, "Invalid Token!");
    next(err);
  }
};

module.exports = { isVerifiedUser };
