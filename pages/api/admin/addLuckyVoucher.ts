import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import LuckyVoucher from "@/models/LuckyVoucher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST request allowed." });
  }
  await db.mongoDB.connect();
  const luckVoucher: any = req.body;

  try {
   

    const voucher = new LuckyVoucher({name: luckVoucher.name, content: luckVoucher.content});
    await voucher.save()


    await db.mongoDB.disconnect();
    res.status(201).send({ message: "Thêm voucher thành công", body: voucher });
  } catch (error) {
    res.status(400).send({ message: "Lỗi hệ thống !", body: luckVoucher });
  }
};

export default handler;
