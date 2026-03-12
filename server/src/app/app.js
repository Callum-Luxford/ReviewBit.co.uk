const helmet = require("helmet");
const cors = require("cors");
const express = require("express");

// Create express app..
const app = express();

// === MIDDLEWARE ===:
// Security Headers..
app.use(helmet());

// Cookie Parsing (future-safe)

// CORS
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin: CLIENT_URL,
    // credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parsing (json)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// === MIDDLEWARE ===:

// HEALTH CHECK ROUTE
app.get("/api/health", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "API is healthy",
    time: new Date().toISOString(),
  });
});

// MOUNT ROUTE MODULES
app.get("/api/error-test", (req, res, next) => {
  next(new Error("Test error from error-test route"));
});

// 404 HANDLER
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// CENTRALISED ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("Central error handler:", err.message);

  res.status(500).json({
    ok: false,
    message: err.message || "Server error",
  });
});

module.exports = app;
