import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import LuckyVoucher from "@/models/LuckyVoucher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.mongoDB.connect();

  const data = await LuckyVoucher.find({}, "name content quantity createdAt");

  await db.mongoDB.disconnect();
  res.send({ vouchers: data });
};

export default handler;
