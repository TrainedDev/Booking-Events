const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const { errorHandler } = require("./middleweres/handler");
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

// Error Handler
app.use(errorHandler);

module.exports = app;