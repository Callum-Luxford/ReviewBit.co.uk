const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

module.exports = generateToken;
