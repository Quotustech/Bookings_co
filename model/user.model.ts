import mongoose, { Model } from "mongoose";

export interface UserType {
  name: string;
  email: string;
  password: string;
  role: string;
}

type UserModelType = Model<UserType>;

const userSchema = new mongoose.Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "user"],
      default: "superadmin",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserType, UserModelType>("User", userSchema);

export default User;
