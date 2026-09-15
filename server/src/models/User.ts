import mongoose from "mongoose";


export type UserRole = "user" | "admin";

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
      trim: true,
    },
    address: {
      type: String,
      require: true,
      trim: true,
    },

    state: {
      type: String,
      require: true,
      trim: true,
    },

    postalCode: {
      type: String,
      require: true,
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
  },
);

const UserSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    addresses: {
      type: [addressSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);