const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const { errorHandler } = require("./middleweres/handler");
const { sequelize } = require("./models");
config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("server is live"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// connect to database
 sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: " + err));

// Error Handler
app.use(errorHandler);


module.exports = app;