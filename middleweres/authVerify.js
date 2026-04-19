const jwt = require("jsonwebtoken");
const { BookingUsers } = require("../models");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token);
    req.userId = decode.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.verifyUserRole = async (req, res, next) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const userRole = await BookingUsers.findByPk(userId, { attributes: ["event_organizer"] });

    if (!userRole || !userRole.event_organizer) {
        return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }

    next();
};