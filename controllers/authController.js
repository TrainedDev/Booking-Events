const { registerService, loginService } = require("../services/authServices");
const appError = require("../utils/appError");

exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;

    if(!username || !email || !password || !role) throw appError("All fields are required", 400);

    const response = await registerService(username, email, password, role);

    res.status(201).json(response);
  };


  exports.login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) throw appError("Email and password are required", 400);

    const response = await loginService(email, password);

    res.status(200).json(response);
  };