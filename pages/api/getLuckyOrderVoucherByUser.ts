import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import LuckyOrderVoucher from "@/models/LuckyOrderVoucher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.mongoDB.connect();
  const { user } = req.body;
  const data = await LuckyOrderVoucher.findOne({
    phoneNumber: user.phoneNumber,
  });

  await db.mongoDB.disconnect();
  res.send({ data });
};

export default handler;
