import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import OrderVoucher from "@/models/LuckyOrderVoucher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST request allowed." });
  }
  await db.mongoDB.connect();
  const body = req.body;
  try {
    const voucher = new OrderVoucher(body);
    const data = await voucher.save();
    await db.mongoDB.disconnect();
    res.status(201).send({ message: "Them thanh cong", orderVoucher: data });
  } catch (error) {
    res.status(400).send({ message: "Khong the them" });
  }
};

export default handler;
