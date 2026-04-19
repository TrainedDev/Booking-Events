const jwt = require("jsonwebtoken");
const { BookingUsers } = require("../models");
const appError = require("../utils/appError");

exports.registerService = async (username, email, password, role) => {
  const existingUser = await BookingUsers.findOne({ where: { email } });

  if (existingUser) throw appError("Email already in use", 400);

  const newUser = await BookingUsers.create({
    username,
    email,
    password,
    role,
  });

  const token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    message: "User registered successfully",
    token,
  };
};

exports.loginService = async (email, password) => {
  const user = await BookingUsers.findOne({ where: { email } });

  if (!user) throw appError("Invalid email or password", 401);

  const isPasswordValid = await user.checkPassword(password);

  if (!isPasswordValid) throw appError("Invalid email or password", 401);

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    message: "Login successful",
    token,
  };
};