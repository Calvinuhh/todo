import { model, Schema } from "mongoose";
import User from "../interfaces&types/User";

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxLength: 40,
      minLength: 3,
      match: /^[a-zA-Z0-9ñÑ!@#$%^&*()_+=[\]{}|;:'",.<>/?`~\\-]+$/,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default model<User>("user", userSchema);
