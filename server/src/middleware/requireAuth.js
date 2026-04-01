const jwt = require("jsonwebtoken");
const Business = require("../models/Business");

const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = header.split(" ")[1].trim();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const business = await Business.findById(decoded.id).select("-password");
    if (!business) return res.status(401).json({ message: "Unauthorized" });

    req.business = business;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = requireAuth;
