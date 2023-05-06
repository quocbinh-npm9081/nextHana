import mongoose from "mongoose";

interface IUserSchema {
  name: string;
  phoneNumber: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, require: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
