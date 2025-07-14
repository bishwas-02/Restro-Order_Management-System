const createHttpError = require("http-errors");
const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password || !role) {
      return next(createHttpError(400, "All fields are required!"));
    }

    // ✅ Check if user already exists
    const isUserPresent = await User.findOne({ where: { email } });
    if (isUserPresent) {
      return next(createHttpError(400, "User already exists!"));
    }

    // ✅ Hash password before saving in model
    // const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user with hashed password
    const newUser = await User.create({
      name,
      phone,
      email,
      password: password,
      role
    });
    

    res.status(201).json({
      success: true,
      message: "New user created!",
      data: newUser
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.accessTokenSecret,
      { expiresIn: "1d" }
    );

    res.cookie("accessToken", token, { httpOnly: true, secure: true, sameSite: "none" });

    res.status(200).json({ success: true, message: "Logged in", data: user });

  } catch (error) {
    next(error);
  }
};


const getUserData = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return next(createHttpError(404, "User not found"));

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({
      success: true,
      message: "User logout successfully!"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUserData,
  logout
};
