const express = require("express");
const { signup, login, getMe } = require("../controllers/authController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

// POST /api/auth/signup
router.post("/signup", signup);

// POST /api/auth/login
router.post("/login", login);

// GET /api/auth/me
router.get("/me", requireAuth, getMe);

module.exports = router;
