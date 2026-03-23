const Business = require("../models/Business");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await Business.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Business already exists" });
    }

    let slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-"); // replace spaces with -

    let existingSlug = await Business.findOne({ slug });

    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const business = await Business.create({
      name,
      email,
      password: hashedPassword,
      slug,
    });

    const token = generateToken(business._id);

    res.status(201).json({
      token,
      business: {
        id: business._id,
        name: business.name,
        email: business.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required." });

  try {
    const business = await Business.findOne({ email });
    if (!business)
      return res.status(400).json({ message: "Invalid credentials" });

    const isPass = await bcrypt.compare(password, business.password);
    if (!isPass)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(business._id);
    res.status(200).json({
      token,
      business: {
        id: business._id,
        name: business.name,
        email: business.email,
        slug: business.slug,
        plan: business.plan,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login };
