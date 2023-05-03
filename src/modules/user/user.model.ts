import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";

import { roles } from "@dinedrop/shared";
import { paginate } from "@dinedrop/shared";
import { toJSON } from "@dinedrop/shared";
import { IUserDoc, IUserModel } from "./user.interfaces";

const userSchema = new mongoose.Schema<IUserDoc, IUserModel>(
  {
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
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static(
  "isEmailTaken",
  async function (
    email: string,
    excludeUserId: mongoose.ObjectId
  ): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  }
);

const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

export default User;
