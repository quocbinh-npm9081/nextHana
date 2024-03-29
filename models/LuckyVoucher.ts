import mongoose from "mongoose";

interface ILuckyVoucher {
  name: string;
  content: string;
}

const luckyVoucherSchema = new mongoose.Schema<ILuckyVoucher>(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const LuckyVoucher =
  mongoose.models.LuckyVoucher ||
  mongoose.model("LuckyVoucher", luckyVoucherSchema);
export default LuckyVoucher;
