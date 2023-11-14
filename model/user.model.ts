import mongoose, { HydratedDocument, Model, QueryWithHelpers } from "mongoose";
import { createHash } from "../utils/bcryptHelper";

export interface UserType {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UserQueryHelpers {
  byEmail(
    email: string
  ): QueryWithHelpers<
    HydratedDocument<UserType>[],
    HydratedDocument<UserType>,
    UserQueryHelpers
  >;
}

type UserModelType = Model<UserType, UserQueryHelpers>;

const userSchema = new mongoose.Schema<UserType, {}, {}, UserQueryHelpers>(
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
      enum: ["superadmin", "admin", "user", "property_manager"],
      default: "superadmin",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.query.byEmail = function byEmail(
  this: QueryWithHelpers<any, HydratedDocument<UserType>, UserQueryHelpers>,
  email: string
) {
  return this.find({ email });
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await createHash(this.password);
  next();
});

const User = mongoose.model<UserType, UserModelType>("User", userSchema);

export default User;
