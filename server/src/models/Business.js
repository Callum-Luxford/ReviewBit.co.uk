const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    // =========================
    // Core Auth / Identity
    // =========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // =========================
    // Business Profile
    // =========================
    phone: {
      type: String,
      trim: true,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    logoUrl: {
      type: String,
      trim: true,
      default: "",
    },

    // =========================
    // Review Destination
    // =========================
    googleReviewUrl: {
      type: String,
      trim: true,
      default: "",
    },

    googlePlaceId: {
      type: String,
      trim: true,
      default: "",
    },

    // =========================
    // Account Status
    // =========================
    isActive: {
      type: Boolean,
      default: true,
    },

    plan: {
      type: String,
      enum: ["free", "pro", "enterprise"],
      default: "free",
    },

    subscriptionStatus: {
      type: String,
      enum: ["inactive", "trialing", "active", "past_due", "cancelled"],
      default: "inactive",
    },

    trialEndsAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
