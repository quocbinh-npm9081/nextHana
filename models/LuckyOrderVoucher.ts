import mongoose from "mongoose";

interface ILuckyOrderVoucherSchema {
  userName: string;
  phoneNumber: string;
  voucherName: string;
  voucherContent: string;
}

const luckyOrderVoucherShema = new mongoose.Schema<ILuckyOrderVoucherSchema>(
  {
    userName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    voucherName: { type: String, required: true },
    voucherContent: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const LuckyOrderVoucher =
  mongoose.models.LuckyOrderVoucher ||
  mongoose.model("LuckyOrderVoucher", luckyOrderVoucherShema);
export default LuckyOrderVoucher;
