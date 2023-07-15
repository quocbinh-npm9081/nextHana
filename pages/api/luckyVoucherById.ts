import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import LuckyVoucher from "@/models/LuckyVoucher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST request allowed." });
  }
  await db.mongoDB.connect();
  const idVoucher = req.body.id;

  const data = await LuckyVoucher.findById(idVoucher);

  await db.mongoDB.disconnect();
  res.send({ voucher: data });
};

export default handler;
