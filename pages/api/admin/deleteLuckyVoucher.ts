import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import LuckyVoucher from "@/models/LuckyVoucher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    return res.status(405).send({ message: "Only DELETE request allowed." });
  }
  await db.mongoDB.connect();
  const luckVoucher: any = req.body;

  try {
    const luckVouchers = luckVoucher.map((voucherId: string) => ({
      _id: voucherId,
    }));
    await LuckyVoucher.deleteMany(...luckVouchers);
    await db.mongoDB.disconnect();
    res
      .status(201)
      .send({ message: "Xóa voucher thành công", voucher: luckVouchers });
  } catch (error) {
    res.status(400).send({ message: "Không thể xóa !" });
  }
};

export default handler;
