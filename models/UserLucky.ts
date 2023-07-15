import mongoose from "mongoose";
interface IItem {
  completeOption: string;
  option: string;
}
interface IUserLuckySchema {
  name: string;
  phoneNumber: string;
  item: IItem;
}
const userLuckySchema = new mongoose.Schema<IUserLuckySchema>(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    item: {
      completeOption: { type: String },
      option: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const UserLucky =
  mongoose.models.UserLucky || mongoose.model("UserLucky", userLuckySchema);
export default UserLucky;
