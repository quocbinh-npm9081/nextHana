import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import LuckyOrderVoucher from "@/models/LuckyOrderVoucher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    return res.status(405).send({ message: "Only DELETE request allowed." });
  }
  await db.mongoDB.connect();
  const userOrderVoucher: any = req.body;

  try {
    const userOrderVouchers = userOrderVoucher.map((voucherId: string) => ({
      _id: voucherId,
    }));
    const dbRes = await LuckyOrderVoucher.deleteMany(...userOrderVouchers);
    await db.mongoDB.disconnect();

    res.status(201).send({
      message: "Xóa user thành công",
      voucher: userOrderVouchers,
      coutDeeleted: dbRes.deletedCount,
    });
  } catch (error) {
    res.status(400).send({ message: "Không thể xóa !" });
  }
};

export default handler;
